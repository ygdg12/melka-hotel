import { PHOTOS } from '../utils/images';

export const ROOMS_DATA = [
  {
    id: 'standard-single',
    tag: 'Standard',
    title: 'Standard Single Room',
    desc: 'Pick any of our hotel rooms to experience the delightful decor, complemented with modern amenities for a comfortable stay.',
    capacityDesc: '1 Guest (Couple option available)',
    bed: 'Single Bed',
    services: ['Free Breakfast', 'Wifi', 'Television', 'Bathroom'],
    basePrice: 65,
    baseGuests: 1,
    extraPersonFee: 15,
    maxGuests: 2,
    img: PHOTOS.rooms[0],
  },
  {
    id: 'deluxe-single',
    tag: 'Signature',
    title: 'Deluxe Single Room',
    desc: 'Pick any of our hotel rooms to experience the delightful decor, complemented with modern amenities for a comfortable stay.',
    capacityDesc: '1 Guest (Couple option available)',
    bed: 'Single Bed',
    services: ['Free Breakfast & Wi-Fi', 'Television', 'Bathroom'],
    basePrice: 70,
    baseGuests: 1,
    extraPersonFee: 15,
    maxGuests: 2,
    img: PHOTOS.rooms[1],
  },
  {
    id: 'deluxe-double',
    tag: 'Premium',
    title: 'Deluxe Double Room',
    desc: 'Pick any of our hotel rooms to experience the delightful decor, complemented with modern amenities for a comfortable stay.',
    capacityDesc: 'Base 2 Guests',
    bed: 'Double Bed',
    services: ['Free Breakfast & Late Checkout', 'Wifi', 'Television', 'Bathroom'],
    basePrice: 75,
    baseGuests: 2,
    extraPersonFee: 15,
    maxGuests: 4,
    img: PHOTOS.rooms[2],
  },
  {
    id: 'twin-delux',
    tag: 'Premium',
    title: 'Large Twin Room',
    desc: 'Pick any of our hotel rooms to experience the delightful decor, complemented with modern amenities for a comfortable stay.',
    capacityDesc: 'Base 2 Guests',
    bed: 'Twin Beds',
    services: ['Free Breakfast & Airport Shuttle', 'Wifi', 'Television', 'Bathroom'],
    basePrice: 95,
    baseGuests: 2,
    extraPersonFee: 15,
    maxGuests: 4,
    img: PHOTOS.rooms[3],
  },
  {
    id: 'family-suite',
    tag: 'Family',
    title: 'Family Room / Connected Room',
    desc: 'Pick any of our hotel rooms to experience the delightful decor, complemented with modern amenities for a comfortable stay.',
    capacityDesc: 'Base 3 Guests',
    bed: 'Queen + Extra Beds',
    services: ['Free Breakfast & Airport Shuttle', 'Wifi', 'Television', 'Bathroom'],
    basePrice: 105,
    baseGuests: 3,
    extraPersonFee: 15,
    maxGuests: 6,
    img: PHOTOS.rooms[5],
  },
  {
    id: 'triple-deluxe-suite',
    tag: 'Suite',
    title: 'Triple Room',
    desc: 'Pick any of our hotel rooms to experience the delightful decor, complemented with modern amenities for a comfortable stay.',
    capacityDesc: 'Base 3 Guests',
    bed: '3 Twin Beds',
    services: ['Free Breakfast & Airport Shuttle', 'Wifi', 'Television', 'Bathroom'],
    basePrice: 115,
    baseGuests: 3,
    extraPersonFee: 15,
    maxGuests: 6,
    img: PHOTOS.rooms[4],
  },
];

/**
 * Calculates room pricing details in USD based on the number of guests.
 */
export function calculateRoomPrice(room, guestsCount = 1) {
  const numGuests = Math.max(1, parseInt(guestsCount, 10) || 1);
  const baseGuests = room.baseGuests || 1;
  const basePrice = room.basePrice;
  const extraGuests = Math.max(0, numGuests - baseGuests);
  const extraFee = extraGuests * (room.extraPersonFee || 0);
  const totalPrice = basePrice + extraFee;

  let breakdownText = `$${basePrice} base rate (${baseGuests} guest${baseGuests > 1 ? 's' : ''})`;
  if (extraGuests > 0) {
    breakdownText += ` + $${extraFee} (${extraGuests} extra guest${extraGuests > 1 ? 's' : ''} @ $${room.extraPersonFee})`;
  }

  let baseNote = `$${basePrice} USD (${baseGuests} person${baseGuests > 1 ? 's' : ''})`;
  if (room.id === 'standard-single' || room.id === 'deluxe-single') {
    baseNote = `$${basePrice} USD (1 person) — 2nd person +$15 USD`;
  } else {
    baseNote = `$${basePrice} USD (includes ${baseGuests} persons) — +$15 USD/extra guest`;
  }

  return {
    price: totalPrice,
    currency: 'USD',
    formattedPrice: `$${totalPrice} USD`,
    breakdownText,
    baseNote,
  };
}
