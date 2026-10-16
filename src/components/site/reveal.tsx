import { useEffect } from 'react'

// Fades in elements marked with data-reveal as they scroll into view.
// Content stays visible without JS; the class below opts the page in.
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('js-reveal')
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    const scan = () =>
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
  return null
}

export function revealDelay(ms: number) {
  return { '--d': `${ms}ms` } as React.CSSProperties
}
