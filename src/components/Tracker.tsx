import { Activity } from 'lucide-react'

export default function Tracker() {
  const fleet = [
    {
      id: 'JPNY_0001',
      name: 'Rajah Humabon',
      seats: 8,
      capacity: 24,
      heading: 'Northbound',
      speed: '24 km/h',
      temp: '27.5°C',
      fan: 'Auto-Off',
      status: 'low', // green
    },
    {
      id: 'JPNY_0002',
      name: 'Lapulapu',
      seats: 12,
      capacity: 24,
      heading: 'Northbound',
      speed: '15 km/h',
      temp: '28.2°C',
      fan: 'Auto-Off',
      status: 'half', // yellow
    },
    {
      id: 'JPNY_0003',
      name: 'Magellan',
      seats: 21,
      capacity: 24,
      heading: 'Southbound',
      speed: '18 km/h',
      temp: '30.1°C',
      fan: 'Auto-On',
      status: 'near-full', // orange
    },
    {
      id: 'JPNY_0004',
      name: 'Legazpi',
      seats: 24,
      capacity: 24,
      heading: 'Southbound',
      speed: '12 km/h',
      temp: '31.5°C',
      fan: 'Auto-On (Max)',
      status: 'full', // red
    }
  ]

  const getCapacityColor = (status: string) => {
    switch (status) {
      case 'low': return 'var(--color-green)'
      case 'half': return 'var(--color-yellow)'
      case 'near-full': return 'var(--color-orange-cap)'
      case 'full': return 'var(--color-red)'
      default: return 'var(--color-green)'
    }
  }

  const getCapacityLabel = (status: string) => {
    switch (status) {
      case 'low': return 'Low'
      case 'half': return 'Half'
      case 'near-full': return 'Near Full'
      case 'full': return 'Full'
      default: return 'Low'
    }
  }

  return (
    <section id="tracker" className="py-24  transition-colors duration-1000">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-green)]/10 border border-[var(--color-green)]/20 text-[var(--color-green)] text-xs font-bold uppercase tracking-widest shrink-0 self-start md:self-auto">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-green)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-green)]"></span>
            </div>
            Live Pilot Mode
          </div>
        </div>

        {/* Map and Fleet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Map Area */}
          <div className="lg:col-span-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl relative overflow-hidden min-h-[400px] flex items-center justify-center p-8">
            {/* Simple abstract map lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M10,90 Q30,80 40,50 T90,10" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" strokeDasharray="2,2" />
              <path d="M10,90 Q30,80 40,50 T90,10" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeDasharray="10,10" className="animate-[transit-flow_2s_linear_infinite]" />
            </svg>
            
            {/* Live vehicles on abstract map */}
            <div className="absolute top-[45%] left-[55%]">
              <div className="relative">
                <div className="w-4 h-4 bg-[var(--color-gold)] rounded-full border-2 border-[var(--color-bg)] z-10 relative"></div>
                <div className="absolute inset-0 bg-[var(--color-gold)] rounded-full animate-ping opacity-50 scale-150"></div>
                <span className="absolute left-6 top-0 text-[10px] font-mono text-[var(--color-gold)] whitespace-nowrap bg-[var(--color-surface)]/80 px-1 rounded">JPNY_0001</span>
              </div>
            </div>
            
            <div className="absolute top-[30%] left-[70%]">
              <div className="relative">
                <div className="w-4 h-4 bg-[var(--color-gold)] rounded-full border-2 border-[var(--color-bg)] z-10 relative"></div>
                <div className="absolute inset-0 bg-[var(--color-gold)] rounded-full animate-ping opacity-50 scale-150"></div>
                <span className="absolute left-6 top-0 text-[10px] font-mono text-[var(--color-gold)] whitespace-nowrap bg-[var(--color-surface)]/80 px-1 rounded">JPNY_0002</span>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 bg-[var(--color-bg)]/80 backdrop-blur text-[var(--color-muted)] text-xs font-mono px-3 py-2 border border-[var(--color-border)] rounded">
              <Activity size={14} className="inline mr-2 text-[var(--color-gold)]" />
              Updating every 3 seconds
            </div>
          </div>

          {/* Active Fleet Sidebar */}
          <div className="flex flex-col gap-4">
            {fleet.map((jeep) => (
              <div 
                key={jeep.id} 
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 relative overflow-hidden"
                style={{ borderLeftColor: getCapacityColor(jeep.status), borderLeftWidth: '4px' }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-display font-semibold text-[var(--color-text)] text-lg leading-none mb-1">
                      {jeep.name}
                    </h4>
                    <span className="text-[var(--color-muted)] font-mono text-[0.65rem]">{jeep.id}</span>
                  </div>
                  <div 
                    className="px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider !text-[#0c0714]"
                    style={{ backgroundColor: getCapacityColor(jeep.status) }}
                  >
                    {getCapacityLabel(jeep.status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mt-4">
                  <div>
                    <span className="block text-[var(--color-muted)] text-[0.65rem] uppercase tracking-wider">Load</span>
                    <span className="text-[var(--color-text)] font-mono">{jeep.seats} / {jeep.capacity}</span>
                  </div>
                  <div>
                    <span className="block text-[var(--color-muted)] text-[0.65rem] uppercase tracking-wider">Speed & HDG</span>
                    <span className="text-[var(--color-text)] font-mono">{jeep.speed} · {jeep.heading.charAt(0)}</span>
                  </div>
                  <div className="col-span-2 bg-[var(--color-bg)] rounded border border-[var(--color-border)] p-2 mt-2 flex justify-between items-center">
                    <span className="text-[var(--color-muted)] font-mono text-[0.75rem]">DS18B20 · {jeep.temp}</span>
                    <span className="text-[var(--color-muted)] font-mono text-[0.75rem]">Fan: {jeep.fan}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-[var(--color-muted)] font-mono text-[0.75rem] inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]"></span>
            Live tracking powered by AWS IoT Core + Firebase Realtime Database
          </p>
        </div>

      </div>
    </section>
  )
}
