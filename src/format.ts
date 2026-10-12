const inr = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
  style: 'decimal',
})

/** Menu prices are stored as whole rupees. */
export function formatPrice(rupees: number): string {
  return `₹${inr.format(rupees)}`
}

/** Minutes are shown the way a kitchen quotes them: "18 min", "1 hr 5 min". */
export function formatMins(mins: number): string {
  if (mins < 60) return `${mins} min`
  const hours = Math.floor(mins / 60)
  const rest = mins % 60
  return rest === 0 ? `${hours} hr` : `${hours} hr ${rest} min`
}

export function formatClock(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

/** Human-friendly table label: "7" becomes "Table 07". */
export function tableLabel(table: string): string {
  const n = Number.parseInt(table, 10)
  return Number.isFinite(n) ? `Table ${String(n).padStart(2, '0')}` : `Table ${table}`
}

/** Demo order reference, e.g. "TL-4821". */
export function orderReference(seed: number): string {
  const digits = String(1000 + (seed % 8999))
  return `TL-${digits}`
}