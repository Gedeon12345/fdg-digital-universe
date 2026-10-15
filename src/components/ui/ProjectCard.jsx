import { Code, ExternalLink } from 'lucide-react'
import Button from './Button'
import { getProjectImage } from '../../lib/projectImages'
import { trackPointer } from '../../lib/spotlight'

const external = { target: '_blank', rel: 'noreferrer noopener' }
const linkClass = 'inline-flex min-h-10 items-center gap-1.5 text-sm text-muted transition-colors hover:text-orange'

export default function ProjectCard({ project, onOpen }) {
  const { id, name, kind, status, summary, tech, demo, github, detail } = project
  const cover = getProjectImage(id)

  return (
    <article onPointerMove={trackPointer} className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition duration-300 hover:border-orange/60 motion-safe:hover:-translate-y-1">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-orange transition-transform duration-300 group-hover:scale-x-100"
      />
        <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(260px_circle_at_var(--x,50%)_var(--y,50%),rgb(255_121_0/0.12),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative aspect-video overflow-hidden border-b border-line bg-night">
        {cover ? (
          <img
            src={cover}
            alt={`Capture d’écran du projet ${name}`}
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex size-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgb(255_121_0/0.14),transparent_60%)]"
          >
            <span className="px-4 text-center font-display text-4xl font-bold tracking-tight text-line">{name}</span>
          </div>
        )}
      </div>

      <div className="relative flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs text-orange-soft">{kind}</span>
          {status ? (
            <span className="rounded border border-line px-2 py-1 font-mono text-xs text-muted">{status}</span>
          ) : (
            import.meta.env.DEV && <span className="font-mono text-xs text-danger">[statut à confirmer]</span>
          )}
        </div>

        <h3 className="font-display text-2xl font-bold">{name}</h3>
        <p className="text-sm leading-relaxed text-muted">{summary}</p>

        {tech.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {tech.map((item) => (
              <li key={item} className="rounded border border-line px-2.5 py-1 font-mono text-xs text-muted">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          import.meta.env.DEV && <p className="font-mono text-xs text-danger">[technologies à confirmer]</p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-3">
          {detail ? (
            <Button variant="outline" size="sm" onClick={() => onOpen(project)} aria-label={`Découvrir le projet ${name}`}>
              Découvrir le projet
            </Button>
          ) : (
            demo && (
              <Button variant="outline" size="sm" href={demo} {...external} aria-label={`Voir la démo de ${name} (nouvel onglet)`}>
                Voir la démo <ExternalLink size={14} aria-hidden="true" />
              </Button>
            )
          )}
          {detail && demo && (
            <a href={demo} {...external} className={linkClass} aria-label={`Démo de ${name} (nouvel onglet)`}>
              Démo <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
          {github && (
            <a href={github} {...external} className={linkClass} aria-label={`Code source de ${name} (nouvel onglet)`}>
              <Code size={14} aria-hidden="true" /> Code source
            </a>
          )}
        </div>
      </div>
    </article>
  )
}