import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { QrCode, Search, X } from 'lucide-react'
import MenuCard from './MenuCard'
import { Eyebrow, Photo, Reveal, Rule } from './ui'
import { CATEGORIES, MENU } from '../data/menu'
import { KITCHEN, RESTAURANT } from '../data/site'
import { routeHref } from '../router'
import { formatPrice, tableLabel } from '../format'
import type { Category } from '../types'

/** The band under the header that makes the QR journey legible on a phone. */
function TableStrip({ table, onTable }: { table: string; onTable: (next: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(table)
  const inputRef = useRef<HTMLInputElement>(null)
  const reduce = useReducedMotion()

  const start = () => {
    setDraft(table)
    setEditing(true)
    window.requestAnimationFrame(() => inputRef.current?.select())
  }

  const commit = () => {
    const next = draft.trim()
    setEditing(false)
    if (/^\d{1,3}$/.test(next) && next !== table) onTable(next)
  }

  return (
    <div className="border-b border-line bg-leaf/6">
      <div className="shell flex min-h-12 flex-wrap items-center gap-x-4 gap-y-1 py-2 text-xs font-medium text-leaf-deep">
        <span className="inline-flex items-center gap-2">
          <QrCode className="size-4 shrink-0 text-leaf" aria-hidden="true" />
          <span className="text-ink-faint">Scanned at</span>
          <strong className="font-bold text-ink">{tableLabel(table)}</strong>
        </span>
        <span aria-hidden="true" className="hidden h-3 w-px bg-leaf/25 sm:block" />
        <span className="hidden sm:inline">{RESTAURANT.service}</span>
        <span aria-hidden="true" className="hidden h-3 w-px bg-leaf/25 lg:block" />
        <span className="hidden lg:inline">Kitchen fires till {RESTAURANT.kitchenClose}</span>

        <div className="ml-auto">
          <AnimatePresence initial={false} mode="wait">
            {editing ? (
              <motion.form
                key="edit"
                initial={reduce ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                onSubmit={(event) => {
                  event.preventDefault()
                  commit()
                }}
                className="flex items-center gap-1.5"
              >
                <label htmlFor="table-input" className="sr-only">
                  Table number
                </label>
                <input
                  ref={inputRef}
                  id="table-input"
                  inputMode="numeric"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value.replace(/\D/g, '').slice(0, 3))}
                  className="w-14 rounded-full border border-leaf/30 bg-paper px-2.5 py-1 text-center text-xs font-bold text-ink focus:border-clay focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full bg-leaf px-3 py-1 text-[0.7rem] font-bold text-paper"
                >
                  Save
                </button>
              </motion.form>
            ) : (
              <motion.button
                key="edit-cta"
                type="button"
                onClick={start}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18 }}
                className="rounded-full border border-leaf/30 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-leaf transition-colors hover:bg-leaf hover:text-paper"
              >
                Switch table
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function MenuPage({
  table,
  cart,
  onTable,
  onAdd,
  onSetQty,
}: {
  table: string
  cart: Record<string, number>
  onTable: (next: string) => void
  onAdd: (id: string) => void
  onSetQty: (id: string, qty: number) => void
}) {
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return MENU.filter((item) => {
      const byCategory = category === 'All' || item.category === category
      if (!byCategory) return false
      if (!needle) return true
      return (
        item.name.toLowerCase().includes(needle) ||
        item.description.toLowerCase().includes(needle) ||
        item.category.toLowerCase().includes(needle)
      )
    })
  }, [category, query])

  const filtering = category !== 'All' || query.trim().length > 0

  return (
    <main id="main" className="pt-16 lg:pt-20">
      <TableStrip table={table} onTable={onTable} />

      <div className="shell pt-8 pb-7 lg:pt-16 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <Eyebrow>Order from your seat</Eyebrow>
            <h1 className="mt-4 max-w-2xl text-hero leading-[1.02] tracking-[-0.02em] text-balance lg:mt-5">
              The whole kitchen,
              <br />
              <span className="text-clay">on the phone in your hand.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lede leading-relaxed text-ink-soft text-pretty">
              No queue at the counter, no shouting for a second round. Add what you want, send it to
              the pass, and the ticket lands with your table number attached.
            </p>

            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 lg:mt-10">
              {KITCHEN.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-display text-xl leading-tight text-ink lg:text-2xl">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Desktop only: the first two dishes, so food is the first thing read. */}
          <Reveal delay={0.1} className="relative hidden lg:block">
            <Photo
              src="/images/paneer-butter-masala.jpg"
              alt="Paneer butter masala plated with cream and coriander"
              priority
              className="aspect-4/3 rounded-3xl shadow-panel"
            />
            <Photo
              src="/images/butter-naan.jpg"
              alt="Butter naan stacked on a steel plate"
              className="absolute -bottom-9 -left-9 size-40 rotate-[-3deg] rounded-2xl border-4 border-cream shadow-panel"
            />
            <p className="absolute -right-3 top-5 rounded-full border border-line bg-paper px-4 py-2.5 text-xs font-semibold text-ink shadow-lift">
              Paneer butter masala
              <span className="tabular ml-2 text-clay">{formatPrice(480)}</span>
            </p>
          </Reveal>
        </div>
      </div>

      <div className="sticky top-16 z-30 border-y border-line bg-cream/93 backdrop-blur-md lg:top-20">
        <div className="shell flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative">
            <div
              role="group"
              aria-label="Filter the menu by course"
              className="rail -mx-1 flex gap-2 overflow-x-auto px-1"
            >
              {(['All', ...CATEGORIES] as const).map((option) => {
                const active = option === category
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setCategory(option)}
                    aria-pressed={active}
                    className={`shrink-0 scroll-snap-start whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                      active
                        ? 'border-ink bg-ink text-paper'
                        : 'border-line bg-paper text-ink-soft hover:border-clay hover:text-clay'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream to-transparent lg:hidden"
            />
          </div>

          <div className="relative lg:w-72">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-faint"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the menu"
              aria-label="Search the menu"
              className="w-full rounded-full border border-line bg-paper py-2.5 pr-10 pl-11 text-sm text-ink placeholder:text-ink-faint focus:border-clay focus:outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-ink-faint hover:bg-sand hover:text-ink"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="shell py-8 lg:py-14">
        <p aria-live="polite" className="text-sm text-ink-faint">
          <span className="font-semibold text-ink">{visible.length}</span>{' '}
          {visible.length === 1 ? 'dish' : 'dishes'}
          {filtering ? ' match your filters' : ' on the board right now'}
        </p>

        {visible.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-line bg-paper px-6 py-16 text-center">
            <p className="font-display text-2xl">Nothing under that name</p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
              The kitchen changes the board through the day. Try another word, or clear the filters
              and start again.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('All')
                setQuery('')
              }}
              className="mt-6 text-sm font-semibold text-clay underline underline-offset-4 hover:text-clay-deep"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {visible.map((item) => (
              <li key={item.id}>
                <MenuCard
                  item={item}
                  qty={cart[item.id] ?? 0}
                  onAdd={onAdd}
                  onSetQty={onSetQty}
                />
              </li>
            ))}
          </ul>
        )}

        <Rule className="mt-14" />

        <div className="flex flex-col gap-4 pt-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg leading-relaxed">
            Prices in rupees. {RESTAURANT.gstPercent}% GST is added at checkout, plus{' '}
            {formatPrice(RESTAURANT.deliveryFee)} delivery within 5 km. Allergies go in the order
            notes so the kitchen sees them with the ticket.
          </p>
          <a
            href={routeHref('about', { table })}
            className="shrink-0 font-semibold text-clay underline underline-offset-4 hover:text-clay-deep"
          >
            How the QR ordering works →
          </a>
        </div>
      </div>
    </main>
  )
}