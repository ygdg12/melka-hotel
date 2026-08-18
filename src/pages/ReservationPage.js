import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle, Loader, MapPin, Globe } from 'lucide-react';
import toast from 'react-hot-toast';
import useReveal from '../hooks/useReveal';
import { sendEmail, buildReservationEmail } from '../utils/sendEmail';
import { ROOMS_DATA, calculateRoomPrice } from '../data/roomsData';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  roomType: '',
  checkIn: '',
  checkOut: '',
  guests: '1',
};

const ReservationPage = () => {
  const location = useLocation();
  const [form, setForm] = useState(INITIAL_FORM);
  const [guestType, setGuestType] = useState('local'); // 'local' | 'international'
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ref = useReveal();

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roomParam = queryParams.get('room');
    const guestTypeParam = queryParams.get('guestType');

    if (guestTypeParam === 'international' || guestTypeParam === 'local') {
      setGuestType(guestTypeParam);
    }
    if (roomParam && ROOMS_DATA.some(r => r.id === roomParam)) {
      setForm(f => ({ ...f, roomType: roomParam }));
    }
  }, [location.search]);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const isInternational = guestType === 'international';
  const selectedRoom = ROOMS_DATA.find(r => r.id === form.roomType);

  // Compute nights
  let nights = 0;
  if (form.checkIn && form.checkOut) {
    const checkInDate = new Date(form.checkIn);
    const checkOutDate = new Date(form.checkOut);
    const diffTime = checkOutDate - checkInDate;
    if (diffTime > 0) {
      nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }

  // Compute pricing
  const priceInfo = selectedRoom ? calculateRoomPrice(selectedRoom, isInternational, form.guests) : null;
  const totalStayPrice = (priceInfo && nights > 0) ? priceInfo.price * nights : null;
  const formattedTotalStay = totalStayPrice !== null 
    ? (isInternational ? `$${totalStayPrice} USD` : `${totalStayPrice.toLocaleString()} ETB`)
    : null;

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
      const roomLabel = selectedRoom ? selectedRoom.title : form.roomType;
      await sendEmail({
        subject: `[Reservation] ${form.fullName} — ${roomLabel}`,
        html: buildReservationEmail({
          ...form,
          roomType: roomLabel,
          guestTypeLabel: isInternational ? 'International Guest (USD)' : 'Local Guest (ETB)',
          nightlyRate: priceInfo ? priceInfo.formattedPrice : '—',
          rateBreakdown: priceInfo ? priceInfo.breakdownText : '',
          nights: nights > 0 ? nights : '—',
          totalStayPrice: formattedTotalStay || '—',
        }),
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
          <form className="reserve-form" onSubmit={handleSubmit} style={{ maxWidth: 650, margin: '0 auto' }}>
            
            {/* Guest Category / Currency Selector */}
            <div className="form-group full" style={{ marginBottom: 24 }}>
              <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: 8, display: 'block' }}>Guest Category *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <button
                  type="button"
                  className={`rate-switcher-btn ${!isInternational ? 'active' : ''}`}
                  onClick={() => setGuestType('local')}
                  style={{ justifyContent: 'center', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--gold)' }}
                >
                  <MapPin size={14} /> Local Guest (ETB)
                </button>
                <button
                  type="button"
                  className={`rate-switcher-btn ${isInternational ? 'active' : ''}`}
                  onClick={() => setGuestType('international')}
                  style={{ justifyContent: 'center', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--gold)' }}
                >
                  <Globe size={14} /> International Guest (USD)
                </button>
              </div>
            </div>

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
                {ROOMS_DATA.map(r => {
                  const p = calculateRoomPrice(r, isInternational, form.guests);
                  return (
                    <option key={r.id} value={r.id}>
                      {r.title} — {p.formattedPrice} / night
                    </option>
                  );
                })}
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

            <div className="form-group full">
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Number of Guests *</label>
              <select name="guests" value={form.guests} onChange={handleChange} className="form-control" style={{ padding: '10px 14px', fontSize: '0.82rem' }} required>
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                ))}
              </select>
              {selectedRoom && isInternational && parseInt(form.guests, 10) > selectedRoom.intlBaseGuests && (
                <div style={{ fontSize: '0.7rem', color: 'var(--gold)', marginTop: 6 }}>
                  ℹ Includes {selectedRoom.intlBaseGuests} guest{selectedRoom.intlBaseGuests > 1 ? 's' : ''}. Additional guests are charged +$15 USD/person.
                </div>
              )}
            </div>

            {/* Dynamic Booking Summary Box */}
            {selectedRoom && priceInfo && (
              <div className="form-group full">
                <div className="booking-summary-card">
                  <div className="booking-summary-header">
                    <span>Rate Breakdown</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>{isInternational ? 'International (USD)' : 'Local Direct (ETB)'}</span>
                  </div>
                  <div className="booking-summary-row">
                    <span>Room:</span>
                    <strong>{selectedRoom.title}</strong>
                  </div>
                  <div className="booking-summary-row">
                    <span>Occupancy:</span>
                    <strong>{form.guests} Guest{parseInt(form.guests, 10) > 1 ? 's' : ''}</strong>
                  </div>
                  <div className="booking-summary-row">
                    <span>Pricing Note:</span>
                    <span style={{ color: 'var(--cream)', fontSize: '0.78rem' }}>{priceInfo.breakdownText}</span>
                  </div>
                  <div className="booking-summary-row">
                    <span>Nightly Rate:</span>
                    <strong style={{ color: 'var(--gold)', fontSize: '0.95rem' }}>{priceInfo.formattedPrice} / night</strong>
                  </div>

                  {nights > 0 && (
                    <>
                      <div className="booking-summary-row">
                        <span>Duration:</span>
                        <strong>{nights} Night{nights > 1 ? 's' : ''}</strong>
                      </div>
                      <div className="booking-summary-total">
                        <span className="booking-summary-total-label">Estimated Total Stay:</span>
                        <span className="booking-summary-total-price">{formattedTotalStay}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="form-submit" style={{ marginTop: 32 }}>
              <button type="submit" className="btn-submit" disabled={loading} style={{ padding: '14px 36px', fontSize: '0.7rem' }}>
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