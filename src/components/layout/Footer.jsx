import { ArrowUp } from 'lucide-react'
import { navItems, site } from '../../data/site'
import Logo from './Logo'
import SocialLinks from '../ui/SocialLinks'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-void">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-12 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="text-sm text-muted">Conçu avec passion, construit avec du code.</p>
          </div>

          <nav aria-label="Navigation du pied de page">
            <ul className="flex flex-wrap gap-x-7 gap-y-2 text-sm">
              {navItems.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-text">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <SocialLinks />
            <a
              href="#accueil"
              className="inline-flex min-h-11 items-center gap-1.5 font-mono text-[13px] text-orange-soft transition-colors hover:text-orange"
            >
              Retour en haut <ArrowUp size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {site.name} — {site.brand} {site.tagline}
        </p>
      </div>
    </footer>
  )
}