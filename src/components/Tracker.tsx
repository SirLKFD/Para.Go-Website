export default function Tracker() {
  return (
    <section id="tracker" className="border-4 border-[#2d1847] bg-[#160d24] p-6 md:p-12 mb-6">
      <div className="mb-8">
        <span className="yellow-badge mb-2">Real-Time Operations</span>
        <h2 className="text-3xl font-black uppercase tracking-wide text-[#fcd116] m-0">
          Cebu Transit Tracker
        </h2>
        <p className="text-sm text-[var(--sea-ink-soft)] mt-1">
          Observe the active positions of smart jeepneys currently on their routes.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Visual Flat Map Widget */}
        <div className="lg:col-span-2 border-2 border-[#2d1847] bg-[#0c0714] p-4 relative h-[300px] overflow-hidden flex flex-col justify-between">
          {/* SVG Transit Line Map Representation */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 500 300">
              {/* Route 10M path */}
              <path
                d="M 50,220 C 120,200 200,240 280,180 C 340,130 400,120 450,50"
                fill="none"
                className="stroke-[#2d1847] stroke-8"
              />
              <path
                d="M 50,220 C 120,200 200,240 280,180 C 340,130 400,120 450,50"
                fill="none"
                className="stroke-[#fcd116] stroke-2 stroke-dasharray-[6,4]"
              />
              
              {/* Active Jeepney JPNY_0001 (Rajah Humabon) */}
              <g transform="translate(230, 215)">
                <circle cx="0" cy="0" r="8" fill="#fcd116" className="animate-ping" />
                <circle cx="0" cy="0" r="5" fill="#fcd116" />
                <text x="12" y="4" fill="#ffffff" className="text-[10px] font-bold uppercase tracking-wider font-sans">
                  Rajah Humabon (10M)
                </text>
              </g>

              {/* Active Jeepney JPNY_0002 (Lapulapu) */}
              <g transform="translate(370, 125)">
                <circle cx="0" cy="0" r="8" fill="#fcd116" className="animate-ping" />
                <circle cx="0" cy="0" r="5" fill="#fcd116" />
                <text x="12" y="4" fill="#ffffff" className="text-[10px] font-bold uppercase tracking-wider font-sans">
                  Lapulapu (10M)
                </text>
              </g>

              {/* Road Nodes */}
              <circle cx="50" cy="220" r="4" fill="#2d1847" />
              <text x="40" y="240" fill="var(--sea-ink-soft)" className="text-[8px] uppercase font-bold">
                Bulacao Terminal
              </text>
              
              <circle cx="450" cy="50" r="4" fill="#2d1847" />
              <text x="390" y="40" fill="var(--sea-ink-soft)" className="text-[8px] uppercase font-bold">
                SM City Cebu
              </text>
            </svg>
          </div>
          
          <div className="relative z-10">
            <span className="yellow-badge text-[9px]">Live Route Map</span>
          </div>
          <div className="relative z-10 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-[#fcd116]">
            <span>Active Route: 10M</span>
            <span>2 Vehicles Online</span>
          </div>
        </div>

        {/* Active Fleet Sidebar */}
        <div className="border-2 border-[#2d1847] bg-[#160d24] p-4 flex flex-col justify-between">
          <div>
            <span className="yellow-badge text-[9px] mb-4">Active Fleet Status</span>
            <div className="space-y-4 mt-4">
              <div className="border-b border-[#2d1847] pb-3 text-left">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white font-bold text-xs uppercase tracking-wider">
                    Rajah Humabon
                  </span>
                  <span className="bg-[#fcd116] text-black text-[9px] px-1.5 font-bold uppercase">
                    12/24 Seats Occupied
                  </span>
                </div>
                <p className="text-[10px] text-[var(--sea-ink-soft)] m-0">
                  Heading: Northbound • Speed: 24 km/h
                </p>
                <p className="text-[10px] text-[#fcd116] m-0 mt-1 font-semibold uppercase">
                  Live Temp: 27.5°C • Auto Fan: ON
                </p>
              </div>

              <div className="pb-3 text-left">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white font-bold text-xs uppercase tracking-wider">
                    Lapulapu
                  </span>
                  <span className="bg-[#fcd116] text-black text-[9px] px-1.5 font-bold uppercase">
                    23/24 Seats Occupied
                  </span>
                </div>
                <p className="text-[10px] text-[var(--sea-ink-soft)] m-0">
                  Heading: Northbound • Speed: 15 km/h
                </p>
                <p className="text-[10px] text-[#ff3344] m-0 mt-1 font-semibold uppercase">
                  Live Temp: 29.8°C • Auto Fan: ON (Max)
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-3 border-t border-[#2d1847] text-left">
            <span className="text-[10px] text-[var(--sea-ink-soft)] uppercase font-semibold">
              📡 Updates every 3 seconds
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
