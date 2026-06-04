import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Waves, Dumbbell, Wind, Coffee, ConciergeBell, Wifi, Car, Users, Sparkles, Bus, Shirt } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import { shuffleImgs, UNSPLASH } from '../utils/images';

const amenityImgs = shuffleImgs(5);
const pageHeroBg = UNSPLASH.spa;

const AMENITIES = [
  {
    icon: Utensils,
    title: 'Fine Dining Restaurant',
    desc: 'Our signature restaurant offers an unmatched dining experience utilizing the freshest locally-sourced ingredients, masterfully prepared by our professional chefs. With white tablecloths, candlelight, and impeccable service — every meal becomes an occasion.',
    img: amenityImgs[0],
  },
  {
    icon: Wind,
    title: 'Rooftop Bar & Terrace',
    desc: 'Perched atop the hotel, our open-air rooftop terrace offers sweeping panoramic views of Addis Ababa. Enjoy signature cocktails, fine Ethiopian tej (honey wine), and light bites as the city lights come alive at sunset.',
    img: amenityImgs[1],
  },
  {
    icon: Waves,
    title: 'Spa & Wellness Centre',
    desc: 'An oasis of tranquility — our full-service spa offers body wraps, revitalizing facials, deep-tissue massages, and traditional Ethiopian steam treatments. Surrender to total relaxation in our serene, elegantly appointed treatment rooms.',
    img: amenityImgs[2],
  },
  {
    icon: Dumbbell,
    title: 'Fitness Center',
    desc: 'Whether you\'re a morning person or a night owl, our state-of-the-art gym is open 24 hours. Featuring the latest cardio and strength equipment, with certified personal trainers available on request.',
    img: UNSPLASH.gym,
  },
  {
    icon: Coffee,
    title: 'Ethiopian Coffee Lounge',
    desc: 'Experience the world\'s finest coffee — at its source. Our lounge offers a daily Ethiopian coffee ceremony, specialty single-origin brews, fresh pastries, and a curated selection of teas in an intimate, warmly lit setting.',
    img: amenityImgs[3],
  },
  {
    icon: Users,
    title: 'Conference & Event Rooms',
    desc: 'We have different types of Syndicate Conference Rooms with full audio-visual accessories and closed halls. Perfect for corporate meetings, seminars, product launches, and private events of all sizes.',
    img: amenityImgs[4],
  },
];

const EXTRAS = [
  { icon: ConciergeBell, title: '24h Concierge' },
  { icon: Wifi, title: 'Free High-Speed WiFi' },
  { icon: Car, title: 'Free Private Parking' },
  { icon: Bus, title: 'Airport Shuttle' },
  { icon: Shirt, title: 'Laundry Service' },
  { icon: Sparkles, title: 'Daily Housekeeping' },
];

function RevealSection({ children, className = '' }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

const AmenitiesPage = () => (
  <main>
      <div className="page-hero">
      <div className="page-hero-bg" style={{ backgroundImage: `url(${pageHeroBg})` }} />
      <div className="page-hero-content">
        <div className="page-hero-eyebrow">Services</div>
        <h1 className="page-hero-title">Amenities &amp; Experiences</h1>
      </div>
    </div>

    <section className="section">
      <RevealSection>
        <div className="section-eyebrow">Everything You Need</div>
        <h2 className="section-title">All Under <em>One Roof</em></h2>
        <p className="section-body">
          If you are looking for a relaxing, refreshing, and rejuvenating experience altogether — we offer all of that under one roof at Melka International Hotel.
        </p>
      </RevealSection>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 80, marginTop: 80 }}>
        {AMENITIES.map((item, i) => {
          const Icon = item.icon;
          const isEven = i % 2 === 0;
          return (
            <RevealSection key={item.title}>
              <div className="amenity-detail-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 64,
                alignItems: 'center',
                direction: isEven ? 'ltr' : 'rtl',
              }}>
                <div className="amenity-detail-img" style={{ overflow: 'hidden', height: 380 }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', direction: 'ltr', transition: 'transform 0.6s ease' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                <div className="amenity-detail-body" style={{ direction: 'ltr', padding: isEven ? '0 0 0 20px' : '0 20px 0 0' }}>
                  <div style={{
                    width: 52, height: 52, border: '1px solid var(--black-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--gold)', marginBottom: 24
                  }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--cream)', marginBottom: 16, lineHeight: 1.2 }}>{item.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--gray)', lineHeight: 1.9 }}>{item.desc}</p>
                </div>
              </div>
            </RevealSection>
          );
        })}
      </div>

      <RevealSection>
        <div style={{ marginTop: 100, padding: '64px', background: 'var(--black-card)', border: '1px solid var(--black-border)' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Included For All Guests</div>
            <h3 className="section-title" style={{ textAlign: 'center' }}>Additional <em>Services</em></h3>
          </div>
          <div className="amenities-extras-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {EXTRAS.map(({ icon: Icon, title }) => (
              <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', border: '1px solid var(--black-border)' }}>
                <Icon size={18} color="var(--gold)" />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--cream)', letterSpacing: '0.05em' }}>{title}</span>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection>
        <div style={{ textAlign: 'center', marginTop: 80 }}>
          <Link to="/reserve" className="btn-primary">
            Book Your Stay <ArrowRight size={14} />
          </Link>
        </div>
      </RevealSection>
    </section>
  </main>
);

export default AmenitiesPage;
