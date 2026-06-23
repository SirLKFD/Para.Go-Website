import { Bus, Layers, CreditCard, ChevronRight } from 'lucide-react'

// Divider 1: Sine Wave & Gliding Jeepney (Hero -> Tracker)
export function TransitDividerWave() {
  return (
    <div className="relative w-full h-12 overflow-hidden my-10 select-none pointer-events-none">
      <Bus className="h-6 w-6 text-[#fcd116] jeepney-rider" />
      <svg
        viewBox="0 0 1440 40"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d="M 0,20 Q 180,5 360,20 T 720,20 T 1080,20 T 1440,20"
          className="transit-wave-line stroke-[#2d1847] stroke-2"
        />
        <path
          d="M 0,20 Q 180,5 360,20 T 720,20 T 1080,20 T 1440,20"
          className="stroke-[#fcd116] stroke-[1px] opacity-30"
        />
      </svg>
    </div>
  )
}

// Divider 2: Guide Rails / Parallel Tracks (Showcase -> Features)
export function TransitDividerTracks() {
  return (
    <div className="relative w-full h-8 my-10 select-none pointer-events-none border-y border-[#2d1847] flex items-center overflow-hidden">
      <Layers className="h-4 w-4 text-[#fcd116] jeepney-rider" />
      <div className="divider-tracks-line w-full h-1 bg-[#160d24]" />
    </div>
  )
}

// Divider 3: Chevron Traffic Flow (Features -> Fares)
export function TransitDividerChevrons() {
  return (
    <div className="relative w-full h-8 overflow-hidden my-10 border-y border-[#2d1847] bg-[#0f081b] flex items-center select-none pointer-events-none">
      <div className="chevron-flow-inner flex gap-8">
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <span
              key={i}
              className="text-[#fcd116] font-bold tracking-widest text-xs flex items-center gap-1"
            >
              FLOW <ChevronRight className="h-3.5 w-3.5 inline text-blue-500" />
              ROUTE <ChevronRight className="h-3.5 w-3.5 inline text-red-500" />
              TRANSIT <ChevronRight className="h-3.5 w-3.5 inline text-white" />
            </span>
          ))}
      </div>
    </div>
  )
}

// Divider 4: NFC Signal Pulse Waves (Fares -> Safety)
export function TransitDividerNfc() {
  return (
    <div className="relative w-full h-12 my-10 flex items-center justify-center overflow-hidden border-y border-[#2d1847] select-none pointer-events-none">
      <div className="absolute inset-0 bg-[#160d24] opacity-30" />
      <div className="relative flex items-center gap-6 z-10">
        <CreditCard className="h-5 w-5 text-[#fcd116]" />
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 border border-[#fcd116] opacity-40 signal-ring" style={{ animationDelay: '0s' }} />
          <span className="w-1.5 h-6 border border-[#fcd116] opacity-60 signal-ring" style={{ animationDelay: '0.4s' }} />
          <span className="w-1.5 h-8 border border-[#fcd116] opacity-80 signal-ring" style={{ animationDelay: '0.8s' }} />
        </div>
        <span className="text-[9px] font-bold uppercase tracking-widest text-[#fcd116]">
          NFC TAPPING SIGNALS DETECTED
        </span>
      </div>
    </div>
  )
}

// Divider 5: GPS Coordinate Nodes (Safety -> Fleet)
export function TransitDividerGps() {
  return (
    <div className="relative w-full h-12 my-10 flex items-center justify-between px-6 border-y border-[#2d1847] select-none pointer-events-none">
      <span className="text-[8px] md:text-[9px] font-bold text-[var(--sea-ink-soft)] uppercase tracking-wider">
        GPS PATH: 10.3157° N, 123.8854° E (CEBU CITY HUB)
      </span>
      <svg viewBox="0 0 100 20" className="h-4 w-40 stroke-[#2d1847] stroke-2 fill-none hidden sm:block">
        <path d="M 0,10 L 100,10" className="transit-wave-line stroke-[#fcd116]" />
        <circle cx="20" cy="10" r="3" fill="#fcd116" className="gps-glow-node" style={{ animationDelay: '0s' }} />
        <circle cx="50" cy="10" r="3" fill="#fcd116" className="gps-glow-node" style={{ animationDelay: '0.5s' }} />
        <circle cx="80" cy="10" r="3" fill="#fcd116" className="gps-glow-node" style={{ animationDelay: '1s' }} />
      </svg>
      <span className="text-[8px] md:text-[9px] font-bold text-[#fcd116] uppercase tracking-wider">
        TELEMETRY STREAM: ACTIVE
      </span>
    </div>
  )
}
