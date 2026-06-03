import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import useReveal from '../hooks/useReveal';
import { randomImg } from '../utils/images';

const pageHeroBg = randomImg();

const ROOM_TYPES = [
  { value: 'standard-single', label: 'Standard Single — from $40/night' },
  { value: 'standard-delux', label: 'Standard Delux — from $50/night' },
  { value: 'double-delux', label: 'Double Delux — from $55/night' },
  { value: 'twin-delux', label: 'Twin Delux — from $65/night' },
  { value: 'triple-deluxe-suite', label: 'Triple Deluxe Suite — from $90/night' },
  { value: 'family-suite', label: 'Family Suite — from $80/night' },
];

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  roomType: '',
  checkIn: '',
  checkOut: '',
  guests: '2',
  specialRequests: '',
};

function RevealSection({ children, className = '' }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

// ─── Resend email sender ──────────────────────────────────────────────────────
// NOTE: In production, move this to a backend / serverless function.
// The API key below is intentionally left as a placeholder — set it in .env
// as REACT_APP_RESEND_API_KEY and replace the "to" address with your own.
async function sendReservationEmail(form) {
  const RESEND_API_KEY = process.env.REACT_APP_RESEND_API_KEY || 'YOUR_RESEND_API_KEY';

  const emailHtml = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f5f0e8;padding:48px 40px;border:1px solid #222;">
      <div style="text-align:center;margin-bottom:40px;">
        <div style="width:64px;height:64px;border:1px solid #d4af72;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:1.8rem;color:#d4af72;font-family:Georgia,serif;margin-bottom:16px;">M</div>
        <div style="font-family:Georgia,serif;font-size:1.3rem;color:#f5f0e8;letter-spacing:0.05em;">Melka International Hotel</div>
        <div style="font-size:0.6rem;letter-spacing:0.3em;text-transform:uppercase;color:#d4af72;margin-top:4px;">Addis Ababa · Ethiopia</div>
      </div>
      <h2 style="font-family:Georgia,serif;font-size:1.6rem;color:#d4af72;font-weight:400;margin-bottom:8px;">New Reservation Request</h2>
      <p style="color:#888;font-size:0.85rem;margin-bottom:32px;border-bottom:1px solid #222;padding-bottom:24px;">Submitted on ${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</p>

      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:10px 0;color:#888;font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;width:140px;">Guest Name</td><td style="padding:10px 0;color:#f5f0e8;font-size:0.88rem;">${form.firstName} ${form.lastName}</td></tr>
        <tr style="border-top:1px solid #1a1a1a;"><td style="padding:10px 0;color:#888;font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;">Email</td><td style="padding:10px 0;color:#f5f0e8;font-size:0.88rem;">${form.email}</td></tr>
        <tr style="border-top:1px solid #1a1a1a;"><td style="padding:10px 0;color:#888;font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;">Phone</td><td style="padding:10px 0;color:#f5f0e8;font-size:0.88rem;">${form.phone || '—'}</td></tr>
        <tr style="border-top:1px solid #1a1a1a;"><td style="padding:10px 0;color:#888;font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;">Room Type</td><td style="padding:10px 0;color:#d4af72;font-size:0.88rem;">${ROOM_TYPES.find(r => r.value === form.roomType)?.label || form.roomType}</td></tr>
        <tr style="border-top:1px solid #1a1a1a;"><td style="padding:10px 0;color:#888;font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;">Check In</td><td style="padding:10px 0;color:#f5f0e8;font-size:0.88rem;">${form.checkIn}</td></tr>
        <tr style="border-top:1px solid #1a1a1a;"><td style="padding:10px 0;color:#888;font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;">Check Out</td><td style="padding:10px 0;color:#f5f0e8;font-size:0.88rem;">${form.checkOut}</td></tr>
        <tr style="border-top:1px solid #1a1a1a;"><td style="padding:10px 0;color:#888;font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;">Guests</td><td style="padding:10px 0;color:#f5f0e8;font-size:0.88rem;">${form.guests}</td></tr>
        ${form.specialRequests ? `<tr style="border-top:1px solid #1a1a1a;"><td style="padding:10px 0;color:#888;font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;">Requests</td><td style="padding:10px 0;color:#f5f0e8;font-size:0.88rem;">${form.specialRequests}</td></tr>` : ''}
      </table>

      <div style="margin-top:40px;padding:24px;background:#141414;border:1px solid #222;text-align:center;">
        <p style="color:#888;font-size:0.78rem;line-height:1.8;">Please respond to this reservation within 24 hours. Contact the guest at <a href="mailto:${form.email}" style="color:#d4af72;">${form.email}</a>.</p>
      </div>
      <p style="text-align:center;color:#444;font-size:0.65rem;margin-top:32px;letter-spacing:0.1em;">MELKA INTERNATIONAL HOTEL · CHURCHILL AVENUE · ADDIS ABABA, ETHIOPIA</p>
    </div>
  `;

  const guestHtml = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f5f0e8;padding:48px 40px;border:1px solid #222;">
      <div style="text-align:center;margin-bottom:40px;">
        <div style="width:64px;height:64px;border:1px solid #d4af72;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:1.8rem;color:#d4af72;margin-bottom:16px;">M</div>
        <div style="font-size:1.3rem;color:#f5f0e8;">Melka International Hotel</div>
        <div style="font-size:0.6rem;letter-spacing:0.3em;text-transform:uppercase;color:#d4af72;margin-top:4px;">Addis Ababa · Ethiopia</div>
      </div>
      <h2 style="font-family:Georgia,serif;font-size:1.8rem;color:#d4af72;font-weight:400;margin-bottom:16px;">Thank You, ${form.firstName}.</h2>
      <p style="color:#888;font-size:0.88rem;line-height:1.8;margin-bottom:32px;">
        Your reservation request has been received. Our team will review your request and confirm your booking within 24 hours via email or phone.
      </p>
      <div style="background:#141414;border:1px solid #d4af72;padding:32px;margin-bottom:32px;">
        <h3 style="font-size:0.65rem;letter-spacing:0.3em;text-transform:uppercase;color:#d4af72;margin-bottom:20px;">Reservation Summary</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#888;font-size:0.75rem;width:120px;">Room</td><td style="padding:8px 0;color:#f5f0e8;font-size:0.82rem;">${ROOM_TYPES.find(r => r.value === form.roomType)?.label.split(' — ')[0] || form.roomType}</td></tr>
          <tr style="border-top:1px solid #1a1a1a;"><td style="padding:8px 0;color:#888;font-size:0.75rem;">Check In</td><td style="padding:8px 0;color:#f5f0e8;font-size:0.82rem;">${form.checkIn}</td></tr>
          <tr style="border-top:1px solid #1a1a1a;"><td style="padding:8px 0;color:#888;font-size:0.75rem;">Check Out</td><td style="padding:8px 0;color:#f5f0e8;font-size:0.82rem;">${form.checkOut}</td></tr>
          <tr style="border-top:1px solid #1a1a1a;"><td style="padding:8px 0;color:#888;font-size:0.75rem;">Guests</td><td style="padding:8px 0;color:#f5f0e8;font-size:0.82rem;">${form.guests}</td></tr>
        </table>
      </div>
      <p style="color:#888;font-size:0.78rem;line-height:1.8;text-align:center;">
        Questions? Call us at <strong style="color:#f5f0e8;">+251 11 XXX XXXX</strong> or email <a href="mailto:info@melkainternationalhotel.com" style="color:#d4af72;">info@melkainternationalhotel.com</a>
      </p>
      <p style="text-align:center;color:#444;font-size:0.65rem;margin-top:32px;letter-spacing:0.1em;">MELKA INTERNATIONAL HOTEL · CHURCHILL AVENUE · ADDIS ABABA, ETHIOPIA</p>
    </div>
  `;

  // Send hotel notification
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Melka Hotel Reservations <reservations@melkainternationalhotel.com>',
      to: ['info@melkainternationalhotel.com'],
      subject: `New Reservation Request — ${form.firstName} ${form.lastName}`,
      html: emailHtml,
    }),
  });

  // Send guest confirmation
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Melka International Hotel <reservations@melkainternationalhotel.com>',
      to: [form.email],
      subject: 'Your Reservation Request — Melka International Hotel',
      html: guestHtml,
    }),
  });
}

