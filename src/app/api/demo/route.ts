import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { demoRequestSchema } from '@/lib/demo/schema';
import { generateICS, DEFAULT_DEMO_DURATION } from '@/lib/demo/ics-generator';
import { generateGoogleCalendarURL, generateOutlookURL } from '@/lib/demo/calendar-links';
import { sendDemoConfirmation } from '@/lib/demo/mailer';

type JsonRecord = Record<string, unknown>;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseResult = demoRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Validation échouée',
            code: 'VALIDATION_ERROR',
            fields: parseResult.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // Honeypot (anti-spam)
    if (data.honeypot && data.honeypot.trim() !== '') {
      return NextResponse.json(
        {
          success: false,
          error: { message: 'Spam détecté', code: 'SPAM_DETECTED' },
        },
        { status: 400 }
      );
    }

    const id = Date.now().toString();

    // Build meeting location label once
    const meetingLocation =
      data.meetingTool === 'google_meet'
        ? 'Google Meet'
        : data.meetingTool === 'microsoft_teams'
          ? 'Microsoft Teams'
          : data.meetingTool === 'zoom'
            ? 'Zoom'
            : 'Téléphone';

    // .ics for slot1 (schema field is `_timezone`)
    const icsContent = generateICS({
      summary: 'Démo GAMRdigitale',
      description: `Démonstration personnalisée GAMRdigitale pour ${data.organization}`,
      _timezone: data._timezone,
      date: data.slot1.date,
      time: data.slot1.time,
      durationMinutes: DEFAULT_DEMO_DURATION,
      location: meetingLocation,
      organizer: {
        name: process.env.DEMO_ORGANIZER_NAME || 'Équipe GAMRdigitale',
        email: process.env.DEMO_ORGANIZER_EMAIL || 'demo@gamr.example',
      },
      attendee: { name: data.fullName, email: data.email },
    });

    // Calendar links (accept `_timezone` from schema)
    const googleCalendarURL = generateGoogleCalendarURL({
      title: 'Démo GAMRdigitale',
      description: `Démonstration personnalisée GAMRdigitale pour ${data.organization}`,
      location: meetingLocation,
      startDate: data.slot1.date,
      startTime: data.slot1.time,
      durationMinutes: DEFAULT_DEMO_DURATION,
      timezone: data._timezone,
    });

    const outlookURL = generateOutlookURL({
      title: 'Démo GAMRdigitale',
      description: `Démonstration personnalisée GAMRdigitale pour ${data.organization}`,
      location: meetingLocation,
      startDate: data.slot1.date,
      startTime: data.slot1.time,
      durationMinutes: DEFAULT_DEMO_DURATION,
      timezone: data._timezone,
    });

    // data: URL for .ics download
    const icsBase64 = Buffer.from(icsContent).toString('base64');
    const icsDownloadLink = `data:text/calendar;base64,${icsBase64}`;

    // Send email (do not fail the request if email fails)
    const emailResult = await sendDemoConfirmation({
      to: data.email,
      fullName: data.fullName,
      organization: data.organization,
      slot1Date: data.slot1.date,
      slot1Time: data.slot1.time,
      timezone: data._timezone,
      meetingTool: meetingLocation,
      icsContent,
    });

    // Persist to JSON file
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'demo-requests.json');

    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch {
      /* no-op */
    }

    const existingData: { requests: JsonRecord[] } = { requests: [] };
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const parsed = JSON.parse(fileContent) as { requests?: unknown };
      if (parsed && Array.isArray((parsed as JsonRecord).requests)) {
        existingData.requests = (parsed as { requests: JsonRecord[] }).requests;
      }
    } catch {
      /* first write */
    }

    const requestData: JsonRecord = {
      id,
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
      icsGenerated: true,
      emailSent: Boolean(emailResult?.success),
    };

    existingData.requests.push(requestData);
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8');

    return NextResponse.json(
      {
        success: true,
        data: {
          id,
          message: 'Merci ! Nous revenons vers vous pour confirmer le créneau.',
          calendarLinks: {
            icsDownload: icsDownloadLink,
            googleCalendar: googleCalendarURL,
            outlook: outlookURL,
          },
          summary: {
            fullName: data.fullName,
            organization: data.organization,
            email: data.email,
            slot1: {
              date: data.slot1.date,
              time: data.slot1.time,
              timezone: `${data._timezone}`,
            },
            meetingTool: meetingLocation,
          },
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: 'Erreur serveur. Veuillez réessayer.',
          code: 'SERVER_ERROR',
        },
      },
      { status: 500 }
    );
  }
}
