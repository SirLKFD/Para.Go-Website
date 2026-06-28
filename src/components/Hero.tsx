import { useEffect } from 'react'
import FadeUp from './FadeUp'
import PhoneModel3D from './PhoneModel3D'

export default function Hero() {
  useEffect(() => {
    const L = (window as any).L
    if (!L) return

    let mapInstance: any = null
    let animationFrameId: number
    let destroyed = false

    const mapContainer = document.getElementById('hero-map')
    if (!mapContainer || mapContainer.hasAttribute('data-map-initialized')) return
    mapContainer.setAttribute('data-map-initialized', 'true')

    const centers = [
      { name: 'Cebu IT Park', coords: [10.3292, 123.9061] as [number, number] },
      { name: 'Fuente Osmeña', coords: [10.3164, 123.8907] as [number, number] },
      { name: 'CCLEX Bridge', coords: [10.2798, 123.9073] as [number, number] },
      { name: 'SM Seaside', coords: [10.2818, 123.8809] as [number, number] },
      { name: 'CIT University', coords: [10.2944, 123.8714] as [number, number] }
    ]

    mapInstance = L.map('hero-map', {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      keyboard: false
    }).setView(centers[1].coords, 14) // Center at Fuente Osmeña

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      maxZoom: 20
    }).addTo(mapInstance)

    let angle = 0
    const centerLat = 10.3164 // Fuente Osmeña (central Cebu City)
    const centerLng = 123.8907
    const radiusLat = 0.005 // Latitude pan amplitude
    const radiusLng = 0.010 // Longitude pan amplitude

    const panLoop = () => {
      if (destroyed || !mapInstance) return
      angle += 0.003 // Fluid cinematic pan speed
      const lat = centerLat + Math.sin(angle) * radiusLat
      const lng = centerLng + Math.cos(angle * 0.5) * radiusLng // Lissajous figure-8 pattern
      mapInstance.setView([lat, lng], 14, { animate: false })
      animationFrameId = requestAnimationFrame(panLoop)
    }

    // Start continuous panning loop
    panLoop()

    return () => {
      destroyed = true
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      if (mapInstance) {
        mapInstance.remove()
      }
      if (mapContainer) {
        mapContainer.removeAttribute('data-map-initialized')
        mapContainer.innerHTML = ''
      }
    }
  }, [])

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background with OpenStreetMap, Glows, and Vignettes */}
      <div className="absolute inset-0 z-0 bg-[var(--color-bg)] overflow-hidden">
        {/* Leaflet Map Target Div */}
        <div id="hero-map" className="hero-map-background"></div>
        
        {/* Map Vignette Gradients (Dark Faders) */}
        <div className="hero-map-vignette"></div>

        {/* Smooth bottom fade transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-10" />

        {/* Radial orange glow top right */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--color-orange)]/20 blur-[120px] pointer-events-none z-10"></div>

      </div>

      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 xl:gap-24 items-center">
          
          {/* Left Column: Text */}
          <div className="lg:col-span-7">
            <FadeUp delay={100}>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              

              {/* Headlines */}
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] mb-6">
                Cebu's jeepneys,<br />
                finally smart.
              </h1>
              
              <p className="text-[var(--color-muted)] text-[1.0625rem] leading-relaxed max-w-xl mb-8">
                Para.Go is a complete smart transit system — IoT hardware, mobile apps, 
                and cashless fares working together on the streets of Cebu City. 
                Metro Cebu generates 3.5 million trips daily. We're building the 
                infrastructure to make every one of them better.
              </p>

              {/* SDG Icons Section */}
              <div className="flex flex-col items-center lg:items-start mb-10 w-full">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-gold)] mb-4">
                  Supporting UN Sustainable Development Goals
                </span>
                <div className="flex flex-wrap gap-4">
                  {[
                    { src: '/sdg3-en.png', alt: 'SDG 3: Good Health & Well-being' },
                    { src: '/Sustainable_Development_Goal_9.png', alt: 'SDG 9: Industry, Innovation & Infrastructure' },
                    { src: '/sdg11.png', alt: 'SDG 11: Sustainable Cities & Communities' },
                    { src: '/Sustainable_Development_Goal_13Climate.svg.png', alt: 'SDG 13: Climate Action' }
                  ].map((sdg, idx) => (
                    <div key={idx} className="relative">
                      <img 
                        src={sdg.src} 
                        alt={sdg.alt} 
                        title={sdg.alt}
                        className="w-12 h-12 object-contain rounded-md border border-white/10 shadow-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                <a 
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[var(--color-gold)] !text-[#0c0714] px-6 py-3 rounded-sm font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors hover:bg-white"
                >
                  Learn How It Works →
                </a>
              </div>


              </div>
            </FadeUp>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:justify-end -translate-y-12 lg:translate-y-0 mt-2 lg:mt-0 perspective-1000">
            
            {/* Phone Frame */}
            <FadeUp delay={300} className="relative z-20 shrink-0">
              <div className="relative">
                {/* Backlight Glow & Floor Shadow */}
                <div className="absolute -inset-10 bg-[var(--color-gold)]/10 blur-[50px] rounded-full -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/40 blur-md rounded-full -z-10"></div>
                
                <div className="relative w-[200px] sm:w-[260px] md:w-[280px] lg:w-[290px] xl:w-[320px] aspect-[9/19] pointer-events-auto">
                  <PhoneModel3D textureUrl="/passenger.jpg" cameraZ={8.4} />
                </div>
              </div>
            </FadeUp>

          </div>

        </div>
      </div>
    </section>
  )
}
