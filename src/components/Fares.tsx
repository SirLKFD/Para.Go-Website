export default function Fares() {
  return (
    <section id="fares" className="border-4 border-[#2d1847] bg-[#0c0714] p-6 md:p-12 mb-6">
      <div className="mb-10 text-center">
        <span className="yellow-badge mb-2">Commuters Guide</span>
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-[#fcd116] m-0">
          GPS Distance-Based Fares
        </h2>
        <p className="text-sm text-[var(--sea-ink-soft)] mt-1">
          Tap-In & Tap-Out calculations based on precise boarding and alighting coordinates.
        </p>
      </div>

      {/* Step Guide Diagram Centered & Styled */}
      <div className="max-w-3xl mx-auto space-y-8 text-left border-2 border-[#2d1847] bg-[#160d24] p-6 md:p-8">
        <h3 className="text-xl font-bold uppercase tracking-wider text-[#fcd116] m-0 border-b border-[#2d1847] pb-3">
          Coordinate-Based Fare Calculation
        </h3>
        
        <div className="flex gap-4 items-start">
          <span className="bg-[#fcd116] text-[#0c0714] font-black h-8 w-8 rounded-none flex items-center justify-center flex-shrink-0 text-sm">
            1
          </span>
          <div>
            <h4 className="text-base font-bold text-white uppercase m-0">
              Boarding Tap-In
            </h4>
            <p className="text-xs text-[var(--sea-ink-soft)] m-0 mt-1 leading-relaxed">
              Upon stepping in, tap your NFC pass on the card reader. The system locks in your initial GPS coordinates at the boarding location.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <span className="bg-[#fcd116] text-[#0c0714] font-black h-8 w-8 rounded-none flex items-center justify-center flex-shrink-0 text-sm">
            2
          </span>
          <div>
            <h4 className="text-base font-bold text-white uppercase m-0">
              Alighting Tap-Out
            </h4>
            <p className="text-xs text-[var(--sea-ink-soft)] m-0 mt-1 leading-relaxed">
              Before alighting at your destination, tap your card again. The system logs your final GPS coordinates.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <span className="bg-[#fcd116] text-[#0c0714] font-black h-8 w-8 rounded-none flex items-center justify-center flex-shrink-0 text-sm">
            3
          </span>
          <div>
            <h4 className="text-base font-bold text-white uppercase m-0">
              Distance & Fare Matrix Processing
            </h4>
            <p className="text-xs text-[var(--sea-ink-soft)] m-0 mt-1 leading-relaxed">
              The system automatically calculates the distance travelled between the coordinates and cross-references it with Cebu's modern fare matrix (Base Fare ₱15.00 for 4km + ₱2.20 per succeeding km), deducting it directly from your card balance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
