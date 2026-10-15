export default function Section({ id, className = '', children }) {
    return (
      <section id={id} className={`relative py-20 md:py-28 ${className}`}>
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-16">{children}</div>
      </section>
    )
  }