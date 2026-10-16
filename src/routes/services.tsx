import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Check, Info } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ServiceIcon } from '@/components/site/icons'
import { useInquiry } from '@/components/site/inquiry-dialog'
import { revealDelay } from '@/components/site/reveal'
import { CtaBand, PageHero, SectionHeading } from '@/components/site/section'
import { ENGAGEMENTS, PROCESS, SERVICES } from '@/data/site'

export const Route = createFileRoute('/services')({
  head: () => ({
    meta: [
      { title: 'eCommerce Services | Shopify, SEO, Google, Social, CRM | Rabiu Yustech' },
      {
        name: 'description',
        content:
          'Shopify optimization, SEO and GEO, Google Shopping, social commerce, CRM automation, conversion optimization and product content built around your store.',
      },
    ],
  }),
  component: Services,
})

function Services() {
  const { openPackage, openAsk } = useInquiry()
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            eCommerce services built around <span className="text-primary">real business needs.</span>
          </>
        }
        lead="I help store owners strengthen the foundation of their online business: discoverability, the shopping journey, connected marketing channels and customer retention. Services can be delivered as focused projects or combined into a broader plan."
      >
        <nav aria-label="Services on this page" className="mt-10 flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 text-sm backdrop-blur transition-colors hover:border-primary hover:text-primary"
            >
              <ServiceIcon name={s.icon} className="size-4" /> {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="mx-auto max-w-content space-y-5 px-4 sm:px-6">
        {SERVICES.map((s, i) => (
          <article
            key={s.id}
            id={s.id}
            data-reveal
            className="grid scroll-mt-28 gap-8 rounded-[2rem] border bg-card p-6 sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-14"
          >
            <div>
              <div className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
                  <ServiceIcon name={s.icon} className="size-6" />
                </span>
                <span className="font-mono text-sm text-muted-foreground">{String(i + 1).padStart(2, '0')} / {SERVICES.length}</span>
              </div>
              <h2 className="mt-6 text-3xl leading-tight font-extrabold sm:text-4xl">{s.title}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{s.purpose}</p>
              <div className="mt-6 rounded-2xl border-l-4 border-signal bg-secondary/60 p-4 text-sm">
                <b className="font-semibold">Business value: </b>
                {s.value}
              </div>
              {s.caveat && (
                <p className="mt-4 flex gap-2 text-sm text-muted-foreground">
                  <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {s.caveat}
                </p>
              )}
              <div className="mt-7">
                {s.packageId ? (
                  <Button className="rounded-full" onClick={() => openPackage(s.packageId!)}>
                    See the package <ArrowRight />
                  </Button>
                ) : (
                  <Button className="rounded-full" onClick={() => openAsk(s.title)}>
                    Ask about this service <ArrowRight />
                  </Button>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Possible deliverables</h3>
              <ul className="mt-4 divide-y">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 py-3 text-[0.95rem]">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <section className="mx-auto mt-28 max-w-content px-4 sm:px-6">
        <SectionHeading
          eyebrow="Engagement options"
          title="You're never forced into a fixed bundle."
          lead="Each option starts with a project inquiry. I provide an agreed quote after confirming the work required, dependencies, timeline, and deliverables."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {ENGAGEMENTS.map((e, i) => (
            <div key={e.title} data-reveal style={revealDelay(i * 80)} className="flex flex-col rounded-3xl border bg-card p-7">
              <span className="font-display text-5xl font-extrabold text-primary/30">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-bold">{e.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
              <Button variant="outline" className="mt-6 rounded-full" onClick={() => openAsk(e.title)}>
                Start a project inquiry
              </Button>
            </div>
          ))}
        </div>
        <Button asChild variant="ghost" className="mt-8 rounded-full">
          <Link to="/packages">
            Compare fixed-scope packages <ArrowRight />
          </Link>
        </Button>
      </section>

      <section id="process" className="mx-auto mt-28 max-w-content scroll-mt-28 px-4 sm:px-6">
        <SectionHeading eyebrow="My process" title="How we work together." />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((p, i) => (
            <li key={p.title} data-reveal style={revealDelay(i * 70)} className="relative overflow-hidden rounded-3xl border bg-card p-7">
              <span className="absolute -top-4 -right-2 font-display text-[7rem] leading-none font-extrabold text-foreground/[0.05]" aria-hidden="true">
                {i + 1}
              </span>
              <span className="font-mono text-xs text-primary">Step {i + 1}</span>
              <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <CtaBand />
    </>
  )
}
