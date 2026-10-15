export default function AboutArt() {
  return (
    <svg
      viewBox="0 0 440 440"
      role="img"
      aria-label="Composition abstraite de blocs autour d’un carré orange, évoquant la construction de solutions"
      className="h-auto w-full"
    >
      <circle cx="220" cy="220" r="200" className="fill-none stroke-line" />
      <circle cx="220" cy="220" r="140" className="fill-none stroke-line" strokeDasharray="4 8" />
      <rect x="150" y="150" width="140" height="140" rx="10" className="fill-surface stroke-orange/70" />
      <rect x="185" y="185" width="70" height="70" rx="6" className="fill-orange" />
      <rect x="40" y="200" width="46" height="46" rx="6" className="fill-surface stroke-line" />
      <rect x="350" y="120" width="40" height="40" rx="6" className="fill-surface stroke-line" />
      <rect x="330" y="320" width="56" height="56" rx="6" className="fill-surface stroke-orange-soft/60" />
      <circle cx="220" cy="20" r="6" className="fill-orange-soft" />
      <circle cx="80" cy="340" r="5" className="fill-orange" />
    </svg>
  )
}