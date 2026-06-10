const pub = (file) => `/${file}`;

export const ALL_LOCAL = [
  pub('Capture23.PNG'),
  pub('DSC_9768.JPG'),
  pub('DSC_9785.JPG'),
  pub('DSC_9833.JPG'),
  pub('DSC_9846.JPG'),
  pub('DSC_9851.JPG'),
  pub('DSC_9855.JPG'),
  pub('DSC_9859.JPG'),
  pub('DSC_9861.JPG'),
  pub('DSC_9873.JPG'),
  pub('DSC_9881.JPG'),
  pub('DSC_9889.JPG'),
  pub('DSC_9897.JPG'),
  pub('DSC_9908.JPG'),
  pub('DSC_9913.JPG'),
  pub('DSC_9953.JPG'),
  pub('DSC_9955.JPG'),
  pub('DSC_9959.JPG'),
];

export const ROOM_IMAGES = {
  standardSingle: pub('DSC_9881.JPG'),
  standardDelux: pub('DSC_9889.JPG'),
  doubleDelux: pub('DSC_9846.JPG'),
  twinDelux: pub('DSC_9873.JPG'),
  tripleDeluxeSuite: pub('DSC_9859.JPG'),
  familySuite: pub('DSC_9855.JPG'),
};

export const AMENITY_IMAGES = {
  fineDining: pub('DSC_9833.JPG'),
  rooftopBar: pub('DSC_9768.JPG'),
  spa: pub('Capture23.PNG'),
  fitness: pub('DSC_9953.JPG'),
  coffeeLounge: pub('DSC_9913.JPG'),
  conference: pub('DSC_9897.JPG'),
};

export const PHOTOS = {
  hero: pub('DSC_9851.JPG'),
  cta: pub('DSC_9785.JPG'),
  rooms: [
    ROOM_IMAGES.standardSingle,
    ROOM_IMAGES.standardDelux,
    ROOM_IMAGES.doubleDelux,
    ROOM_IMAGES.twinDelux,
    ROOM_IMAGES.tripleDeluxeSuite,
    ROOM_IMAGES.familySuite,
  ],
  dining: AMENITY_IMAGES.fineDining,
  exterior: pub('DSC_9768.JPG'),
  spa: AMENITY_IMAGES.spa,
  gym: AMENITY_IMAGES.fitness,
  contact: pub('DSC_9768.JPG'),
  gallery: [
    pub('DSC_9768.JPG'),
    pub('DSC_9889.JPG'),
    pub('DSC_9833.JPG'),
    pub('DSC_9859.JPG'),
    pub('DSC_9855.JPG'),
  ],
  amenities: [
    AMENITY_IMAGES.fineDining,
    AMENITY_IMAGES.rooftopBar,
    AMENITY_IMAGES.spa,
    AMENITY_IMAGES.fitness,
    AMENITY_IMAGES.coffeeLounge,
    AMENITY_IMAGES.conference,
  ],
};

const ALL = [...ALL_LOCAL];

export function randomImg() {
  return ALL[Math.floor(Math.random() * ALL.length)];
}

export function shuffleImgs(count, exclude) {
  const pool = exclude ? ALL.filter((i) => i !== exclude) : [...ALL];
  return [...pool].sort(() => Math.random() - 0.5).slice(0, count);
}

export default { ROOM_IMAGES, AMENITY_IMAGES, PHOTOS, ALL, randomImg, shuffleImgs };
