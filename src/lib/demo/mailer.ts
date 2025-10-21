import nodemailer from 'nodemailer';

// Configure SMTP transporter for Hostinger
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

// Recipients for demo requests
const DEMO_RECIPIENTS = [
  'bahjulgues@gmail.com',
  'stanislasyao92@gmail.com',
  'baba.kourouma@allianceconsultants.net',
];

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
    // Send email to the prospect who submitted the form
    const prospectMailOptions = {
      from: `${organizerName} <${organizerEmail}>`,
      to: to,
      subject: 'Votre demande de démo GAMR - Confirmation',
      html: htmlContent,
      text: textContent,
      attachments: icsContent
        ? [
            {
              filename: 'demo-gamr.ics',
              content: icsContent,
            },
          ]
        : undefined,
    };

    await transporter.sendMail(prospectMailOptions);
    console.log('Email sent successfully to prospect:', to);

    // Send notification to internal team (without ICS attachment)
    const teamNotificationHtml = `
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
            <h1>Nouvelle Demande de Démo GAMR</h1>
          </div>
          
          <div class="content">
            <p>Une nouvelle demande de démonstration a été reçue :</p>
            
            <div class="info-box">
              <h3>Informations du prospect :</h3>
              <ul>
                <li><strong>Nom :</strong> ${fullName}</li>
                <li><strong>Organisation :</strong> ${organization}</li>
                <li><strong>Email :</strong> ${to}</li>
                <li><strong>Créneau proposé (principal) :</strong> ${slot1Date} à ${slot1Time} (${timezone})</li>
                <li><strong>Outil de réunion :</strong> ${toolDisplay}</li>
              </ul>
            </div>
            
            <p>Veuillez contacter le prospect dans les 24-48 heures pour confirmer le créneau.</p>
          </div>
          
          <div class="footer">
            <p>Notification automatique du système GAMR</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const teamNotificationText = `
Nouvelle Demande de Démo GAMR

Informations du prospect :
- Nom : ${fullName}
- Organisation : ${organization}
- Email : ${to}
- Créneau proposé (principal) : ${slot1Date} à ${slot1Time} (${timezone})
- Outil de réunion : ${toolDisplay}

Veuillez contacter le prospect dans les 24-48 heures pour confirmer le créneau.
    `;

    // Send notification to all team members
    for (const recipient of DEMO_RECIPIENTS) {
      const teamMailOptions = {
        from: `${organizerName} <${organizerEmail}>`,
        to: recipient,
        subject: `Nouvelle demande de démo - ${organization}`,
        html: teamNotificationHtml,
        text: teamNotificationText,
      };

      await transporter.sendMail(teamMailOptions);
      console.log('Notification sent to team member:', recipient);
    }

    return { success: true };
  } catch (error: unknown) {
    console.error('Email sending error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}
