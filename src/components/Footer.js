import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-logo-section">
        <div className="footer-logo-emblem">M</div>
        <div className="footer-logo-name">Melka International</div>
        <div className="footer-logo-sub">Hotel · Addis Ababa</div>
        <p className="footer-tagline">
          A sanctuary of luxury in the heart of Addis Ababa — where Ethiopian warmth meets world-class hospitality.
        </p>
      </div>

      <div>
        <div className="footer-col-title">Navigation</div>
        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/rooms">Rooms & Suites</Link></li>
          <li><Link to="/amenities">Amenities</Link></li>
          <li><Link to="/reserve">Reservations</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <div>
        <div className="footer-col-title">Experiences</div>
        <ul className="footer-links">
          <li><a href="#dining">Fine Dining</a></li>
          <li><a href="#spa">Spa & Wellness</a></li>
          <li><a href="#fitness">Fitness Center</a></li>
          <li><a href="#rooftop">Rooftop Bar</a></li>
          <li><a href="#conference">Conference Rooms</a></li>
        </ul>
      </div>

      <div>
        <div className="footer-col-title">Contact</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <MapPin size={14} color="var(--gold)" style={{ marginTop: 2, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--gray)', lineHeight: 1.7 }}>
              Churchill Avenue, Arada<br />Addis Ababa, Ethiopia
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Phone size={14} color="var(--gold)" />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--gray)' }}>+251 11 XXX XXXX</span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Mail size={14} color="var(--gold)" />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--gray)' }}>info@melkainternationalhotel.com</span>
          </div>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p className="footer-copy">© {new Date().getFullYear()} Melka International Hotel. All rights reserved.</p>
      <div className="footer-socials">
        {[
          { Icon: Facebook, label: 'Facebook' },
          { Icon: Instagram, label: 'Instagram' },
          { label: 'TikTok' },
        ].map(({ Icon, label }) => (
          Icon
            ? <a key={label} href="#" aria-label={label} className="footer-social-btn"><Icon size={14} /></a>
            : <a key={label} href="#" aria-label={label} className="footer-social-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
