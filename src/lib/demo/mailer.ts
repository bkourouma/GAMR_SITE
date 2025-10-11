import { Resend } from 'resend';

// Use default key during build, actual key at runtime
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');

interface SendDemoConfirmationParams {
  to: string;
  fullName: string;
  organization: string;
  slot1Date: string;
  slot1Time: string;
  timezone: string;
  meetingTool: string;
  icsContent?: string;
}

/**
 * Sends demo confirmation email with calendar invitation attachment
 */
export async function sendDemoConfirmation(
  params: SendDemoConfirmationParams
): Promise<{ success: boolean; error?: string }> {
  const { to, fullName, organization, slot1Date, slot1Time, timezone, meetingTool, icsContent } =
    params;

  const organizerEmail = process.env.DEMO_ORGANIZER_EMAIL || 'demo@gamr.example';
  const organizerName = process.env.DEMO_ORGANIZER_NAME || 'Équipe GAMR';

  // Format meeting tool display
  const toolDisplay =
    meetingTool === 'Google Meet'
      ? 'Google Meet'
      : meetingTool === 'Microsoft Teams'
        ? 'Microsoft Teams'
        : meetingTool === 'Zoom'
          ? 'Zoom'
          : 'Téléphone';

  // Build email HTML
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .info-box { background-color: white; border-left: 4px solid #2563eb; padding: 15px; margin: 15px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Demande de Démo GAMR Reçue</h1>
        </div>
        
        <div class="content">
          <p>Bonjour <strong>${fullName}</strong>,</p>
          
          <p>Merci pour votre demande de démonstration personnalisée de GAMR pour <strong>${organization}</strong>.</p>
          
          <div class="info-box">
            <h3>Détails de votre demande :</h3>
            <ul>
              <li><strong>Créneau proposé (principal) :</strong> ${slot1Date} à ${slot1Time} (${timezone})</li>
              <li><strong>Outil de réunion :</strong> ${toolDisplay}</li>
            </ul>
          </div>
          
          <p>Notre équipe commerciale va examiner votre demande et vous contacter sous 24-48 heures pour confirmer le créneau et organiser la démonstration.</p>
          
          <p>En attendant, vous pouvez ajouter le créneau proposé à votre calendrier en utilisant le fichier joint (.ics) ou les liens dans votre écran de confirmation.</p>
          
          <p>Si vous avez des questions urgentes, n'hésitez pas à nous contacter à <a href="mailto:${organizerEmail}">${organizerEmail}</a>.</p>
          
          <p>À très bientôt,<br><strong>${organizerName}</strong></p>
        </div>
        
        <div class="footer">
          <p>Cet email a été envoyé suite à votre demande de démo sur gamr.example</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
Bonjour ${fullName},

Merci pour votre demande de démonstration personnalisée de GAMR pour ${organization}.

Détails de votre demande :
- Créneau proposé (principal) : ${slot1Date} à ${slot1Time} (${timezone})
- Outil de réunion : ${toolDisplay}

Notre équipe commerciale va examiner votre demande et vous contacter sous 24-48 heures pour confirmer le créneau et organiser la démonstration.

Si vous avez des questions urgentes, n'hésitez pas à nous contacter à ${organizerEmail}.

À très bientôt,
${organizerName}
  `;

  try {
    const emailData: {
      from: string;
      to: string;
      subject: string;
      html: string;
      text: string;
      attachments?: Array<{ filename: string; content: string }>;
    } = {
      from: `${organizerName} <${organizerEmail}>`,
      to: to,
      subject: 'Votre demande de démo GAMR - Confirmation',
      html: htmlContent,
      text: textContent,
    };

    // Attach .ics file if provided
    if (icsContent) {
      emailData.attachments = [
        {
          filename: 'demo-gamr.ics',
          content: icsContent,
        },
      ];
    }

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    console.log('Email sent successfully:', data);
    return { success: true };
  } catch (error: unknown) {
    console.error('Email sending error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}
