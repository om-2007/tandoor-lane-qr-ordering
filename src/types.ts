export type Page = 'menu' | 'about'

export type Diet = 'veg' | 'non-veg'

export type Category = 'Starters' | 'Mains' | 'Breads & Rice' | 'Desserts' | 'Drinks'

export type MenuItem = {
  id: string
  name: string
  description: string
  /** Whole rupees, before GST. */
  price: number
  category: Category
  /** File name inside /public/images. */
  image: string
  diet: Diet
  /** 0 = none, 3 = properly hot. */
  spice: 0 | 1 | 2 | 3
  /** Minutes the kitchen quotes for this dish. */
  prepMins: number
  signature?: boolean
  contains?: string
}

export type CartLine = {
  item: MenuItem
  qty: number
}

export type OrderMode = 'dine-in' | 'takeaway' | 'delivery'

export type Order = {
  id: string
  placedAt: number
  mode: OrderMode
  table: string
  lines: CartLine[]
  subtotal: number
  taxes: number
  deliveryFee: number
  total: number
  /** Free text the guest typed for the kitchen. */
  notes: string
  /** Only populated for delivery orders. */
  address: string
  etaMins: number
}

export type Session = {
  /** Table printed on the QR tent this guest scanned. */
  table: string
  mode: OrderMode
}