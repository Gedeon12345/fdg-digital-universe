import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Passer au thème clair' : 'Passer au thème sombre'}
      className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-surface text-text transition-colors hover:border-orange hover:text-orange"
    >
      {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </button>
  )
}