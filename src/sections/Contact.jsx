import { site } from '../data/site'
import Section from '../components/layout/Section'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Reveal from '../components/animations/Reveal'
import ContactForm from './ContactForm'

export default function Contact() {
  const { email, github, linkedin } = site.links
  const { formEndpoint } = site.contact

  const links = [
    email && { label: email, href: `mailto:${email}` },
    linkedin && { label: 'LinkedIn', href: linkedin, external: true },
    github && { label: 'GitHub', href: github, external: true },
  ].filter(Boolean)

  const hasRightColumn = Boolean(formEndpoint || email)

  return (
    <Section id="contact" className="bg-night">
      <div className={`grid items-center gap-12 ${hasRightColumn ? 'lg:grid-cols-[0.9fr_1.1fr] lg:gap-16' : ''}`}>
        <div className="flex flex-col gap-6">
          <Reveal>
            <SectionHeading label="06 — CONTACT">
              Une idée en tête ? <span className="text-orange">Construisons-la ensemble.</span>
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-lg text-base leading-[1.7] text-muted">
              Vous avez un projet, une opportunité professionnelle ou une idée à concrétiser ? Échangeons.
            </p>
          </Reveal>

          {links.length > 0 && (
            <Reveal delay={0.1}>
              <ul className="flex flex-col gap-3 font-mono text-sm">
                {links.map(({ label, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                      className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-orange"
                    >
                      <span aria-hidden="true" className="text-orange">→</span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {import.meta.env.DEV && !formEndpoint && !email && (
            <p className="font-mono text-xs text-orange-soft">
              [DEV] Aucun moyen de contact configuré : renseignez links.email ou contact.formEndpoint dans site.js.
            </p>
          )}
        </div>

        {hasRightColumn && (
          <Reveal delay={0.1}>
            {formEndpoint ? (
              <ContactForm endpoint={formEndpoint} />
            ) : (
              <div className="flex flex-col items-start gap-5 rounded-lg border border-line bg-surface p-6 sm:p-8">
                <p className="font-display text-2xl font-bold">Écrivez-moi directement</p>
                <p className="text-muted">Le plus simple : un e-mail avec quelques lignes sur votre projet.</p>
                <Button href={`mailto:${email}`}>Écrire un e-mail</Button>
              </div>
            )}
          </Reveal>
        )}
      </div>
    </Section>
  )
}