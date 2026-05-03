import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-background">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full text-xs text-muted mb-10 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-slow" />
          Hamburg · Professionelle Werbetechnik
        </div>

        <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none mb-8 text-balance">
          <span className="block text-white">WE WRAP IT.</span>
          <span className="block text-white">WE PRINT IT.</span>
          <span className="block text-accent">YOU LOVE IT.</span>
        </h1>

        <p className="text-base sm:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
          Fahrzeugfolierung, Beschriftung, Digitaldruck & Leuchtreklame –
          maßgeschneidert für Ihr Unternehmen in Hamburg und Umgebung.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/portfolio"
            className="px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold text-sm uppercase tracking-widest rounded-sm transition-all duration-200 hover:scale-105 active:scale-100"
          >
            Portfolio ansehen
          </Link>
          <Link
            href="/kontakt"
            className="px-8 py-4 border border-border hover:border-white/60 text-white font-bold text-sm uppercase tracking-widest rounded-sm transition-all duration-200 hover:bg-white/5"
          >
            Angebot anfragen
          </Link>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-8 sm:gap-16">
          {[
            { value: '500+', label: 'Projekte' },
            { value: '10+', label: 'Jahre Erfahrung' },
            { value: '100%', label: 'Kundenzufriedenheit' },
            { value: 'HH', label: 'Hamburg & Region' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-white">{value}</div>
              <div className="text-xs text-muted uppercase tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted/60">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-muted/40 to-transparent" />
      </div>
    </section>
  )
}
