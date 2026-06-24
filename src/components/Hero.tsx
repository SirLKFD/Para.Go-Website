import { Trophy, Smartphone, MapPin } from 'lucide-react'
import FadeUp from './FadeUp'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden">

      {/* Background with Orange Glow and CSS grid pattern */}
      <div className="absolute inset-0 z-0 bg-[var(--color-bg)]">
        {/* Radial orange glow top right */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--color-orange)]/20 blur-[120px]"></div>
        
        {/* Subtle CSS diagonal lines / grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff), linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 xl:gap-24 items-center">
          
          {/* Left Column: Text */}
          <div className="lg:col-span-5">
            <FadeUp delay={100}>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              

              {/* Headlines */}
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] mb-6">
                Cebu's jeepneys,<br />
                finally smart.
              </h1>
              
              <p className="text-[var(--color-muted)] text-[1.0625rem] leading-relaxed max-w-xl mb-10">
                Para.Go is a complete smart transit system — IoT hardware, mobile apps, 
                and cashless fares working together on the streets of Cebu City. 
                Metro Cebu generates 3.5 million trips daily. We're building the 
                infrastructure to make every one of them better.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                <a 
                  href="#tracker"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[var(--color-gold)] !text-[#0c0714] px-6 py-3 rounded-sm font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors hover:bg-white"
                >
                  Track Live Jeepneys →
                </a>
                <a 
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 border-2 border-[var(--color-muted)] text-[var(--color-muted)] px-6 py-3 rounded-sm font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors hover:bg-[var(--color-muted)] hover:!text-[#0c0714]"
                >
                  Learn How It Works
                </a>
              </div>


              </div>
            </FadeUp>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="lg:col-span-7 relative w-full flex items-center justify-center lg:justify-end mt-16 lg:mt-0 perspective-1000">
            
            {/* Phone Frame */}
            <FadeUp delay={300} className="relative z-20 shrink-0">
              <div className="relative w-[190px] sm:w-[240px] rounded-[2.5rem] border-[6px] border-[var(--color-surface)] bg-[#0f081b] overflow-hidden aspect-[9/19] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out hover:-translate-y-4 hover:scale-[1.03]">
                <img 
                  src="/passenger.jpg" 
                  alt="Commuter App Map Screenshot" 
                  className="w-full h-full object-cover opacity-90"
                  loading="lazy"
                />
                
                {/* Overlay UI elements */}
                <div className="absolute bottom-8 left-3 right-3 bg-[var(--color-surface)]/90 backdrop-blur border border-[var(--color-border)] rounded-xl p-3 shadow-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[var(--color-text)] font-mono text-xs font-bold">10M</span>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[var(--color-green)]/20 border border-[var(--color-green)]/30 text-[var(--color-green)] text-[0.55rem] font-bold uppercase tracking-wider">
                      <span className="w-1 h-1 rounded-full bg-[var(--color-green)] animate-pulse"></span>
                      Live
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[var(--color-muted)] text-[0.65rem]">
                    <MapPin size={10} className="text-[var(--color-gold)] shrink-0" />
                    <span className="truncate">Bulacao → SM City</span>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Tablet Frame */}
            <FadeUp delay={500} className="relative z-10 shrink-0 ml-0 sm:ml-4 lg:ml-8 mt-12 sm:mt-20">
              <div className="relative w-[280px] sm:w-[400px] rounded-2xl border-[6px] border-[var(--color-surface)] bg-[#0f081b] overflow-hidden aspect-[16/10] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:z-30 transition-transform duration-700 ease-out hover:-translate-y-4 hover:scale-[1.03] opacity-95 hover:opacity-100">
                <img 
                  src="/driver.jpg" 
                  alt="Driver Dashboard" 
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </FadeUp>

          </div>

        </div>
      </div>
    </section>
  )
}
