import { AtSign, Mail, MapPin, Phone } from 'lucide-react'
import { RESTAURANT } from '../data/site'
import { routeHref } from '../router'
import { tableLabel } from '../format'
import { BrandMark } from './TopBar'

export default function Footer({ table }: { table: string }) {
  return (
    <footer className="border-t border-line bg-ink text-sand">
      <div className="shell grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-2.5 text-sand">
            <BrandMark />
            <span className="font-display text-xl font-semibold tracking-tight">
              {RESTAURANT.name}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand/70">
            {RESTAURANT.tagline}. Order from the code on your table, or walk in and take whatever
            the pass is sending out.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-sand/25 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-sand/80">
            <MapPin className="size-3.5" aria-hidden="true" />
            Now ordering for {tableLabel(table)}
          </p>
        </div>

        <nav aria-label="Footer" className="text-sm">
          <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-sand/50">
            Pages
          </h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={routeHref('menu', { table })}
                className="text-sand/85 underline-offset-4 hover:text-sand hover:underline"
              >
                Order from the menu
              </a>
            </li>
            <li>
              <a
                href={routeHref('about', { table })}
                className="text-sand/85 underline-offset-4 hover:text-sand hover:underline"
              >
                About the kitchen
              </a>
            </li>
          </ul>

          <h2 className="mt-8 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-sand/50">
            Hours
          </h2>
          <ul className="mt-4 space-y-2.5">
            {RESTAURANT.hours.map((row) => (
              <li key={row.days} className="flex items-baseline justify-between gap-4 text-sand/85">
                <span>{row.days}</span>
                <span className="tabular shrink-0 text-xs text-sand/70">{row.time}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-sand/50">
            Find us
          </h2>
          <ul className="mt-4 space-y-3.5">
            <li className="flex gap-3 leading-relaxed text-sand/85">
              <MapPin className="mt-0.5 size-4 shrink-0 text-sand/50" aria-hidden="true" />
              <span>
                {RESTAURANT.addressLine1}
                <br />
                {RESTAURANT.addressLine2}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-sand/50" aria-hidden="true" />
              <a
                href={`tel:${RESTAURANT.phoneDial}`}
                className="text-sand/85 underline-offset-4 hover:text-sand hover:underline"
              >
                {RESTAURANT.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-sand/50" aria-hidden="true" />
              <a
                href={`mailto:${RESTAURANT.email}`}
                className="text-sand/85 underline-offset-4 hover:text-sand hover:underline"
              >
                {RESTAURANT.email}
              </a>
            </li>
            <li className="flex gap-3">
              <AtSign className="mt-0.5 size-4 shrink-0 text-sand/50" aria-hidden="true" />
              <span className="text-sand/85">{RESTAURANT.instagram}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell border-t border-sand/15 py-6">
        <p className="text-xs leading-relaxed text-sand/55">
          A front-end demo of QR-based table ordering. {RESTAURANT.name}, its staff, prices and
          kitchen times are fictional; photographs are openly licensed work credited on the About
          page.
        </p>
      </div>
    </footer>
  )
}