const ReservationPage = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ref = useReveal();

  const today = new Date().toISOString().split('T')[0];

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.roomType || !form.checkIn || !form.checkOut) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (form.checkOut <= form.checkIn) {
      toast.error('Check-out must be after check-in.');
      return;
    }
    setLoading(true);
    try {
      await sendReservationEmail(form);
      setSubmitted(true);
      toast.success('Reservation sent! Check your email for confirmation.');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url(${pageHeroBg})` }} />
        <div className="page-hero-content">
          <div className="page-hero-eyebrow">Book Your Stay</div>
          <h1 className="page-hero-title">Reservations</h1>
        </div>
      </div>

      <section className="reserve-section">
        <div ref={ref} className="reveal">
          <div className="section-eyebrow">Secure Your Room</div>
          <h2 className="section-title">Make a <em>Reservation</em></h2>
          <p className="section-body">
            Complete the form below and our team will confirm your booking within 24 hours. Complimentary breakfast and free WiFi are included with every stay.
          </p>
        </div>

        {submitted ? (
          <div style={{
            marginTop: 64, padding: '80px 48px', background: 'var(--black-card)',
            border: '1px solid var(--gold)', textAlign: 'center'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <CheckCircle size={56} color="var(--gold)" strokeWidth={1} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--cream)', marginBottom: 16 }}>
              Request <em>Received</em>
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--gray)', lineHeight: 1.9, maxWidth: 480, margin: '0 auto 32px' }}>
              Thank you, {form.firstName}. We have received your reservation request and will confirm your booking within 24 hours at <strong style={{ color: 'var(--cream)' }}>{form.email}</strong>.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); }}
              className="btn-secondary"
              style={{ background: 'none', border: '1px solid rgba(245,240,232,0.3)', padding: '14px 36px', fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream)', cursor: 'none' }}
            >
              New Reservation
            </button>
          </div>
        ) : (
          <form className="reserve-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Your first name" className="form-control" required />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Your last name" className="form-control" required />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="form-control" required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+251 …" className="form-control" />
            </div>
            <div className="form-group full">
              <label className="form-label">Room Type *</label>
              <select name="roomType" value={form.roomType} onChange={handleChange} className="form-control" required>
                <option value="">Select a room type…</option>
                {ROOM_TYPES.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Check-In Date *</label>
              <input name="checkIn" type="date" value={form.checkIn} onChange={handleChange} className="form-control" min={today} required />
            </div>
            <div className="form-group">
              <label className="form-label">Check-Out Date *</label>
              <input name="checkOut" type="date" value={form.checkOut} onChange={handleChange} className="form-control" min={form.checkIn || today} required />
            </div>
            <div className="form-group">
              <label className="form-label">Number of Guests *</label>
              <select name="guests" value={form.guests} onChange={handleChange} className="form-control" required>
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div className="form-group full">
              <label className="form-label">Special Requests</label>
              <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} placeholder="Dietary requirements, bed preferences, accessibility needs, early check-in, late check-out…" className="form-control" />
            </div>
            <div className="form-submit">
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? <><Loader size={15} className="spin" /> Processing…</> : <>Submit Reservation <ArrowRight size={14} /></>}
              </button>
            </div>
            <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          </form>
        )}

        <div style={{ marginTop: 64, padding: '40px 48px', background: 'var(--black-card)', border: '1px solid var(--black-border)' }}>
          <div className="reserve-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, textAlign: 'center' }}>
            {[
              { label: 'Free Cancellation', sub: 'Up to 48 hours before arrival' },
              { label: 'Breakfast Included', sub: 'Continental, buffet or à la carte' },
              { label: 'Instant Confirmation', sub: 'Via email within 24 hours' },
            ].map(({ label, sub }) => (
              <div key={label}>
                <CheckCircle size={20} color="var(--gold)" style={{ marginBottom: 12 }} />
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--cream)', marginBottom: 6 }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--gray)' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReservationPage;
