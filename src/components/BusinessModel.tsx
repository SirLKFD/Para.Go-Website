export default function BusinessModel() {
  const columns = [
    {
      title: 'FinTech Micro-Transactions',
      body: 'Every RFID tap generates a small processing fee. At 3.5 million daily trips, micro-transactions at scale become a significant, reliable revenue stream with near-zero marginal cost.'
    },
    {
      title: 'Hyper-Local B2B Advertising',
      body: 'In-app advertising and on-vehicle LED board ad spaces give local Cebu businesses a captive transit audience. Every jeepney becomes a moving billboard with audience data behind it.'
    },
    {
      title: 'B2G Data Licensing',
      body: 'Premium mobility analytics dashboards sold to LGUs, LTFRB, and urban planners. Live route demand data, peak hour mapping, and incident frequency — the kind of insight no transit system in Cebu has ever had.'
    }
  ]

  return (
    <section id="model" className="py-24 transition-colors duration-1000 ">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        
        <div className="mb-16">
          <span className="block font-sans font-semibold text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-4">
            HOW IT SUSTAINS
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight text-[var(--color-text)]">
            Not just a product.<br />
            A platform.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {columns.map((item, idx) => (
            <div key={idx}>
              <div className="w-12 h-1 bg-[var(--color-gold)] mb-6"></div>
              <h3 className="font-display font-medium text-xl text-[var(--color-text)] mb-4">
                {item.title}
              </h3>
              <p className="text-[var(--color-muted)] text-[1.0625rem] leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
