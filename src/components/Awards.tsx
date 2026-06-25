import { Trophy, ChevronRight, GraduationCap, Building2, CheckCircle } from 'lucide-react'
import FadeUp from './FadeUp'

export default function Awards() {
  const secondaryAwards = [
    {
      icon: <Building2 size={24} />,
      title: 'Presented to City Hall',
      body: 'Para.Go was demonstrated to Mayor Nestor D. Archival Sr. for Cebu City transit modernization consideration.'
    },
    {
      icon: <GraduationCap size={24} />,
      title: 'CIT-U Computer Engineering Thesis',
      body: 'Validated through a structured academic thesis at Cebu Institute of Technology - University, 2025–2026.'
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'El Pardo Transport Cooperative',
      body: 'Official cooperative partner for the pilot deployment on Cebu routes.'
    }
  ]

  const sdgs = [
    { num: 3, label: 'Good Health', color: '#4C9F38' },
    { num: 9, label: 'Industry & Innovation', color: '#FD6925' },
    { num: 11, label: 'Sustainable Cities', color: '#FD9D24' },
    { num: 13, label: 'Climate Action', color: '#3F7E44' }
  ]

  return (
    <section id="awards" className="py-24  transition-colors duration-1000">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 relative z-10">
        
        <FadeUp>
          <div className="flex flex-col items-center text-center mb-16">
            <Trophy size={48} className="text-[var(--color-gold)] mb-6" />
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight text-[var(--color-text)] mb-4">
              Cebu SolutionsFest 2026<br />
              Open Track Champion
            </h2>
            <p className="text-[var(--color-muted)] text-[1.0625rem] max-w-2xl">
              Hosted by the Cebu Chamber of Commerce and Industry (CCCI) at Waterfront Cebu City Hotel. 
              Para.Go was selected as the winner from over 70+ participating teams.
            </p>
          </div>
        </FadeUp>

        {/* Event Photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <FadeUp delay={150}>
            <div className="rounded-xl overflow-hidden shadow-lg border border-[var(--color-border)] h-64 md:h-80">
              <img src="/cs1.jpg" alt="Cebu SolutionsFest 2026 Event" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="rounded-xl overflow-hidden shadow-lg border border-[var(--color-border)] h-64 md:h-80">
              <img src="/cs2.jpg" alt="Cebu SolutionsFest 2026 Event" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          </FadeUp>
          <FadeUp delay={450}>
            <div className="rounded-xl overflow-hidden shadow-lg border border-[var(--color-border)] h-64 md:h-80">
              <img src="/cs3.jpg" alt="Cebu SolutionsFest 2026 Event" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <FadeUp delay={150}>
            <div className="bg-[var(--color-surface)] border border-[var(--color-gold)]/20 p-8 rounded-xl shadow-[0_0_30px_rgba(252,209,22,0.05)]">
              <h3 className="text-[var(--color-gold)] font-mono text-sm uppercase tracking-wider mb-2 font-bold">The Prize</h3>
              <p className="text-3xl font-display font-bold text-[var(--color-text)] mb-2">₱50,000</p>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">Seed funding to accelerate the pilot deployment in Metro Cebu.</p>
            </div>
          </FadeUp>

          <FadeUp delay={300}>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-xl">
              <h3 className="text-[var(--color-text)] font-mono text-sm uppercase tracking-wider mb-2 font-bold">The Next Step</h3>
              <p className="text-2xl font-display font-bold text-[var(--color-text)] mb-2">90-Day Pipeline</p>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">Accepted into the CCCI adoption program for actual commercial deployment.</p>
            </div>
          </FadeUp>

          <FadeUp delay={450}>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-xl flex flex-col justify-center items-center text-center group cursor-pointer hover:border-[var(--color-gold)]/50 transition-colors">
              <span className="text-[var(--color-text)] font-medium mb-3">Read the full story</span>
              <a href="https://sandbox.org.ph/solutionsfest2026?fbclid=IwY2xjawSokCJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeST8BzjBUqXK9qzqNJWh7BIneWNv4x4IIjVpUeAZpU0eO1Dew-fLWQMT6s3M_aem_VNMTJ3xOGM_gxFy2m0dOqQ" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-gold)] group-hover:bg-[var(--color-gold)] group-hover:text-[#0c0714] transition-colors">
                <ChevronRight size={20} />
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Secondary Recognitions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {secondaryAwards.map((item, idx) => (
            <div key={idx} className="bg-[#130a22] border border-[var(--color-border)] rounded-xl p-6">
              <div className="text-[var(--color-text)] mb-4">{item.icon}</div>
              <h4 className="font-display font-medium text-lg text-[var(--color-text)] mb-2">{item.title}</h4>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>



      </div>
    </section>
  )
}
