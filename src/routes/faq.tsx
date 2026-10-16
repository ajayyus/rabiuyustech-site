import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Search } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/site/section'
import { FAQ } from '@/data/site'

export const Route = createFileRoute('/faq')({
  head: () => ({
    meta: [
      { title: 'FAQ | Rabiu Yustech' },
      { name: 'description', content: 'Answers about pricing, store access, timelines, guarantees, payments and ongoing support.' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }),
      },
    ],
  }),
  component: FaqPage,
})

function FaqPage() {
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()
  const list = term ? FAQ.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(term)) : FAQ

  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions, answered honestly." lead="Pricing, access, timelines, guarantees and payments. If your question isn't here, just ask." />
      <div className="mx-auto max-w-reading px-4 sm:px-6">
        <label className="relative block">
          <span className="sr-only">Search questions</span>
          <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search questions…"
            className="h-12 w-full rounded-full border bg-card pr-4 pl-11 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </label>
        {list.length ? (
          <Accordion type="single" collapsible className="mt-8">
            {list.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="py-5 text-left font-display text-lg font-bold hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="mt-10 rounded-3xl border border-dashed p-8 text-center text-muted-foreground">
            No questions match “{q}”. Ask me directly and I'll answer.
          </p>
        )}
        <Button asChild size="lg" className="mt-10 rounded-full">
          <Link to="/contact">
            Ask me something else <ArrowRight />
          </Link>
        </Button>
      </div>
    </>
  )
}
