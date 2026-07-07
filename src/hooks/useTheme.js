import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'vfo-theme'

function resolveInitialTheme() {
  // The inline bootstrap in index.html has already set this before mount.
  const current = document.documentElement.dataset.theme
  if (current === 'light' || current === 'dark') return current
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage unavailable — fall through to system preference.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(resolveInitialTheme)
  // Only an explicit toggle should be persisted. Persisting the first-visit
  // OS-derived value would freeze the choice and stop following the OS on
  // later visits, even though the user never chose a theme.
  const userChose = useRef(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    if (!userChose.current) return
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Persistence is best-effort; ignore storage failures.
    }
  }, [theme])

  const toggle = useCallback(() => {
    userChose.current = true
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
