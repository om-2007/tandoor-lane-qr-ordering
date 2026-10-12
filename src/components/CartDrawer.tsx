import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Clock3, Flame, MapPin, ShoppingBag, Store, Truck, X } from 'lucide-react'
import QtyStepper from './QtyStepper'
import { formatPrice, formatClock, orderReference, tableLabel } from '../format'
import { RESTAURANT } from '../data/site'
import type { CartLine, Order, OrderMode } from '../types'

const MODES: { id: OrderMode; label: string; icon: typeof Store; note: string }[] = [
  { id: 'dine-in', label: 'Dine in', icon: Store, note: 'Straight to your table' },
  { id: 'takeaway', label: 'Takeaway', icon: ShoppingBag, note: 'Collect at the counter' },
  { id: 'delivery', label: 'Delivery', icon: Truck, note: 'Within 5 km, by our own riders' },
]

const PAY_LABEL: Record<OrderMode, string> = {
  'dine-in': 'payable at the table',
  takeaway: 'payable on collection',
  delivery: 'payable on delivery',
}

function Bill({
  subtotal,
  taxes,
  deliveryFee,
  total,
}: {
  subtotal: number
  taxes: number
  deliveryFee: number
  total: number
}) {
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between text-ink-soft">
        <dt>Subtotal</dt>
        <dd className="tabular">{formatPrice(subtotal)}</dd>
      </div>
      <div className="flex justify-between text-ink-soft">
        <dt>GST ({RESTAURANT.gstPercent}%)</dt>
        <dd className="tabular">{formatPrice(taxes)}</dd>
      </div>
      <div className="flex justify-between text-ink-soft">
        <dt>Delivery</dt>
        <dd className="tabular">
          {deliveryFee > 0 ? formatPrice(deliveryFee) : 'Free'}
        </dd>
      </div>
      <div className="flex items-baseline justify-between border-t border-line pt-3">
        <dt className="font-display text-lg">Total</dt>
        <dd className="tabular font-display text-2xl text-ink">{formatPrice(total)}</dd>
      </div>
    </dl>
  )
}

