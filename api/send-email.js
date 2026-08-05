/**
 * api/send-email.js — Vercel serverless function
 * Receives reservation/contact emails from the React app and forwards them
 * to Resend, which delivers them to the hotel inbox.
 *
 * Requires the RESEND_API_KEY environment variable to be set in Vercel.
 */

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = 'Melka International Hotel <onboarding@resend.dev>';
const TO_ADDRESS   = 'melekainternationahotel@gmail.com';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { subject, html } = req.body || {};

  if (!subject || !html) {
    res.status(400).json({ error: 'Missing subject or html body.' });
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      subject,
      html,
    });

    if (error) {
      console.error('[Resend] API error:', error);
      res.status(400).json({ error: error.message });
      return;
    }

    console.log('[Resend] Email sent:', data.id);
    res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('[Resend] Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
