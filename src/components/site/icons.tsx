import {
  BarChart3,
  Clapperboard,
  Repeat2,
  ScanSearch,
  Share2,
  ShoppingCart,
  Store,
  type LucideProps,
} from 'lucide-react'
import type { Service } from '@/data/site'

const SERVICE_ICONS = {
  store: Store,
  search: ScanSearch,
  cart: ShoppingCart,
  share: Share2,
  loop: Repeat2,
  chart: BarChart3,
  video: Clapperboard,
} satisfies Record<Service['icon'], React.ComponentType<LucideProps>>

export function ServiceIcon({ name, ...props }: { name: Service['icon'] } & LucideProps) {
  const Icon = SERVICE_ICONS[name]
  return <Icon aria-hidden="true" {...props} />
}

type BrandProps = React.SVGProps<SVGSVGElement>

export function WhatsAppIcon(props: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" {...props}>
      <path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8L4 20z" />
      <path d="M9 9.2c.3 2.6 2.3 4.7 5.2 5.6l1.3-1.3-1.9-1-.8.7c-.9-.4-1.7-1.2-2.1-2.1l.7-.8-1-1.9L9 9.2z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function InstagramIcon(props: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.6" cy="7.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TikTokIcon(props: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 4c.4 2.4 1.9 3.8 4.5 4" />
    </svg>
  )
}

export function FiverrIcon(props: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9 15.5V9.2c0-1 .6-1.7 1.6-1.7H14M9 12h4.5" />
    </svg>
  )
}
