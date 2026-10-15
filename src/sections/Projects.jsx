import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { filters, projects } from '../data/projects'
import Section from '../components/layout/Section'
import SectionHeading from '../components/ui/SectionHeading'
import ProjectCard from '../components/ui/ProjectCard'
import ProjectDetails from '../components/ui/ProjectDetails'
import Reveal from '../components/animations/Reveal'

export default function Projects() {
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState(null)

  const available = filters.filter((f) => f.id === 'all' || projects.some((p) => p.category === f.id))
  const shown = active === 'all' ? projects : projects.filter((p) => p.category === active)

  return (
    <Section id="projets" className="bg-night">
      <Reveal>
        <SectionHeading label="04 — PROJETS">
          Des solutions <span className="text-orange">conçues pour des besoins réels.</span>
        </SectionHeading>
      </Reveal>

      {available.length > 2 && (
        <div role="group" aria-label="Filtrer les projets par catégorie" className="mt-10 flex flex-wrap gap-2.5">
          {available.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={active === id}
              onClick={() => setActive(id)}
              className={`min-h-11 rounded-md border px-4 text-sm font-medium transition-colors ${
                active === id
                  ? 'border-orange bg-orange text-on-orange'
                  : 'border-line text-muted hover:border-orange hover:text-text'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {shown.length} projet{shown.length > 1 ? 's' : ''} affiché{shown.length > 1 ? 's' : ''}
      </p>

      <motion.ul layout className="mt-8 grid gap-5 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((project) => (
                        <motion.li
                        key={project.id}
                        layout
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.3 }}
                      >
              <ProjectCard project={project} onOpen={setSelected} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {selected && <ProjectDetails key={selected.id} project={selected} onClose={() => setSelected(null)} />}
    </Section>
  )
}