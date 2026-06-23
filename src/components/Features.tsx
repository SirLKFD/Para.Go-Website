import { Wind, CreditCard, Layers, MapPin } from 'lucide-react'

export default function Features() {
  return (
    <section id="features" className="border-4 border-[#2d1847] bg-[#160d24] p-6 md:p-12 mb-6">
      <div className="mb-8">
        <span className="yellow-badge mb-2">Modern Standards</span>
        <h2 className="text-3xl font-black uppercase tracking-wide text-[#fcd116] m-0">
          Smart Transit Features
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: 'Automated Comfort',
            desc: 'Intelligent climate controls monitor passenger volume and interior temperature, activating ventilation automatically.',
            icon: Wind,
          },
          {
            title: 'Cashless Boarding',
            desc: 'Tap-to-ride smart card integrations eliminate coin-handling stress for both passengers and drivers.',
            icon: CreditCard,
          },
          {
            title: 'Live Info displays',
            desc: 'Clear visual status monitors notify passengers of the route destination and seat availability before step-in.',
            icon: Layers,
          },
          {
            title: 'Real-Time Trackers',
            desc: 'Dedicated GPS tracking systems update passenger apps with precise locations to reduce waiting time.',
            icon: MapPin,
          },
        ].map((feat, i) => (
          <article key={i} className="feature-card p-6 border-2 border-[#2d1847]">
            <feat.icon className="h-8 w-8 text-[#fcd116] mb-4" />
            <h3 className="text-lg font-bold text-[#fcd116] uppercase tracking-wider mb-2">
              {feat.title}
            </h3>
            <p className="text-sm text-[var(--sea-ink-soft)] m-0 leading-relaxed">
              {feat.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
