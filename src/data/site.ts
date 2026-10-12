export const RESTAURANT = {
  name: 'Tandoor Lane',
  tagline: 'North Indian kitchen, fired and smoked daily',
  since: '2016',
  blurb:
    'A charcoal tandoor, a dum pot and a short menu that changes with the market. Scan the code on your table and order.',
  addressLine1: '27, 4th Cross, 12th Main',
  addressLine2: 'Indiranagar, Bengaluru 560038',
  phoneDisplay: '+91 80 4123 8890',
  phoneDial: '+918041238890',
  email: 'hello@tandoorlane.example',
  instagram: '@tandoorlane',
  hours: [
    { days: 'Monday – Thursday', time: '12:00 pm – 11:00 pm' },
    { days: 'Friday – Saturday', time: '12:00 pm – 12:30 am' },
    { days: 'Sunday', time: '12:00 pm – 10:30 pm' },
  ],
  /** What the kitchen accepts on a table QR code. */
  service: 'Dine-in · Takeaway · Delivery within 5 km',
  gstPercent: 5,
  deliveryFee: 49,
  freeDeliveryOver: 899,
  minOrderForDelivery: 349,
  kitchenClose: '11:30 pm',
} as const

export const STORY = [
  'Tandoor Lane started as a six-table dhaba on 4th Cross, run by a family that had been cooking over coal since Vijayawada. The menu fitted on one page, and it still almost does.',
  'Everything that touches the tandoor is marinated the same afternoon it is cooked. The naan is slapped at 12 degrees higher than is comfortable to stand next to, and the kebabs come off the skewer when they stop glistening rather than when a timer says so.',
  'In 2021 we put a QR code on every table. It was meant to be a gimmick for a month. It saved the servers eight kilometres of walking a day, and after that there was no putting it back.',
]

export const VALUES = [
  {
    title: 'Coal, not gas',
    body: 'The clay tandoor is lit at 11 am and banked until close. Bread is blistered against live charcoal, which is slower and the only reason the crust tastes the way it does.',
  },
  {
    title: 'Dum in its own pot',
    body: 'Biryani and kebabs finish sealed under pastry, over a low flame, for as long as the dish demands. Nothing is microwaved back to temperature at the pass.',
  },
  {
    title: 'The table owns the order',
    body: 'Your ticket is fired the moment you send it. There is no manager to walk over, no queue at the counter, and no waiting on a receipt you did not ask for.',
  },
]

export const QR_STEPS = [
  {
    step: '01',
    title: 'Scan the tent on your table',
    body: 'Every table has a laminated code. It opens this menu with your table number already attached, so nothing has to be typed in.',
  },
  {
    step: '02',
    title: 'Build the order on your phone',
    body: 'Browse with photographs, set quantities, switch to takeaway or delivery if you are not sitting with us, and leave a note for the kitchen.',
  },
  {
    step: '03',
    title: 'The ticket hits the pass',
    body: 'The order appears on the kitchen screen with your table number and lands in a queue by the time you were told. You get an estimate before you pay.',
  },
]

export const KITCHEN = [
  { label: 'Kitchen fires till', value: RESTAURANT.kitchenClose },
  { label: 'Average ticket to table', value: '18 min' },
  { label: 'Dishes on the menu', value: '16' },
  { label: 'Cost of a QR tent', value: '₹40' },
]

export const ROOM = [
  { label: 'Tables in the room', value: '14' },
  { label: 'Staff on a full shift', value: '11' },
  { label: 'Naan out of the tandoor', value: '90 a day' },
  { label: 'Delivery radius', value: '5 km' },
]

export const IMAGES = {
  hero: '/images/about-interior.jpg',
  dining: '/images/about-dining.jpg',
  thali: '/images/about-thali.jpg',
  tandoor: '/images/about-tandoor.jpg',
  chef: '/images/about-chef.jpg',
  spice: '/images/about-spice.jpg',
  qr: '/images/table-qr.png',
} as const

/**
 * Exactly what public/images/table-qr.png encodes. Printed under the code so a
 * demo reader can see that scanning it opens the menu with ?table=7 attached.
 */
export const QR_TARGET = 'http://192.168.0.107:5173/#/menu?table=7'