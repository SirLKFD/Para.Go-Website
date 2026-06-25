import FadeUp from './FadeUp'

export default function Download() {
  return (
    <section id="download" className="py-24 transition-colors duration-1000 ">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        
        <FadeUp>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
            {/* Left: Text */}
            <div className="flex-1 hidden lg:flex flex-col items-start justify-center">
              <h2 className="font-display font-bold text-4xl text-[var(--color-text)] mb-4">
                Ready to ride smarter?
              </h2>
              <p className="text-[var(--color-muted)] text-lg">
                Get the Para.Go app and start your seamless commute today.
              </p>
            </div>

            {/* Right: QR Codes */}
            <div className="flex flex-col items-center shrink-0">
              
              {/* App QR */}
              <a 
                href="https://play.google.com/apps/internaltest/4700011648938665542" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:scale-105 hover:-translate-y-2"
              >
                <div className="bg-white p-3 rounded-2xl shadow-xl mb-4 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-shadow duration-300">
                  <div className="w-56 h-56 md:w-100 md:h-100 bg-white flex items-center justify-center rounded-xl overflow-hidden relative">
                    <img src="/playstoreqr.jpg" alt="Play Store QR" className="w-full h-full object-cover" />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-full border border-[var(--color-gold)] text-sm uppercase tracking-wider">Click to open</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <p className="text-white text-sm md:text-base font-semibold italic text-center group-hover:text-[var(--color-gold)] transition-colors">Scan or click to install</p>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-10 md:h-12 object-contain" />
                </div>
              </a>

            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  )
}
