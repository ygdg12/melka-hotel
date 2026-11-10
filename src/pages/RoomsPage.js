import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Bed } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import { ROOM_IMAGES } from '../utils/images';
import { ROOMS_DATA, calculateRoomPrice } from '../data/roomsData';

const pageHeroBg = ROOM_IMAGES.familySuite;

function RevealSection({ children, className = '' }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

const RoomsPage = () => {
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

        </RevealSection>

        <div className="rooms-page-grid" style={{ marginTop: 48 }}>
          {ROOMS_DATA.map((room, i) => {
            const pricing = calculateRoomPrice(room, 1);
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
                        to={`/reserve?room=${room.id}`} 
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

