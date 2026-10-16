import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Check, RotateCcw, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PackageCard } from '@/components/site/cards'
import { useInquiry } from '@/components/site/inquiry-dialog'
import { CtaBand, Eyebrow, PageHero } from '@/components/site/section'
import { PACKAGES } from '@/data/site'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/packages')({
  head: () => ({
    meta: [
      { title: 'eCommerce Packages & Pricing | Rabiu Yustech' },
      {
        name: 'description',
        content:
          'Fixed-scope packages for store audits, store design, SEO and GEO, Facebook and Instagram shops, Google Merchant Center, email automation and full store setup.',
      },
    ],
  }),
  component: Packages,
})

const STAGES = [
  { id: 'none', label: "I don't have a store yet" },
  { id: 'new', label: 'My store is new or unfinished' },
  { id: 'live', label: 'My store is live and selling' },
] as const

const GOALS = [
  { id: 'unsure', label: "I'm not sure what's holding it back", pkg: 'audit', alt: 'design' },
  { id: 'convert', label: 'Visitors come but don’t buy', pkg: 'design', alt: 'audit' },
  { id: 'search', label: 'More shoppers from Google & AI search', pkg: 'seo', alt: 'google' },
  { id: 'shopping', label: 'Show products on Google Shopping', pkg: 'google', alt: 'seo' },
  { id: 'social', label: 'Sell on Facebook, Instagram or TikTok', pkg: 'social', alt: 'crm' },
  { id: 'retain', label: 'Bring shoppers & customers back', pkg: 'crm', alt: 'social' },
] as const

type Stage = (typeof STAGES)[number]['id']
type Goal = (typeof GOALS)[number]['id']

function Packages() {
  const { openAsk } = useInquiry()
  return (
    <>
      <PageHero
        eyebrow="Packages & pricing"
        title={
          <>
            Clear scope. <span className="text-primary">Clear starting price.</span>
          </>
        }
        lead="Open any package to see exactly what's included, what isn't, and what I need from you. Then send the details straight to me. The final quote is confirmed in writing before any work begins."
      />
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <Recommender />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.filter((p) => !p.featured).map((p, i) => (
            <PackageCard key={p.id} pkg={p} index={i} />
          ))}
        </div>
        <FeaturedPackage />
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          Prices are starting prices in USD. The final quote depends on your store size, catalog, integrations and timeline, and is
          confirmed with you in writing before any work begins. No payment is taken on this website.
        </p>
        <div
          data-reveal
          className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[2rem] border bg-card p-8 sm:flex-row sm:items-center"
        >
          <div>
            <h2 className="text-2xl font-bold">Need a mix of packages, or something custom?</h2>
            <p className="mt-1 text-muted-foreground">Tell me what you need and I'll put together a combined scope.</p>
          </div>
          <Button size="lg" className="rounded-full" onClick={() => openAsk('Custom or combined package')}>
            Request a custom quote <ArrowRight />
          </Button>
        </div>
      </div>
      <CtaBand />
    </>
  )
}

function FeaturedPackage() {
  const { openPackage } = useInquiry()
  const pkg = PACKAGES.find((p) => p.featured)
  if (!pkg) return null
  return (
    <article
      data-reveal
      className="relative mt-4 grid gap-8 overflow-hidden rounded-[2rem] bg-primary p-7 text-primary-foreground sm:p-10 lg:grid-cols-[1fr_1.1fr]"
    >
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-signal px-3 py-1 font-mono text-[0.68rem] font-medium tracking-wider text-signal-foreground uppercase">
          <Sparkles className="size-3" aria-hidden="true" /> Complete solution
        </span>
        <h2 className="mt-5 text-3xl leading-tight font-extrabold sm:text-5xl">{pkg.name}</h2>
        <p className="mt-4 max-w-md text-primary-foreground/85">{pkg.desc}</p>
        <p className="mt-6 font-display text-5xl font-extrabold">
          <span className="mr-2 font-mono text-sm font-normal opacity-75">from</span>
          {pkg.price}
        </p>
        <p className="mt-1 text-sm opacity-75">Typical delivery {pkg.time}</p>
        <Button
          size="lg"
          className="mt-7 rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          onClick={() => openPackage(pkg.id)}
        >
          View details & order <ArrowRight />
        </Button>
      </div>
      <ul className="relative grid content-start gap-x-6 gap-y-3 sm:grid-cols-2">
        {pkg.includes.map((i) => (
          <li key={i} className="flex gap-2.5 border-t border-primary-foreground/20 pt-3 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden="true" />
            {i}
          </li>
        ))}
      </ul>
    </article>
  )
}

