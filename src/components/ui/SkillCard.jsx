import { trackPointer } from '../../lib/spotlight'

export default function SkillCard({ title, icon: Icon, items }) {
  return (
    <article
      onPointerMove={trackPointer}
      className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-lg border border-line bg-surface p-6 transition duration-300 hover:border-orange/60 motion-safe:hover:-translate-y-1"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(260px_circle_at_var(--x,50%)_var(--y,50%),rgb(255_121_0/0.12),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative flex items-center gap-3.5">
        <span className="flex size-10 items-center justify-center rounded-md border border-orange text-orange transition-colors group-hover:bg-orange group-hover:text-void">
          <Icon size={20} aria-hidden="true" />
        </span>
        <h3 className="font-display text-xl font-bold">{title}</h3>
      </div>
      <ul className="relative flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded border border-line px-2.5 py-1 font-mono text-xs text-muted">
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}