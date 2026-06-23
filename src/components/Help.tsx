import { History, AlertTriangle } from 'lucide-react'

export default function Help() {
  return (
    <section id="contact" className="border-4 border-[#2d1847] bg-[#160d24] p-6 md:p-12 mb-6">
      <div className="max-w-3xl mx-auto text-left space-y-6">
        <span className="yellow-badge mb-2">Commuter Help</span>
        <h2 className="text-3xl font-black uppercase tracking-wide text-[#fcd116] m-0 border-b border-[#2d1847] pb-3">
          Trip History & Support
        </h2>
        <p className="text-sm text-[var(--sea-ink-soft)] leading-relaxed">
          For support regarding card log details, lost items, or billing inquiries, please contact our coordinator team or visit our student research page on Facebook. Tapped card logs can cross-reference physical coordinates for exact alighting coordinates audits.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 pt-2">
          <div className="flex gap-3 items-start text-xs text-[var(--sea-ink-soft)]">
            <History className="h-5 w-5 text-[#fcd116] flex-shrink-0" />
            <div>
              <strong className="text-white block uppercase">Verify GPS Coordinates</strong>
              Tapped card logs can cross-reference physical coordinates for exact alighting coordinates audits.
            </div>
          </div>
          <div className="flex gap-3 items-start text-xs text-[var(--sea-ink-soft)]">
            <AlertTriangle className="h-5 w-5 text-[#fcd116] flex-shrink-0" />
            <div>
              <strong className="text-white block uppercase">Report lost items</strong>
              Indicate the vehicle plate or name (e.g. Rajah Humabon) to immediately query drivers.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
