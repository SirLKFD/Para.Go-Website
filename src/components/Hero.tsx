import { Facebook } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden border-4 border-[#fcd116] bg-[#160d24] p-6 md:p-12 mb-6">
      {/* Cebu Map Background (Swiss Style Geometric Silhouette) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-48 h-80 opacity-25 pointer-events-none md:right-16 md:w-64 md:h-[400px]">
        <svg
          viewBox="0 0 100 200"
          fill="none"
          className="w-full h-full stroke-[#fcd116] stroke-2"
        >
          <path
            d="M 50,10 
               C 55,20 60,35 55,50 
               C 50,65 48,80 52,95 
               C 56,110 52,125 45,140 
               C 38,155 35,170 30,190 
               L 28,192 L 32,192
               C 38,175 42,160 48,145 
               C 54,130 58,115 56,100 
               C 54,85 55,70 60,55 
               C 65,40 60,25 50,10 Z"
            fill="#fcd116"
            fillOpacity="0.08"
          />
          {/* Cebu City Marker */}
          <circle cx="53" cy="90" r="4" fill="#fcd116" className="map-pulse" />
          <circle cx="53" cy="90" r="3" fill="#fcd116" />
        </svg>
        {/* Map Label */}
        <div className="absolute right-0 top-[95px] text-[10px] font-bold text-[#fcd116] uppercase tracking-widest">
          CEBU CITY
        </div>
      </div>

      <div className="relative z-10 max-w-2xl">
        <h1 className="sr-only">Para.Go - Smart Modern Jeepney Transit Service in Cebu</h1>
        {/* Hero Main Logo - Textless */}
        <div className="mb-8">
          <img src="/parago-icon.png" alt="Para.Go Logo" className="h-24 w-auto md:h-32 block" />
        </div>

        {/* Slogan Yellow Badge */}
        <div className="mb-6">
          <span className="yellow-badge-large">COMMUTE CEBU. SMARTER</span>
        </div>

        <p className="text-lg md:text-xl text-[var(--sea-ink-soft)] leading-relaxed mb-8 max-w-xl font-medium">
          Modernizing the Cebuano commute. Pioneered by Cebu Institute of Technology - University graduates, Para.Go brings comfort, real-time tracking, and automated cabin convenience to the streets of Cebu.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="https://www.facebook.com/profile.php?id=61579400990238"
            target="_blank"
            rel="noopener noreferrer"
            className="demo-button"
          >
            <Facebook className="h-5 w-5" />
            Follow Our Progress
          </a>
          <a href="#tracker" className="demo-button demo-button-secondary">
            Track Live Jeepneys
          </a>
        </div>
      </div>
    </section>
  )
}
