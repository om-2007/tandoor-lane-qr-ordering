import { Flame, Plus } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { formatPrice } from '../format'
import { Photo } from './ui'
import QtyStepper from './QtyStepper'
import type { MenuItem } from '../types'

const SPICE_LABEL = ['', 'Mild', 'Medium', 'Hot'] as const

function DietMark({ diet }: { diet: MenuItem['diet'] }) {
  const veg = diet === 'veg'
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${veg ? 'text-moss' : 'text-chili'}`}
      title={veg ? 'Vegetarian' : 'Non-vegetarian'}
    >
      <span className="diet-dot" aria-hidden="true" />
      <span className="sr-only">{veg ? 'Vegetarian' : 'Non-vegetarian'}</span>
    </span>
  )
}

export default function MenuCard({
  item,
  qty,
  onAdd,
  onSetQty,
}: {
  item: MenuItem
  qty: number
  onAdd: (id: string) => void
  onSetQty: (id: string, qty: number) => void
}) {
  const reduce = useReducedMotion()

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-card transition-shadow duration-300 hover:shadow-panel">
      <div className="relative aspect-4/3 overflow-hidden">
        <Photo
          src={item.image}
          alt={item.name}
          className="absolute inset-0"
          imgClassName={
            reduce
              ? ''
              : 'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]'
          }
        />

        {item.signature ? (
          <span className="absolute left-3 top-3 rounded-full bg-ink/92 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-paper">
            Signature
          </span>
        ) : null}

        <span className="absolute right-3 top-3 rounded-full bg-paper/92 px-2.5 py-1 text-[0.65rem] font-bold text-ink backdrop-blur-sm">
          {item.prepMins} min
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg leading-tight text-balance">{item.name}</h3>
          <span className="tabular shrink-0 text-[0.95rem] font-bold text-ink">
            {formatPrice(item.price)}
          </span>
        </div>

        <p className="text-[0.8125rem] leading-relaxed text-ink-soft text-pretty">
          {item.description}
        </p>

        <div className="mt-auto flex items-center gap-3 pt-1.5">
          <DietMark diet={item.diet} />
          {item.spice > 0 ? (
            <span className="inline-flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-ink-faint">
              <Flame className="size-3.5" aria-hidden="true" />
              {SPICE_LABEL[item.spice]}
            </span>
          ) : null}
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            {item.category}
          </span>

          <div className="ml-auto shrink-0">
            {qty === 0 ? (
              <button
                type="button"
                onClick={() => onAdd(item.id)}
                aria-label={`Add ${item.name} to your order`}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-paper px-4 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:border-clay hover:bg-clay hover:text-paper"
              >
                <Plus className="size-4" aria-hidden="true" />
                Add
              </button>
            ) : (
              <motion.div
                initial={reduce ? false : { scale: 0.86, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <QtyStepper
                  qty={qty}
                  label={item.name}
                  onChange={(next) => onSetQty(item.id, next)}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}