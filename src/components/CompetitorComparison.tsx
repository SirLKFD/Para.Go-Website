import { Check, Minus } from 'lucide-react'
import FadeUp from './FadeUp'

export default function CompetitorComparison() {
  const features = [
    { name: 'Real-time jeepney tracking', sakay: true, jtransit: true, beep: false, parago: true, exclusive: false },
    { name: 'Passenger load monitoring', sakay: false, jtransit: false, beep: false, parago: true, exclusive: true },
    { name: 'Cashless fare collection', sakay: true, jtransit: false, beep: true, parago: true, exclusive: false },
    { name: 'Route suggestions', sakay: true, jtransit: true, beep: false, parago: true, exclusive: false },
    { name: 'Incident reporting', sakay: false, jtransit: false, beep: false, parago: true, exclusive: true },
    { name: 'Flexible Tap-in & Tap-out', sakay: false, jtransit: false, beep: false, parago: true, exclusive: true },
    { name: 'Distance-based fare computation', sakay: true, jtransit: true, beep: true, parago: true, exclusive: false },
    { name: 'Automatic discount application', sakay: true, jtransit: false, beep: false, parago: true, exclusive: true },
    { name: 'Cebu geographic coverage', sakay: false, jtransit: true, beep: false, parago: true, exclusive: false },
  ]

  const renderIcon = (hasFeature: boolean, isExclusive: boolean = false) => {
    if (hasFeature) {
      return (
        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${isExclusive ? 'bg-[var(--color-gold)]/20 text-[var(--color-gold)]' : 'text-[var(--color-green)]'}`}>
          <Check size={20} strokeWidth={isExclusive ? 3 : 2} />
        </div>
      )
    }
    return <Minus size={20} className="text-[var(--color-border)]" />
  }

  return (
    <section id="why" className="py-24 bg-[var(--color-bg)]">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        
        <FadeUp>
          <div className="mb-16">
            <span className="block font-sans font-semibold text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-4">
              WHY PARA.GO
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight text-[var(--color-text)]">
              The only solution<br />
              built for Cebu's jeepneys.
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={150}>
          <div className="w-full overflow-x-auto pb-6">
            <div className="min-w-[900px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-2xl">
              {/* Header Row */}
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] bg-[#0c0714] border-b border-[var(--color-border)]">
                <div className="p-5 font-semibold text-[var(--color-muted)] uppercase tracking-wider text-sm flex items-center whitespace-nowrap">Feature</div>
                <div className="p-5 font-semibold text-[var(--color-text)] text-center flex items-center justify-center whitespace-nowrap">Sakay</div>
                <div className="p-5 font-semibold text-[var(--color-text)] text-center flex items-center justify-center">JTransit</div>
                <div className="p-5 font-semibold text-[var(--color-text)] text-center flex items-center justify-center">Beep</div>
                <div className="p-5 font-bold !text-[#0c0714] bg-[var(--color-gold)] text-center text-lg flex items-center justify-center uppercase tracking-wider">Para.Go</div>
              </div>

              {/* Body Rows */}
              <div className="divide-y divide-[var(--color-border)]">
                {features.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] hover:bg-[#1a102e] transition-colors">
                    <div className="p-5 font-medium text-[var(--color-text)] flex items-center">
                      {item.name}
                    </div>
                    <div className="p-5 flex items-center justify-center border-l border-[var(--color-border)]/50">
                      {renderIcon(item.sakay)}
                    </div>
                    <div className="p-5 flex items-center justify-center border-l border-[var(--color-border)]/50">
                      {renderIcon(item.jtransit)}
                    </div>
                    <div className="p-5 flex items-center justify-center border-l border-[var(--color-border)]/50">
                      {renderIcon(item.beep)}
                    </div>
                    <div className="p-5 flex items-center justify-center border-l border-[var(--color-border)] bg-[#1a102e] relative">
                      {renderIcon(item.parago, item.exclusive && item.parago)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        <p className="mt-6 text-[var(--color-muted)] text-[1.0625rem] leading-relaxed max-w-3xl">
          Para.Go is the only transit solution with passenger load monitoring, 
          incident reporting, and flexible tap-in/tap-out — all built specifically 
          for Metro Cebu.
        </p>

      </div>
    </section>
  )
}
