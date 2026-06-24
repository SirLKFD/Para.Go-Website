import { Clock, Users, Coins, TrendingDown, MapPinOff, FileX } from 'lucide-react'
import FadeUp from './FadeUp'

export default function TheProblem() {
  const problems = [
    {
      icon: <Clock size={24} />,
      title: 'No Real-Time Tracking',
      desc: "Passengers can't see where the next jeepney is or when it arrives"
    },
    {
      icon: <Users size={24} />,
      title: 'Overcrowding',
      desc: 'No way to know if a jeepney is full before it stops'
    },
    {
      icon: <Coins size={24} />,
      title: 'Cash-Only System',
      desc: 'Coin handling slows boarding, creates revenue leakage, offers no audit trail'
    },
    {
      icon: <TrendingDown size={24} />,
      title: 'No Proof-Based Reporting',
      desc: 'Operators and LGUs have zero data on route performance or driver behavior'
    }
  ]

  return (
    <section id="problem" className="py-24 bg-[var(--bg-base)] transition-colors duration-1000">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Text */}
          <FadeUp>
          <div className="mb-16">
            <span className="block font-sans font-semibold text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-4">
              THE PROBLEM
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight text-[var(--color-text)] mb-6">
              Metro Cebu moves<br />
              3.5 million times a day.<br />
              Blind.
            </h2>
            <div className="text-[var(--color-muted)] text-[1.0625rem] leading-relaxed max-w-3xl space-y-4">
              <p>
                No real-time data. No seat counts before you board. Drivers handling coins 
                while navigating traffic. Operators running fleets with no visibility. 
                City planners making decisions without a single data point from the network 
                they're responsible for.
              </p>
              <p>
                60% of Metro Cebu residents depend entirely on public transport. 
                For them, every commute is a guess.
              </p>
            </div>
          </div>
        </FadeUp>

          {/* Right Column: 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {problems.map((prob, idx) => (
            <FadeUp key={idx} delay={idx * 100}>
              <div 
                className="bg-[#0f081b] border-t-4 border-t-[var(--color-gold)] rounded-sm p-8 shadow-sm transition-transform duration-200 hover:-translate-y-1 h-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-[var(--color-gold)]">
                    {prob.icon}
                  </div>
                  <h3 className="font-display font-medium text-xl text-[var(--color-text)]">
                    {prob.title}
                  </h3>
                </div>
                <p className="text-[var(--color-muted)] text-[0.95rem] leading-relaxed">
                  {prob.desc}
                </p>
              </div>
            </FadeUp>
          ))}
          </div>

        </div>
      </div>
    </section>
  )
}
