import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Bed, Globe, MapPin } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import { ROOM_IMAGES } from '../utils/images';
import { ROOMS_DATA, calculateRoomPrice } from '../data/roomsData';

const pageHeroBg = ROOM_IMAGES.familySuite;

function RevealSection({ children, className = '' }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

const RoomsPage = () => {
  const [guestType, setGuestType] = useState('local'); // 'local' | 'international'
  const isInternational = guestType === 'international';

  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url(${pageHeroBg})` }} />
        <div className="page-hero-content">
          <div className="page-hero-eyebrow">Accommodations</div>
          <h1 className="page-hero-title">Rooms &amp; Suites</h1>
        </div>
      </div>

      <section className="section">
        <RevealSection>
          <div className="section-eyebrow">Our Collection</div>
          <h2 className="section-title">Find Your Perfect <em>Retreat</em></h2>
          <p className="section-body">
            Pick any of our hotel rooms to experience the delightful decor, complemented with modern amenities for a comfortable stay.
          </p>

          {/* Elegant Guest Category / Rate Switcher */}
          <div className="rate-switcher-wrapper">
            <div className="rate-switcher">
              <button
                type="button"
                className={`rate-switcher-btn ${!isInternational ? 'active' : ''}`}
                onClick={() => setGuestType('local')}
              >
                <MapPin size={14} /> Local Guest
                <span className="rate-switcher-badge">ETB</span>
              </button>
              <button
                type="button"
                className={`rate-switcher-btn ${isInternational ? 'active' : ''}`}
                onClick={() => setGuestType('international')}
              >
                <Globe size={14} /> International Guest
                <span className="rate-switcher-badge">USD</span>
              </button>
            </div>

            <div className="rate-info-banner">
              {!isInternational ? (
                <span>🇪🇹 <strong>Local Direct Booking Rates (in Birr):</strong> Special rates for domestic guests &amp; residents. Includes free breakfast.</span>
              ) : (
                <span>🌐 <strong>International Booking Rates (in USD):</strong> Rates for international travellers. Standard/Deluxe single includes 1 guest (+$15 USD for 2nd guest). Double/Twin includes 2 guests. Family/Triple includes 3 guests.</span>
              )}
            </div>
          </div>
        </RevealSection>

        <div className="rooms-page-grid" style={{ marginTop: 48 }}>
          {ROOMS_DATA.map((room, i) => {
            const pricing = calculateRoomPrice(room, isInternational, 1);
            return (
              <RevealSection key={room.id} className={`reveal-delay-${(i % 2) + 1}`}>
                <div className="room-detail-card">
                  <div style={{ overflow: 'hidden' }}>
                    <img src={room.img} alt={room.title} className="room-detail-img" loading="lazy" />
                  </div>
                  <div className="room-detail-body">
                    <div className="room-detail-tag">{room.tag}</div>
                    <h3 className="room-detail-title">{room.title}</h3>
                    <p className="room-detail-desc">{room.desc}</p>

                    <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Users size={14} color="var(--gold)" />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--gray)' }}>{room.capacityDesc}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Bed size={14} color="var(--gold)" />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--gray)' }}>{room.bed}</span>
                      </div>
                    </div>

                    <div className="room-detail-features">
                      {room.services.map(s => (
                        <span key={s} className="room-feature-tag">{s}</span>
                      ))}
                    </div>

                    <div className="room-detail-footer">
                      <div className="room-detail-price">
                        {pricing.formattedPrice} <span>/ night</span>
                        <div style={{ fontSize: '0.65rem', color: 'var(--gray)', fontWeight: 400, marginTop: 4 }}>
                          {pricing.baseNote}
                        </div>
                      </div>
                      <Link 
                        to={`/reserve?room=${room.id}&guestType=${guestType}`} 
                        className="btn-primary" 
                        style={{ padding: '12px 24px', flexShrink: 0 }}
                      >
                        Book Now <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </RevealSection>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default RoomsPage;

