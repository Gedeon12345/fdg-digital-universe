import { useState } from 'react'

const KEY = 'fdg-theme'
const BAR_COLORS = { dark: '#050505', light: '#f6f7f9' }

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', BAR_COLORS[theme])
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* stockage indisponible : le choix ne sera pas mémorisé */
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(() => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'))

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
  }

  return { theme, toggle }
}