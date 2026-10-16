import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, ExternalLink, MessageCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useInquiry } from '@/components/site/inquiry-dialog'
import { CtaBand, Eyebrow } from '@/components/site/section'
import { PROJECT_DETAILS, PROJECTS } from '@/data/site'
import { cdn } from '@/lib/img'

export const Route = createFileRoute('/portfolio/$projectId')({
  loader: ({ params }) => {
    const index = PROJECTS.findIndex((p) => p.id === params.projectId)
    if (index === -1) throw notFound()
    return { index }
  },
  head: ({ loaderData }) => {
    const p = loaderData ? PROJECTS[loaderData.index] : undefined
    return {
      meta: p
        ? [
            { title: `${p.name} Case Study | Rabiu Yustech` },
            { name: 'description', content: `${p.name} (${p.industry}): business context, focus areas and the work behind the store.` },
          ]
        : [],
    }
  },
  component: ProjectPage,
})

function ProjectPage() {
  const { index } = Route.useLoaderData()
  const { openAsk } = useInquiry()
  const p = PROJECTS[index]
  const next = PROJECTS[(index + 1) % PROJECTS.length]
  const d = PROJECT_DETAILS[p.id] ?? {}
  const pending = 'The specifics are shared directly so they stay accurate. Message me and I’ll walk you through what I did on this store.'

  const blocks: { title: string; body: React.ReactNode }[] = [
    {
      title: 'Project overview',
      body: (
        <>
          <p>
            {p.name} is an online store in the {p.industry.toLowerCase()} category.
          </p>
          {d.overview && <p className="mt-3">{d.overview}</p>}
        </>
      ),
    },
    {
      title: 'Focus areas',
      body: <p>{p.angle}</p>,
    },
    {
      title: 'My role & work completed',
      body: d.work?.length ? (
        <ul className="list-disc space-y-1.5 pl-5">
          {d.work.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">{pending}</p>
      ),
    },
    {
      title: 'Results & business impact',
      body: d.results ? (
        <p>{d.results}</p>
      ) : (
        <p className="text-muted-foreground">
          No verified performance figures are published for this project, so none are claimed here. I only report traffic, sales or
          conversion changes when I can back them with data.
        </p>
      ),
    },
  ]

  return (
    <>
      <section className="relative overflow-hidden pt-32 sm:pt-40">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-content px-4 sm:px-6">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> All projects
          </Link>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>
                Case study {String(index + 1).padStart(2, '0')} · {p.industry}
              </Eyebrow>
              <h1 className="mt-4 text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] font-extrabold">{p.name}</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="lg" className="rounded-full">
                <a href={p.url} target="_blank" rel="noopener">
                  Visit the live store <ExternalLink />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" onClick={() => openAsk(`Question about the ${p.name} project`)}>
                <MessageCircle /> Ask about this project
              </Button>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.focus.map((f) => (
              <span key={f} className="rounded-full border bg-card px-3 py-1 text-sm">
                {f}
              </span>
            ))}
          </div>
          <div data-reveal className="mt-12 overflow-hidden rounded-[2rem] border bg-card shadow-[0_40px_120px_-50px_var(--glow)]">
            <div className="flex h-10 items-center gap-2 border-b px-4">
              <span className="size-2.5 rounded-full bg-foreground/20" />
              <span className="size-2.5 rounded-full bg-foreground/20" />
              <span className="size-2.5 rounded-full bg-foreground/20" />
              <span className="ml-4 rounded-full bg-muted px-4 py-1 font-mono text-xs text-muted-foreground">
                {p.url.replace(/^https?:\/\//, '')}
              </span>
            </div>
            <img
              src={cdn(p.image, 1200)}
              srcSet={`${cdn(p.image, 640)} 640w, ${cdn(p.image, 900)} 900w`}
              sizes="(min-width: 1216px) 76rem, 100vw"
              alt={`Homepage of the ${p.name} online store`}
              width={900}
              height={420}
              fetchPriority="high"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-content gap-4 px-4 sm:px-6 md:grid-cols-2">
        {blocks.map((b) => (
          <div key={b.title} data-reveal className="rounded-3xl border bg-card p-7 leading-relaxed">
            <h2 className="mb-3 text-xl font-bold">{b.title}</h2>
            {b.body}
          </div>
        ))}
      </section>
      <p className="mx-auto mt-6 max-w-content px-4 text-xs text-muted-foreground sm:px-6">
        {p.name} and its logos belong to their owner. No partnership, endorsement or ownership is implied. Before-and-after evidence is
        shared only with the store owner's approval.
      </p>

      <section className="mx-auto mt-16 max-w-content px-4 sm:px-6">
        <Link
          to="/portfolio/$projectId"
          params={{ projectId: next.id }}
          className="group flex items-center justify-between gap-6 rounded-[2rem] border bg-card p-7 transition-colors hover:border-primary sm:p-10"
        >
          <div>
            <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Next project</span>
            <p className="mt-2 font-display text-3xl font-extrabold sm:text-5xl">{next.name}</p>
            <p className="mt-1 text-muted-foreground">{next.industry}</p>
          </div>
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-1">
            <ArrowRight className="size-6" />
          </span>
        </Link>
      </section>
      <CtaBand title="Want results like this for your store?" text="Send me your store link and goals and I'll tell you where I would start." />
    </>
  )
}
