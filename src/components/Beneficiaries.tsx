import { Users, Briefcase, Building } from 'lucide-react'
import FadeUp from './FadeUp'

export default function Beneficiaries() {
  const beneficiaries = [
    {
      title: 'The Commuter',
      icon: <Users size={24} />,
      body: '60% of Metro Cebu residents rely entirely on public transport. Para.Go shifts their commute from unpredictable to data-driven — live jeepney positions, seat counts before boarding, and cashless payment that just works.'
    },
    {
      title: 'Operators & Drivers',
      icon: <Briefcase size={24} />,
      body: 'Under the PUV Modernization Program, cooperatives need tech to stay compliant and competitive. Para.Go gives them automated fare capture, zero revenue leakage, fleet-wide visibility, and LTFRB-ready reports — without changing how drivers work.'
    },
    {
      title: 'Local Government',
      icon: <Building size={24} />,
      body: 'Cities cannot fix what they cannot measure. Para.Go turns Metro Cebu\'s invisible transit network into a live, queryable data asset — passenger volumes, route performance, incident logs. Everything LGUs need for smart urban planning.'
    }
  ]

  return (
    <section id="beneficiaries" className="py-24  transition-colors duration-1000">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        
        <FadeUp>
          <div className="mb-16">
            <span className="block font-sans font-semibold text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-4">
              WHO BENEFITS
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight text-[var(--color-text)] mb-6">
              A win-win-win.
            </h2>
            <p className="text-[var(--color-muted)] text-[1.0625rem] leading-relaxed max-w-3xl">
              Para.Go isn't just about making boarding faster. It solves systemic 
              problems for all three major stakeholders in the public transport ecosystem.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {beneficiaries.map((item, idx) => (
            <FadeUp key={idx} delay={idx * 150} className="relative group">
              {/* Highlight bar top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-gold)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-xl z-10"></div>
              
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 h-full transition-colors group-hover:bg-[#160d24]">
                <div className="w-12 h-12 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-gold)] mb-6">
                  {item.icon}
                </div>
                
                <h3 className="font-display font-medium text-[1.5rem] text-[var(--color-text)] mb-6">
                  {item.title}
                </h3>
                
                <p className="text-[var(--color-muted)] text-[0.95rem] leading-relaxed">
                  {item.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  )
}
