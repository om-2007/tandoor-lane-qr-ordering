import { Clock3, Mail, MapPin, Phone, QrCode, Smartphone } from 'lucide-react'
import { Eyebrow, Photo, Reveal, Rule, SectionHeading } from './ui'
import { IMAGES, QR_STEPS, QR_TARGET, RESTAURANT, ROOM, STORY, VALUES } from '../data/site'
import { PHOTO_CREDITS } from '../data/credits'
import { routeHref } from '../router'
import { formatPrice, tableLabel } from '../format'

const GALLERY: { src: string; alt: string; caption: string; span: string }[] = [
  {
    src: IMAGES.tandoor,
    alt: 'A cook reaching into a clay tandoor with a long-handled cloth',
    caption: 'The tandoor is loaded by hand. No tongs, no proxy.',
    span: 'sm:col-span-2 sm:row-span-2',
  },
  {
    src: IMAGES.spice,
    alt: 'Bowls of ground spices, cardamom pods and peppercorns',
    caption: 'Grind of the week, mixed on Tuesdays.',
    span: '',
  },
  {
    src: IMAGES.thali,
    alt: 'A thali plate of small bowls of curries, rice and vegetables',
    caption: 'Lunch thali, served until it runs out.',
    span: '',
  },
  {
    src: IMAGES.dining,
    alt: 'A restaurant table laid with plated food and glasses',
    caption: 'Table nine, ten minutes before service.',
    span: 'sm:col-span-2',
  },
]