function Recommender() {
  const { openPackage } = useInquiry()
  const [stage, setStage] = useState<Stage | null>(null)
  const [goal, setGoal] = useState<Goal | null>(null)

  const needsFull = stage === 'none' || stage === 'new'
  const goalDef = GOALS.find((g) => g.id === goal)
  const ready = stage === 'none' || (stage !== null && goal !== null)
  const recId = stage === 'none' ? 'full' : needsFull && goal ? 'full' : goalDef?.pkg
  const altId = stage === 'none' ? 'audit' : goalDef ? (recId === 'full' ? goalDef.pkg : goalDef.alt) : undefined
  const rec = PACKAGES.find((p) => p.id === recId)
  const alt = PACKAGES.find((p) => p.id === altId)

  return (
    <section
      data-reveal
      aria-labelledby="rec-title"
      className="relative overflow-hidden rounded-[2rem] border bg-gradient-to-br from-primary/15 via-card to-card p-6 sm:p-10"
    >
      <div className="glow-orb pointer-events-none absolute -top-32 -right-32 size-96" aria-hidden="true" />
      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Eyebrow>Not sure where to start?</Eyebrow>
          <h2 id="rec-title" className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Find your starting package in two taps.
          </h2>
          <fieldset className="mt-8">
            <legend className="mb-3 text-sm font-semibold">1. Where is your store today?</legend>
            <div className="flex flex-wrap gap-2">
              {STAGES.map((s) => (
                <Choice
                  key={s.id}
                  on={stage === s.id}
                  onClick={() => {
                    setStage(s.id)
                    if (s.id === 'none') setGoal(null)
                  }}
                >
                  {s.label}
                </Choice>
              ))}
            </div>
          </fieldset>
          <fieldset className={cn('mt-6 transition-opacity', stage === 'none' && 'pointer-events-none opacity-40')} disabled={stage === 'none'}>
            <legend className="mb-3 text-sm font-semibold">2. What do you most want to improve?</legend>
            <div className="flex flex-wrap gap-2">
              {GOALS.map((g) => (
                <Choice key={g.id} on={goal === g.id} onClick={() => setGoal(g.id)}>
                  {g.label}
                </Choice>
              ))}
            </div>
          </fieldset>
        </div>

        <div aria-live="polite" className="flex">
          {ready && rec ? (
            <div className="flex w-full flex-col rounded-3xl border border-primary/50 bg-background/80 p-6 backdrop-blur animate-in fade-in-0 slide-in-from-bottom-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-primary uppercase">
                <Sparkles className="size-3.5" aria-hidden="true" /> Recommended start
              </span>
              <h3 className="mt-3 text-2xl font-bold">{rec.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{rec.short}</p>
              <p className="mt-4 font-display text-3xl font-extrabold">
                <span className="mr-1 font-mono text-xs font-normal text-muted-foreground">from</span>
                {rec.price}
                <span className="ml-2 font-sans text-sm font-normal text-muted-foreground">· {rec.time}</span>
              </p>
              {alt && alt.id !== rec.id && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Pairs well with{' '}
                  <button type="button" className="font-semibold text-foreground underline underline-offset-4 hover:text-primary" onClick={() => openPackage(alt.id)}>
                    {alt.name}
                  </button>
                  .
                </p>
              )}
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                <Button className="rounded-full" onClick={() => openPackage(rec.id)}>
                  View & order <ArrowRight />
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => {
                    setStage(null)
                    setGoal(null)
                  }}
                >
                  <RotateCcw /> Start over
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid w-full place-items-center rounded-3xl border border-dashed p-8 text-center">
              <div>
                <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-secondary text-primary">
                  <Sparkles className="size-6" aria-hidden="true" />
                </div>
                <p className="mt-4 font-semibold">Your recommendation appears here</p>
                <p className="mt-1 text-sm text-muted-foreground">Answer the two questions to see where I'd start.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Choice({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className="rounded-full border bg-background/60 px-4 py-2 text-sm transition-colors hover:border-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground motion-reduce:transition-none"
    >
      {children}
    </button>
  )
}
