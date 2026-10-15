export default function SectionHeading({ label, children }) {
    return (
      <div className="flex flex-col gap-4">
        <span className="font-mono text-[13px] tracking-[0.15em] text-orange">{label}</span>
        <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">{children}</h2>
      </div>
    )
  }