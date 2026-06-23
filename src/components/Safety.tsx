import { Wind, Layers, ShieldCheck } from 'lucide-react'

export default function Safety() {
  return (
    <section id="safety" className="border-4 border-[#2d1847] bg-[#160d24] p-6 md:p-12 mb-6">
      <div className="mb-8">
        <span className="yellow-badge mb-2">Smart Safety</span>
        <h2 className="text-3xl font-black uppercase tracking-wide text-[#fcd116] m-0">
          Safety & Climate Control
        </h2>
        <p className="text-sm text-[var(--sea-ink-soft)] mt-1">
          Automating public transport safety and interior environments in real-time.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <article className="border-2 border-[#2d1847] bg-[#0c0714] p-6 text-left">
          <Wind className="h-8 w-8 text-[#fcd116] mb-4" />
          <h4 className="text-base font-bold text-[#fcd116] uppercase tracking-wider mb-2">
            Automated Climate Control
          </h4>
          <p className="text-xs text-[var(--sea-ink-soft)] m-0 leading-relaxed">
            DS18B20 temperature sensors read cabin conditions every 3 seconds. The ventilation fan turns on when the temperature climbs above 30°C and switches off below 27°C, maintaining optimal airflow.
          </p>
        </article>

        <article className="border-2 border-[#2d1847] bg-[#0c0714] p-6 text-left">
          <Layers className="h-8 w-8 text-[#fcd116] mb-4" />
          <h4 className="text-base font-bold text-[#fcd116] uppercase tracking-wider mb-2">
            Color-Coded Load Alert
          </h4>
          <p className="text-xs text-[var(--sea-ink-soft)] m-0 leading-relaxed">
            Exterior LED destination boards update and color-code live vehicle capacity: Green for low counts, Yellow for half-full, Orange for peak density, and Red when the cabin has reached maximum passenger volume.
          </p>
        </article>

        <article className="border-2 border-[#2d1847] bg-[#0c0714] p-6 text-left">
          <ShieldCheck className="h-8 w-8 text-[#fcd116] mb-4" />
          <h4 className="text-base font-bold text-[#fcd116] uppercase tracking-wider mb-2">
            Time-Synced Safety Lighting
          </h4>
          <p className="text-xs text-[var(--sea-ink-soft)] m-0 leading-relaxed">
            Real-time NTP synchronization automatically schedules interior safety lights. Cabin lights illuminate from 17:00 to 06:00, ensuring complete passenger security during night commutes.
          </p>
        </article>
      </div>
    </section>
  )
}
