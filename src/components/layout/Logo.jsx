import { site } from '../../data/site'

export default function Logo() {
  return (
    <a
      href="#accueil"
      aria-label={`${site.brand} ${site.tagline} — retour à l’accueil`}
      className="flex items-baseline font-display text-xl font-bold tracking-wide"
    >
      {site.brand}
      <span className="text-orange">/</span>
      <span className="ml-2.5 hidden text-[13px] font-medium uppercase tracking-[0.2em] text-muted sm:inline">
        {site.tagline}
      </span>
    </a>
  )
}