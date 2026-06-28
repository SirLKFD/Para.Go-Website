import FadeUp from './FadeUp'

export default function Roadmap() {
  const milestones = [
    {
      date: 'Aug 2025 – Apr 2026',
      title: 'Development',
      body: 'CIT-U Computer Engineering thesis. Built the IoT module, commuter app, and driver console. Validated with 116 Metro Cebu commuters.',
      status: 'past' // filled circle
    },
    {
      date: 'May 2026',
      title: 'Pilot Deployment',
      body: 'Endorsed by Cebu City government. Live deployment with El Pardo Transport Cooperative on Route 10M (Bulacao–SM City Cebu).',
      status: 'past' // filled circle
    },
    {
      date: 'June 2026',
      title: 'B2B Operator Partnership Hunt',
      body: 'Actively onboarding modern jeepney cooperatives across Metro Cebu. Open Track Champion, Cebu SolutionsFest 2026.',
      status: 'current' // pulsing ring
    },
    {
      date: 'July 2026',
      title: 'Funding, Grants & Venture Support',
      body: 'Securing venture support, startup grants, angel investments, and institutional support to scale operations.',
      status: 'future' // outlined circle
    },
    {
      date: 'September – December 2026',
      title: 'Hardware & Software Refinement',
      body: 'Iterating modules based on feedback, software performance tuning, and pilot testing across additional Metro Cebu corridors.',
      status: 'future' // outlined circle
    }
  ]

  return (
    <section id="roadmap" className="py-24  transition-colors duration-1000">
      <div className="max-w-[1000px] mx-auto px-4 lg:px-6">
        
        <FadeUp>
          <div className="mb-20 text-center">
            <span className="block font-sans font-semibold text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-4">
              ROADMAP
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight text-[var(--color-text)]">
              Thesis to streets.<br />
              Here's the timeline.
            </h2>
          </div>
        </FadeUp>

        <div className="relative">
          {/* Main timeline vertical path */}
          <div className="absolute top-0 bottom-0 left-6 md:left-[50%] w-1 bg-[var(--color-border)] -translate-x-1/2 z-0"></div>

          <div className="space-y-16 relative z-10">
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0
              
              return (
                <div key={idx} className="relative flex items-center w-full md:justify-center py-4">
                  
                  {/* Desktop Left Content (Even items) */}
                  <div className="hidden md:block w-5/12 text-right pr-10 lg:pr-16">
                    {isEven && (
                      <FadeUp delay={idx * 150}>
                        <div className={`transition-opacity duration-500 ${item.status === 'current' ? 'opacity-100' : 'opacity-75'}`}>
                          <div className={`inline-flex items-center gap-2 mb-2 ${item.status === 'current' ? 'text-[var(--color-gold)]' : 'text-[var(--color-text)]'}`}>
                            {item.status === 'current' && (
                              <span className="px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider bg-[var(--color-gold)] !text-[#0c0714]">
                                Current
                              </span>
                            )}
                            <span className="font-mono text-sm font-bold">{item.date}</span>
                          </div>
                          <h4 className="font-display font-semibold text-xl text-[var(--color-text)] mb-3">
                            {item.title}
                          </h4>
                          <p className={`text-sm leading-relaxed ${item.status === 'current' ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)]'}`}>
                            {item.body}
                          </p>
                        </div>
                      </FadeUp>
                    )}
                  </div>

                  {/* Desktop Center Spacer */}
                  <div className="hidden md:block w-2/12"></div>

                  {/* Desktop Right Content (Odd items) */}
                  <div className="hidden md:block w-5/12 text-left pl-10 lg:pl-16">
                    {!isEven && (
                      <FadeUp delay={idx * 150}>
                        <div className={`transition-opacity duration-500 ${item.status === 'current' ? 'opacity-100' : 'opacity-75'}`}>
                          <div className={`inline-flex items-center gap-2 mb-2 ${item.status === 'current' ? 'text-[var(--color-gold)]' : 'text-[var(--color-text)]'}`}>
                            <span className="font-mono text-sm font-bold">{item.date}</span>
                            {item.status === 'current' && (
                              <span className="px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider bg-[var(--color-gold)] !text-[#0c0714]">
                                Current
                              </span>
                            )}
                          </div>
                          <h4 className="font-display font-semibold text-xl text-[var(--color-text)] mb-3">
                            {item.title}
                          </h4>
                          <p className={`text-sm leading-relaxed ${item.status === 'current' ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)]'}`}>
                            {item.body}
                          </p>
                        </div>
                      </FadeUp>
                    )}
                  </div>

                  {/* Mobile Content */}
                  <div className="md:hidden ml-16 w-full py-2">
                    <FadeUp delay={idx * 150}>
                      <div className={`transition-opacity duration-500 ${item.status === 'current' ? 'opacity-100' : 'opacity-75'}`}>
                        <div className={`inline-flex items-center gap-2 mb-2 ${item.status === 'current' ? 'text-[var(--color-gold)]' : 'text-[var(--color-text)]'}`}>
                          <span className="font-mono text-sm font-bold">{item.date}</span>
                          {item.status === 'current' && (
                            <span className="px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider bg-[var(--color-gold)] !text-[#0c0714]">
                              Current
                            </span>
                          )}
                        </div>
                        <h4 className="font-display font-semibold text-xl text-[var(--color-text)] mb-3">
                          {item.title}
                        </h4>
                        <p className={`text-sm leading-relaxed ${item.status === 'current' ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)]'}`}>
                          {item.body}
                        </p>
                      </div>
                    </FadeUp>
                  </div>

                  {/* The Node Marker */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center bg-[var(--color-bg)] z-10
                    shadow-[0_0_0_8px_var(--color-bg)]"
                  >
                    <div className={`w-full h-full rounded-full flex items-center justify-center
                      ${item.status === 'past' ? 'border-4 border-[var(--color-gold)]' : ''}
                      ${item.status === 'current' ? 'border-[4px] border-[var(--color-gold)]' : ''}
                      ${item.status === 'future' ? 'border-2 border-[var(--color-muted)]' : ''}
                    `}>
                      {item.status === 'past' && <div className="w-2 h-2 rounded-full bg-[var(--color-gold)]"></div>}
                      {item.status === 'current' && (
                        <>
                          <div className="w-2 h-2 rounded-full bg-[var(--color-gold)] relative z-10"></div>
                          <div className="absolute inset-0 bg-[var(--color-gold)] rounded-full animate-ping opacity-75"></div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
