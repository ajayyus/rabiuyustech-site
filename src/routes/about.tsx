import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { FiverrIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/site/icons'
import { revealDelay } from '@/components/site/reveal'
import { CtaBand, Eyebrow, SectionHeading } from '@/components/site/section'
import { EXPERTISE, PRINCIPLES, SITE } from '@/data/site'
import { cdn } from '@/lib/img'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About Rabiu Yusuf | Independent eCommerce Growth Specialist | Rabiu Yustech' },
      {
        name: 'description',
        content:
          'Meet Rabiu Yusuf, an independent eCommerce growth specialist helping store owners improve discoverability, shopping experience and retention.',
      },
    ],
  }),
  component: About,
})

function About() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-10 sm:pt-44">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-content gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-reveal className="relative">
            <div className="overflow-hidden rounded-[2.5rem] border">
              <img
                src={cdn('/img/portrait.png', 720)}
                alt="Portrait of Rabiu Yusuf, eCommerce growth specialist"
                width={800}
                height={800}
                fetchPriority="high"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="absolute -right-3 -bottom-6 w-40 rounded-3xl border bg-white p-3 shadow-xl sm:-right-8 sm:w-48">
              <img src={cdn('/img/logo-full.png', 400)} alt="Rabiu Yustech, Market Research Specialist logo" width={400} height={400} />
            </div>
          </div>
          <div>
            <Eyebrow>About</Eyebrow>
            <h1 data-reveal className="mt-5 text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.95] font-extrabold">
              Hi, I'm Rabiu. <span className="text-primary">I make online stores easier to find, shop and return to.</span>
            </h1>
            <div data-reveal style={revealDelay(120)} className="mt-8 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                I'm <b className="text-foreground">Rabiu Yusuf</b>, an independent eCommerce growth specialist and market research
                specialist working under the <b className="text-foreground">Rabiu Yustech</b> brand.
              </p>
              <p>
                I help online businesses improve the way their stores attract potential customers, present their products, guide
                visitors through the shopping experience, and build lasting customer relationships.
              </p>
              <p>
                My work brings together store design and optimization, search visibility, social commerce, marketing systems, and
                conversion-focused improvements. Rather than treating each service as an isolated task, I look at how the parts of an
                eCommerce business work together, then build an implementation plan suited to the store.
              </p>
            </div>
            <div data-reveal style={revealDelay(200)} className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/contact">
                  Let's discuss your store <ArrowUpRight />
                </Link>
              </Button>
              {[
                { href: SITE.fiverr, label: 'Fiverr', Icon: FiverrIcon },
                { href: SITE.instagram, label: 'Instagram', Icon: InstagramIcon },
                { href: SITE.tiktok, label: 'TikTok', Icon: TikTokIcon },
                { href: SITE.whatsappLink, label: 'WhatsApp', Icon: WhatsAppIcon },
              ].map(({ href, label, Icon }) => (
                <Button key={label} asChild size="icon-lg" variant="outline" className="rounded-full">
                  <a href={href} target="_blank" rel="noopener" aria-label={label}>
                    <Icon className="size-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-content px-4 sm:px-6">
        <SectionHeading eyebrow="My approach" title="Five principles behind every project." />
        <ol className="mt-12 divide-y border-y">
          {PRINCIPLES.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              style={revealDelay(i * 60)}
              className="group grid gap-3 py-7 sm:grid-cols-[5rem_1fr_1.4fr] sm:items-baseline sm:gap-8"
            >
              <span className="font-mono text-sm text-primary">0{i + 1}</span>
              <h3 className="text-2xl font-bold transition-colors group-hover:text-primary">{p.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-24 grid max-w-content gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div data-reveal className="rounded-[2rem] border bg-card p-8 sm:p-10">
          <Eyebrow>Personal commitment</Eyebrow>
          <p className="mt-6 font-display text-2xl leading-snug font-bold sm:text-3xl">
            “My goal is to be a dependable partner who understands both the technical details of eCommerce and the business
            objectives behind them.”
          </p>
          <p className="mt-6 text-muted-foreground">
            Good growth work requires clear communication, realistic expectations, thoughtful implementation, and continual learning.
          </p>
        </div>
        <div data-reveal style={revealDelay(100)}>
          <Eyebrow>Expertise</Eyebrow>
          <ul className="mt-6 flex flex-wrap gap-2">
            {EXPERTISE.map((e) => (
              <li key={e} className="rounded-full border bg-card px-4 py-2 text-sm font-medium">
                {e}
              </li>
            ))}
          </ul>
          <p className="mt-8 leading-relaxed text-muted-foreground">
            Tools I work with include Shopify themes and sections, Google Merchant Center, Search Console, Google Business Profile,
            Meta Commerce Manager and Pixel, TikTok Shop, Klaviyo and Shopify Email.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
