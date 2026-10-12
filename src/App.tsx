import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import TopBar from './components/TopBar'
import MenuPage from './components/MenuPage'
import AboutPage from './components/AboutPage'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import OrderBar from './components/OrderBar'
import { MENU } from './data/menu'
import { RESTAURANT } from './data/site'
import { routeHref, useRoute } from './router'
import type { CartLine, Order, Page } from './types'

const DEFAULT_TABLE = '7'

function readTable(value: string | null): string {
  if (value && /^\d{1,3}$/.test(value)) return String(Number.parseInt(value, 10))
  return DEFAULT_TABLE
}

export default function App() {
  const route = useRoute()
  const reduce = useReducedMotion()
  const [cart, setCart] = useState<Record<string, number>>({})
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [lastOrder, setLastOrder] = useState<Order | null>(null)

  const table = readTable(route.params.get('table'))

  const addItem = useCallback((id: string) => {
    setCart((prev) => ({ ...prev, [id]: Math.min((prev[id] ?? 0) + 1, 20) }))
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) => {
      const next = { ...prev }
      if (qty <= 0) delete next[id]
      else next[id] = Math.min(qty, 20)
      return next
    })
  }, [])

  const lines = useMemo<CartLine[]>(
    () =>
      MENU.filter((item) => cart[item.id]).map((item) => ({ item, qty: cart[item.id] })),
    [cart],
  )

  const count = useMemo(() => lines.reduce((sum, line) => sum + line.qty, 0), [lines])
  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.item.price * line.qty, 0),
    [lines],
  )
  const total = subtotal + Math.round((subtotal * RESTAURANT.gstPercent) / 100)

  const go = useCallback(
    (page: Page, params?: Record<string, string>) => {
      window.location.hash = routeHref(page, params)
    },
    [],
  )

  const placeOrder = useCallback((order: Order) => {
    setLastOrder(order)
    setCart({})
  }, [])

  return (
    <div className="grain relative flex min-h-dvh flex-col overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Skip to the menu
      </a>

      <TopBar
        page={route.page}
        table={table}
        cartCount={count}
        onOpenCart={() => setDrawerOpen(true)}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={route.page}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className={count > 0 ? 'pb-28 lg:pb-0' : undefined}
        >
          {route.page === 'menu' ? (
            <MenuPage
              table={table}
              cart={cart}
              onTable={(next) => go('menu', { table: next })}
              onAdd={addItem}
              onSetQty={setQty}
            />
          ) : (
            <AboutPage table={table} />
          )}
        </motion.div>
      </AnimatePresence>

      <Footer table={table} />

      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        lines={lines}
        table={table}
        onSetQty={setQty}
        onPlaceOrder={placeOrder}
      />

      <OrderBar count={count} total={total} onOpen={() => setDrawerOpen(true)} />

      <p className="sr-only" aria-live="polite">
        {lastOrder
          ? `Order ${lastOrder.id} placed, about ${lastOrder.etaMins} minutes.`
          : count === 0
            ? ''
            : `${count} item${count === 1 ? '' : 's'} in your order, ${RESTAURANT.gstPercent}% GST included.`}
      </p>
    </div>
  )
}