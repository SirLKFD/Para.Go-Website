import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import FadeUp from './FadeUp'

export default function HowItWorks() {
  const [distance, setDistance] = useState(4)

  // Fare logic: Base ₱15 for 4km + ₱2.20/km after
  const calculateFare = (km: number) => {
    if (km <= 4) return 15.00
    return 15.00 + ((km - 4) * 2.20)
  }

  const fare = calculateFare(distance)

  return (
    <section id="how-it-works" className="py-24  transition-colors duration-1000">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <span className="block font-sans font-semibold text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-4">
              FOR COMMUTERS
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight text-[var(--color-text)]">
              Tap in. Ride. Tap out.
            </h2>
          </div>
        </FadeUp>

        {/* 3-Step Flow */}
        <div className="relative mb-24">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-[var(--color-border)] z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {/* Step 1 */}
            <FadeUp delay={100} className="relative flex flex-col items-center text-center">
              {/* Connector Line (Mobile) */}
              <div className="md:hidden absolute top-12 bottom-[-3rem] left-1/2 w-0.5 bg-[var(--color-border)] -z-10"></div>
              
              <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-gold)] flex items-center justify-center font-display font-bold text-[var(--color-gold)] text-xl mb-6 shadow-[0_0_15px_rgba(245,197,24,0.15)]">
                1
              </div>
              <h3 className="font-display font-medium text-xl text-[var(--color-text)] mb-3">Board</h3>
              <p className="text-[var(--color-muted)] text-[1.0625rem] leading-relaxed">
                Tap your Para.Go RFID card on the reader at the jeepney entrance. Your boarding GPS coordinates are recorded automatically.
              </p>
            </FadeUp>

            {/* Step 2 */}
            <FadeUp delay={250} className="relative flex flex-col items-center text-center">
              {/* Connector Line (Mobile) */}
              <div className="md:hidden absolute top-12 bottom-[-3rem] left-1/2 w-0.5 bg-[var(--color-border)] -z-10"></div>

              <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-gold)] flex items-center justify-center font-display font-bold text-[var(--color-gold)] text-xl mb-6 shadow-[0_0_15px_rgba(245,197,24,0.15)]">
                2
              </div>
              <h3 className="font-display font-medium text-xl text-[var(--color-text)] mb-3">Ride</h3>
              <p className="text-[var(--color-muted)] text-[1.0625rem] leading-relaxed">
                Track the jeepney live in the app. The IoT module monitors the passenger counter and updates seat counts on the exterior display.
              </p>
            </FadeUp>

            {/* Step 3 */}
            <FadeUp delay={400} className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-gold)] flex items-center justify-center font-display font-bold text-[var(--color-gold)] text-xl mb-6 shadow-[0_0_15px_rgba(245,197,24,0.15)]">
                3
              </div>
              <h3 className="font-display font-medium text-xl text-[var(--color-text)] mb-3">Alight</h3>
              <p className="text-[var(--color-muted)] text-[1.0625rem] leading-relaxed">
                Tap out before you exit. The system calculates your distance using GPS, applies the LTFRB fare matrix, applies any applicable discounts, and deducts from your card balance. No change needed.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Interactive Fare Estimator */}
        <FadeUp delay={400}>
          <div className="max-w-2xl mx-auto bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 lg:p-10 text-center shadow-xl">
            <h3 className="font-display font-medium text-2xl text-[var(--color-text)] mb-8">
              Estimate your fare
            </h3>
            
            <div className="mb-10">
              <div className="flex justify-between text-sm text-[var(--color-muted)] font-mono mb-4">
                <span>1 km</span>
                <span className="text-[var(--color-gold)] font-bold text-lg">{distance} km</span>
                <span>30 km</span>
              </div>
              
              <input 
                type="range" 
                min="1" 
                max="30" 
                step="1"
                value={distance} 
                onChange={(e) => setDistance(parseInt(e.target.value))}
                className="w-full h-2 bg-[#0c0714] rounded-lg appearance-none cursor-pointer accent-[var(--color-gold)]"
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-[var(--color-muted)] text-sm mb-2 uppercase tracking-wider font-semibold">Estimated Fare</span>
              <div className="font-display font-bold text-5xl sm:text-6xl text-[var(--color-gold)] mb-4">
                ₱{fare.toFixed(2)}
              </div>
              <div className="inline-flex items-center gap-2 text-[var(--color-muted)] text-sm font-mono bg-[#0c0714] px-4 py-2 rounded-full border border-[var(--color-border)]">
                <span>₱15 base</span>
                <ArrowRight size={14} />
                <span>₱2.20 per succeeding km after 4km</span>
              </div>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  )
}
