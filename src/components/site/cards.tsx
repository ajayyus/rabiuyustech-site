import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Check, Clock, Quote, Sparkles, Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useInquiry } from '@/components/site/inquiry-dialog'
import { revealDelay } from '@/components/site/reveal'
import type { Package, Project, Review } from '@/data/site'
import { cdn, cdnSrcSet } from '@/lib/img'
import { cn } from '@/lib/utils'

export function PackageCard({ pkg, index = 0, className }: { pkg: Package; index?: number; className?: string }) {
  const { openPackage } = useInquiry()
  return (
    <article
      data-reveal
      style={revealDelay(index * 70)}
      className={cn(
        'group relative flex flex-col rounded-3xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_24px_60px_-30px_var(--glow)] motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        pkg.featured && 'border-primary/70 bg-gradient-to-b from-primary/12 to-card',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
        {pkg.featured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-signal px-2.5 py-1 font-mono text-[0.65rem] font-medium tracking-wider text-signal-foreground uppercase">
            <Sparkles className="size-3" aria-hidden="true" /> Complete solution
          </span>
        )}
      </div>
      <h3 className="mt-4 text-xl leading-tight font-bold">{pkg.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pkg.short}</p>
      <div className="mt-5 flex items-end gap-2">
        <span className="pb-1.5 font-mono text-xs text-muted-foreground">from</span>
        <span className="font-display text-4xl font-extrabold tracking-tight">{pkg.price}</span>
      </div>
      <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="size-3.5" aria-hidden="true" /> {pkg.time}
      </span>
      <ul className="mt-5 space-y-2 border-t pt-5">
        {pkg.includes.slice(0, 4).map((i) => (
          <li key={i} className="flex gap-2 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => openPackage(pkg.id)}
        variant={pkg.featured ? 'default' : 'outline'}
        className="mt-6 w-full rounded-full sm:mt-auto"
      >
        View details & order <ArrowUpRight />
      </Button>
    </article>
  )
}

export function ProjectCard({ project, index = 0, large = false }: { project: Project; index?: number; large?: boolean }) {
  return (
    <article data-reveal style={revealDelay(index * 80)} className="group relative">
      <Link
        to="/portfolio/$projectId"
        params={{ projectId: project.id }}
        className="block overflow-hidden rounded-3xl border bg-card focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <div className={cn('relative overflow-hidden bg-muted', large ? 'aspect-[16/9]' : 'aspect-[16/10]')}>
          {/* Browser chrome makes each screenshot read as a live storefront */}
          <div className="absolute inset-x-0 top-0 z-10 flex h-7 items-center gap-1.5 border-b bg-card/90 px-3 backdrop-blur">
            <span className="size-2 rounded-full bg-foreground/20" />
            <span className="size-2 rounded-full bg-foreground/20" />
            <span className="size-2 rounded-full bg-foreground/20" />
            <span className="ml-3 truncate font-mono text-[0.62rem] text-muted-foreground">
              {project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
            </span>
          </div>
          <img
            src={cdn(project.image, 900)}
            srcSet={cdnSrcSet(project.image, [480, 720, 900])}
            sizes={large ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
            alt={`Homepage of the ${project.name} online store`}
            loading="lazy"
            width={900}
            height={420}
            className="h-full w-full object-cover object-top pt-7 transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute right-4 bottom-4 grid size-11 translate-y-3 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none">
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold">{project.name}</h3>
            <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{project.industry}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.focus.map((f) => (
              <span key={f} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                {f}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  )
}

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn('inline-flex gap-0.5', className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn('size-4', i < rating ? 'fill-signal text-signal' : 'text-muted-foreground/40')} aria-hidden="true" />
      ))}
    </span>
  )
}

export function ReviewCard({ review, className }: { review: Review; className?: string }) {
  return (
    <figure className={cn('relative flex h-full flex-col rounded-3xl border bg-card p-6', className)}>
      <Quote className="absolute top-5 right-5 size-8 text-primary/20" aria-hidden="true" />
      <Stars rating={review.rating} />
      <blockquote className="mt-4 flex-1 text-[0.97rem] leading-relaxed">“{review.text}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t pt-4">
        <span className="grid size-9 place-items-center rounded-full bg-secondary font-display text-sm font-bold uppercase">
          {review.name[0]}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold">{review.name}</span>
          <span className="block text-xs text-muted-foreground">
            {review.flag} {review.country} · via {review.source}
          </span>
        </span>
      </figcaption>
      {review.meta && <p className="mt-2 font-mono text-[0.68rem] text-muted-foreground">{review.meta}</p>}
    </figure>
  )
}

export function Marquee({
  children,
  speed = 40,
  className,
  reverse = false,
}: {
  children: React.ReactNode
  speed?: number
  className?: string
  reverse?: boolean
}) {
  return (
    <div
      className={cn('marquee relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]', className)}
    >
      <div
        className="marquee-track flex w-max shrink-0"
        style={{ '--marquee-speed': `${speed}s`, animationDirection: reverse ? 'reverse' : undefined } as React.CSSProperties}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
