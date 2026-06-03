import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import ReservationPage from './pages/ReservationPage';
import AmenitiesPage from './pages/AmenitiesPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import './styles/global.css';

function App() {

  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-content">
          <div className="loader-logo">
            <span className="loader-m">M</span>
          </div>
          <div className="loader-text">MELKA INTERNATIONAL HOTEL</div>
          <div className="loader-bar"><div className="loader-fill" /></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <CustomCursor />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#d4af72',
            border: '1px solid #d4af72',
            fontFamily: 'Jost, sans-serif',
            letterSpacing: '0.05em',
          },
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/reserve" element={<ReservationPage />} />
        <Route path="/amenities" element={<AmenitiesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
