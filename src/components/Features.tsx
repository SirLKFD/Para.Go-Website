import { Cpu, MapPin, Tablet, X } from 'lucide-react'
import FadeUp from './FadeUp'
import { useState, useEffect } from 'react'
import PhoneModel3D from './PhoneModel3D'
import TabletModel3D from './TabletModel3D'

export default function Features() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [modalType, setModalType] = useState<'phone' | 'tablet' | 'image' | null>(null)
  const [isRendered, setIsRendered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const openModal = (type: 'phone' | 'tablet' | 'image', imagePath?: string) => {
    if (imagePath) {
      setSelectedImage(imagePath)
    }
    setModalType(type)
    setIsRendered(true)
    setIsTransitioning(true)
    
    // Allow React to mount the element first, then transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsTransitioning(false)
      })
    })
  }

  const closeModal = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setModalType(null)
      setSelectedImage(null)
      setIsRendered(false)
      setIsTransitioning(false)
    }, 400) // Match transition duration (400ms)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    if (isRendered) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isRendered])

  const features = [
    {
      icon: <Cpu size={28} />,
      title: 'Smart Jeepney Module',
      body: 'An ESP32 unit installed inside the jeepney. Reads RFID cards, monitors cabin temperature every 3 seconds, auto-controls the ventilation fan, updates the LED destination board with live capacity, and streams GPS coordinates to the cloud continuously.',
      image: '/rfidunit.jpg'
    },
    {
      icon: <MapPin size={28} />,
      title: 'Commuter Mobile App',
      body: 'Track jeepneys live on a map. Search routes with transfer options. Tap your NFC card to board and alight — no coins needed. Fares are computed automatically using GPS distance and the LTFRB matrix.',
      image: '/passenger.jpg'
    },
    {
      icon: <Tablet size={28} />,
      title: 'Driver Dashboard',
      body: 'A tablet app mounted in the cabin. Shows live passenger count, cabin temperature, total earnings, trip log, and real-time RFID events. Drivers get the information they need without lifting a finger.',
      image: '/driver.jpg'
    }
  ]

  return (
    <section id="features" className="py-24 transition-colors duration-1000 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--color-surface)] rounded-full blur-[100px] opacity-50 z-0 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-16">
            <span className="block font-sans font-semibold text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-4">
              THE SOLUTION
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight text-[var(--color-text)]">
              One system.<br />
              Three layers.<br />
              All connected.
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <FadeUp key={idx} delay={idx * 150}>
              <div 
                className="bg-[var(--color-surface)] border-l-4 border-l-[var(--color-gold)] p-8 rounded-r-sm transition-transform duration-200 ease-out hover:-translate-y-1 flex flex-col h-full shadow-lg group"
              >
                <div 
                  className="w-full h-56 rounded-md mb-6 border border-[var(--color-border)] shadow-md overflow-hidden bg-black flex items-center justify-center relative cursor-pointer"
                  onClick={() => {
                    if (idx === 0) {
                      openModal('image', feat.image)
                    } else if (idx === 1) {
                      openModal('phone')
                    } else if (idx === 2) {
                      openModal('tablet')
                    }
                  }}
                >
                  <img src={feat.image} alt={feat.title} className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                  
                  {/* Click to expand overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-bold tracking-wider uppercase border border-white/50 px-3.5 py-2 rounded-full backdrop-blur-sm">
                      {idx === 0 ? 'View Photo' : 'Interactive 3D'}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-gold)] mb-4 shadow-inner">
                  {feat.icon}
                </div>
                <h3 className="font-display font-medium text-[1.25rem] text-[var(--color-text)] mb-4">
                  {feat.title}
                </h3>
                <p className="text-[var(--color-muted)] text-[1.0625rem] leading-relaxed mb-4 flex-grow">
                  {feat.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal overlay with smooth fade-in/out backdrop */}
      {isRendered && modalType && (
        <div 
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-8 transition-all duration-400 ease-out cursor-zoom-out ${
            isTransitioning 
              ? 'bg-black/0 backdrop-blur-none' 
              : 'bg-black/95 backdrop-blur-xl'
          }`}
          onClick={closeModal}
        >
          {/* Close button with smooth fade/scale */}
          <button 
            className={`absolute top-4 right-4 sm:top-8 sm:right-8 text-white p-2 hover:bg-white/10 rounded-full transition-all duration-300 ease-out z-50 cursor-pointer ${
              isTransitioning 
                ? 'opacity-0 scale-75' 
                : 'opacity-100 scale-100'
            }`}
            onClick={closeModal}
          >
            <X size={32} />
          </button>

          {/* Lightbox Image Modal */}
          {modalType === 'image' && selectedImage && (
            <img 
              src={selectedImage} 
              alt="Expanded view" 
              className={`max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl transition-all duration-400 ease-out cursor-default ${
                isTransitioning 
                  ? 'opacity-0 scale-90 translate-y-4' 
                  : 'opacity-100 scale-100 translate-y-0'
              }`}
              onClick={(e) => e.stopPropagation()} 
            />
          )}

          {/* 3D Model Modal with custom spring scale up/down */}
          {(modalType === 'phone' || modalType === 'tablet') && (
            <div 
              className={`relative flex flex-col items-center justify-center w-full max-w-4xl transition-all duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] cursor-default ${
                isTransitioning 
                  ? 'opacity-0 scale-50 translate-y-16' 
                  : 'opacity-100 scale-100 translate-y-0'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {modalType === 'phone' ? (
                <div className="relative w-[220px] sm:w-[280px] md:w-[320px] aspect-[9/19]">
                  <PhoneModel3D textureUrl="/passenger.jpg" />
                </div>
              ) : (
                <div className="relative w-[300px] sm:w-[480px] md:w-[680px] aspect-[16/10]">
                  <TabletModel3D textureUrl="/driver.jpg" />
                </div>
              )}
              
              <p className={`text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mt-8 text-center animate-pulse pointer-events-none select-none transition-opacity duration-300 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}>
                Drag to rotate device in 3D
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