export default function AboutPage({ table }: { table: string }) {
  return (
    <main id="main" className="pt-16 lg:pt-20">
      {/* Hero ------------------------------------------------------------ */}
      <section className="shell pt-12 pb-14 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>About the kitchen</Eyebrow>
            <h1 className="mt-5 text-hero leading-[1.02] tracking-[-0.02em] text-balance">
              Coal, a clay oven,
              <br />
              <span className="text-leaf">and a short menu.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lede leading-relaxed text-ink-soft text-pretty">
              {RESTAURANT.blurb}
            </p>

            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6">
              <div>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                  Open since
                </dt>
                <dd className="mt-1 font-display text-xl">{RESTAURANT.since}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                  Dish count
                </dt>
                <dd className="mt-1 font-display text-xl">16, seasonally cut</dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={routeHref('menu', { table })} className="primaryBtn">
                <QrCode className="size-4" aria-hidden="true" />
                Open the {tableLabel(table)} menu
              </a>
              <a href={`tel:${RESTAURANT.phoneDial}`} className="ghostBtn">
                <Phone className="size-4" aria-hidden="true" />
                {RESTAURANT.phoneDisplay}
              </a>
            </div>
          </div>

          <Reveal className="relative">
            <Photo
              src={IMAGES.hero}
              alt="The dining room at Tandoor Lane, set for evening service"
              priority
              className="aspect-4/5 rounded-3xl shadow-panel lg:aspect-3/4"
            />
            <figure className="absolute -bottom-5 -left-4 max-w-[15rem] rounded-2xl border border-line bg-paper p-4 shadow-panel sm:left-6">
              <blockquote className="font-display text-sm leading-snug text-ink">
                “Eight kilometres of walking a day, gone.”
              </blockquote>
              <figcaption className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Manager, on the QR codes
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Story ----------------------------------------------------------- */}
      <section className="bg-sand/45 py-16 lg:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <Photo
              src={IMAGES.chef}
              alt="A chef plating dishes at the pass while guests watch from the counter"
              className="aspect-4/3 rounded-3xl shadow-lift"
            />
          </Reveal>

          <div>
            <SectionHeading eyebrow="The short version" title="How this place works" />
            <div className="mt-7 space-y-5 text-[0.975rem] leading-relaxed text-ink-soft text-pretty">
              {STORY.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line/80 pt-6">
              {ROOM.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-display text-xl">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* QR ordering ----------------------------------------------------- */}
      <section className="shell py-16 lg:py-24">
        <SectionHeading
          eyebrow="Table-side ordering"
          title={
            <>
              Three taps from the code
              <br />
              <span className="text-clay">to the pass.</span>
            </>
          }
          lede="Every table carries a laminated QR tent. It opens this menu with the table number already attached, so the order lands in the kitchen queue with nobody typing in a number."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-14">
          <ol className="space-y-7">
            {QR_STEPS.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.06}>
                <li className="flex gap-5 border-b border-line pb-7 last:border-0 last:pb-0">
                  <span className="tabular font-display text-3xl leading-none text-clay/45">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-display text-xl leading-snug">{item.title}</h3>
                    <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft text-pretty">
                      {item.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          {/* The actual table tent, rendered from the shipped asset. */}
          <Reveal delay={0.12}>
            <div className="rounded-3xl border border-line bg-paper p-6 text-center shadow-card sm:p-8">
              <div className="mx-auto flex w-max items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-paper">
                <Smartphone className="size-3.5" aria-hidden="true" />
                Table tent
              </div>

              <img
                src={IMAGES.qr}
                width={196}
                height={196}
                alt={`QR code that opens the ${tableLabel(table)} menu`}
                className="mx-auto mt-6 size-44 rounded-2xl border border-line bg-paper p-3 sm:size-52"
              />

              <p className="mt-6 font-display text-2xl leading-tight">{tableLabel(table)}</p>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
                Scan with any camera app. The browser opens the menu with{' '}
                <code className="rounded bg-sand px-1.5 py-0.5 text-[0.8em] text-clay-deep">?table=7</code>{' '}
                already set, and the order comes back to this table.
              </p>

              <p className="mt-5 rounded-xl border border-dashed border-line bg-cream px-4 py-3 text-[0.7rem] leading-relaxed break-all text-ink-faint">
                <span className="font-semibold uppercase tracking-[0.14em]">Encodes</span>
                <br />
                {QR_TARGET}
              </p>

              <p className="mt-4 text-xs text-ink-faint">
                One printed tent costs {formatPrice(40)} and takes about a year to scuff out.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values ---------------------------------------------------------- */}
      <section className="bg-leaf/6 py-16 lg:py-24">
        <div className="shell">
          <SectionHeading
            tone="leaf"
            align="center"
            eyebrow="What we will not cut"
            title="Three things we hold on to"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {VALUES.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.07}>
                <div className="h-full rounded-2xl border border-leaf/20 bg-paper p-7">
                  <h3 className="font-display text-xl leading-snug text-ink">{value.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft text-pretty">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery --------------------------------------------------------- */}
      <section className="shell py-16 lg:py-24">
        <SectionHeading
          eyebrow="The room"
          title="Where you will be sitting"
          lede="Fourteen tables, one long window bench and a kitchen you can hear from every one of them."
        />

        <div className="mt-10 grid auto-rows-[13rem] gap-4 sm:auto-rows-[15rem] sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY.map((item, index) => (
            <Reveal key={item.src} delay={index * 0.05} className={item.span}>
              <figure className="group relative size-full overflow-hidden rounded-2xl">
                <Photo
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0"
                  imgClassName="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-[0.8125rem] leading-snug font-medium text-paper">
                  {item.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Visit ----------------------------------------------------------- */}
      <section className="border-t border-line bg-sand/45 py-16 lg:py-24">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Visit" title="Where to find us" />
            <ul className="mt-8 space-y-5 text-[0.9375rem]">
              <li className="flex gap-3.5">
                <MapPin className="mt-0.5 size-5 shrink-0 text-clay" aria-hidden="true" />
                <span className="leading-relaxed text-ink-soft">
                  {RESTAURANT.addressLine1}
                  <br />
                  {RESTAURANT.addressLine2}
                </span>
              </li>
              <li className="flex gap-3.5">
                <Phone className="mt-0.5 size-5 shrink-0 text-clay" aria-hidden="true" />
                <a
                  href={`tel:${RESTAURANT.phoneDial}`}
                  className="text-ink-soft underline-offset-4 hover:text-clay hover:underline"
                >
                  {RESTAURANT.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3.5">
                <Mail className="mt-0.5 size-5 shrink-0 text-clay" aria-hidden="true" />
                <a
                  href={`mailto:${RESTAURANT.email}`}
                  className="text-ink-soft underline-offset-4 hover:text-clay hover:underline"
                >
                  {RESTAURANT.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2.5 font-display text-xl">
              <Clock3 className="size-5 text-clay" aria-hidden="true" />
              Kitchen hours
            </h3>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {RESTAURANT.hours.map((row) => (
                <li key={row.days} className="flex items-baseline justify-between gap-6 py-3.5">
                  <span className="text-[0.9375rem] text-ink-soft">{row.days}</span>
                  <span className="tabular shrink-0 text-sm font-semibold text-ink">{row.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              The kitchen stops taking table tickets thirty minutes before close. Delivery closes
              twenty-five minutes earlier.
            </p>
          </div>
        </div>

        <Rule className="mx-auto mt-14 max-w-4xl" />

        <details className="mx-auto mt-6 max-w-4xl">
          <summary className="cursor-pointer list-none text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-faint marker:hidden hover:text-clay">
            Photography credits · openly licensed
          </summary>
          <p className="mt-4 text-xs leading-relaxed text-ink-faint">
            Every photograph on this site is openly licensed media sourced through Openverse. The
            restaurant, its staff and its dishes are fictional and made for this demo.
          </p>
          <ul className="mt-4 grid gap-x-8 gap-y-2 text-xs text-ink-soft sm:grid-cols-2">
            {PHOTO_CREDITS.map((credit) => (
              <li key={credit.slug} className="flex gap-2">
                <span className="font-semibold text-ink">{credit.title}</span>
                <span className="text-ink-faint">
                  by {credit.creator}, {credit.license}
                </span>
                {credit.sourcePage ? (
                  <a
                    href={credit.sourcePage}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="shrink-0 text-clay underline underline-offset-2"
                  >
                    source
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </details>
      </section>
    </main>
  )
}