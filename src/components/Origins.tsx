export default function Origins() {
  return (
    <section id="origins" className="border-4 border-[#fcd116] bg-[#0c0714] p-6 md:p-12 mb-6">
      <div className="mb-10 text-center">
        <span className="yellow-badge mb-2">Our Origins</span>
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-[#fcd116] m-0">
          CIT-University Innovation
        </h2>
        <p className="text-sm text-[var(--sea-ink-soft)] max-w-lg mx-auto mt-2">
          What started as a pioneering graduation research project at Cebu Institute of Technology - University is now hitting the streets as Cebu's next smart transit service.
        </p>
      </div>

      {/* Asymmetrical Collage Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto pt-4">
        {/* Collage Item 1: Team Photo */}
        <div
          className="flat-collage-frame aspect-[4/3] sm:rotate-[-2deg] md:col-span-2"
          style={{ transform: 'rotate(-1.5deg)' }}
        >
          <div className="w-full h-full bg-[#1e102f] border border-[#2d1847] flex flex-col justify-between p-4 text-left">
            <span className="yellow-badge text-[10px]">CIT-U Campus</span>
            <div className="text-[#fcd116]">
              <h4 className="text-sm font-bold uppercase tracking-wider m-0">
                CIT-U Research Lab
              </h4>
              <p className="text-[11px] text-[var(--sea-ink-soft)] m-0 mt-1">
                Co-designing the smart jeepney system interface with faculty members.
              </p>
            </div>
          </div>
        </div>

        {/* Collage Item 2: Inside Jeepney */}
        <div
          className="flat-collage-frame aspect-[4/3] sm:rotate-[2deg] md:col-span-2"
          style={{ transform: 'rotate(2deg)' }}
        >
          <div className="w-full h-full bg-[#1e102f] border border-[#2d1847] flex flex-col justify-between p-4 text-left">
            <span className="yellow-badge text-[10px]">Cabin Trials</span>
            <div className="text-[#fcd116]">
              <h4 className="text-sm font-bold uppercase tracking-wider m-0">
                Active Commuter Testing
              </h4>
              <p className="text-[11px] text-[var(--sea-ink-soft)] m-0 mt-1">
                Testing passenger counting accuracy and air flow ventilation.
              </p>
            </div>
          </div>
        </div>

        {/* Collage Item 3: Board Presentation */}
        <div
          className="flat-collage-frame aspect-[4/3] sm:rotate-[-1deg] md:col-span-2"
          style={{ transform: 'rotate(-1deg)' }}
        >
          <div className="w-full h-full bg-[#1e102f] border border-[#2d1847] flex flex-col justify-between p-4 text-left">
            <span className="yellow-badge text-[10px]">Smart Counters</span>
            <div className="text-[#fcd116]">
              <h4 className="text-sm font-bold uppercase tracking-wider m-0">
                Technologian Engineers
              </h4>
              <p className="text-[11px] text-[var(--sea-ink-soft)] m-0 mt-1">
                Graduation thesis demonstration of the automatic counter display board.
              </p>
            </div>
          </div>
        </div>

        {/* Collage Item 4: Graduation Togas */}
        <div
          className="flat-collage-frame aspect-[4/3] sm:rotate-[3deg] md:col-span-2"
          style={{ transform: 'rotate(2.5deg)' }}
        >
          <div className="w-full h-full bg-[#1e102f] border border-[#2d1847] flex flex-col justify-between p-4 text-left">
            <span className="yellow-badge text-[10px]">Graduation 2026</span>
            <div className="text-[#fcd116]">
              <h4 className="text-sm font-bold uppercase tracking-wider m-0">
                Home of the Technologians
              </h4>
              <p className="text-[11px] text-[var(--sea-ink-soft)] m-0 mt-1">
                The research graduates in CIT-U Maroon & Gold togas celebrating launch.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-[var(--sea-ink-soft)] italic font-semibold">
        💡 Tip: Place your actual graduation and jeepney photographs in the assets directory to replace these placeholders.
      </div>
    </section>
  )
}
