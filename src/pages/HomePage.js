import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Star, Car, Utensils, Dumbbell,
  Coffee, ConciergeBell, Waves, Wind
} from 'lucide-react';
import useReveal from '../hooks/useReveal';
import { PHOTOS } from '../utils/images';

const ROOMS = [
  {
    tag: 'Standard',
    title: 'Standard Single',
    price: '4,999 ETB',
    desc: 'Max 1 guest · Single Bed',
    img: PHOTOS.rooms[0],
  },
  {
    tag: 'Signature',
    title: 'Standard Delux',
    price: '5,999 ETB',
    desc: 'Max 2 guests · Single Bed',
    img: PHOTOS.rooms[1],
  },
  {
    tag: 'Premium',
    title: 'Double Delux',
    price: '6,999 ETB',
    desc: 'Max 4 guests · Twin Bed',
    img: PHOTOS.rooms[2],
  },
];

const AMENITIES = [
  { icon: Utensils, title: 'Fine Dining', desc: 'Locally-sourced cuisine crafted by world-class chefs with authentic Ethiopian flair and international elegance.' },
  { icon: Waves, title: 'Spa & Wellness', desc: 'Full-service spa with body wraps, facials, sauna, and rejuvenating treatments for mind and body.' },
  { icon: Dumbbell, title: 'Fitness Center', desc: 'State-of-the-art gym open around the clock, with personal training available on request.' },
  { icon: Wind, title: 'Rooftop Bar', desc: 'Panoramic views of Addis Ababa from our top-floor open terrace — the perfect spot for sundowners.' },
  { icon: Coffee, title: 'Coffee Lounge', desc: "Ethiopian coffee culture at its finest — ceremony, specialty brews, and freshly baked pastries daily." },
  { icon: ConciergeBell, title: '24h Concierge', desc: 'Our dedicated team is available day and night to ensure every request is met with precision.' },
  { icon: Car, title: 'Airport Shuttle', desc: 'Complimentary airport pickup and drop-off — enjoy a seamless arrival and departure from Bole International Airport.' },
  { icon: Car, title: 'Free Parking', desc: 'Secure on-site private parking with valet service available for guests arriving by vehicle.' },
];

const TESTIMONIALS = [
  {
    text: 'I have been to a few hotels in Addis, and I can honestly say this was one of the best experiences I have gotten. The food was great, coffee was to die for, and the customer service was top class.',
    name: 'James O.',
    origin: 'Nairobi, Kenya',
  },
  {
    text: 'Great customer service. Great view from the balcony. I loved sipping the coffee and reading books there. The staff went out of their way to accommodate every request.',
    name: 'Sarah M.',
    origin: 'London, UK',
  },
  {
    text: 'Positively surprised! Pleasant rooms, plentiful breakfast, central location. What impressed me most was the very service-oriented staff — always helpful and friendly.',
    name: 'Thomas K.',
    origin: 'Berlin, Germany',
  },
];

const aboutImgs = [PHOTOS.rooms[3], PHOTOS.rooms[4]];
const ctaImg = PHOTOS.cta;
const GALLERY = [
  { src: PHOTOS.gallery[0], alt: 'Hotel exterior' },
  { src: PHOTOS.gallery[1], alt: 'Deluxe room' },
  { src: PHOTOS.gallery[2], alt: 'Fine dining' },
  { src: PHOTOS.gallery[3], alt: 'Fitness center' },
  { src: PHOTOS.gallery[4], alt: 'Gym equipment' },
  { src: PHOTOS.gallery[5], alt: 'Cardio area' },
  { src: PHOTOS.gallery[6], alt: 'Lounge area' },
  { src: PHOTOS.gallery[7], alt: 'Coffee lounge' },
];

function RevealSection({ children, className = '', style = {} }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
}

