import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-emblem">M</div>
          <div className="navbar-logo-text">
            <span className="navbar-logo-name">Melka International</span>
            <span className="navbar-logo-sub">Addis Ababa · Ethiopia</span>
          </div>
        </Link>

        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/rooms">Rooms</Link></li>
          <li><Link to="/amenities">Amenities</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <Link to="/reserve" className="navbar-reserve-btn" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          Reserve Now
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.98)',
          zIndex: 999, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 36
        }}>
          {['/', '/rooms', '/amenities', '/contact', '/reserve'].map((path, i) => {
            const labels = ['Home', 'Rooms', 'Amenities', 'Contact', 'Reserve Now'];
            return (
              <Link key={path} to={path} style={{
                fontFamily: 'var(--font-display)', fontSize: '2.5rem',
                color: i === 4 ? 'var(--gold)' : 'var(--cream)', textDecoration: 'none'
              }}>
                {labels[i]}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Navbar;
