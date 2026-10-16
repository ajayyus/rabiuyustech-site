import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Mail } from 'lucide-react'

import { Logo } from '@/components/site/logo'
import { FiverrIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/site/icons'
import { SITE } from '@/data/site'

const SOCIALS = [
  { href: SITE.fiverr, label: 'Fiverr', Icon: FiverrIcon },
  { href: SITE.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: SITE.tiktok, label: 'TikTok', Icon: TikTokIcon },
  { href: SITE.whatsappLink, label: 'WhatsApp', Icon: WhatsAppIcon },
]

const LEGAL_LINKS = [
  ['privacy', 'Privacy'],
  ['terms', 'Terms'],
  ['payment', 'Payment & cancellation'],
  ['cookies', 'Cookies'],
  ['accessibility', 'Accessibility'],
] as const

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t">
      <div className="mx-auto max-w-content px-4 pt-16 pb-8 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-5">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Independent eCommerce growth specialist helping store owners improve discoverability, shopping experience and
              customer retention.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:text-primary hover:underline"
            >
              <Mail className="size-4" aria-hidden="true" /> {SITE.email}
            </a>
            <div className="flex gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 font-mono text-xs tracking-wider text-muted-foreground uppercase">Explore</h2>
            <ul className="space-y-2.5 text-sm">
              {(
                [
                  ['/portfolio', 'Work'],
                  ['/services', 'Services'],
                  ['/packages', 'Packages'],
                  ['/about', 'About'],
                  ['/reviews', 'Reviews'],
                  ['/faq', 'FAQ'],
                  ['/contact', 'Contact'],
                ] as const
              ).map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 font-mono text-xs tracking-wider text-muted-foreground uppercase">Start a project</h2>
            <p className="text-sm text-muted-foreground">
              Message me with your store link and the package you want. I reply with a clear scope and quote.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Discuss your store <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="font-display pointer-events-none mt-16 text-center text-[clamp(3.5rem,14vw,12rem)] leading-[0.8] font-extrabold tracking-tighter text-foreground/[0.06] select-none"
        >
          RABIUYUSTECH
        </div>
        <div className="mt-6 flex flex-col gap-4 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Rabiu Yustech. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map(([page, label]) => (
              <li key={page}>
                <Link to="/legal/$page" params={{ page }} className="hover:text-foreground">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
