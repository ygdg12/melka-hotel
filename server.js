/**
 * server.js — Melka Hotel backend proxy
 * Forwards /api/send-email requests to the Resend API server-side,
 * avoiding CORS restrictions when called from the browser.
 *
 * Run with:  node server.js
 * Or via:    npm run dev  (which starts both this and the React app)
 */

require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const { Resend } = require('resend');

const app    = express();
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = 'Melka International Hotel <onboarding@resend.dev>';
const TO_ADDRESS   = 'yaredgirmab1234@gmail.com';

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'] }));
app.use(express.json());

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// ── Send Email ────────────────────────────────────────────────────────────────
app.post('/api/send-email', async (req, res) => {
  const { subject, html } = req.body;

  if (!subject || !html) {
    return res.status(400).json({ error: 'Missing subject or html body.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from:    FROM_ADDRESS,
      to:      [TO_ADDRESS],
      subject,
      html,
    });

    if (error) {
      console.error('[Resend] API error:', error);
      return res.status(400).json({ error: error.message });
    }

    console.log('[Resend] Email sent:', data.id);
    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('[Resend] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n✅  Melka proxy server running on http://localhost:${PORT}`);
  console.log(`    RESEND_API_KEY loaded: ${process.env.RESEND_API_KEY ? 'YES ✓' : 'NO ✗'}\n`);
});
