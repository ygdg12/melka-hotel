import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import useReveal from '../hooks/useReveal';
import { sendEmail, buildReservationEmail } from '../utils/sendEmail';

const ROOM_TYPES = [
  { value: 'standard-single', label: 'Standard Single — from $40/night' },
  { value: 'standard-delux', label: 'Standard Delux — from $50/night' },
  { value: 'double-delux', label: 'Double Delux — from $55/night' },
  { value: 'twin-delux', label: 'Twin Delux — from $65/night' },
  { value: 'triple-deluxe-suite', label: 'Triple Deluxe Suite — from $90/night' },
  { value: 'family-suite', label: 'Family Suite — from $80/night' },
];

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  roomType: '',
  checkIn: '',
  checkOut: '',
  guests: '2',
};

function RevealSection({ children, className = '' }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
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
    if (!form.fullName || !form.email || !form.roomType || !form.checkIn || !form.checkOut) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (form.checkOut <= form.checkIn) {
      toast.error('Check-out must be after check-in.');
      return;
    }
    setLoading(true);
    try {
      // Find the human-readable label for the room type
      const roomLabel = ROOM_TYPES.find(r => r.value === form.roomType)?.label || form.roomType;
      await sendEmail({
        subject: `[Reservation] ${form.fullName} — ${roomLabel}`,
        html: buildReservationEmail({ ...form, roomType: roomLabel }),
      });
      setSubmitted(true);
      toast.success('Reservation submitted! We will confirm within 24 hours.');
    } catch (err) {
      console.error('Resend error:', err);
      toast.error('Failed to submit reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="section">
        <div ref={ref} className="reveal">
          <div className="section-eyebrow">Secure Your Room</div>
          <h2 className="section-title">Make a <em>Reservation</em></h2>
          <p className="section-body">
            Complete the form below and our team will confirm your booking within 24 hours.
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
              Thank you, {form.fullName.split(' ')[0]}. We will confirm your reservation at <strong style={{ color: 'var(--cream)' }}>{form.email}</strong> within 24 hours.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); }}
              className="btn-secondary"
              style={{ background: 'none', border: '1px solid rgba(245,240,232,0.3)', padding: '14px 36px', fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream)', cursor: 'pointer' }}
            >
              New Reservation
            </button>
          </div>
        ) : (
          <form className="reserve-form" onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto' }}>
            <div className="form-group full">
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Full Name *</label>
              <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" className="form-control" style={{ padding: '10px 14px', fontSize: '0.82rem' }} required />
            </div>
            <div className="form-group full">
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Email Address *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="form-control" style={{ padding: '10px 14px', fontSize: '0.82rem' }} required />
            </div>
            <div className="form-group full">
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+251 …" className="form-control" style={{ padding: '10px 14px', fontSize: '0.82rem' }} />
            </div>
            <div className="form-group full">
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Room Type *</label>
              <select name="roomType" value={form.roomType} onChange={handleChange} className="form-control" style={{ padding: '10px 14px', fontSize: '0.82rem' }} required>
                <option value="">Select a room type…</option>
                {ROOM_TYPES.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Check-In *</label>
              <input name="checkIn" type="date" value={form.checkIn} onChange={handleChange} className="form-control" style={{ padding: '10px 14px', fontSize: '0.82rem' }} min={today} required />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Check-Out *</label>
              <input name="checkOut" type="date" value={form.checkOut} onChange={handleChange} className="form-control" style={{ padding: '10px 14px', fontSize: '0.82rem' }} min={form.checkIn || today} required />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Guests *</label>
              <select name="guests" value={form.guests} onChange={handleChange} className="form-control" style={{ padding: '10px 14px', fontSize: '0.82rem' }} required>
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div className="form-submit" style={{ marginTop: 32 }}>
              <button type="submit" className="btn-submit" disabled={loading} style={{ padding: '12px 32px', fontSize: '0.7rem' }}>
                {loading ? <><Loader size={13} className="spin" /> Processing…</> : <>Submit Reservation <ArrowRight size={12} /></>}
              </button>
            </div>
            <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          </form>
        )}
      </section>
    </main>
  );
};

export default ReservationPage;