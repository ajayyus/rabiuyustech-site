import { createFileRoute, notFound } from '@tanstack/react-router'

import { PageHero } from '@/components/site/section'
import { LEGAL, LEGAL_UPDATED } from '@/data/legal'
import { SITE } from '@/data/site'

export const Route = createFileRoute('/legal/$page')({
  loader: ({ params }) => {
    if (!(params.page in LEGAL)) throw notFound()
    return { page: params.page }
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `${LEGAL[loaderData.page].title} | Rabiu Yustech` }] : [],
  }),
  component: LegalPage,
})

function LegalPage() {
  const { page } = Route.useLoaderData()
  const doc = LEGAL[page]
  return (
    <>
      <PageHero eyebrow={LEGAL_UPDATED} title={doc.title} />
      <article className="prose-legal mx-auto max-w-reading px-4 sm:px-6">
        {doc.intro && <p>{doc.intro}</p>}
        {doc.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.body.map((b) => (
              <p key={b}>{b}</p>
            ))}
          </section>
        ))}
        <h2>Contact</h2>
        <p>
          Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </article>
    </>
  )
}
