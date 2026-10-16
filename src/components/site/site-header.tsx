import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Menu, Moon, Search, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Logo } from '@/components/site/logo'
import { CommandPalette } from '@/components/site/command-palette'
import { WhatsAppIcon } from '@/components/site/icons'
import { useTheme } from '@/components/site/use-theme'
import { NAV } from '@/components/site/nav'
import { SITE } from '@/data/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const { dark, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <div
          className={cn(
            'mx-auto flex h-14 max-w-content items-center justify-between gap-3 rounded-full border px-3 pl-4 transition-all duration-300 motion-reduce:transition-none',
            scrolled
              ? 'border-border bg-background/75 shadow-[0_8px_30px_-12px_var(--glow)] backdrop-blur-xl'
              : 'border-transparent bg-transparent',
          )}
        >
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden h-9 items-center gap-2 rounded-full border bg-background/40 px-3 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
            >
              <Search className="size-4" aria-hidden="true" />
              <span>Search</span>
              <kbd className="rounded border bg-muted px-1.5 font-mono text-[0.65rem]">⌘K</kbd>
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full md:hidden"
              onClick={() => setPaletteOpen(true)}
              aria-label="Search the site"
            >
              <Search />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={toggle}
              aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {dark ? <Sun /> : <Moon />}
            </Button>
            <Button asChild className="hidden rounded-full sm:inline-flex">
              <Link to="/contact">
                Discuss your store <ArrowUpRight />
              </Link>
            </Button>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full lg:hidden" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[88vw] gap-0 p-0 sm:max-w-sm">
                <div className="border-b p-5">
                  <SheetTitle className="font-display text-lg">Menu</SheetTitle>
                  <SheetDescription>Rabiu Yustech · eCommerce growth</SheetDescription>
                </div>
                <nav aria-label="Mobile" className="flex flex-col p-3">
                  {[{ to: '/', label: 'Home' } as const, ...NAV, { to: '/contact', label: 'Contact' } as const].map((n, i) => (
                    <Link
                      key={n.to}
                      to={n.to}
                      onClick={() => setMenuOpen(false)}
                      activeOptions={{ exact: n.to === '/' }}
                      className="flex items-baseline gap-3 rounded-xl px-3 py-3 font-display text-2xl font-bold transition-colors hover:bg-secondary data-[status=active]:text-primary"
                    >
                      <span className="font-mono text-xs font-normal text-muted-foreground">0{i + 1}</span>
                      {n.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto space-y-2 border-t p-5">
                  <Button asChild className="w-full rounded-full">
                    <Link to="/contact" onClick={() => setMenuOpen(false)}>
                      Discuss your store
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-full">
                    <a href={SITE.whatsappLink} target="_blank" rel="noopener">
                      <WhatsAppIcon className="size-4" /> WhatsApp me
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} onToggleTheme={toggle} />
    </>
  )
}
