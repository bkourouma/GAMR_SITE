import { createEvent, EventAttributes } from 'ics';

interface GenerateICSParams {
  summary: string;
  description: string;
  /** IANA timezone like "Africa/Abidjan" (kept for API symmetry) */
  _timezone: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:mm (24h) */
  time: string;
  /** Defaults to 45 if omitted */
  durationMinutes?: number;
  location: string;
  organizer: {
    name: string;
    email: string;
  };
  attendee: {
    name: string;
    email: string;
  };
}

/** Default duration for demos (45 minutes) since duration field was removed */
export const DEFAULT_DEMO_DURATION = 45;

/**
 * Generates an .ics calendar file content for a demo event.
 * Notes:
 * - `ics` uses local time when `startInputType`/`startOutputType` are "local".
 * - `_timezone` is accepted for compatibility with your schema; conversion to a
 *   specific timezone would require date-fns-tz or similar. Here we keep local.
 */
export function generateICS(params: GenerateICSParams): string {
  const {
    summary,
    description,
    _timezone, // kept (intentionally unused) for API compatibility
    date,
    time,
    durationMinutes = DEFAULT_DEMO_DURATION,
    location,
    organizer,
    attendee,
  } = params;

  // Parse date and time safely
  const [year = 2025, month = 1, day = 1] = date.split('-').map(Number);
  const [hour = 0, minute = 0] = time.split(':').map(Number);

  // ics expects [YYYY, M, D, H, m]
  const start: [number, number, number, number, number] = [year, month, day, hour, minute];

  const event: EventAttributes = {
    start,
    duration: { minutes: durationMinutes },
    title: summary,
    description,
    location,
    status: 'TENTATIVE',
    organizer: {
      name: organizer.name,
      email: organizer.email,
    },
    attendees: [
      {
        name: attendee.name,
        email: attendee.email,
        rsvp: true,
      },
    ],
    // Keep times as local (no tz conversion performed here)
    startInputType: 'local',
    startOutputType: 'local',
  };

  const { error, value } = createEvent(event);

  if (error) {
    // Avoid console usage to satisfy common eslint configs
    throw new Error(`Failed to generate calendar invitation: ${String(error)}`);
  }

  return value || '';
}
