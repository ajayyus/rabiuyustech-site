import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { WhatsAppIcon } from '@/components/site/icons'
import { SITE } from '@/data/site'
import { cn } from '@/lib/utils'

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.18em] text-muted-foreground uppercase',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
  align = 'left',
}: {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  className?: string
  align?: 'left' | 'center'
}) {
  return (
    <div data-reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.02] font-extrabold">{title}</h2>
      {lead && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{lead}</p>}
    </div>
  )
}

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-14 sm:pt-44 sm:pb-20">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="glow-orb pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2" aria-hidden="true" />
      <div className="relative mx-auto max-w-content px-4 sm:px-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-5xl text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.95] font-extrabold">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{lead}</p>}
        {children}
      </div>
    </section>
  )
}

export function CtaBand({
  title = "Let's find the right growth opportunities for your store.",
  text = 'Every store has different strengths, challenges, and priorities. Tell me about your business and what you want to improve, and we can define a practical next step.',
}: {
  title?: string
  text?: string
}) {
  return (
    <section className="mx-auto mt-24 max-w-content px-4 sm:px-6">
      <div
        data-reveal
        className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-primary-foreground sm:px-14 sm:py-20"
      >
        <svg
          className="spin-slow pointer-events-none absolute -right-28 -bottom-28 size-[26rem] opacity-25"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <defs>
            <path id="cta-circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
          </defs>
          <text className="font-mono" fontSize="11.5" letterSpacing="3" fill="currentColor">
            <textPath href="#cta-circle">DISCOVER · CONVERT · RETAIN · GROW · DISCOVER · CONVERT · RETAIN · GROW ·</textPath>
          </text>
        </svg>
        <div className="relative max-w-2xl">
          <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] leading-[1] font-extrabold">{title}</h2>
          <p className="mt-5 text-lg opacity-85">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link to="/contact">
                Discuss your store <ArrowUpRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground dark:bg-transparent"
            >
              <a href={SITE.whatsappLink} target="_blank" rel="noopener">
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
