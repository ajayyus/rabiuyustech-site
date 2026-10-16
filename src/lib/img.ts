// Serves local images through Netlify Image CDN so pages never ship full-size originals.
export function cdn(
  src: string,
  w: number,
  opts: { h?: number; fit?: 'cover' | 'contain'; q?: number; position?: string } = {},
) {
  const params = new URLSearchParams({ url: src, w: String(w), fm: 'webp' })
  if (opts.h) params.set('h', String(opts.h))
  if (opts.fit) params.set('fit', opts.fit)
  if (opts.position) params.set('position', opts.position)
  if (opts.q) params.set('q', String(opts.q))
  return `/.netlify/images?${params.toString()}`
}

export function cdnSrcSet(src: string, widths: number[], opts: { h?: (w: number) => number; fit?: 'cover' } = {}) {
  return widths
    .map((w) => `${cdn(src, w, { h: opts.h?.(w), fit: opts.fit })} ${w}w`)
    .join(', ')
}
