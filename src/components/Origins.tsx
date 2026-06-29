import FadeUp from './FadeUp'
import { useState, useEffect, useRef } from 'react'
import InteractiveModal from './InteractiveModal'

export default function Origins() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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

          {/* Right Column: Photo Grid (similar to SolutionsFest layout) */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {photos.map((photo, i) => (
                <FadeUp key={photo.id} delay={150 * (i + 1)}>
                  <div 
                    className="rounded-xl overflow-hidden shadow-lg border border-[var(--color-border)] h-56 sm:h-48 md:h-56 cursor-pointer group"
                    onClick={() => photo.img && setSelectedImage(photo.img)}
                  >
                    {photo.img && (
                      <img 
                        src={photo.img} 
                        alt={photo.label} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      <InteractiveModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage || ''}
        title={photos.find(p => p.img === selectedImage)?.label}
      />
    </section>
  )
}
