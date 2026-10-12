import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { formatPrice } from '../format'

/** Persistent review bar for phones, where the header cart button is out of thumb reach. */
export default function OrderBar({
  count,
  total,
  onOpen,
}: {
  count: number
  total: number
  onOpen: () => void
}) {
  const reduce = useReducedMotion()

  return (
    <AnimatePresence>
      {count > 0 ? (
        <motion.div
          key="bar"
          initial={reduce ? false : { y: '110%' }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: '110%' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
        >
          <div className="border-t border-line bg-paper/96 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md">
            <button
              type="button"
              onClick={onOpen}
              className="flex w-full items-center gap-3 rounded-full bg-ink px-5 py-3.5 text-paper transition-colors hover:bg-clay-deep"
            >
              <span className="relative inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-saffron text-ink">
                <ShoppingBag className="size-4" aria-hidden="true" />
              </span>
              <span className="flex-1 text-left text-sm font-semibold">
                {count} item{count === 1 ? '' : 's'}
                <span className="tabular ml-2 font-bold">{formatPrice(total)}</span>
              </span>
              <span className="rounded-full bg-paper/15 px-4 py-2 text-sm font-bold">
                Review order
              </span>
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}