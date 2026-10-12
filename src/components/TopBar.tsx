import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { QrCode, ShoppingBag } from 'lucide-react'
import { routeHref } from '../router'
import { tableLabel } from '../format'
import type { Page } from '../types'

const TABS: { page: Page; label: string }[] = [
  { page: 'menu', label: 'Menu' },
  { page: 'about', label: 'About' },
]

export function BrandMark({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.6" opacity="0.35" />
      <path
        d="M9 22c0-4.2 3.1-7.6 7-7.6s7 3.4 7 7.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M7.4 22h17.2c.7 0 1.2.6 1.1 1.3-.5 2.7-2.4 4.2-4.8 4.2h-9.8c-2.4 0-4.3-1.5-4.8-4.2-.1-.7.4-1.3 1.1-1.3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M16 12.2c0-1.7-1.4-1.9-1.4-3.3 0-1 .8-1.7 1.4-1.7s1.4.7 1.4 1.7c0 1.4-1.4 1.6-1.4 3.3Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function TopBar({
  page,
  table,
  cartCount,
  onOpenCart,
}: {
  page: Page
  table: string
  cartCount: number
  onOpenCart: () => void
}) {
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-cream/92 backdrop-blur-md' : 'border-b border-transparent bg-cream/70 backdrop-blur-sm'
      }`}
    >
      <div className="shell flex h-16 items-center gap-3 lg:h-20 lg:gap-6">
        <a
          href={routeHref('menu', { table })}
          className="flex min-w-0 items-center gap-2.5 text-ink"
          aria-label="Tandoor Lane — back to the menu"
        >
          <span className="shrink-0 text-clay">
            <BrandMark />
          </span>
          <span className="truncate font-display text-[0.9375rem] leading-none font-semibold tracking-tight max-[374px]:hidden sm:text-lg lg:text-xl">
            Tandoor Lane
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="ml-auto flex shrink-0 items-center rounded-full border border-line bg-paper p-1"
        >
          {TABS.map((tab) => {
            const active = tab.page === page
            return (
              <a
                key={tab.page}
                href={routeHref(tab.page, { table })}
                aria-current={active ? 'page' : undefined}
                className="relative rounded-full px-2.5 py-1.5 text-[0.8125rem] font-semibold transition-colors duration-200 sm:px-4 sm:text-sm lg:px-5"
              >
                {active ? (
                  <motion.span
                    layoutId="tab-pill"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 420, damping: 34 }
                    }
                    className="absolute inset-0 rounded-full bg-ink"
                  />
                ) : null}
                <span className={`relative ${active ? 'text-paper' : 'text-ink-soft hover:text-ink'}`}>
                  {tab.label}
                </span>
              </a>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-leaf/25 bg-leaf/8 px-3 py-2 text-xs font-semibold text-leaf sm:inline-flex">
            <QrCode className="size-3.5" aria-hidden="true" />
            {tableLabel(table)}
          </span>

          <button
            type="button"
            onClick={onOpenCart}
            className="relative inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-3 py-2.5 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-clay-deep sm:gap-2 sm:px-4 lg:px-5"
            aria-label={`Review your order, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
            <span className="hidden lg:inline">Order</span>
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={cartCount}
                initial={reduce ? false : { scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={reduce ? undefined : { scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="tabular inline-flex min-w-5 items-center justify-center rounded-full bg-saffron px-1 text-[0.7rem] font-bold text-ink"
              >
                {cartCount}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  )
}