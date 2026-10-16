import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight, Check, Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Marquee, PackageCard, ProjectCard, ReviewCard } from '@/components/site/cards'
import { FiverrIcon, ServiceIcon } from '@/components/site/icons'
import { revealDelay } from '@/components/site/reveal'
import { CtaBand, Eyebrow, SectionHeading } from '@/components/site/section'
import { CreativeGallery } from '@/components/site/creative-gallery'
import { EXPERTISE, PACKAGES, PROBLEMS, PROCESS, PROJECTS, REVIEWS, SERVICES, SITE } from '@/data/site'
import { cdn } from '@/lib/img'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: Home,
})

const reviewCountries = [...new Set(REVIEWS.map((r) => r.country))]
const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)

function Home() {
  return (
    <>
      <Hero />
      <ExpertiseMarquee />
      <Problems />
      <Services />
      <SelectedWork />
      <section className="mx-auto mt-28 max-w-content px-4 sm:px-6">
        <SectionHeading
          eyebrow="Creative & campaign visuals"
          title={
            <>
              Visuals that <span className="text-primary">sell the product</span>, not just decorate the page.
            </>
          }
          lead="Hero banners, collection visuals and sale campaigns designed for storefronts and social, built around each brand's look and audience."
        />
        <CreativeGallery className="mt-12" />
      </section>
      <PackagesRail />
      <Reviews />
      <Process />
      <CtaBand />
    </>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pb-24">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="glow-orb pointer-events-none absolute -top-48 right-[-10%] size-[48rem]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-content items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          <div data-reveal className="inline-flex items-center gap-2 rounded-full border bg-background/50 py-1 pr-3 pl-1 text-xs backdrop-blur">
            <span className="relative flex size-6 items-center justify-center rounded-full bg-signal/20">
              <span className="absolute inline-flex size-2.5 animate-ping rounded-full bg-signal opacity-60 motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-signal" />
            </span>
            <span className="text-muted-foreground">
              Taking new store projects · <span className="text-foreground">{SITE.role}</span>
            </span>
          </div>
          <h1
            data-reveal
            style={revealDelay(80)}
            className="mt-7 text-[clamp(2.9rem,7.6vw,6.4rem)] leading-[0.92] font-extrabold tracking-[-0.045em]"
          >
            More visibility.
            <br />
            Better shopping.
            <br />
            <span className="relative inline-block text-primary">
              Smarter growth.
              <svg
                className="absolute -bottom-3 left-0 w-full text-signal"
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M2 14 C 60 4, 120 18, 180 8 S 270 6, 298 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="draw-line" />
              </svg>
            </span>
          </h1>
          <p data-reveal style={revealDelay(160)} className="mt-9 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I'm <b className="font-semibold text-foreground">Rabiu Yusuf</b>. I help eCommerce brands find growth opportunities and
            improve the systems behind their stores, from Shopify optimization and SEO to social commerce and customer retention.
          </p>
          <div data-reveal style={revealDelay(240)} className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-full px-7 text-base">
              <Link to="/contact">
                Discuss your store <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-7 text-base">
              <Link to="/portfolio">
                Explore my work <ArrowRight />
              </Link>
            </Button>
          </div>
          <dl data-reveal style={revealDelay(320)} className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t pt-6">
            <div>
              <dt className="font-mono text-[0.65rem] tracking-wider text-muted-foreground uppercase">Fiverr rating</dt>
              <dd className="mt-1 flex items-center gap-1.5 font-display text-2xl font-extrabold">
                {avgRating} <Star className="size-5 fill-signal text-signal" aria-hidden="true" />
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.65rem] tracking-wider text-muted-foreground uppercase">Client countries</dt>
              <dd className="mt-1 font-display text-2xl font-extrabold">{reviewCountries.length}+</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.65rem] tracking-wider text-muted-foreground uppercase">Packages</dt>
              <dd className="mt-1 font-display text-2xl font-extrabold">{PACKAGES.length}</dd>
            </div>
          </dl>
        </div>

        <div data-reveal style={revealDelay(200)} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border bg-card shadow-[0_40px_120px_-40px_var(--glow)]">
            <img
              src={cdn('/img/portrait.png', 720)}
              srcSet={`${cdn('/img/portrait.png', 420)} 420w, ${cdn('/img/portrait.png', 720)} 720w, ${cdn('/img/portrait.png', 800)} 800w`}
              sizes="(min-width: 1024px) 34vw, 90vw"
              alt="Rabiu Yusuf in a navy suit and white shirt"
              width={800}
              height={800}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Floating "growth stack" checklist */}
          <div className="float-slow absolute -bottom-8 -left-4 w-60 rounded-2xl border bg-background/85 p-4 shadow-xl backdrop-blur-xl sm:-left-10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.62rem] tracking-wider text-muted-foreground uppercase">Growth stack</span>
              <span className="size-2 rounded-full bg-signal" aria-hidden="true" />
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {['Store & product pages', 'SEO + AI search', 'Merchant Center feed', 'Meta & TikTok catalog', 'Email flows'].map((t, i) => (
                <li key={t} className="flex items-center gap-2">
                  <span
                    className={cn(
                      'grid size-4 place-items-center rounded-full',
                      i < 4 ? 'bg-primary text-primary-foreground' : 'border border-dashed border-primary',
                    )}
                  >
                    {i < 4 && <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />}
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          {/* Floating funnel sparkline */}
          <div className="float-slower absolute -top-6 -right-3 w-52 rounded-2xl border bg-background/85 p-4 shadow-xl backdrop-blur-xl sm:-right-8">
            <span className="font-mono text-[0.62rem] tracking-wider text-muted-foreground uppercase">Path to purchase</span>
            <svg viewBox="0 0 160 60" className="mt-2 w-full" aria-hidden="true">
              <defs>
                <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 52 L28 44 L52 46 L80 30 L104 33 L128 16 L160 6 L160 60 L0 60Z" fill="url(#spark)" />
              <path
                d="M0 52 L28 44 L52 46 L80 30 L104 33 L128 16 L160 6"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2.5"
                strokeLinejoin="round"
                className="draw-line"
              />
              <circle cx="160" cy="6" r="3.5" fill="var(--signal)" />
            </svg>
            <div className="mt-1 flex justify-between font-mono text-[0.58rem] text-muted-foreground">
              <span>Discover</span>
              <span>Shop</span>
              <span>Return</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ExpertiseMarquee() {
  return (
    <div className="border-y bg-secondary/40 py-5">
      <Marquee speed={45}>
        {EXPERTISE.map((e) => (
          <span key={e} className="flex items-center gap-6 pr-6 font-display text-xl font-bold whitespace-nowrap sm:text-2xl">
            {e}
            <span className="text-primary" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}

function Problems() {
  return (
    <section className="mx-auto mt-28 grid max-w-content gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading
          eyebrow="The real problem"
          title="Your store may need more than traffic."
          lead="A store can have attractive products and a professional design while still missing growth opportunities. My approach is to look at how the parts work together, find the biggest obstacles, and prioritize what makes sense for your business."
        />
        <Button asChild variant="outline" className="mt-8 rounded-full">
          <a href={SITE.fiverr} target="_blank" rel="noopener">
            <FiverrIcon className="size-4" /> See independent reviews on Fiverr
          </a>
        </Button>
      </div>
      <ol className="grid gap-4 sm:grid-cols-2">
        {PROBLEMS.map((p, i) => (
          <li
            key={p.title}
            data-reveal
            style={revealDelay(i * 90)}
            className={cn(
              'group rounded-3xl border bg-card p-7 transition-colors hover:border-primary/60',
              i % 2 === 1 && 'sm:translate-y-10',
            )}
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <ServiceIcon name={p.icon} className="size-5" />
              </span>
              <span className="font-display text-5xl font-extrabold text-foreground/10">0{i + 1}</span>
            </div>
            <h3 className="mt-6 text-xl font-bold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Services() {
  return (
    <section className="mx-auto mt-36 max-w-content px-4 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Services" title="Everything your store needs to grow, from one specialist." />
        <Button asChild variant="ghost" className="rounded-full">
          <Link to="/services">
            All services in detail <ArrowRight />
          </Link>
        </Button>
      </div>
      <div className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s, i) => (
          <Link
            key={s.id}
            to="/services"
            hash={s.id}
            data-reveal
            style={revealDelay(i * 60)}
            className={cn(
              'group relative flex flex-col overflow-hidden rounded-3xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
              i === 0 && 'bg-primary text-primary-foreground sm:col-span-2 lg:row-span-2',
            )}
          >
            {i === 0 && (
              <img
                src={cdn('/img/store-illustration.jpg', 720)}
                alt=""
                loading="lazy"
                width={720}
                height={445}
                className="pointer-events-none absolute right-[-12%] bottom-[-8%] w-[85%] rounded-2xl opacity-90 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
              />
            )}
            <span
              className={cn(
                'relative grid size-11 place-items-center rounded-xl',
                i === 0 ? 'bg-primary-foreground/15' : 'bg-secondary text-primary',
              )}
            >
              <ServiceIcon name={s.icon} className="size-5" />
            </span>
            <h3 className={cn('relative mt-5 font-bold', i === 0 ? 'max-w-xs text-3xl leading-tight' : 'text-lg')}>{s.title}</h3>
            <p
              className={cn(
                'relative mt-2 text-sm leading-relaxed',
                i === 0 ? 'max-w-xs text-primary-foreground/80' : 'text-muted-foreground',
              )}
            >
              {s.hook}
            </p>
            <span className="relative mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold">
              Learn more <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function SelectedWork() {
  const [first, ...rest] = PROJECTS
  return (
    <section className="mx-auto mt-28 max-w-content px-4 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Stores across six very different industries."
          lead="Swimwear, ceremony wear, garden supplies, auto care, safes and eco cleaning. Each project page explains the business context and the focus areas of the work."
        />
        <Button asChild variant="ghost" className="rounded-full">
          <Link to="/portfolio">
            View all projects <ArrowRight />
          </Link>
        </Button>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ProjectCard project={first} large />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
          {rest.slice(0, 2).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PackagesRail() {
  return (
    <section className="mt-28">
      <div className="mx-auto flex max-w-content flex-wrap items-end justify-between gap-6 px-4 sm:px-6">
        <SectionHeading
          eyebrow="Packages"
          title="Choose a package. Message me the details."
          lead="Every package has a clear scope and starting price. Open one, see exactly what's included, and send your request in one tap. We agree the final quote first."
        />
        <Button asChild variant="ghost" className="rounded-full">
          <Link to="/packages">
            Compare all packages <ArrowRight />
          </Link>
        </Button>
      </div>
      <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-6 [scrollbar-width:thin] sm:px-6 lg:px-[max(1.5rem,calc((100vw-76rem)/2+1.5rem))]">
        {PACKAGES.map((p, i) => (
          <PackageCard key={p.id} pkg={p} index={i} className="w-[85vw] max-w-[22rem] shrink-0 snap-start" />
        ))}
      </div>
    </section>
  )
}

function Reviews() {
  const half = Math.ceil(REVIEWS.length / 2)
  return (
    <section className="mt-28">
      <div className="mx-auto flex max-w-content flex-wrap items-end justify-between gap-6 px-4 sm:px-6">
        <SectionHeading
          eyebrow="Client reviews"
          title={
            <>
              {avgRating} stars from real clients in {reviewCountries.join(', ').replace(/, ([^,]*)$/, ' and $1')}.
            </>
          }
        />
        <div className="flex gap-2">
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/reviews">
              Read all reviews <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-12 space-y-4">
        <Marquee speed={70}>
          {REVIEWS.slice(0, half).map((r, i) => (
            <div key={i} className="w-[22rem] shrink-0 pr-4">
              <ReviewCard review={r} />
            </div>
          ))}
        </Marquee>
        <Marquee speed={80} reverse>
          {REVIEWS.slice(half).map((r, i) => (
            <div key={i} className="w-[22rem] shrink-0 pr-4">
              <ReviewCard review={r} />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="mx-auto mt-28 max-w-content px-4 sm:px-6">
      <SectionHeading eyebrow="How we work" title="A clear process from analysis to implementation." />
      <ol className="relative mt-14 grid gap-8 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        <div className="absolute top-5 right-0 left-0 hidden h-px bg-gradient-to-r from-primary via-primary/40 to-transparent lg:block" aria-hidden="true" />
        {PROCESS.map((s, i) => (
          <li key={s.title} data-reveal style={revealDelay(i * 80)} className="relative">
            <span className="relative grid size-10 place-items-center rounded-full border-2 border-primary bg-background font-mono text-sm font-medium text-primary">
              {i + 1}
            </span>
            <h3 className="mt-5 text-base font-bold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10">
        <Eyebrow>No payment is taken on this site · Final quote agreed in writing</Eyebrow>
      </div>
    </section>
  )
}
