import { useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, Briefcase, CornerDownLeft, FileText, Mail, Package as PackageIcon, Search, SunMoon } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { FiverrIcon, WhatsAppIcon } from '@/components/site/icons'
import { useInquiry } from '@/components/site/inquiry-dialog'
import { PACKAGES, PROJECTS, SITE } from '@/data/site'
import { cn } from '@/lib/utils'

type Item = {
  id: string
  group: 'Pages' | 'Packages' | 'Projects' | 'Actions'
  label: string
  hint?: string
  icon: React.ReactNode
  run: () => void
}

const PAGES = [
  ['/', 'Home'],
  ['/portfolio', 'Work & case studies'],
  ['/services', 'Services'],
  ['/packages', 'Packages & pricing'],
  ['/about', 'About Rabiu'],
  ['/reviews', 'Client reviews'],
  ['/faq', 'FAQ'],
  ['/contact', 'Contact'],
] as const

export function CommandPalette({
  open,
  onOpenChange,
  onToggleTheme,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onToggleTheme: () => void
}) {
  const navigate = useNavigate()
  const { openPackage } = useInquiry()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const items = useMemo<Item[]>(() => {
    const close = (fn: () => void) => () => {
      onOpenChange(false)
      fn()
    }
    return [
      ...PAGES.map(([to, label]) => ({
        id: `page-${to}`,
        group: 'Pages' as const,
        label,
        icon: <FileText />,
        run: close(() => navigate({ to })),
      })),
      ...PACKAGES.map((p) => ({
        id: `pkg-${p.id}`,
        group: 'Packages' as const,
        label: p.name,
        hint: `from ${p.price}`,
        icon: <PackageIcon />,
        run: close(() => openPackage(p.id)),
      })),
      ...PROJECTS.map((p) => ({
        id: `proj-${p.id}`,
        group: 'Projects' as const,
        label: p.name,
        hint: p.industry,
        icon: <Briefcase />,
        run: close(() => navigate({ to: '/portfolio/$projectId', params: { projectId: p.id } })),
      })),
      {
        id: 'wa',
        group: 'Actions',
        label: 'Message on WhatsApp',
        icon: <WhatsAppIcon />,
        run: close(() => window.open(SITE.whatsappLink, '_blank', 'noopener')),
      },
      {
        id: 'mail',
        group: 'Actions',
        label: 'Send an email',
        hint: SITE.email,
        icon: <Mail />,
        run: close(() => (window.location.href = `mailto:${SITE.email}`)),
      },
      {
        id: 'fiverr',
        group: 'Actions',
        label: 'View Fiverr profile',
        icon: <FiverrIcon />,
        run: close(() => window.open(SITE.fiverr, '_blank', 'noopener')),
      },
      { id: 'theme', group: 'Actions', label: 'Toggle light / dark theme', icon: <SunMoon />, run: close(onToggleTheme) },
    ]
  }, [navigate, openPackage, onOpenChange, onToggleTheme])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((i) => `${i.label} ${i.hint ?? ''} ${i.group}`.toLowerCase().includes(q))
  }, [items, query])

  const groups = ['Pages', 'Packages', 'Projects', 'Actions'] as const

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o)
        if (!o) {
          setQuery('')
          setActive(0)
        }
      }}
    >
      <DialogContent showCloseButton={false} className="top-[14%] translate-y-0 gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-xl">
        <DialogTitle className="sr-only">Search the site</DialogTitle>
        <DialogDescription className="sr-only">Jump to a page, package or project, or run a quick action.</DialogDescription>
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="size-4 text-muted-foreground" aria-hidden="true" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActive((a) => Math.min(a + 1, filtered.length - 1))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActive((a) => Math.max(a - 1, 0))
              } else if (e.key === 'Enter') {
                e.preventDefault()
                filtered[active]?.run()
              }
            }}
            placeholder="Search pages, packages, projects…"
            aria-label="Search"
            aria-controls="cmdk-list"
            aria-activedescendant={filtered[active] ? `cmdk-${filtered[active].id}` : undefined}
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground">ESC</kbd>
        </div>
        <div id="cmdk-list" role="listbox" className="max-h-[55svh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-10 text-center text-sm text-muted-foreground">
              Nothing matches “{query}”. Try “SEO”, “Shopify” or “contact”.
            </p>
          )}
          {groups.map((g) => {
            const list = filtered.filter((i) => i.group === g)
            if (!list.length) return null
            return (
              <div key={g} className="mb-1">
                <div className="px-3 pt-2 pb-1 font-mono text-[0.65rem] tracking-wider text-muted-foreground uppercase">{g}</div>
                {list.map((item) => {
                  const idx = filtered.indexOf(item)
                  const isActive = idx === active
                  return (
                    <div
                      key={item.id}
                      id={`cmdk-${item.id}`}
                      role="option"
                      aria-selected={isActive}
                      onMouseMove={() => setActive(idx)}
                      onClick={item.run}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm [&_svg]:size-4 [&_svg]:shrink-0',
                        isActive ? 'bg-primary text-primary-foreground' : 'text-foreground',
                      )}
                    >
                      {item.icon}
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.hint && (
                        <span className={cn('truncate text-xs', isActive ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                          {item.hint}
                        </span>
                      )}
                      {isActive ? <CornerDownLeft /> : <ArrowRight className="opacity-0" />}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
