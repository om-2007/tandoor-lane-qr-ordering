import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export const primaryBtn =
  'inline-flex items-center justify-center gap-2 rounded-full bg-clay px-6 py-3 text-sm font-semibold text-paper shadow-lift transition-colors duration-200 hover:bg-clay-deep disabled:cursor-not-allowed disabled:opacity-45'

export const ghostBtn =
  'inline-flex items-center justify-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper'

export const chipBtn =
  'rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink-soft transition-colors duration-200 hover:border-clay hover:text-clay'

/** Scroll reveal that collapses to a plain block when motion is unwanted. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children, tone = 'clay' }: { children: ReactNode; tone?: 'clay' | 'leaf' }) {
  const rule = tone === 'leaf' ? 'bg-leaf/40' : 'bg-clay/40'
  const text = tone === 'leaf' ? 'text-leaf' : 'text-clay'

  return (
    <span className={`inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] ${text}`}>
      <span className={`h-px w-8 ${rule}`} aria-hidden="true" />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = 'clay',
  align = 'left',
}: {
  eyebrow: string
  title: ReactNode
  lede?: string
  tone?: 'clay' | 'leaf'
  align?: 'left' | 'center'
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <span className={align === 'center' ? 'flex justify-center' : undefined}>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </span>
      <h2 className="mt-5 font-display text-title leading-[1.08] tracking-[-0.01em] text-balance">
        {title}
      </h2>
      {lede ? <p className="mt-5 text-lede leading-relaxed text-ink-soft text-pretty">{lede}</p> : null}
    </div>
  )
}

/** Thin horizontal rule used to open sections. */
export function Rule({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`h-px w-full bg-line ${className}`} />
}

/**
 * Photograph with a fixed box and a graceful failure state, so a missing or
 * slow file never shifts the grid or leaves a blank hole in the card.
 */
export function Photo({
  src,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  priority?: boolean
}) {
  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      <img
        src={src}
        alt={alt}
        width={960}
        height={720}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onError={(event) => {
          event.currentTarget.style.display = 'none'
        }}
        className={`size-full object-cover ${imgClassName}`}
      />
    </div>
  )
}