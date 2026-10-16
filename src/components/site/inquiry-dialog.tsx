import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { Check, Clock, Copy, Mail, Send, Sparkles, X } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { WhatsAppIcon } from '@/components/site/icons'
import { ADDONS, PACKAGES, type Package } from '@/data/site'
import { buildMessage, copyToClipboard, mailHref, submitNetlifyForm, whatsappHref } from '@/lib/inquiry'

type Target = { kind: 'package'; pkg: Package } | { kind: 'ask'; topic: string }

type InquiryContextValue = {
  openPackage: (id: string) => void
  openAsk: (topic: string) => void
}

const InquiryContext = createContext<InquiryContextValue | null>(null)

export function useInquiry() {
  const ctx = useContext(InquiryContext)
  if (!ctx) throw new Error('useInquiry must be used inside InquiryProvider')
  return ctx
}

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [target, setTarget] = useState<Target | null>(null)

  const openPackage = useCallback((id: string) => {
    const pkg = PACKAGES.find((p) => p.id === id)
    if (pkg) setTarget({ kind: 'package', pkg })
  }, [])
  const openAsk = useCallback((topic: string) => setTarget({ kind: 'ask', topic }), [])
  const value = useMemo(() => ({ openPackage, openAsk }), [openPackage, openAsk])

  return (
    <InquiryContext.Provider value={value}>
      {children}
      <Dialog open={target !== null} onOpenChange={(open) => !open && setTarget(null)}>
        <DialogContent className="max-h-[92svh] gap-0 overflow-y-auto rounded-3xl p-0 sm:max-w-3xl">
          {target?.kind === 'package' && <PackageDetail key={target.pkg.id} pkg={target.pkg} />}
          {target?.kind === 'ask' && <AskDetail key={target.topic} topic={target.topic} />}
        </DialogContent>
      </Dialog>
    </InquiryContext.Provider>
  )
}

