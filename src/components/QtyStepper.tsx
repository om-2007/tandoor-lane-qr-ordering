import { Minus, Plus } from 'lucide-react'

const STEP_CLASS =
  'inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-150 hover:border-clay hover:bg-clay hover:text-paper disabled:pointer-events-none disabled:opacity-35'

export default function QtyStepper({
  qty,
  label,
  min = 0,
  max = 20,
  onChange,
}: {
  qty: number
  label: string
  min?: number
  max?: number
  onChange: (next: number) => void
}) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-ink/20 bg-paper py-1 pr-1 pl-1"
      role="group"
      aria-label={`Quantity for ${label}`}
    >
      <button
        type="button"
        className={STEP_CLASS}
        onClick={() => onChange(qty - 1)}
        disabled={qty <= min}
        aria-label={qty - 1 <= min ? `Remove ${label}` : `One less ${label}`}
      >
        <Minus className="size-3.5" aria-hidden="true" />
      </button>
      <span aria-live="polite" className="tabular w-6 text-center text-sm font-bold text-ink">
        {qty}
      </span>
      <button
        type="button"
        className={STEP_CLASS}
        onClick={() => onChange(qty + 1)}
        disabled={qty >= max}
        aria-label={`One more ${label}`}
      >
        <Plus className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  )
}