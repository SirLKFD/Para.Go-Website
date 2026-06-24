import { ArrowRight, Download } from 'lucide-react'
import FadeUp from './FadeUp'

export default function Partnerships() {
  const cards = [
    {
      letter: 'G',
      title: 'Government',
      partners: 'Local Government Units (LGUs) and national agencies: LTFRB, DOTr, DOST.',
      outcome: 'Fast-tracks regulatory approvals, secures pilot funding, and integrates Para.Go into Cebu\'s smart city initiatives.'
    },
    {
      letter: 'I',
      title: 'Industry',
      partners: 'Transport operators, commercial companies, telecom providers, and fintech infrastructure companies. El Pardo Transport Cooperative (active partner).',
      outcome: 'Accelerates real-world fleet deployment and enables e-wallet and payment infrastructure at scale.'
    },
    {
      letter: 'P',
      title: 'The Public',
      partners: 'Commuter advocacy groups, student organizations, senior citizen associations, and PWD groups.',
      outcome: 'Drives community adoption, builds public trust, and ensures automated discount enforcement for all passenger categories.'
    }
  ]

  return (
    <section id="partners" className="py-24 bg-[var(--color-bg)]">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        
        <FadeUp>
          <div className="mb-16">
            <span className="block font-sans font-semibold text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-4">
              MAGIC PARTNERSHIPS
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight text-[var(--color-text)] mb-6">
              This isn't built alone.<br />
              It's built with Cebu.
            </h2>
            <p className="text-[var(--color-muted)] text-[1.0625rem] leading-relaxed max-w-3xl">
              Para.Go operates under the MAGIC partnership model — Government, Industry, 
              and Public working together. We're currently in the CCCI SolutionsFest 
              90-day adoption pipeline and in active conversations with DOST, DTI, 
              and Cebu City transport agencies.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cards.map((item, idx) => (
            <FadeUp key={idx} delay={idx * 150}>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 relative overflow-hidden group hover:border-[var(--color-gold)] transition-colors h-full">
                <div className={`absolute -top-6 text-[120px] font-display font-black text-[var(--color-gold)] opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none select-none leading-none ${item.letter === 'I' ? 'right-2' : '-right-6'}`}>
                  {item.letter}
                </div>
                
                <div className="font-display font-bold text-5xl text-[var(--color-gold)] mb-6">
                  {item.letter}
                </div>
                <h3 className="font-display font-semibold text-2xl text-[var(--color-text)] mb-4">
                  {item.title}
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="block text-[0.75rem] uppercase tracking-wider text-[var(--color-muted)] font-bold mb-1">Partners</span>
                    <p className="text-[var(--color-text)] text-sm leading-relaxed">{item.partners}</p>
                  </div>
                  <div>
                    <span className="block text-[0.75rem] uppercase tracking-wider text-[var(--color-gold)] font-bold mb-1">Outcome</span>
                    <p className="text-[var(--color-text)] text-sm leading-relaxed">{item.outcome}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Partnership CTA */}
        {/* Partnership CTA */}
        <FadeUp delay={400}>
          <div className="bg-[#0c0714] border-t-4 border-t-[var(--color-gold)] border border-[var(--color-border)] rounded-xl p-8 md:p-12 text-center">
            <h3 className="font-display font-medium text-2xl text-[var(--color-text)] mb-4">
              We are actively onboarding cooperatives and institutional partners 
              for our September 2026 commercial rollout.
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a 
                href="#contact"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[var(--color-gold)] !text-[#0c0714] px-8 py-4 rounded-sm font-bold text-sm tracking-wider uppercase transition-colors hover:bg-white"
              >
                Let's Talk Integration <ArrowRight size={18} />
              </a>
              <button 
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 border-2 border-[var(--color-muted)] text-[var(--color-muted)] px-8 py-4 rounded-sm font-bold text-sm tracking-wider uppercase transition-colors hover:bg-[var(--color-muted)] hover:!text-[#0c0714] cursor-not-allowed opacity-80"
                disabled
                title="Coming soon"
              >
                <Download size={18} /> Download Partnership Deck
              </button>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  )
}
