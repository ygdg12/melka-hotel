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
    localBasePrice: 4050,
    localCouplePrice: 5050,
    intlBasePrice: 32,
    intlBaseGuests: 1,
    intlExtraPersonFee: 15,
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
    localBasePrice: 5050,
    localCouplePrice: 5950,
    intlBasePrice: 37,
    intlBaseGuests: 1,
    intlExtraPersonFee: 15,
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
    localBasePrice: 6600,
    localCouplePrice: 6600,
    intlBasePrice: 40,
    intlBaseGuests: 2,
    intlExtraPersonFee: 15,
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
    localBasePrice: 8100,
    localCouplePrice: 8100,
    intlBasePrice: 58,
    intlBaseGuests: 2,
    intlExtraPersonFee: 15,
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
    localBasePrice: 11900,
    localCouplePrice: 11900,
    intlBasePrice: 75,
    intlBaseGuests: 3,
    intlExtraPersonFee: 15,
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
    localBasePrice: 12200,
    localCouplePrice: 12200,
    intlBasePrice: 78,
    intlBaseGuests: 3,
    intlExtraPersonFee: 15,
    maxGuests: 6,
    img: PHOTOS.rooms[4],
  },
];

/**
 * Calculates room pricing details based on currency mode and number of guests.
 */
export function calculateRoomPrice(room, isInternational, guestsCount = 1) {
  const numGuests = Math.max(1, parseInt(guestsCount, 10) || 1);

  if (!isInternational) {
    // Local ETB pricing
    if (room.id === 'standard-single' || room.id === 'deluxe-single') {
      if (numGuests >= 2) {
        return {
          price: room.localCouplePrice,
          currency: 'ETB',
          formattedPrice: `${room.localCouplePrice.toLocaleString()} ETB`,
          breakdownText: 'Couple rate (2 guests)',
          baseNote: 'Single: ' + room.localBasePrice.toLocaleString() + ' ETB | Couple: ' + room.localCouplePrice.toLocaleString() + ' ETB',
        };
      }
      return {
        price: room.localBasePrice,
        currency: 'ETB',
        formattedPrice: `${room.localBasePrice.toLocaleString()} ETB`,
        breakdownText: 'Single occupancy (1 guest)',
        baseNote: 'Single: ' + room.localBasePrice.toLocaleString() + ' ETB | Couple: ' + room.localCouplePrice.toLocaleString() + ' ETB',
      };
    }

    return {
      price: room.localBasePrice,
      currency: 'ETB',
      formattedPrice: `${room.localBasePrice.toLocaleString()} ETB`,
      breakdownText: `Standard direct rate (${room.capacityDesc})`,
      baseNote: `Rate includes ${room.capacityDesc}`,
    };
  } else {
    // International USD pricing
    const baseGuests = room.intlBaseGuests;
    const basePrice = room.intlBasePrice;
    const extraGuests = Math.max(0, numGuests - baseGuests);
    const extraFee = extraGuests * room.intlExtraPersonFee;
    const totalPrice = basePrice + extraFee;

    let breakdownText = `$${basePrice} base rate (${baseGuests} guest${baseGuests > 1 ? 's' : ''})`;
    if (extraGuests > 0) {
      breakdownText += ` + $${extraFee} (${extraGuests} extra guest${extraGuests > 1 ? 's' : ''} @ $${room.intlExtraPersonFee})`;
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
}
