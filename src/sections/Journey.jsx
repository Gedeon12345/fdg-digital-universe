import { journey } from '../data/journey'
import Section from '../components/layout/Section'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/animations/Reveal'

export default function Journey() {
  return (
    <Section id="parcours">
      <Reveal>
        <SectionHeading label="05 — PARCOURS">
          Un parcours <span className="text-orange">en construction.</span>
        </SectionHeading>
      </Reveal>

      <ol className="relative mt-14 flex flex-col gap-10 border-l border-line pl-8 lg:grid lg:grid-cols-4 lg:gap-7 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-8">
        {journey.map((step, i) => (
          <li key={step.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[39px] top-1 size-3.5 rounded-full border-4 border-void bg-orange box-content lg:-top-[39px] lg:left-0"
            />
            <Reveal delay={0.1 * i} className="flex flex-col gap-3">
              <span className="font-mono text-[13px] text-orange-soft">
                {step.date ?? (import.meta.env.DEV ? '[date à confirmer]' : null)}
              </span>
              <h3 className="font-display text-xl font-bold lg:text-[22px]">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}