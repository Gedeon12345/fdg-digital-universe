import { motion } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { site } from '../data/site'
import Button from '../components/ui/Button'
import SocialLinks from '../components/ui/SocialLinks'
import HeroScene from '../components/animations/HeroScene'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section id="accueil" className="relative flex min-h-svh items-center overflow-hidden pb-16 pt-28 lg:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgb(255_121_0/0.10),transparent_55%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-16">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
          <motion.span
            variants={item}
            className="self-start rounded-md border border-line bg-surface px-3.5 py-2 font-mono text-[13px] text-orange-soft"
          >
            {site.role}
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-[2.75rem] font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl xl:text-[76px]"
          >
            Gédéon
            <br />
            Foba <span className="text-orange">Deffo</span>
          </motion.h1>

          <motion.p variants={item} className="font-display text-xl leading-snug sm:text-2xl">
            {site.headline}
          </motion.p>

          <motion.p variants={item} className="max-w-xl text-base leading-relaxed text-muted">
            {site.intro}
          </motion.p>

          <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
            <Button href="#projets" className="w-full sm:w-auto">Découvrir mes projets</Button>
            <Button variant="secondary" href="#contact" className="w-full sm:w-auto">Discutons ensemble</Button>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <SocialLinks />
            {site.availability.enabled && (
              <p className="flex items-center gap-2 text-sm text-ok">
                <span aria-hidden="true" className="size-2 rounded-full bg-ok motion-safe:animate-pulse" />
                {site.availability.label}
              </p>
            )}
          </motion.div>
        </motion.div>

        <HeroScene className="mx-auto w-full max-w-[300px] sm:max-w-sm lg:max-w-none" />
      </div>

      <a
        href="#apropos"
        aria-label="Découvrir la suite du site"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-text lg:flex"
      >
        Défiler
        <ArrowDown size={16} aria-hidden="true" className="text-orange motion-safe:animate-bounce" />
      </a>
    </section>
  )
}