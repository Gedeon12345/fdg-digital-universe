import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { navItems, site } from '../../data/site'
import Button from '../ui/Button'

export default function MobileMenu({ open, onClose, active, toggleRef }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    const panel = panelRef.current
    const focusables = () => panel.querySelectorAll('a[href], button:not([disabled])')

    focusables()[0]?.focus()
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const items = [toggle, ...focusables()]
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    const media = window.matchMedia('(min-width: 1024px)')
    const onResize = (e) => e.matches && onClose()

    document.addEventListener('keydown', onKeyDown)
    media.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      media.removeEventListener('change', onResize)
      document.body.style.overflow = ''
      toggle?.focus({ preventScroll: true })
    }
  }, [open, onClose, toggleRef])

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          id="menu-mobile"
          ref={panelRef}
          aria-label="Menu mobile"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 bottom-0 top-16 z-30 flex flex-col overflow-y-auto bg-void px-5 pb-10 pt-4 sm:px-8 lg:hidden"
        >
          {navItems.map(({ id, label }, i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={onClose}
              aria-current={active === id ? 'true' : undefined}
              className={`flex min-h-14 items-center justify-between border-b border-line py-4 font-display text-2xl ${
                active === id ? 'text-orange' : 'text-text'
              }`}
            >
              {label}
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
            </a>
          ))}
          {site.cvUrl && (
            <Button variant="outline" href={site.cvUrl} download className="mt-8">
              Télécharger le CV
            </Button>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}