import { useEffect, useRef } from 'react'
import { ExternalLink, X } from 'lucide-react'
import Button from './Button'
import { getProjectGallery } from '../../lib/projectImages'

const external = { target: '_blank', rel: 'noreferrer noopener' }
const label = 'font-mono text-[13px] uppercase tracking-[0.15em] text-orange'

export default function ProjectDetails({ project, onClose }) {
  const ref = useRef(null)
  const { id, name, kind, status, tech, demo, github, detail } = project
  const gallery = getProjectGallery(id)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog.open) dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const sections = [
    ['Présentation', detail.overview],
    ['Problème rencontré', detail.problem],
    ['Objectif de la solution', detail.goal],
    ['Rôle', detail.role],
    ['Choix techniques', detail.choices],
    ['Difficultés et solutions', detail.challenges],
  ].filter(([, text]) => text)

  const missing = ['problem', 'goal', 'role', 'choices', 'challenges'].filter((key) => !detail[key])

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-title"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && ref.current.close()}
      className="m-auto max-h-[90svh] w-[min(92vw,44rem)] overflow-y-auto rounded-lg border border-line bg-surface p-0 text-text backdrop:bg-void/80 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col gap-7 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-orange-soft">
              {kind}
              {status && ` · ${status}`}
            </span>
            <h2 id="project-title" className="font-display text-3xl font-bold sm:text-4xl">
              {name}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => ref.current.close()}
            aria-label="Fermer la fiche du projet"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-orange hover:text-text"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {sections.map(([title, text]) => (
          <section key={title} className="flex flex-col gap-2">
            <h3 className={label}>{title}</h3>
            <p className="text-sm leading-relaxed text-muted">{text}</p>
          </section>
        ))}

        {detail.plannedFeatures && (
          <section className="flex flex-col gap-3">
            <h3 className={label}>Fonctionnalités visées</h3>
            <p className="text-sm text-muted">
              Objectifs de la V1, actuellement en développement : ce ne sont pas des fonctionnalités terminées.
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              {detail.plannedFeatures.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-orange">→</span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        )}

        {tech.length > 0 && (
          <section className="flex flex-col gap-3">
            <h3 className={label}>Technologies</h3>
            <ul className="flex flex-wrap gap-2">
              {tech.map((item) => (
                <li key={item} className="rounded border border-line px-2.5 py-1 font-mono text-xs text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {detail.currentState && (
          <section className="flex flex-col gap-2">
            <h3 className={label}>État actuel</h3>
            <p className="text-sm leading-relaxed text-muted">{detail.currentState}</p>
          </section>
        )}

        {gallery.length > 0 && (
          <section className="flex flex-col gap-3">
            <h3 className={label}>Captures d’écran</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {gallery.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Capture d’écran ${i + 1} du projet ${name}`}
                  width="1280"
                  height="720"
                  loading="lazy"
                  decoding="async"
                  className="aspect-video w-full rounded-md border border-line object-cover"
                />
              ))}
            </div>
          </section>
        )}

        {(demo || github) && (
          <div className="flex flex-wrap gap-3">
            {demo && (
              <Button variant="outline" size="sm" href={demo} {...external}>
                Voir la démo <ExternalLink size={14} aria-hidden="true" />
              </Button>
            )}
            {github && (
              <Button variant="secondary" size="sm" href={github} {...external}>
                Code source
              </Button>
            )}
          </div>
        )}

        {import.meta.env.DEV && missing.length > 0 && (
          <p className="font-mono text-xs text-danger">[DEV] Sections à fournir : {missing.join(', ')}</p>
        )}
      </div>
    </dialog>
  )
}