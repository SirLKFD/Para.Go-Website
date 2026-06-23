import { useState } from 'react'
import { Building, ShieldCheck, CreditCard, Tablet } from 'lucide-react'

export default function Fleet() {
  const [tabletImgError, setTabletImgError] = useState(false)

  return (
    <section id="fleet" className="border-4 border-[#2d1847] bg-[#0c0714] p-6 md:p-12 mb-6">
      <div className="grid gap-8 lg:grid-cols-2 items-center">
        <div className="text-left">
          <span className="yellow-badge mb-2">Cooperative Solutions</span>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-[#fcd116] m-0">
            Modernize Your Cooperative Fleet
          </h2>
          <p className="text-sm text-[var(--sea-ink-soft)] mt-4 leading-relaxed">
            Para.Go offers an end-to-end integration kit for transport cooperatives and operators in Cebu. Equipping your fleet with our IoT smart modules automates passenger billing, logging compliance, and climate cooling, allowing your drivers to focus on road safety.
          </p>
          <div className="mt-6 space-y-3">
            <div className="flex gap-2 items-center text-xs font-bold text-white uppercase">
              <Building className="h-4 w-4 text-[#fcd116]" /> Automated Fleet Management Reports
            </div>
            <div className="flex gap-2 items-center text-xs font-bold text-white uppercase">
              <ShieldCheck className="h-4 w-4 text-[#fcd116]" /> LTFRB Route Compliance Dashboards
            </div>
            <div className="flex gap-2 items-center text-xs font-bold text-white uppercase">
              <CreditCard className="h-4 w-4 text-[#fcd116]" /> Seamless Cashless Revenue Payouts
            </div>
          </div>
        </div>

        {/* Tablet Driver Dashboard App Mockup Frame */}
        <div className="flex flex-col items-center">
          {/* Tablet Frame */}
          <div className="tablet-frame relative shadow-none">
            {/* Camera Notch top border center */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#090510] rounded-full border border-[#2d1847] z-20" />
            
            {/* Tablet Screen */}
            <div className="w-full h-full bg-[#160d24] rounded-lg overflow-hidden relative border border-[#2d1847]">
              {tabletImgError ? (
                // Flat visual placeholder for tablet screen if image fails
                <div className="flex flex-col items-center justify-center p-6 text-center text-[var(--sea-ink-soft)] h-full bg-[#160d24]">
                  <Tablet className="h-10 w-10 text-[#fcd116] mb-3 animate-pulse" />
                  <span className="yellow-badge text-[8px] mb-2">Tablet Interface</span>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Driver Dashboard Mock
                  </h4>
                  <p className="text-[8px] max-w-[180px] leading-relaxed m-0">
                    Place <code className="text-white">tablet-driver-dashboard.png</code> inside the <code className="text-white">assets/</code> folder to display your driver console screen here.
                  </p>
                </div>
              ) : (
                <img
                  src="/tablet-driver-dashboard.png"
                  alt="Driver App Tablet Mockup"
                  onError={() => setTabletImgError(true)}
                  className="w-full h-full object-cover block"
                />
              )}
            </div>
          </div>
          <span className="text-xs font-bold uppercase text-[#fcd116] mt-4 flex items-center gap-1">
            <Tablet className="h-4 w-4" /> Driver console tablet app
          </span>
        </div>
      </div>
    </section>
  )
}