function Confirmation({
  order,
  onClose,
}: {
  order: Order
  onClose: () => void
}) {
  const steps =
    order.mode === 'delivery'
      ? [
          { label: 'Ticket received', note: `Sent at ${formatClock(order.placedAt)}` },
          { label: 'In the kitchen', note: 'On the pass queue' },
          { label: 'Out for delivery', note: 'Rider has your address' },
        ]
      : [
          { label: 'Ticket received', note: `Sent at ${formatClock(order.placedAt)}` },
          { label: 'In the kitchen', note: 'On the pass queue' },
          {
            label: order.mode === 'dine-in' ? `Landing on ${tableLabel(order.table)}` : 'Ready to collect',
            note: `Estimated ${formatClock(order.placedAt + order.etaMins * 60_000)}`,
          },
        ]

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-8">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-leaf/12 text-leaf">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-display text-3xl leading-tight">Order sent to the pass</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          The kitchen has your ticket with{' '}
          {order.mode === 'dine-in' ? (
            <strong className="text-ink">{tableLabel(order.table)}</strong>
          ) : order.mode === 'takeaway' ? (
            <strong className="text-ink">pickup</strong>
          ) : (
            <strong className="text-ink">your address</strong>
          )}{' '}
          on it. Nothing else to do.
        </p>

        <div className="mt-6 rounded-2xl border border-line bg-paper p-5">
          <div className="flex items-baseline justify-between">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
              Order reference
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-clay">
              <Clock3 className="size-4" aria-hidden="true" />
              about {order.etaMins} min
            </span>
          </div>
          <p className="tabular mt-1 font-display text-3xl">{order.id}</p>

          <ol className="mt-5 space-y-4">
            {steps.map((step, index) => (
              <li key={step.label} className="flex gap-3">
                <span className="flex flex-col items-center">
                  <span
                    className={`mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full ${
                      index === 0 ? 'bg-leaf text-paper' : 'border border-line bg-cream'
                    }`}
                  >
                    {index === 0 ? <Check className="size-3" aria-hidden="true" /> : null}
                  </span>
                  {index < steps.length - 1 ? (
                    <span className="mt-1 w-px flex-1 bg-line" aria-hidden="true" />
                  ) : null}
                </span>
                <span className="pb-1">
                  <span className="block text-sm font-semibold text-ink">{step.label}</span>
                  <span className="block text-xs text-ink-faint">{step.note}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {order.address ? (
          <p className="mt-5 flex gap-2.5 rounded-2xl border border-line bg-sand/50 px-5 py-4 text-sm leading-relaxed text-ink-soft">
            <MapPin className="mt-0.5 size-4 shrink-0 text-clay" aria-hidden="true" />
            <span>
              <span className="font-semibold text-ink">Delivering to</span> {order.address}
            </span>
          </p>
        ) : null}

        {order.notes ? (
          <p className="mt-3 rounded-2xl border border-line bg-sand/50 px-5 py-4 text-sm leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">Note to the kitchen:</span> {order.notes}
          </p>
        ) : null}

        <div className="mt-6">
          <Bill
            subtotal={order.subtotal}
            taxes={order.taxes}
            deliveryFee={order.deliveryFee}
            total={order.total}
          />
        </div>
      </div>

      <div className="border-t border-line bg-cream px-6 py-4">
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-clay-deep"
        >
          Back to the menu
        </button>
      </div>
    </div>
  )
}

export default function CartDrawer({
  open,
  onClose,
  lines,
  table,
  onSetQty,
  onPlaceOrder,
}: {
  open: boolean
  onClose: () => void
  lines: CartLine[]
  table: string
  onSetQty: (id: string, qty: number) => void
  onPlaceOrder: (order: Order) => void
}) {
  const [mode, setMode] = useState<OrderMode>('dine-in')
  const [notes, setNotes] = useState('')
  const [address, setAddress] = useState('')
  const [placed, setPlaced] = useState<Order | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.item.price * line.qty, 0),
    [lines],
  )
  const taxes = Math.round((subtotal * RESTAURANT.gstPercent) / 100)
  const belowMinimum = mode === 'delivery' && subtotal < RESTAURANT.minOrderForDelivery
  const deliveryFee =
    mode === 'delivery' && subtotal >= RESTAURANT.freeDeliveryOver ? 0 : RESTAURANT.deliveryFee
  const total = subtotal + taxes + (mode === 'delivery' ? deliveryFee : 0)

  const etaMins = useMemo(() => {
    if (lines.length === 0) return 0
    const slowest = Math.max(...lines.map((line) => line.item.prepMins))
    const extra = mode === 'delivery' ? 22 : mode === 'takeaway' ? 4 : 8
    return slowest + extra
  }, [lines, mode])

  const addressMissing = mode === 'delivery' && address.trim().length < 8
  const blocked =
    lines.length === 0 || belowMinimum || addressMissing

  // Lock the page behind the drawer, and let Escape close it.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    panelRef.current?.focus()
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const handlePlace = () => {
    const order: Order = {
      id: orderReference(Math.floor(Math.random() * 8999)),
      placedAt: Date.now(),
      mode,
      table,
      lines,
      subtotal,
      taxes,
      deliveryFee: mode === 'delivery' ? deliveryFee : 0,
      total,
      notes: notes.trim(),
      address: mode === 'delivery' ? address.trim() : '',
      etaMins,
    }
    setPlaced(order)
    onPlaceOrder(order)
  }

  const close = () => {
    onClose()
    // Let the exit animation finish before the next basket is built.
    window.setTimeout(() => {
      setPlaced(null)
      setNotes('')
      setAddress('')
      setMode('dine-in')
    }, 280)
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-60">
          <motion.button
            type="button"
            aria-label="Close the order summary"
            onClick={close}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
            tabIndex={-1}
            initial={reduce ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reduce ? undefined : { x: '100%' }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[27rem] flex-col bg-cream shadow-panel outline-none"
          >
            {placed ? (
              <Confirmation order={placed} onClose={close} />
            ) : (
              <>
                <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
                  <div>
                    <h2 className="font-display text-2xl leading-none">Your order</h2>
                    <p className="mt-1.5 text-xs text-ink-faint">
                      {lines.length === 0
                        ? 'Nothing added yet'
                        : `${lines.reduce((sum, line) => sum + line.qty, 0)} item${lines.reduce((sum, line) => sum + line.qty, 0) === 1 ? '' : 's'} · ${tableLabel(table)}`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-paper"
                    aria-label="Close the order summary"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>

                {lines.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                    <span className="inline-flex size-14 items-center justify-center rounded-full bg-sand text-ink-faint">
                      <ShoppingBag className="size-6" aria-hidden="true" />
                    </span>
                    <p className="mt-5 font-display text-xl">Your basket is empty</p>
                    <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-ink-soft">
                      Add something from the menu and it will appear here. No account, no app, no
                      waiting at the counter.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto px-6 py-5">
                      <ul className="space-y-4">
                        {lines.map(({ item, qty }) => (
                          <li key={item.id} className="flex gap-3.5">
                            <img
                              src={item.image}
                              alt=""
                              width={72}
                              height={72}
                              loading="lazy"
                              className="size-18 shrink-0 rounded-xl bg-sand object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-baseline justify-between gap-3">
                                <h3 className="truncate font-display text-base">{item.name}</h3>
                                <span className="tabular shrink-0 text-sm font-bold">
                                  {formatPrice(item.price * qty)}
                                </span>
                              </div>
                              <p className="mt-0.5 text-xs text-ink-faint">
                                {formatPrice(item.price)} each · {item.prepMins} min
                              </p>
                              <div className="mt-2">
                                <QtyStepper
                                  qty={qty}
                                  label={item.name}
                                  onChange={(next) => onSetQty(item.id, next)}
                                />
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7">
                        <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                          How is this going?
                        </h3>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {MODES.map((option) => {
                            const Icon = option.icon
                            const active = option.id === mode
                            return (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => setMode(option.id)}
                                aria-pressed={active}
                                className={`rounded-xl border px-2 py-3 text-center transition-colors duration-200 ${
                                  active
                                    ? 'border-ink bg-ink text-paper'
                                    : 'border-line bg-paper text-ink-soft hover:border-clay hover:text-clay'
                                }`}
                              >
                                <Icon className="mx-auto size-4" aria-hidden="true" />
                                <span className="mt-1.5 block text-xs font-semibold">
                                  {option.label}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                        <p className="mt-2 text-xs text-ink-faint">
                          {MODES.find((option) => option.id === mode)?.note}
                        </p>
                      </div>

                      {mode === 'delivery' ? (
                        <div className="mt-5">
                          <label
                            htmlFor="delivery-address"
                            className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-faint"
                          >
                            <MapPin className="size-3.5" aria-hidden="true" />
                            Delivery address
                          </label>
                          <textarea
                            id="delivery-address"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            rows={2}
                            placeholder="Flat, street, landmark"
                            aria-invalid={addressMissing && address.length > 0}
                            className={`mt-2 w-full resize-none rounded-xl border bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none ${
                              addressMissing && address.length > 0
                                ? 'border-chili'
                                : 'border-line focus:border-clay'
                            }`}
                          />
                          <p className="mt-2 text-xs text-ink-faint">
                            {belowMinimum
                              ? `Delivery starts at ${formatPrice(RESTAURANT.minOrderForDelivery)}.`
                              : `Free above ${formatPrice(RESTAURANT.freeDeliveryOver)}.`}
                          </p>
                        </div>
                      ) : null}

                      <div className="mt-5">
                        <label
                          htmlFor="order-notes"
                          className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-faint"
                        >
                          Note for the kitchen
                        </label>
                        <textarea
                          id="order-notes"
                          value={notes}
                          onChange={(event) => setNotes(event.target.value)}
                          rows={2}
                          maxLength={180}
                          placeholder="Less spicy, no coriander, allergy…"
                          className="mt-2 w-full resize-none rounded-xl border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-clay focus:outline-none"
                        />
                      </div>

                      <div className="mt-6 border-t border-line pt-5">
                        <Bill
                          subtotal={subtotal}
                          taxes={taxes}
                          deliveryFee={mode === 'delivery' ? deliveryFee : 0}
                          total={total}
                        />
                      </div>
                    </div>

                    <div className="border-t border-line bg-cream px-6 py-4">
                      <button
                        type="button"
                        onClick={handlePlace}
                        disabled={blocked}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-clay px-6 py-4 text-sm font-bold text-paper transition-colors duration-200 hover:bg-clay-deep disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        <Flame className="size-4" aria-hidden="true" />
                        {mode === 'dine-in'
                          ? `Send to ${tableLabel(table)}`
                          : mode === 'takeaway'
                            ? 'Place pickup order'
                            : 'Place delivery order'}
                      </button>
                      <p className="mt-2.5 text-center text-xs text-ink-faint">
                        {belowMinimum
                          ? `Add ${formatPrice(RESTAURANT.minOrderForDelivery - subtotal)} more for delivery`
                          : addressMissing
                            ? 'Add a delivery address to continue'
                            : `About ${etaMins} min · ${formatPrice(total)} ${PAY_LABEL[mode]}`}
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}