import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navItems, site } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import Button from '../ui/Button'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import ThemeToggle from '../ui/ThemeToggle'

const ids = navItems.map((item) => item.id)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef(null)
  const active = useActiveSection(ids)
  const { scrollY, scrollYProgress } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8))

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 h-16 border-b transition-colors duration-300 lg:h-[72px] ${
          scrolled || open ? 'border-line bg-void/85 backdrop-blur-md' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-16">
          <Logo />

          <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`border-b-2 py-1.5 text-sm transition-colors ${
                  active === id ? 'border-orange text-text' : 'border-transparent text-muted hover:text-text'
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {site.cvUrl && (
              <Button variant="outline" size="sm" href={site.cvUrl} download className="hidden lg:inline-flex">
                Télécharger le CV
              </Button>
            )}  
            <ThemeToggle />
            <button
              ref={toggleRef}
              type="button"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-surface text-text lg:hidden"
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-orange"
        />
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} active={active} toggleRef={toggleRef} />
    </>
  )
}