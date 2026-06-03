export const LOCAL = '/Capture23.PNG';

export const UNSPLASH = {
  hero: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1920&q=80',
  rooms: [
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=900&q=80',
    'https://images.unsplash.com/photo-1586611292717-f828b167408c?w=900&q=80',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80',
  ],
  dining: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  exterior: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
  spa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80',
  contact: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80',
  cta: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1400&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80',
    'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=600&q=80',
  ],
  amenities: [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
    'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=900&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=80',
  ],
};

const ALL = [LOCAL, ...Object.values(UNSPLASH).flatMap(v => Array.isArray(v) ? v : [v])];

export function randomImg() {
  return ALL[Math.floor(Math.random() * ALL.length)];
}

export function shuffleImgs(count, exclude) {
  const pool = exclude ? ALL.filter(i => i !== exclude) : [...ALL];
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default { LOCAL, UNSPLASH, ALL, randomImg, shuffleImgs };
