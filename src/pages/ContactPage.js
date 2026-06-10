import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import useReveal from '../hooks/useReveal';
import { PHOTOS } from '../utils/images';

const pageHeroBg = PHOTOS.contact;

function RevealSection({ children, className = '' }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Message sent! We will get back to you shortly.');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url(${pageHeroBg})` }} />
        <div className="page-hero-content">
          <div className="page-hero-eyebrow">Get In Touch</div>
          <h1 className="page-hero-title">Contact Us</h1>
        </div>
      </div>

      <section className="contact-section">
        <RevealSection>
          <div className="section-eyebrow">We'd Love to Hear From You</div>
          <h2 className="section-title">Reach <em>Melka</em></h2>
        </RevealSection>

        <div className="contact-grid">
          {/* INFO */}
          <RevealSection>
            <div>
              <div className="contact-info-item">
                <div className="contact-icon"><MapPin size={18} /></div>
                <div>
                  <div className="contact-info-label">Address</div>
                  <div className="contact-info-value">
                    Churchill Avenue, Arada<br />
                    Addis Ababa, Ethiopia<br />
                    P.O. Box 1000
                  </div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon"><Phone size={18} /></div>
                <div>
                  <div className="contact-info-label">Phone</div>
                  <div className="contact-info-value">
                    +251 11 XXX XXXX<br />
                    +251 91 XXX XXXX (WhatsApp)
                  </div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon"><Mail size={18} /></div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">
                    info@melkainternationalhotel.com<br />
                    reservations@melkainternationalhotel.com
                  </div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon"><Clock size={18} /></div>
                <div>
                  <div className="contact-info-label">Front Desk Hours</div>
                  <div className="contact-info-value">
                    Open 24 Hours, 7 Days a Week
                  </div>
                </div>
              </div>

              {/* MAP EMBED */}
              <div style={{ marginTop: 24, height: 260, background: 'var(--black-card)', border: '1px solid var(--black-border)', overflow: 'hidden', position: 'relative' }}>
                <iframe
                  title="Melka Hotel Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.0!2d38.7531!3d9.0272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDEnMzguMCJOIDM4wrA0NSczMS42IkU!5e0!3m2!1sen!2set!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(20%)' }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </RevealSection>

          {/* FORM */}
          <RevealSection className="reveal-delay-2">
            <div style={{ background: 'var(--black-card)', border: '1px solid var(--black-border)', padding: '48px 44px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--cream)', marginBottom: 32 }}>
                Send a <em style={{ color: 'var(--gold)' }}>Message</em>
              </div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="form-control" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="form-control" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" className="form-control" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us more…" className="form-control" style={{ minHeight: 140 }} required />
                </div>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading
                    ? <><Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</>
                    : <>Send Message <ArrowRight size={14} /></>}
                </button>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
              </form>
            </div>
          </RevealSection>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
