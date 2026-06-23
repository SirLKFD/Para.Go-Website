import { useState } from 'react'
import { Smartphone, Layers, CreditCard } from 'lucide-react'

export default function Showcase() {
  const [phoneImgError, setPhoneImgError] = useState(false)

  return (
    <section id="showcase" className="border-4 border-[#2d1847] bg-[#0c0714] p-6 md:p-12 mb-6">
      <div className="mb-10 text-center">
        <span className="yellow-badge mb-2">Service Concept</span>
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-[#fcd116] m-0">
          A Unified Transit Experience
        </h2>
        <p className="text-sm text-[var(--sea-ink-soft)] max-w-md mx-auto mt-2">
          Seamlessly integrating smart boarding cards and route planning for the modern Cebuano commuter.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 max-w-4xl mx-auto items-center justify-center">
        {/* Static Phone Screenshot Image Mockup */}
        <div className="flex flex-col items-center">
          {/* Phone Frame */}
          <div className="w-[280px] h-[520px] bg-[#090510] border-4 border-[#2d1847] rounded-[2rem] p-3 relative shadow-none">
            {/* Dynamic Island Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#090510] rounded-full z-20 border border-[#2d1847]" />
            
            {/* Screen Contents - Image with fallback */}
            <div className="w-full h-full bg-[#160d24] rounded-[1.6rem] overflow-hidden relative">
              {phoneImgError ? (
                <div className="flex flex-col items-center justify-center p-6 text-center text-[var(--sea-ink-soft)] h-full bg-[#160d24]">
                  <Smartphone className="h-12 w-12 text-[#fcd116] mb-3 animate-bounce" />
                  <span className="yellow-badge text-[9px] mb-2">Phone Screen</span>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    App Screenshot
                  </h4>
                  <p className="text-[9px] max-w-[160px] leading-relaxed m-0">
                    Place <code className="text-white">phone-screenshot.png</code> inside the <code className="text-white">assets/</code> folder to display your app screen here.
                  </p>
                </div>
              ) : (
                <img
                  src="/phone-screenshot.png"
                  alt="Commuter App Screenshot"
                  onError={() => setPhoneImgError(true)}
                  className="w-full h-full object-cover block"
                />
              )}
            </div>
          </div>
          <span className="text-xs font-bold uppercase text-[#fcd116] mt-4 flex items-center gap-1">
            <Smartphone className="h-4 w-4" /> Live Mobile Interface
          </span>
        </div>

        {/* Flat CSS NFC Fare Card Mockup */}
        <div className="flex flex-col items-center">
          {/* NFC Card Frame */}
          <div className="w-[320px] h-[200px] bg-[#160d24] border-4 border-[#fcd116] rounded-xl p-4 relative flex flex-col justify-between overflow-hidden shadow-none">
            {/* Minimal Cebu Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none border border-[#2d1847] m-2 flex items-center justify-center">
              <div className="w-full h-full border-r border-b border-[#fcd116] grid grid-cols-6 grid-rows-4" />
            </div>

            {/* Card Top Row */}
            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-2">
                <img src="/parago-icon.png" alt="Logo" className="h-8 w-auto" />
              </div>
              <div className="text-right">
                <CreditCard className="h-6 w-6 text-[#fcd116]" />
                <span className="text-[7px] text-[var(--sea-ink-soft)] block uppercase mt-0.5">
                  NFC Pass
                </span>
              </div>
            </div>

            {/* Card Bottom Row */}
            <div className="relative z-10">
              <span className="text-[8px] uppercase text-[var(--sea-ink-soft)] tracking-widest block mb-0.5">
                Assigned Vehicle
              </span>
              <span className="text-xl font-bold text-[#fcd116] uppercase tracking-wide block leading-none">
                Rajah Humabon
              </span>
              <span className="text-xs font-semibold text-white tracking-widest uppercase mt-1 block">
                FA 59 11 BA
              </span>
            </div>
          </div>
          <span className="text-xs font-bold uppercase text-[#fcd116] mt-4 flex items-center gap-1">
            <Layers className="h-4 w-4" /> Tap-to-Ride Boarding Card
          </span>
        </div>
      </div>
    </section>
  )
}
