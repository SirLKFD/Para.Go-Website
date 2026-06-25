import { useEffect } from 'react'
import FadeUp from './FadeUp'
import PhoneModel3D from './PhoneModel3D'

export default function Hero() {
  useEffect(() => {
    let mapInstance: any = null
    let moveInterval: any = null
    let cycleInterval: any = null
    let destroyed = false

    const initMap = (L: any) => {
      if (destroyed) return

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
      }).setView(centers[0].coords, 14)

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 20
      }).addTo(mapInstance)

      const goldIcon = L.divIcon({
        className: 'custom-jeepney-dot',
        html: '<span class="jeepney-pulse"></span>',
        iconSize: [8, 8],
        iconAnchor: [4, 4]
      })

      const jeepneysCount = 15
      const markers: any[] = []
      const offsets = Array.from({ length: jeepneysCount }, () => ({
        lat: (Math.random() - 0.5) * 0.012,
        lng: (Math.random() - 0.5) * 0.012,
        speedLat: (Math.random() - 0.5) * 0.0001,
        speedLng: (Math.random() - 0.5) * 0.0001
      }))

      for (let i = 0; i < jeepneysCount; i++) {
        const startPos = [centers[0].coords[0] + offsets[i].lat, centers[0].coords[1] + offsets[i].lng]
        const marker = L.marker(startPos, { icon: goldIcon }).addTo(mapInstance)
        markers.push(marker)
      }

      moveInterval = setInterval(() => {
        if (!mapInstance) return
        const currentCenter = mapInstance.getCenter()
        for (let i = 0; i < jeepneysCount; i++) {
          offsets[i].lat += offsets[i].speedLat
          offsets[i].lng += offsets[i].speedLng

          if (Math.abs(offsets[i].lat) > 0.015) offsets[i].speedLat *= -1
          if (Math.abs(offsets[i].lng) > 0.015) offsets[i].speedLng *= -1

          const m = markers[i]
          if (m) {
            m.setLatLng([currentCenter.lat + offsets[i].lat, currentCenter.lng + offsets[i].lng])
          }
        }
      }, 100)

      let currentIndex = 0
      cycleInterval = setInterval(() => {
        if (!mapInstance) return
        currentIndex = (currentIndex + 1) % centers.length
        mapInstance.flyTo(centers[currentIndex].coords, 14, {
          animate: true,
          duration: 7,
          easeLinearity: 0.25
        })
      }, 15000)
    }

    const loadAssets = () => {
      const L = (window as any).L
      if (L) {
        initMap(L)
        return null
      }

      if (!document.getElementById('leaflet-css-cdn')) {
        const link = document.createElement('link')
        link.id = 'leaflet-css-cdn'
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
        document.head.appendChild(link)
      }

      let script = document.getElementById('leaflet-js-cdn') as HTMLScriptElement
      if (!script) {
        script = document.createElement('script')
        script.id = 'leaflet-js-cdn'
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
        script.async = true
        document.body.appendChild(script)
      }

      const handleScriptLoad = () => {
        const leaf = (window as any).L
        if (leaf) initMap(leaf)
      }

      script.addEventListener('load', handleScriptLoad)

      const poll = setInterval(() => {
        const leaf = (window as any).L
        if (leaf) {
          clearInterval(poll)
          initMap(leaf)
        }
      }, 200)

      return () => {
        script.removeEventListener('load', handleScriptLoad)
        clearInterval(poll)
      }
    }

    const cleanupLoad = loadAssets()

    return () => {
      destroyed = true
      if (cleanupLoad) cleanupLoad()
      if (moveInterval) clearInterval(moveInterval)
      if (cycleInterval) clearInterval(cycleInterval)
      if (mapInstance) {
        mapInstance.remove()
      }
      const mapContainer = document.getElementById('hero-map')
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

        {/* Radial orange glow top right */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--color-orange)]/20 blur-[120px] pointer-events-none z-10"></div>
        
        {/* Subtle CSS diagonal lines / grid */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          opacity: 0.03,
          backgroundImage: 'linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff), linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}></div>
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
              
              <p className="text-[var(--color-muted)] text-[1.0625rem] leading-relaxed max-w-xl mb-10">
                Para.Go is a complete smart transit system — IoT hardware, mobile apps, 
                and cashless fares working together on the streets of Cebu City. 
                Metro Cebu generates 3.5 million trips daily. We're building the 
                infrastructure to make every one of them better.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                <a 
                  href="#tracker"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[var(--color-gold)] !text-[#0c0714] px-6 py-3 rounded-sm font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors hover:bg-white"
                >
                  Track Live Jeepneys →
                </a>
                <a 
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 border-2 border-[var(--color-muted)] text-[var(--color-muted)] px-6 py-3 rounded-sm font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors hover:bg-[var(--color-muted)] hover:!text-[#0c0714]"
                >
                  Learn How It Works
                </a>
              </div>


              </div>
            </FadeUp>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:justify-end mt-16 lg:mt-0 perspective-1000">
            
            {/* Phone Frame */}
            <FadeUp delay={300} className="relative z-20 shrink-0">
              <div className="relative">
                {/* Backlight Glow & Floor Shadow */}
                <div className="absolute -inset-10 bg-[var(--color-gold)]/10 blur-[50px] rounded-full -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/40 blur-md rounded-full -z-10"></div>
                
                <div className="relative w-[200px] sm:w-[260px] md:w-[280px] lg:w-[290px] xl:w-[320px] aspect-[9/19] pointer-events-auto">
                  <PhoneModel3D textureUrl="/passenger.jpg" />
                </div>
              </div>
            </FadeUp>

          </div>

        </div>
      </div>
    </section>
  )
}
