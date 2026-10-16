import { useState, type FormEvent } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, CheckCircle2, Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FiverrIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/site/icons'
import { PageHero } from '@/components/site/section'
import { PACKAGES, SITE } from '@/data/site'
import { buildMessage, mailHref, submitNetlifyForm, whatsappHref } from '@/lib/inquiry'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact Rabiu Yustech | Discuss Your Store' },
      { name: 'description', content: 'Send your store URL and goals by form, email or WhatsApp and get a practical next step.' },
    ],
  }),
  component: Contact,
})

const INTERESTS = [
  'Store optimization',
  'SEO / GEO',
  'Google Shopping',
  'Social commerce',
  'CRM and automation',
  'Conversion optimization',
  'Product content / video',
  'Banners & campaign visuals',
  'Ongoing support',
  'Not sure yet',
]

const selectClass =
  'h-10 w-full rounded-md border border-input bg-transparent px-3 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm dark:bg-input/30'

type State = 'idle' | 'pending' | 'success' | 'error'

function Contact() {
  const [state, setState] = useState<State>('idle')
  const [lastMessage, setLastMessage] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const fd = new FormData(event.currentTarget)
    const get = (k: string) => String(fd.get(k) ?? '').trim()
    const pkg = PACKAGES.find((p) => p.id === get('package_id'))
    const message = buildMessage({
      pkg,
      interest: get('interest'),
      name: get('name'),
      email: get('email'),
      url: get('store_url'),
      platform: get('platform'),
      budget: get('budget'),
      challenge: get('challenge'),
      notes: get('details'),
    })
    setLastMessage(message)
    setState('pending')
    try {
      await submitNetlifyForm('inquiry', {
        name: get('name'),
        email: get('email'),
        store_url: get('store_url'),
        platform: get('platform'),
        interest: get('interest'),
        package: pkg?.name ?? '',
        budget: get('budget'),
        challenge: get('challenge'),
        details: get('details'),
        message,
        'bot-field': get('bot-field'),
      })
      setState('success')
    } catch {
      setState('error')
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's discuss your <span className="text-primary">eCommerce growth goals.</span>
          </>
        }
        lead="Tell me what you sell, what you've tried, and what you want to improve. I'll review it and reply with an appropriate next step."
      />
      <div className="mx-auto grid max-w-content gap-6 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[2rem] border bg-card p-6 sm:p-10">
          {state === 'success' ? (
            <div role="status" className="py-8">
              <CheckCircle2 className="size-12 text-primary" aria-hidden="true" />
              <h2 className="mt-5 text-3xl font-extrabold">Thank you. Your message was received.</h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                I'll review it and reply to the email you gave. If it's urgent, you can also message me on WhatsApp.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                <Button asChild className="rounded-full">
                  <a href={whatsappHref(lastMessage)} target="_blank" rel="noopener">
                    <WhatsAppIcon className="size-4" /> Message me on WhatsApp too
                  </a>
                </Button>
                <Button variant="outline" className="rounded-full" onClick={() => setState('idle')}>
                  Send another message
                </Button>
              </div>
            </div>
          ) : (
            <form
              name="inquiry"
              method="POST"
              action="/__forms.html"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={submit}
              onChange={() => state === 'error' && setState('idle')}
            >
              <input type="hidden" name="form-name" value="inquiry" />
              <p hidden>
                <label>
                  Leave empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>
              <fieldset disabled={state === 'pending'} className="grid gap-5 sm:grid-cols-2">
                <legend className="sr-only">Project inquiry</legend>
                <Field id="c-name" label="Full name">
                  <Input id="c-name" name="name" autoComplete="name" required maxLength={100} className="h-10" />
                </Field>
                <Field id="c-email" label="Business email">
                  <Input id="c-email" name="email" type="email" autoComplete="email" required maxLength={254} className="h-10" />
                </Field>
                <Field id="c-url" label="Store URL">
                  <Input id="c-url" name="store_url" type="url" placeholder="https://" required className="h-10" />
                </Field>
                <Field id="c-platform" label="eCommerce platform">
                  <select id="c-platform" name="platform" className={selectClass}>
                    {['Shopify', 'Etsy', 'WooCommerce', 'Other', "I don't have a store yet"].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </Field>
                <Field id="c-interest" label="Main area of interest">
                  <select id="c-interest" name="interest" className={selectClass}>
                    {INTERESTS.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </Field>
                <Field id="c-package" label="Package" optional>
                  <select id="c-package" name="package_id" className={selectClass}>
                    <option value="">No package selected</option>
                    {PACKAGES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (from {p.price})
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id="c-challenge" label="Main challenge or growth objective" wide>
                  <Textarea id="c-challenge" name="challenge" rows={4} required minLength={4} maxLength={2000} />
                </Field>
                <Field id="c-budget" label="Approximate budget" optional>
                  <Input id="c-budget" name="budget" placeholder="e.g. $300 to $500" maxLength={100} className="h-10" />
                </Field>
                <Field id="c-details" label="Additional details" optional>
                  <Input id="c-details" name="details" maxLength={2000} className="h-10" />
                </Field>
                <label className="flex gap-2.5 text-sm sm:col-span-2">
                  <input type="checkbox" required className="mt-0.5 size-4 accent-[var(--primary)]" />
                  <span>
                    I agree that my details can be used to respond to this inquiry, as described in the{' '}
                    <a href="/legal/privacy" className="text-primary underline underline-offset-4">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
                <div className="sm:col-span-2">
                  <Button type="submit" size="lg" className="h-12 rounded-full px-8 text-base">
                    {state === 'pending' ? 'Sending…' : 'Discuss my project'} <ArrowUpRight />
                  </Button>
                </div>
              </fieldset>
              {state === 'error' && (
                <div role="alert" className="mt-6 rounded-2xl border border-destructive/40 bg-destructive/10 p-5 text-sm">
                  <p className="font-semibold">Nothing was confirmed as sent.</p>
                  <p className="mt-1 text-muted-foreground">Your details are still here. Please try again, or send the same message directly:</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button asChild size="sm" className="rounded-full">
                      <a href={whatsappHref(lastMessage)} target="_blank" rel="noopener">
                        <WhatsAppIcon className="size-4" /> Send on WhatsApp
                      </a>
                    </Button>
                    <Button asChild size="sm" variant="outline" className="rounded-full">
                      <a href={mailHref(lastMessage, 'Project inquiry')}>
                        <Mail /> Send by email
                      </a>
                    </Button>
                  </div>
                </div>
              )}
              <p className="mt-6 text-xs text-muted-foreground">
                Your message is delivered to me through Netlify, which hosts this site. I use it only to reply to your inquiry.
              </p>
            </form>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-[2rem] border bg-card p-6">
            <h2 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Direct contact</h2>
            <ul className="mt-4 divide-y">
              {[
                { href: `mailto:${SITE.email}`, label: 'Email', sub: SITE.email, Icon: Mail, ext: false },
                { href: SITE.whatsappLink, label: 'WhatsApp', sub: 'Start a conversation', Icon: WhatsAppIcon, ext: true },
                { href: SITE.fiverr, label: 'Fiverr', sub: 'Profile and reviews', Icon: FiverrIcon, ext: true },
                { href: SITE.instagram, label: 'Instagram', sub: SITE.instagramHandle, Icon: InstagramIcon, ext: true },
                { href: SITE.tiktok, label: 'TikTok', sub: 'Watch my content', Icon: TikTokIcon, ext: true },
              ].map(({ href, label, sub, Icon, ext }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(ext ? { target: '_blank', rel: 'noopener' } : {})}
                    className="group flex items-center gap-4 py-3.5"
                  >
                    <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{label}</span>
                      <span className="block truncate text-sm text-muted-foreground">{sub}</span>
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] bg-primary p-6 text-primary-foreground">
            <h2 className="font-display text-xl font-bold">What happens next</h2>
            <ol className="mt-4 space-y-3 text-sm">
              {['I review your store and goals.', 'You get a clear scope, timeline and quote.', 'Work starts only after you approve in writing.'].map(
                (t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-foreground/15 font-mono text-xs">{i + 1}</span>
                    {t}
                  </li>
                ),
              )}
            </ol>
          </div>
        </aside>
      </div>
    </>
  )
}

function Field({
  id,
  label,
  optional,
  wide,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  wide?: boolean
  children: React.ReactNode
}) {
  return (
    <div className={wide ? 'space-y-1.5 sm:col-span-2' : 'space-y-1.5'}>
      <Label htmlFor={id}>
        {label} {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </Label>
      {children}
    </div>
  )
}
