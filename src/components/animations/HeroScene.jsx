import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

function FloatingDot({ x, y, size, delay = 0, className = 'fill-orange-soft', animate }) {
  return (
    <motion.g
      animate={animate ? { y: [0, -8, 0] } : undefined}
      transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <rect x={x} y={y} width={size} height={size} className={className} />
    </motion.g>
  )
}

export default function HeroScene({ className = '' }) {
  const reduce = useReducedMotion()
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const parallax = finePointer && !reduce

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 80, damping: 20 })
  const sy = useSpring(py, { stiffness: 80, damping: 20 })
  const farX = useTransform(sx, (v) => v * 24)
  const farY = useTransform(sy, (v) => v * 24)
  const midX = useTransform(sx, (v) => v * 48)
  const midY = useTransform(sy, (v) => v * 48)
  const nearX = useTransform(sx, (v) => v * 72)
  const nearY = useTransform(sy, (v) => v * 72)

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      onPointerMove={parallax ? onMove : undefined}
      onPointerLeave={parallax ? onLeave : undefined}
    >
      <svg
        viewBox="0 0 520 520"
        role="img"
        aria-label="Scène numérique : un développeur devant des écrans de code, avec une planète sombre et un anneau orbital orange"
        className="h-auto w-full overflow-visible"
      >
        <defs>
          <radialGradient id="fdg-planet" cx="35%" cy="30%" r="75%">
            <stop offset="0" style={{ stopColor: 'var(--planet-a)' }} />
            <stop offset="1" style={{ stopColor: 'var(--planet-b)' }} />
          </radialGradient>
          <radialGradient id="fdg-glow">
            <stop offset="0" style={{ stopColor: 'var(--color-orange)', stopOpacity: 'var(--glow-opacity)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-orange)', stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        <circle cx="260" cy="260" r="250" fill="url(#fdg-glow)" />

        <motion.g style={{ x: farX, y: farY }}>
          <circle cx="300" cy="190" r="140" fill="url(#fdg-planet)" className="stroke-orange/50" strokeWidth="1.5" />
          <ellipse cx="300" cy="190" rx="215" ry="52" className="fill-none stroke-orange-soft/70" strokeWidth="1.5" transform="rotate(-18 300 190)" />
        </motion.g>

        <motion.g style={{ x: midX, y: midY }}>
          <rect x="70" y="250" width="300" height="190" rx="8" className="fill-surface stroke-line" />
          <circle cx="90" cy="268" r="4" className="fill-orange" />
          <circle cx="104" cy="268" r="4" className="fill-line" />
          <circle cx="118" cy="268" r="4" className="fill-line" />
          <g className="fill-muted/50">
            <rect x="92" y="292" width="90" height="6" rx="3" />
            <rect x="108" y="308" width="140" height="6" rx="3" />
            <rect x="108" y="324" width="100" height="6" rx="3" />
            <rect x="92" y="340" width="60" height="6" rx="3" />
            <rect x="108" y="356" width="170" height="6" rx="3" />
            <rect x="92" y="372" width="80" height="6" rx="3" />
          </g>
          <g className="fill-orange">
            <rect x="190" y="292" width="50" height="6" rx="3" />
            <rect x="216" y="324" width="70" height="6" rx="3" />
            <rect x="160" y="340" width="40" height="6" rx="3" />
          </g>
          <rect x="330" y="300" width="150" height="110" rx="6" className="fill-night stroke-orange/60" />
          <rect x="346" y="320" width="70" height="6" rx="3" className="fill-orange-soft" />
          <rect x="346" y="336" width="110" height="6" rx="3" className="fill-muted/40" />
          <rect x="346" y="352" width="90" height="6" rx="3" className="fill-muted/40" />
        </motion.g>

        <motion.g style={{ x: nearX, y: nearY }}>
          <path d="M150 520 C150 470 185 450 220 450 C255 450 290 470 290 520 Z" className="fill-void stroke-orange/55" />
          <circle cx="220" cy="425" r="28" className="fill-void stroke-orange/55" />
          <FloatingDot x={40} y={130} size={8} animate={!reduce} />
          <FloatingDot x={470} y={110} size={6} delay={1.2} animate={!reduce} />
          <FloatingDot x={455} y={470} size={8} delay={2.4} className="fill-orange" animate={!reduce} />
        </motion.g>
      </svg>
    </motion.div>
  )
}