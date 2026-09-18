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
  pub('room_single.jpg'),
  pub('room_deluxe_single.jpg'),
  pub('room_double.jpg'),
  pub('room_twin.jpg'),
  pub('room_triple.jpg'),
  pub('room_family.jpg'),
  pub('gallery_lobby.jpg'),
  pub('gallery_gym.jpg'),
  pub('gallery_bar.jpg'),
  pub('gallery_frontdesk.jpg'),
  pub('gallery_lounge.jpg'),
  pub('gallery_reception.jpg'),
  pub('gallery_dining.jpg'),
  pub('hero.jpg'),
  pub('fine_dining.jpg'),
];

export const ROOM_IMAGES = {
  standardSingle: pub('room_single.jpg'),
  standardDelux: pub('room_deluxe_single.jpg'),
  doubleDelux: pub('room_double.jpg'),
  twinDelux: pub('room_twin.jpg'),
  tripleDeluxeSuite: pub('room_triple.jpg'),
  familySuite: pub('room_family.jpg'),
};

export const AMENITY_IMAGES = {
  fineDining: pub('fine_dining.jpg'),
  fitness: pub('DSC_9953.JPG'),
  conference: pub('conference_new.jpg'),
  souvenirShop: pub('souvenir_shop.jpg'),
  bar: pub('gallery_bar.jpg'),
};

export const PHOTOS = {
  hero: pub('hero.jpg'),
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
  gym: AMENITY_IMAGES.fitness,
  contact: pub('DSC_9768.JPG'),
  gallery: [
    pub('gallery_lobby.jpg'),
    pub('gallery_gym.jpg'),
    pub('gallery_bar.jpg'),
    pub('gallery_frontdesk.jpg'),
    pub('gallery_lounge.jpg'),
    pub('gallery_reception.jpg'),
    pub('gallery_dining.jpg'),
  ],
  amenities: [
    AMENITY_IMAGES.fineDining,
    AMENITY_IMAGES.fitness,
    AMENITY_IMAGES.souvenirShop,
    AMENITY_IMAGES.conference,
    AMENITY_IMAGES.bar,
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

const IMAGES = { ROOM_IMAGES, AMENITY_IMAGES, PHOTOS, ALL, randomImg, shuffleImgs };
export default IMAGES;
