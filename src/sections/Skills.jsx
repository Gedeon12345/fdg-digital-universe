import { skillCategories } from '../data/skills'
import Section from '../components/layout/Section'
import SectionHeading from '../components/ui/SectionHeading'
import SkillCard from '../components/ui/SkillCard'
import Reveal from '../components/animations/Reveal'

export default function Skills() {
  return (
    <Section id="competences">
      <Reveal>
        <SectionHeading label="03 — COMPÉTENCES">
          Les outils que j’utilise <span className="text-orange">pour construire.</span>
        </SectionHeading>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => (
          <Reveal key={category.id} delay={0.06 * i} className="h-full">
            <SkillCard {...category} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}