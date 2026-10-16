import { useState } from 'react'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { revealDelay } from '@/components/site/reveal'
import { CREATIVE } from '@/data/site'
import { cdn } from '@/lib/img'
import { cn } from '@/lib/utils'

export function CreativeGallery({ className }: { className?: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const item = open === null ? null : CREATIVE[open]
  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + CREATIVE.length) % CREATIVE.length))

  return (
    <>
      <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
        {CREATIVE.map((c, i) => (
          <button
            key={c.id}
            type="button"
            data-reveal
            style={revealDelay(i * 70)}
            onClick={() => setOpen(i)}
            className={cn(
              'group relative overflow-hidden rounded-3xl border bg-muted text-left focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
              c.span === 'wide' ? 'aspect-[16/9] sm:col-span-2 lg:col-span-4 lg:aspect-[21/8]' : 'aspect-[16/10] lg:col-span-1',
            )}
          >
            <img
              src={cdn(c.image, c.span === 'wide' ? 1600 : 640)}
              srcSet={
                c.span === 'wide'
                  ? `${cdn(c.image, 800)} 800w, ${cdn(c.image, 1200)} 1200w, ${cdn(c.image, 1600)} 1600w`
                  : `${cdn(c.image, 400)} 400w, ${cdn(c.image, 640)} 640w`
              }
              sizes={c.span === 'wide' ? '(min-width: 1024px) 76rem, 100vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
              alt={`${c.title}: ${c.kind}`}
              loading="lazy"
              width={c.width}
              height={c.height}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
              <div>
                <p className="font-display text-lg leading-tight font-bold">{c.title}</p>
                <p className="mt-0.5 text-xs text-white/75">{c.kind}</p>
              </div>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-white group-hover:text-black">
                <Expand className="size-4" aria-hidden="true" />
              </span>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={item !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent
          className="gap-0 overflow-hidden rounded-3xl p-0 sm:max-w-5xl"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') step(1)
            if (e.key === 'ArrowLeft') step(-1)
          }}
        >
          {item && (
            <>
              <div className="bg-black">
                <img
                  src={cdn(item.image, 1600)}
                  alt={`${item.title}: ${item.kind}`}
                  width={item.width}
                  height={item.height}
                  className="mx-auto max-h-[70svh] w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <DialogTitle className="font-display text-xl">{item.title}</DialogTitle>
                  <DialogDescription>{item.kind}</DialogDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full" onClick={() => step(-1)} aria-label="Previous visual">
                    <ChevronLeft />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full" onClick={() => step(1)} aria-label="Next visual">
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