function PackageDetail({ pkg }: { pkg: Package }) {
  return (
    <>
      <div className="relative overflow-hidden border-b bg-secondary/60 px-6 pt-8 pb-6 sm:px-8">
        <div className="glow-orb pointer-events-none absolute -top-24 -right-16 size-72" aria-hidden="true" />
        {pkg.featured && (
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-signal px-3 py-1 font-mono text-[0.7rem] font-medium tracking-wider text-signal-foreground uppercase">
            <Sparkles className="size-3" /> Complete solution
          </span>
        )}
        <DialogTitle className="font-display pr-8 text-2xl font-bold sm:text-3xl">{pkg.name}</DialogTitle>
        <DialogDescription className="mt-2 max-w-prose text-[0.95rem] leading-relaxed">{pkg.desc}</DialogDescription>
        <div className="mt-5 flex flex-wrap items-end gap-x-5 gap-y-2">
          <div>
            <span className="block font-mono text-[0.7rem] tracking-wider text-muted-foreground uppercase">Starting from</span>
            <span className="font-display text-4xl font-extrabold text-primary">{pkg.price}</span>
          </div>
          <span className="mb-1.5 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-4" /> Typical delivery {pkg.time}
          </span>
        </div>
      </div>
      <div className="grid gap-8 px-6 py-6 sm:grid-cols-2 sm:px-8">
        <div>
          <h3 className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">What's included</h3>
          <ul className="space-y-2.5">
            {pkg.includes.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">Not included</h3>
            <ul className="space-y-2.5">
              {pkg.notIncluded.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
                  <X className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">What I need from you</h3>
            <ul className="space-y-2.5">
              {pkg.needs.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border bg-muted/50 p-4 text-sm">
            <b className="font-semibold">Best for: </b>
            {pkg.best}
          </div>
        </div>
      </div>
      <OrderComposer pkg={pkg} interest={pkg.name} />
    </>
  )
}

function AskDetail({ topic }: { topic: string }) {
  return (
    <>
      <div className="relative overflow-hidden border-b bg-secondary/60 px-6 pt-8 pb-6 sm:px-8">
        <div className="glow-orb pointer-events-none absolute -top-24 -right-16 size-72" aria-hidden="true" />
        <DialogTitle className="font-display pr-8 text-2xl font-bold sm:text-3xl">{topic}</DialogTitle>
        <DialogDescription className="mt-2 text-[0.95rem]">
          Tell me a little about your store and I'll reply with a scope and quote.
        </DialogDescription>
      </div>
      <OrderComposer interest={topic} />
    </>
  )
}

const selectClass =
  'h-9 w-full rounded-md border border-input bg-transparent px-3 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm dark:bg-input/30'

type SendState = 'idle' | 'pending' | 'sent' | 'error'

function OrderComposer({ pkg, interest }: { pkg?: Package; interest: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [url, setUrl] = useState('')
  const [platform, setPlatform] = useState('Shopify')
  const [notes, setNotes] = useState('')
  const [addons, setAddons] = useState<string[]>([])
  const [state, setState] = useState<SendState>('idle')
  const [status, setStatus] = useState('')

  const message = buildMessage({
    pkg,
    interest,
    addons,
    name: name.trim(),
    email: email.trim(),
    url: url.trim(),
    platform,
    notes: notes.trim(),
  })
  const subject = `Inquiry: ${pkg ? pkg.name : interest}`
  const emailValid = /^\S+@\S+\.\S+$/.test(email.trim())

  const touch = () => {
    if (state !== 'pending') setState('idle')
    setStatus('')
  }

  async function send() {
    if (state === 'pending') return
    if (!name.trim() || !emailValid) {
      setStatus('Please add your name and a valid email so I can reply.')
      return
    }
    setState('pending')
    try {
      await submitNetlifyForm('inquiry', {
        name: name.trim(),
        email: email.trim(),
        store_url: url.trim(),
        platform,
        interest,
        package: pkg?.name ?? '',
        addons: addons.join(', '),
        details: notes.trim(),
        message,
      })
      setState('sent')
      setStatus(`Sent. Thank you! I'll reply to ${email.trim()}.`)
    } catch {
      setState('error')
      setStatus('Nothing was confirmed as sent. Your details are still here; please use WhatsApp or email instead.')
    }
  }

  return (
    <div className="border-t bg-muted/30 px-6 py-6 sm:px-8">
      <h3 className="font-display text-lg font-bold">Send me the details</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        The message updates as you type. Send it straight to me, or open it in WhatsApp or your email app. No payment is taken on
        this site.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2" onChange={touch}>
        <div className="space-y-1.5">
          <Label htmlFor="oc-name">Your name</Label>
          <Input id="oc-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="oc-email">Your email</Label>
          <Input
            id="oc-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={email.length > 3 && !emailValid}
            maxLength={254}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="oc-url">Store URL</Label>
          <Input id="oc-url" type="url" placeholder="https://" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="oc-platform">Platform</Label>
          <select id="oc-platform" className={selectClass} value={platform} onChange={(e) => setPlatform(e.target.value)}>
            {['Shopify', 'Etsy', 'WooCommerce', 'Other', "I don't have a store yet"].map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        {pkg && (
          <fieldset className="sm:col-span-2">
            <legend className="mb-2 text-sm font-medium">
              Add-ons <span className="font-normal text-muted-foreground">(optional, priced in your quote)</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {ADDONS.map((a) => {
                const on = addons.includes(a)
                return (
                  <button
                    key={a}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      touch()
                      setAddons((cur) => (on ? cur.filter((x) => x !== a) : [...cur, a]))
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors hover:border-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground motion-reduce:transition-none"
                  >
                    {on && <Check className="size-3.5" aria-hidden="true" />}
                    {a}
                  </button>
                )
              })}
            </div>
          </fieldset>
        )}
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="oc-notes">
            Anything I should know? <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Textarea id="oc-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={2000} />
        </div>
      </div>
      <div className="mt-5">
        <Label htmlFor="oc-msg" className="mb-1.5 font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Message preview
        </Label>
        <Textarea id="oc-msg" readOnly value={message} rows={7} className="bg-background font-mono text-xs leading-relaxed" />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button onClick={send} disabled={state === 'pending' || state === 'sent'} className="rounded-full">
          <Send /> {state === 'pending' ? 'Sending…' : state === 'sent' ? 'Request sent' : 'Send request to Rabiu'}
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <a href={whatsappHref(message)} target="_blank" rel="noopener">
            <WhatsAppIcon className="size-4" /> WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <a href={mailHref(message, subject)}>
            <Mail /> Email app
          </a>
        </Button>
        <Button
          variant="ghost"
          className="rounded-full"
          onClick={async () => setStatus((await copyToClipboard(message)) ? 'Message copied.' : 'Select the message above and copy it.')}
        >
          <Copy /> Copy
        </Button>
      </div>
      <p className="mt-3 min-h-5 text-sm" role={state === 'error' ? 'alert' : 'status'} aria-live="polite">
        {status}
      </p>
    </div>
  )
}
