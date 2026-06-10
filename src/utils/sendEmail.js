/**
 * sendEmail.js
 * Calls the local Express proxy server (/api/send-email),
 * which forwards the request to Resend server-side.
 * This avoids CORS issues with calling Resend directly from the browser.
 */

/**
 * Sends an email via the local proxy server.
 *
 * @param {{ subject: string, html: string }} options
 * @returns {Promise<void>}  resolves on success, throws on failure
 */
export async function sendEmail({ subject, html }) {
  const res = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject, html }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Server error: ${res.status}`);
  }
}

/* ─── Email Template Builders ──────────────────────────────────────────── */

/**
 * Build the HTML body for a Contact-form submission.
 */
export function buildContactEmail({ name, email, subject, message }) {
  return /* html */`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Georgia, serif; background: #0a0a0a; color: #f5f0e8; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #141414; border: 1px solid #c9a96e; }
    .header  { background: #1a1a1a; padding: 32px 40px; border-bottom: 1px solid #c9a96e; }
    .header h1 { font-size: 22px; margin: 0; color: #c9a96e; letter-spacing: 0.15em; text-transform: uppercase; }
    .body    { padding: 40px; }
    .field   { margin-bottom: 24px; }
    .label   { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a96e; margin-bottom: 6px; }
    .value   { font-size: 15px; color: #f5f0e8; line-height: 1.7; white-space: pre-wrap; }
    .footer  { background: #1a1a1a; padding: 20px 40px; font-size: 11px; color: #888; border-top: 1px solid #222; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>✉ New Contact Message</h1>
      <p style="margin:8px 0 0;font-size:12px;color:#888;">Melka International Hotel — Contact Form</p>
    </div>
    <div class="body">
      <div class="field"><div class="label">Full Name</div><div class="value">${name}</div></div>
      <div class="field"><div class="label">Email</div><div class="value">${email}</div></div>
      ${subject ? `<div class="field"><div class="label">Subject</div><div class="value">${subject}</div></div>` : ''}
      <div class="field"><div class="label">Message</div><div class="value">${message}</div></div>
    </div>
    <div class="footer">Sent via melkainternationalhotel.com · ${new Date().toUTCString()}</div>
  </div>
</body>
</html>`;
}

/**
 * Build the HTML body for a Reservation-form submission.
 */
export function buildReservationEmail({ fullName, email, phone, roomType, checkIn, checkOut, guests }) {
  const nights = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000))
    : '—';

  return /* html */`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Georgia, serif; background: #0a0a0a; color: #f5f0e8; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #141414; border: 1px solid #c9a96e; }
    .header  { background: #1a1a1a; padding: 32px 40px; border-bottom: 1px solid #c9a96e; }
    .header h1 { font-size: 22px; margin: 0; color: #c9a96e; letter-spacing: 0.15em; text-transform: uppercase; }
    .body    { padding: 40px; }
    .grid    { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .field   { margin-bottom: 24px; }
    .label   { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a96e; margin-bottom: 6px; }
    .value   { font-size: 15px; color: #f5f0e8; line-height: 1.7; }
    .badge   { display: inline-block; background: #c9a96e; color: #0a0a0a; padding: 4px 14px; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 8px; }
    .footer  { background: #1a1a1a; padding: 20px 40px; font-size: 11px; color: #888; border-top: 1px solid #222; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>🏨 New Reservation Request</h1>
      <p style="margin:8px 0 0;font-size:12px;color:#888;">Melka International Hotel — Booking Form</p>
    </div>
    <div class="body">
      <div class="field"><div class="label">Guest Name</div><div class="value">${fullName}</div></div>
      <div class="field"><div class="label">Email</div><div class="value">${email}</div></div>
      ${phone ? `<div class="field"><div class="label">Phone</div><div class="value">${phone}</div></div>` : ''}
      <div class="field"><div class="label">Room Type</div><div class="value">${roomType}</div></div>
      <div class="field">
        <div class="label">Stay</div>
        <div class="value">
          Check-in: <strong>${checkIn}</strong><br/>
          Check-out: <strong>${checkOut}</strong><br/>
          Duration: <strong>${nights} night${nights !== 1 ? 's' : ''}</strong>
        </div>
      </div>
      <div class="field"><div class="label">Guests</div><div class="value">${guests}</div></div>
      <div><span class="badge">Awaiting Confirmation</span></div>
    </div>
    <div class="footer">Sent via melkainternationalhotel.com · ${new Date().toUTCString()}</div>
  </div>
</body>
</html>`;
}