const HomePage = () => {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 30%, rgba(10,10,10,0.6) 70%, rgba(10,10,10,0.85) 100%), url(${PHOTOS.hero})` }} />
        <div className="hero-content">
          <div className="hero-eyebrow">4-Star Luxury · Addis Ababa, Ethiopia</div>
          <h1 className="hero-title">
            Where Luxury<br /><em>Meets Culture</em>
          </h1>
          <p className="hero-subtitle">Churchill Avenue · Arada District</p>
          <div className="hero-actions">
            <Link to="/reserve" className="btn-primary">
              Reserve Your Stay <ArrowRight size={14} />
            </Link>
            <Link to="/rooms" className="btn-secondary">
              Explore Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section">
        <div className="about-grid">
          <RevealSection>
            <div className="about-image-stack">
              <img
                src={aboutImgs[0]}
                alt="Deluxe Suite"
                className="about-img-main"
              />
              <img
                src={aboutImgs[1]}
                alt="Premium Room"
                className="about-img-secondary"
              />
              <div className="about-badge">
                <span className="about-badge-num">4★</span>
                <span className="about-badge-text">Luxury<br />Hotel</span>
              </div>
            </div>
          </RevealSection>

          <RevealSection className="reveal-delay-2">
            <div className="section-eyebrow">About Us</div>
            <h2 className="section-title">
              A Legacy of<br /><em>Ethiopian Hospitality</em>
            </h2>
            <p className="section-body">
              Nestled in the vibrant heart of Arada, Addis Ababa, Melka International Hotel is a four-star sanctuary where authentic Ethiopian warmth meets world-class luxury. Just a 4-minute walk from the iconic Derg Monument and moments from the National Palace, we offer an unrivalled address for discerning travellers.
            </p>
            <p className="section-body" style={{ marginTop: 20 }}>
              Our individually furnished rooms and suites, our award-winning restaurant, rooftop bar, full-service spa, and dedicated team combine to create an experience that is as memorable as the city itself.
            </p>
            <div className="about-stats">
              {[
                { num: '4★', label: 'Star Rating' },
                { num: '24h', label: 'Concierge' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="about-stat-num">{num}</div>
                  <div className="about-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ROOMS */}
      <section className="section" style={{ paddingBottom: 120 }}>
        <RevealSection>
          <div className="section-eyebrow">Accommodations</div>
          <div className="rooms-header-row" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h2 className="section-title">Rooms &amp; <em>Suites</em></h2>
            <Link to="/rooms" className="btn-secondary" style={{ marginBottom: 24, flexShrink: 0 }}>
              View All Rooms <ArrowRight size={13} />
            </Link>
          </div>
        </RevealSection>
        <div className="rooms-grid" style={{ marginTop: 64 }}>
          {ROOMS.map((room, i) => (
            <RevealSection key={room.title} className={`reveal-delay-${i + 1}`}>
              <div className="room-card">
                <img src={room.img} alt={room.title} className="room-card-img" loading="lazy" />
                <div className="room-card-overlay">
                  <div className="room-card-tag">{room.tag}</div>
                  <div className="room-card-title">{room.title}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--gray)', marginBottom: 12 }}>{room.desc}</div>
                  <div className="room-card-price">
                    <span className="room-card-price-num">{room.price}</span>
                    <span className="room-card-price-per">/ night</span>
                  </div>
                  <Link to="/reserve" className="room-card-link">
                    Reserve <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* AMENITIES */}
      <section className="amenities-section">
        <div className="amenities-inner">
          <RevealSection>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 0 }}>
              <div>
                <div className="section-eyebrow">Services</div>
                <h2 className="section-title">World-Class <em>Amenities</em></h2>
              </div>
              <Link to="/amenities" className="btn-secondary" style={{ marginBottom: 24, whiteSpace: 'nowrap' }}>
                All Amenities <ArrowRight size={13} />
              </Link>
            </div>
          </RevealSection>
          <div className="amenities-grid">
            {AMENITIES.map(({ icon: Icon, title, desc }, i) => (
              <RevealSection key={title} className={`reveal-delay-${(i % 4) + 1}`}>
                <div className="amenity-card">
                  <div className="amenity-icon">
                    <Icon size={20} />
                  </div>
                  <div className="amenity-title">{title}</div>
                  <p className="amenity-desc">{desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section" style={{ paddingTop: 120 }}>
        <div className="gallery-title-row">
          <RevealSection>
            <div className="section-eyebrow">Gallery</div>
            <h2 className="section-title">A Glimpse of <em>Melka</em></h2>
          </RevealSection>
        </div>
        <div className="gallery-grid">
          {GALLERY.map((item, i) => (
            <div key={i} className="gallery-item">
              <img src={item.src} alt={item.alt} loading="lazy" />
              <div className="gallery-item-overlay" />
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <RevealSection>
          <div className="section-eyebrow">Guest Reviews</div>
          <h2 className="section-title">What Our <em>Guests Say</em></h2>
        </RevealSection>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <RevealSection key={i} className={`reveal-delay-${i + 1}`}>
              <div className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="var(--gold)" color="var(--gold)" />)}
                </div>
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-origin">{t.origin}</div>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-section" style={{ position: 'relative', overflow: 'hidden', margin: '0 60px 120px', minHeight: 400, display: 'flex', alignItems: 'center' }}>
        <div className="cta-bg" style={{
          position: 'absolute', inset: 0,
          '--cta-img': `url(${ctaImg})`,
          background: `linear-gradient(to right, rgba(10,10,10,0.95) 40%, rgba(10,10,10,0.5) 100%), var(--cta-img) center/cover`
        }} />
        <div className="cta-content" style={{ position: 'relative', zIndex: 2, padding: '80px 80px' }}>
          <RevealSection>
            <div className="section-eyebrow">Limited Availability</div>
            <h2 className="section-title" style={{ maxWidth: 500 }}>
              Begin Your <em>Unforgettable</em> Stay Today
            </h2>
            <p className="section-body" style={{ marginBottom: 40 }}>
              Complimentary continental breakfast, free WiFi, and curated concierge services — included with every reservation.
            </p>
            <Link to="/reserve" className="btn-primary">
              Reserve Now <ArrowRight size={14} />
            </Link>
          </RevealSection>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
