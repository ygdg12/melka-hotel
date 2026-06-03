import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Maximize, Wifi, Wind, Tv, Coffee, CheckCircle } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import { shuffleImgs, randomImg } from '../utils/images';

const roomImgs = shuffleImgs(6);
const pageHeroBg = randomImg();

const ROOMS = [
  {
    tag: 'Standard',
    title: 'Standard Single Room',
    desc: 'Thoughtfully furnished with city views, a flat-screen TV with satellite channels, air conditioning, and a private bathroom. Perfect for solo travellers.',
    price: 59,
    size: '28 m²',
    guests: 1,
    img: roomImgs[0],
    features: ['City View', 'Air Conditioning', 'Free WiFi', 'Flat-screen TV', 'Safety Deposit Box', 'Room Service'],
  },
  {
    tag: 'Signature',
    title: 'Deluxe City View Room',
    desc: 'An elevated room experience with sweeping city panoramas, balcony access, a king-size bed, premium linens, and curated Ethiopian art.',
    price: 89,
    size: '35 m²',
    guests: 2,
    img: roomImgs[1],
    features: ['Balcony', 'City Panorama', 'King Bed', 'Free WiFi', 'Mini Fridge', 'Tea & Coffee Maker'],
  },
  {
    tag: 'Premium',
    title: 'Junior Suite',
    desc: 'A spacious retreat featuring a separate sitting area, fireplace, premium toiletries, and a work desk — ideal for extended stays and business travellers.',
    price: 119,
    size: '48 m²',
    guests: 2,
    img: roomImgs[2],
    features: ['Sitting Area', 'Fireplace', 'Work Desk', 'Bathtub', 'Complimentary Minibar', 'Laptop Safe'],
  },
  {
    tag: 'Premium',
    title: 'Executive Suite',
    desc: 'Luxuriously appointed with a private lounge, wraparound balcony with panoramic views, a rainfall shower, and complimentary access to the manager\'s daily reception.',
    price: 149,
    size: '65 m²',
    guests: 2,
    img: roomImgs[3],
    features: ['Private Lounge', 'Wraparound Balcony', 'Rainfall Shower', 'Daily Manager Reception', 'Priority Service', 'King Bed'],
  },
  {
    tag: 'Family',
    title: 'Family Connecting Room',
    desc: 'Two adjoining rooms with a shared door — perfect for families. Features child-friendly amenities, extra beds, and supervised childcare services on request.',
    price: 139,
    size: '70 m²',
    guests: 4,
    img: roomImgs[4],
    features: ['Two Adjoining Rooms', 'Extra Beds', 'Free WiFi', 'Childcare Available', 'City View', 'Mini Fridge'],
  },
  {
    tag: 'Prestige',
    title: 'Royal Penthouse Suite',
    desc: 'The crown jewel of Melka — a full-floor penthouse with 360° Addis Ababa views, a private dining room, dedicated butler, bespoke interiors, and exclusive spa access.',
    price: 249,
    size: '120 m²',
    guests: 2,
    img: roomImgs[5],
    features: ['360° Panoramic Views', 'Private Dining Room', 'Dedicated Butler', 'Exclusive Spa Access', 'Jacuzzi', 'Home Theater'],
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
          88 individually furnished rooms and suites, each designed to blend authentic Ethiopian character with the finest modern comforts. Every stay includes complimentary breakfast and free WiFi.
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

                <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Users size={14} color="var(--gold)" />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--gray)' }}>{room.guests} Guest{room.guests > 1 ? 's' : ''}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Maximize size={14} color="var(--gold)" />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--gray)' }}>{room.size}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Wifi size={14} color="var(--gold)" />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--gray)' }}>Free WiFi</span>
                  </div>
                </div>

                <div className="room-detail-features">
                  {room.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <CheckCircle size={11} color="var(--gold)" />
                      <span className="room-feature-tag">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="room-detail-footer">
                  <div className="room-detail-price">
                    ${room.price} <span>/ night</span>
                  </div>
                  <Link to="/reserve" className="btn-primary" style={{ padding: '12px 28px' }}>
                    Reserve <ArrowRight size={13} />
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
