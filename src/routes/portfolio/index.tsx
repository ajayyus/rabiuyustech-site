import { createFileRoute } from '@tanstack/react-router'
import { Check } from 'lucide-react'

import { ProjectCard } from '@/components/site/cards'
import { CreativeGallery } from '@/components/site/creative-gallery'
import { revealDelay } from '@/components/site/reveal'
import { CtaBand, PageHero, SectionHeading } from '@/components/site/section'
import { PROJECTS } from '@/data/site'

export const Route = createFileRoute('/portfolio/')({
  head: () => ({
    meta: [
      { title: 'Portfolio & Case Studies | Rabiu Yustech' },
      {
        name: 'description',
        content:
          'Selected eCommerce projects across swimwear, ceremony wear, garden supplies, auto care, safes and eco cleaning products, plus creative campaign visuals.',
      },
    ],
  }),
  component: Portfolio,
})

const ROLES = [
  {
    title: 'Store design & website optimization',
    text: 'Visual presentation, layout, product pages, navigation, mobile experience, and the overall shopping journey, making stores clearer, more professional, and easier to use.',
  },
  {
    title: 'Website maintenance',
    text: 'Ongoing improvements, theme adjustments, product and collection updates, functionality checks, and troubleshooting within the agreed scope.',
  },
  {
    title: 'SEO optimization',
    text: 'Product and collection content, keyword targeting, metadata, internal linking, technical SEO and search visibility foundations so search engines understand the store.',
  },
  {
    title: 'Conversion rate optimization',
    text: 'Reducing shopping friction, improving product information, strengthening trust signals, clarifying calls to action, and making the customer journey more intuitive.',
  },
  {
    title: 'Customer relationship management',
    text: 'Email marketing, segmentation, abandoned-cart recovery, post-purchase communication, and relevant automation workflows.',
  },
]

function Portfolio() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Six stores. Six industries. <span className="text-primary">One growth lens.</span>
          </>
        }
        lead="Explore different eCommerce business models and the opportunities each presents for store experience, discoverability, product presentation, and growth systems."
      />
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
          Thumbnails are screenshots of each store's public homepage, shown as project references. Brand names and logos belong to
          their respective owners, and no partnership or endorsement is implied.
        </p>
      </div>

      <section className="mx-auto mt-28 max-w-content px-4 sm:px-6">
        <SectionHeading
          eyebrow="Creative & campaign visuals"
          title="Banners and collection visuals."
          lead="Hero banners, sale campaigns and collection imagery for storefronts and social. Tap any visual to view it full size."
        />
        <CreativeGallery className="mt-12" />
      </section>

      <section className="mx-auto mt-28 grid max-w-content gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="My role"
          title="What I contribute to a project."
          lead="My role varies with each project. Some focus on the storefront and shopping experience; others on organic visibility, marketing systems, retention, or ongoing improvements."
        />
        <ul className="space-y-3">
          {ROLES.map((r, i) => (
            <li key={r.title} data-reveal style={revealDelay(i * 60)} className="flex gap-4 rounded-3xl border bg-card p-6">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-4" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-bold">{r.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand title="Want a store like these to perform better?" text="Send me your store link and goals. I'll tell you where I would start." />
    </>
  )
}
