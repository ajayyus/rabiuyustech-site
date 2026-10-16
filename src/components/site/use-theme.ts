import { useCallback, useEffect, useState } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('ry-theme', next ? 'dark' : 'light')
    } catch {
      // Storage can be blocked; the toggle still works for this visit.
    }
    setDark(next)
  }, [])

  return { dark, toggle }
}
