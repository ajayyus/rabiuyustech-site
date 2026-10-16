import { useState, type FormEvent } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle2, Eye, ShieldCheck, Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ReviewCard } from '@/components/site/cards'
import { FiverrIcon } from '@/components/site/icons'
import { PageHero } from '@/components/site/section'
import { REVIEW_COUNTRIES, REVIEWS, SITE } from '@/data/site'
import { submitNetlifyForm } from '@/lib/inquiry'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/reviews')({
  head: () => ({
    meta: [
      { title: 'Client Reviews | Rabiu Yustech' },
      { name: 'description', content: 'Read verified client reviews from Fiverr and share your own experience working with Rabiu Yustech.' },
    ],
  }),
  component: Reviews,
})

const countries = [...new Set(REVIEWS.map((r) => r.country))]
const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)

function Reviews() {
  const [filter, setFilter] = useState('all')
  const list = filter === 'all' ? REVIEWS : REVIEWS.filter((r) => r.country === filter)

  return (
    <>
      <PageHero
        eyebrow="Client reviews"
        title={
          <>
            Trust is earned <span className="text-primary">one project at a time.</span>
          </>
        }
        lead="I only publish reviews from real clients, and I link to Fiverr so you can check every one yourself."
      >
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="font-display text-6xl font-extrabold">{avg}</span>
            <div>
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-5 fill-signal text-signal" />
                ))}
              </span>
              <span className="text-sm text-muted-foreground">
                {REVIEWS.length} Fiverr reviews · {countries.length} countries
              </span>
            </div>
          </div>
        </div>
      </PageHero>

      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div role="group" aria-label="Filter reviews by country" className="flex flex-wrap gap-2">
          {['all', ...countries].map((c) => {
            const flag = REVIEWS.find((r) => r.country === c)?.flag
            const count = c === 'all' ? REVIEWS.length : REVIEWS.filter((r) => r.country === c).length
            return (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className="rounded-full border px-4 py-2 text-sm transition-colors hover:border-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
              >
                {c === 'all' ? 'All countries' : `${flag} ${c}`} <span className="ml-1 opacity-60">{count}</span>
              </button>
            )
          })}
        </div>
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {list.map((r, i) => (
            <ReviewCard key={`${r.name}-${i}`} review={r} />
          ))}
        </div>

        <div className="mt-20 grid gap-5 lg:grid-cols-2">
          <div data-reveal className="rounded-[2rem] border bg-card p-8">
            <h2 className="text-2xl font-bold">Verified reviews live on Fiverr</h2>
            <p className="mt-2 text-muted-foreground">
              Every Fiverr review is tied to a real paid order and cannot be edited by me. It's the most reliable way to check how I
              work with clients.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                [ShieldCheck, 'Reviews come from completed orders on a third-party platform.'],
                [Eye, 'You can see client countries, order details and my full history.'],
                [CheckCircle2, 'This site never shows made-up ratings, counters or client logos.'],
              ].map(([Icon, text], i) => {
                const I = Icon as typeof ShieldCheck
                return (
                  <li key={i} className="flex gap-3">
                    <I className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    {text as string}
                  </li>
                )
              })}
            </ul>
            <Button asChild size="lg" className="mt-8 rounded-full">
              <a href={SITE.fiverr} target="_blank" rel="noopener">
                <FiverrIcon className="size-4" /> Read my Fiverr reviews
              </a>
            </Button>
          </div>
          <ReviewForm />
        </div>
      </div>
    </>
  )
}

const selectClass =
  'h-9 w-full rounded-md border border-input bg-transparent px-3 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm dark:bg-input/30'

type State = 'idle' | 'pending' | 'success' | 'error'

function ReviewForm() {
  const [state, setState] = useState<State>('idle')
  const [rating, setRating] = useState(5)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const data: Record<string, string> = {}
    new FormData(event.currentTarget).forEach((v, k) => (data[k] = String(v)))
    setState('pending')
    try {
      await submitNetlifyForm('review', data)
      setState('success')
    } catch {
      setState('error')
    }
  }

  return (
    <div data-reveal className="rounded-[2rem] border bg-card p-8">
      <h2 className="text-2xl font-bold">Worked with me? Share your review</h2>
      <p className="mt-2 text-muted-foreground">Your review will be added to this page with your permission.</p>
      {state === 'success' ? (
        <div role="status" className="mt-8 rounded-2xl border border-primary/40 bg-secondary/60 p-6">
          <CheckCircle2 className="size-8 text-primary" aria-hidden="true" />
          <p className="mt-3 text-lg font-semibold">Thank you, your review was received.</p>
          <p className="mt-1 text-sm text-muted-foreground">I'll add it to this page after a quick check.</p>
          <Button variant="outline" className="mt-5 rounded-full" onClick={() => setState('idle')}>
            Send another
          </Button>
        </div>
      ) : (
        <form
          name="review"
          method="POST"
          action="/__forms.html"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={submit}
          onChange={() => state === 'error' && setState('idle')}
          className="mt-6"
        >
          <input type="hidden" name="form-name" value="review" />
          <p hidden>
            <label>
              Leave empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <fieldset disabled={state === 'pending'} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="rv-name">Your name</Label>
              <Input id="rv-name" name="name" autoComplete="name" required maxLength={100} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rv-email">
                Email <span className="font-normal text-muted-foreground">(not published)</span>
              </Label>
              <Input id="rv-email" name="email" type="email" autoComplete="email" required maxLength={254} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rv-country">Country</Label>
              <select id="rv-country" name="country" className={selectClass}>
                {REVIEW_COUNTRIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <span className="text-sm font-medium" id="rv-rating-label">
                Rating
              </span>
              <input type="hidden" name="rating" value={rating} />
              <div role="radiogroup" aria-labelledby="rv-rating-label" className="flex h-9 items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                    onClick={() => setRating(n)}
                    className="rounded p-0.5"
                  >
                    <Star className={cn('size-6 transition-colors', n <= rating ? 'fill-signal text-signal' : 'text-muted-foreground/40')} />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="rv-text">Your review</Label>
              <Textarea id="rv-text" name="review" rows={4} required minLength={4} maxLength={2000} />
            </div>
            <label className="flex gap-2.5 text-sm sm:col-span-2">
              <input type="checkbox" name="consent" value="yes" required className="mt-0.5 size-4 accent-[var(--primary)]" />I allow my
              name, country and review to be published on this website.
            </label>
            <div className="sm:col-span-2">
              <Button type="submit" size="lg" className="rounded-full">
                {state === 'pending' ? 'Sending…' : 'Send review'}
              </Button>
            </div>
          </fieldset>
          {state === 'error' && (
            <p role="alert" className="mt-4 text-sm text-destructive">
              Nothing was confirmed as sent. Your details are still here; please try again, or email {SITE.email}.
            </p>
          )}
        </form>
      )}
    </div>
  )
}
