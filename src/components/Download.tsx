import FadeUp from './FadeUp'

export default function Download() {
  return (
    <section id="download" className="py-24 bg-[var(--color-bg)] border-y border-[var(--color-border)]">
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
            <div className="flex flex-col sm:flex-row gap-8 lg:gap-12 shrink-0">
              
              {/* App QR */}
              <div className="flex flex-col items-center">
                <div className="bg-white p-2 rounded-xl shadow-xl mb-4">
                  <div className="w-40 h-40 md:w-48 md:h-48 bg-white flex items-center justify-center rounded-lg overflow-hidden">
                    <img src="/playstoreqr.jpg" alt="Play Store QR" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <p className="text-white text-sm md:text-base font-semibold italic text-center">Scan to install the App</p>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-10 md:h-12 object-contain" />
                </div>
              </div>

              {/* Kickstarter QR */}
              <div className="flex flex-col items-center">
                <div className="bg-white p-2 rounded-xl shadow-xl mb-4">
                  <div className="w-40 h-40 md:w-48 md:h-48 bg-white flex items-center justify-center rounded-lg overflow-hidden">
                    <img src="/kickstarterqr.jpg" alt="Kickstarter QR" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 justify-center h-full">
                  <p className="text-white text-sm md:text-base font-semibold italic text-center max-w-[180px]">*Scan to view our Kickstarter video</p>
                </div>
              </div>

            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  )
}
