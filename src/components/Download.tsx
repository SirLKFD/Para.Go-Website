import FadeUp from './FadeUp'

export default function Download() {
  return (
    <section id="download" className="py-24 transition-colors duration-1000 ">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        
        <FadeUp>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
            {/* Left: Text */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left justify-center">
              <h2 className="font-display font-bold text-4xl text-[var(--color-text)] mb-4">
                Ready to ride smarter?
              </h2>
              <p className="text-[var(--color-muted)] text-lg max-w-lg">
                The Para.Go mobile app is launching soon. Get ready to experience Cebu's smartest modern commute.
              </p>
            </div>

            {/* Right: Pre-Register & Future App Release Badges */}
            <div className="flex flex-col items-center shrink-0 w-full lg:w-auto">
              
              {/* Pre-Register Card */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] py-8 px-6 sm:py-10 sm:px-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center w-full max-w-[380px] relative overflow-hidden group">
                {/* Backlight Pulse Glow */}
                <div className="absolute -inset-10 bg-[var(--color-gold)]/5 blur-[50px] rounded-full -z-10 animate-pulse" style={{ animationDuration: '6s' }}></div>
                
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-6 whitespace-nowrap">Pre-Register for Testing</h3>
                
                <div className="mb-6 opacity-80">
                  <img 
                    src="/play-badge_pre-register.png" 
                    alt="Pre-Register on Google Play" 
                    className="h-14 object-contain" 
                  />
                </div>
                
                <p className="text-[var(--color-muted)] text-sm sm:text-base leading-relaxed max-w-[280px]">
                  Google Play pre-registration for internal testing is coming soon. Stay tuned for access links.
                </p>
              </div>

              {/* Future Official Release Badges */}
              <div className="flex flex-col items-center gap-3 mt-8 w-full">
                <span className="text-xs text-[var(--color-muted)]/80 font-bold uppercase tracking-widest">Supported OS</span>
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <img 
                      src="/play-badge.png" 
                      alt="Coming Soon to Google Play" 
                      className="h-10 object-contain" 
                    />
                  </div>
                  <div>
                    <img 
                      src="/apple-badge.svg" 
                      alt="Coming Soon to App Store" 
                      className="h-10 object-contain" 
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  )
}
