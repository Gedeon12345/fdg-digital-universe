import { site } from '../data/site'
import Section from '../components/layout/Section'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/animations/Reveal'
import AboutArt from '../components/animations/AboutArt'

export default function About() {
  const { paragraphs, facts } = site.about
  const visibleFacts = facts.filter((fact) => fact.value)

  return (
    <Section id="apropos" className="bg-night">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <Reveal>
            <SectionHeading label="02 — À PROPOS">
              Bien plus qu’un code, <span className="text-orange">une vision.</span>
            </SectionHeading>
          </Reveal>

          {paragraphs.map((text, i) => (
            <Reveal key={i} delay={0.05 * (i + 1)}>
              <p className={`text-base leading-[1.7] ${i === paragraphs.length - 1 ? 'text-text' : 'text-muted'}`}>
                {text}
              </p>
            </Reveal>
          ))}

          {visibleFacts.length > 0 && (
            <Reveal delay={0.2}>
              <dl className="rounded-lg border border-line bg-surface px-5 font-mono text-[13px]">
                {visibleFacts.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 border-b border-line py-3 last:border-b-0 sm:flex-row sm:justify-between sm:gap-6"
                  >
                    <dt className="text-muted">{label}</dt>
                    <dd className="sm:text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1} className="mx-auto w-full max-w-md lg:max-w-none">
          <AboutArt />
        </Reveal>
      </div>
    </Section>
  )
}