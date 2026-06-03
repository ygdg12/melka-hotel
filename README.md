# Melka International Hotel — Website

A stunning, fully responsive React website for **Melka International Hotel**, Addis Ababa, Ethiopia.

## Features

- **Custom animated cursor** — gold ring + dot that follows mouse
- **Smooth scroll-reveal animations** — sections fade in as you scroll  
- **Luxury dark-gold aesthetic** — Cormorant Garamond display font, deep black backgrounds
- **Full-page hero** with parallax zoom  
- **Quick-book bar** on the homepage  
- **5 pages**: Home, Rooms & Suites, Amenities, Reservations, Contact  
- **Room reservation system** using [Resend](https://resend.com) — sends:
  - A detailed notification email to the hotel
  - A confirmation email to the guest
- **Premium Lucide icons** throughout  
- **Fully responsive** for mobile and tablet  

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Resend

1. Sign up at [resend.com](https://resend.com) and create an API key
2. Verify your sending domain (e.g. `melkainternationalhotel.com`) in the Resend dashboard
3. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

4. Fill in your API key:

```
REACT_APP_RESEND_API_KEY=re_your_actual_key_here
```

5. In `src/pages/ReservationPage.js`, update the `from` email addresses and `to` address to match your verified domain.

> ⚠️ **Important**: The Resend API is called directly from the browser in this setup (for simplicity). For production, move the `sendReservationEmail` function to a serverless backend (e.g. Vercel Edge Functions, AWS Lambda, or a Node.js server) to keep your API key secure.

### 3. Start the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
```

The `build/` folder is ready to deploy to any static host (Vercel, Netlify, etc.).

---

## Project Structure

```
melka-hotel/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CustomCursor.js
│   │   ├── Navbar.js
│   │   └── Footer.js
│   ├── hooks/
│   │   └── useReveal.js        ← scroll-reveal hook
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── RoomsPage.js
│   │   ├── AmenitiesPage.js
│   │   ├── ReservationPage.js  ← Resend integration
│   │   └── ContactPage.js
│   ├── styles/
│   │   └── global.css
│   ├── App.js
│   └── index.js
├── .env.example
├── package.json
└── README.md
```

---

## Customisation

| What to change | Where |
|---|---|
| Hotel name / logo | `Navbar.js`, `Footer.js` |
| Room types & prices | `RoomsPage.js`, `ReservationPage.js` |
| Hero images | `HomePage.js` (`hero-bg` background URL) |
| Email recipients | `ReservationPage.js` → `sendReservationEmail` |
| Resend API key | `.env.local` |
| Colours | `styles/global.css` (CSS variables at top) |
| Fonts | `public/index.html` Google Fonts link + `global.css` |

---

## Tech Stack

- **React 18** + React Router v6  
- **Lucide React** — premium icons  
- **Resend** — transactional email  
- **react-hot-toast** — toast notifications  
- **CSS custom properties** — theming  
- **IntersectionObserver** — scroll animations  
- **Google Fonts** — Cormorant Garamond + Jost  

---

© Melka International Hotel, Addis Ababa, Ethiopia
