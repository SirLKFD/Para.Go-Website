import FadeUp from './FadeUp'
import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function Origins() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [inView, setInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setInView(true), 300)
      }
    }, { threshold: 0.3 })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])
  const photos = [
    {
      id: 1,
      label: 'Thesis Defended',
      img: '/thesisdefended.jpg'
    },
    {
      id: 2,
      label: 'Computer Engineering Graduates · CIT-U',
      img: '/graduated.jpg'
    },
    {
      id: 3,
      label: 'System Testing with El Pardo Jeepney Drivers',
      img: '/withdriver.jpg'
    },
    {
      id: 4,
      label: 'Presented to Cebu City Mayor Archival',
      img: '/withmayor.jpg'
    }
  ]

  return (
    <section id="origins" className="py-24  transition-colors duration-1000">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Narrative */}
          <FadeUp>
            <div>
              <span className="block font-sans font-semibold text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-4">
                HOW IT STARTED
              </span>
              <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight text-[var(--color-text)] mb-8">
                From a thesis.<br />
                To the streets.
              </h2>
              
              <div className="space-y-6 text-[var(--color-muted)] text-[1.0625rem] leading-relaxed">
                <p>
                  Para.Go started as a Computer Engineering thesis at Cebu Institute of 
                  Technology - University. The problem was local and specific: Cebu's 
                  jeepneys had no data. No seat counts. No cashless option. No way to 
                  know if a vehicle was full before it pulled up.
                </p>
                <p>
                  The team spent from August 2025 to April 2026 building everything — 
                  the IoT board, the firmware, the passenger app, the driver console, 
                  the cloud backend. On March 11, 2026, the system was officially presented to Cebu City Mayor Nestor D. Archival Sr., securing vital support for its real-world implementation.
                </p>
                <p>
                  By May 2026, the system was deployed in a city-endorsed pilot alongside the El Pardo Transport Cooperative. In 
                  June 2026, Para.Go was crowned the Open Track Champion at Cebu SolutionsFest, standing out among 
                  professional startups and independent innovators.
                </p>
                <p className="font-medium text-[var(--color-text)] text-lg border-l-4 border-[var(--color-gold)] pl-4 pt-1 pb-1 mt-8">
                  This is what Cebuano engineering looks like.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Right Column: Photo Fan Gallery */}
          <div className="flex justify-center items-center h-full min-h-[400px] w-full overflow-visible perspective-1000" ref={containerRef}>
            <div className="flex justify-center items-center group/container">
              {photos.map((photo, i) => {
                const rotations = ['-rotate-6', '-rotate-2', 'rotate-2', 'rotate-6']
                
                // Stack exactly on top of each other when not in view
                const mlClass = inView 
                  ? (i === 0 ? 'ml-0' : '-ml-12 sm:-ml-16 md:-ml-20')
                  : (i === 0 ? 'ml-0' : '-ml-[128px] sm:-ml-[160px] md:-ml-[192px]')
                  
                const rotationClass = inView ? rotations[i] : 'rotate-0'

                return (
                  <div 
                    key={photo.id} 
                    className={`relative ${mlClass} group/card hover:z-50`}
                    style={{ zIndex: i + 10, transition: 'margin 1s cubic-bezier(0.25, 1, 0.5, 1)' }}
                    onClick={() => photo.img && setSelectedImage(photo.img)}
                  >
                    <div 
                      className={`w-32 sm:w-40 md:w-48 aspect-[4/5] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:-translate-y-8 sm:group-hover/card:-translate-y-12 group-hover/card:scale-[1.15] group-hover/card:!rotate-0 cursor-pointer ${rotationClass}`}
                    >
                      {photo.img && (
                        <img 
                          src={photo.img} 
                          alt={photo.label} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" 
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 lg:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImage} 
            alt="Expanded view" 
            className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-300 mb-6" 
            onClick={(e) => e.stopPropagation()} 
          />
          <p className="text-white text-lg md:text-xl font-display font-medium max-w-2xl text-center px-4 animate-in slide-in-from-bottom-4 duration-500">
            {photos.find(p => p.img === selectedImage)?.label}
          </p>
        </div>
      )}
    </section>
  )
}
