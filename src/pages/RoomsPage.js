import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Bed, Wifi, Tv, Bath } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import { shuffleImgs, UNSPLASH } from '../utils/images';

const roomImgs = shuffleImgs(6);
const pageHeroBg = UNSPLASH.rooms[0];

const ROOMS = [
  {
    tag: 'Standard',
    title: 'Standard Single',
    desc: 'Pick any of our hotel rooms to experience the delightful decor, complemented with modern amenities for a comfortable stay.',
    capacity: 'Max 1 guest',
    bed: 'Single Bed',
    services: ['Wifi', 'Television', 'Bathroom'],
    price: 40,
    img: roomImgs[0],
  },
  {
    tag: 'Signature',
    title: 'Standard Delux',
    desc: 'Pick any of our hotel rooms to experience the delightful decor, complemented with modern amenities for a comfortable stay.',
    capacity: 'Max 2 guests',
    bed: 'Single Bed',
    services: ['Wifi', 'Television', 'Bathroom'],
    price: 50,
    img: roomImgs[1],
  },
  {
    tag: 'Premium',
    title: 'Double Delux',
    desc: 'Pick any of our hotel rooms to experience the delightful decor, complemented with modern amenities for a comfortable stay.',
    capacity: 'Max 4 guests',
    bed: 'Twin Bed',
    services: ['Wifi', 'Television', 'Bathroom'],
    price: 55,
    img: roomImgs[2],
  },
  {
    tag: 'Premium',
    title: 'Twin Delux',
    desc: 'Pick any of our hotel rooms to experience the delightful decor, complemented with modern amenities for a comfortable stay.',
    capacity: 'Max 4 guests',
    bed: 'Twin Bed',
    services: ['Wifi', 'Television', 'Bathroom'],
    price: 65,
    img: roomImgs[3],
  },
  {
    tag: 'Suite',
    title: 'Triple Deluxe Suite',
    desc: 'Pick any of our hotel rooms to experience the delightful decor, complemented with modern amenities for a comfortable stay.',
    capacity: 'Max 6 guests',
    bed: '3 Twin Beds',
    services: ['Wifi', 'Television', 'Bathroom'],
    price: 90,
    img: roomImgs[4],
  },
  {
    tag: 'Family',
    title: 'Family Suite',
    desc: 'Pick any of our hotel rooms to experience the delightful decor, complemented with modern amenities for a comfortable stay.',
    capacity: 'Max 5 guests',
    bed: 'Queen',
    services: ['Wifi', 'Television', 'Bathroom'],
    price: 80,
    img: roomImgs[5],
  },
];

function RevealSection({ children, className = '' }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

const RoomsPage = () => (
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

      <div className="rooms-page-grid" style={{ marginTop: 64 }}>
        {ROOMS.map((room, i) => (
          <RevealSection key={room.title} className={`reveal-delay-${(i % 2) + 1}`}>
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
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--gray)' }}>{room.capacity}</span>
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
                    ${room.price} <span>/ night</span>
                  </div>
                  <Link to="/reserve" className="btn-primary" style={{ padding: '12px 28px' }}>
                    Book Now <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  </main>
);

export default RoomsPage;
