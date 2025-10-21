// Test email sending with Hostinger SMTP
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Configure SMTP transporter for Hostinger
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
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

async function testEmail() {
  console.log('🧪 Testing SMTP Configuration...\n');
  console.log('SMTP Config:');
  console.log('- Host:', process.env.SMTP_HOST);
  console.log('- Port:', process.env.SMTP_PORT);
  console.log('- Secure:', process.env.SMTP_SECURE);
  console.log('- User:', process.env.SMTP_USER);
  console.log('- From:', process.env.SMTP_FROM);
  console.log('\nRecipients:', DEMO_RECIPIENTS.join(', '));
  console.log('\n---\n');

  try {
    // Test 1: Verify connection
    console.log('1️⃣ Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!\n');

    // Test 2: Send test emails to all recipients
    console.log('2️⃣ Sending test emails...\n');

    for (const recipient of DEMO_RECIPIENTS) {
      console.log(`📧 Sending to: ${recipient}`);

      const mailOptions = {
        from: `${process.env.DEMO_ORGANIZER_NAME} <${process.env.SMTP_FROM}>`,
        to: recipient,
        subject: 'Test Email - GAMR Demo Form Configuration',
        html: `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9fafb; }
              .info-box { background-color: white; border-left: 4px solid #10b981; padding: 15px; margin: 15px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✅ Test Email - Configuration SMTP</h1>
              </div>
              
              <div class="content">
                <p>Bonjour,</p>
                
                <div class="info-box">
                  <h3>Configuration testée avec succès !</h3>
                  <p>Ce message confirme que la configuration SMTP pour le formulaire de demande de démo GAMR fonctionne correctement.</p>
                  <ul>
                    <li><strong>Serveur SMTP:</strong> smtp.hostinger.com</li>
                    <li><strong>Port:</strong> 465 (SSL)</li>
                    <li><strong>Expéditeur:</strong> formations@allianceconsultants.net</li>
                  </ul>
                </div>
                
                <p>Vous recevrez des notifications lorsque des prospects demanderont une démo sur le site <strong>gestionrisques.com</strong>.</p>
                
                <p>Cordialement,<br><strong>Équipe GAMR</strong></p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Test Email - Configuration SMTP GAMR

Ce message confirme que la configuration SMTP pour le formulaire de demande de démo GAMR fonctionne correctement.

Configuration:
- Serveur SMTP: smtp.hostinger.com
- Port: 465 (SSL)
- Expéditeur: formations@allianceconsultants.net

Vous recevrez des notifications lorsque des prospects demanderont une démo sur gestionrisques.com.

Cordialement,
Équipe GAMR
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`   ✅ Sent! Message ID: ${info.messageId}\n`);
    }

    console.log('🎉 All test emails sent successfully!');
    console.log('\n✅ SMTP configuration is working correctly.');
    console.log('📬 Please check your inboxes for the test emails.\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    if (error.response) {
      console.error('Server response:', error.response);
    }
    process.exit(1);
  }
}

// Run the test
testEmail();
