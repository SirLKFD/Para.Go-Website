import { Cpu, MapPin, Tablet, X } from 'lucide-react'
import FadeUp from './FadeUp'
import { useState, useEffect } from 'react'
import PhoneModel3D from './PhoneModel3D'
import TabletModel3D from './TabletModel3D'
import ModuleModel3D from './ModuleModel3D'
import JeepneyModel3D from './JeepneyModel3D'
import InteractiveModal from './InteractiveModal'

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
    setModalType(null)
    setSelectedImage(null)
    setIsRendered(false)
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



  const hardwareFeature = {
    icon: <Cpu size={28} />,
    title: 'Smart Jeepney Module',
    body: 'An ESP32 unit installed inside the jeepney. Reads RFID cards, monitors passenger counter, and streams GPS coordinates to the system.',
    image: '/rfidunit.jpg'
  }



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

        {/* Hardware Layer: Smart Jeepney Module Infographic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-12 items-center mb-24 sm:mb-28 lg:mb-32 relative">
          
          {/* Left: Info */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <FadeUp>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-gold)] shadow-inner">
                  {hardwareFeature.icon}
                </div>
                <span className="font-sans font-bold text-xs uppercase tracking-[0.15em] text-[var(--color-gold)]">
                  The Hardware Layer
                </span>
              </div>
              <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[var(--color-text)] mb-5">
                {hardwareFeature.title}
              </h3>
              <p className="text-[var(--color-muted)] text-[1.0625rem] leading-relaxed mb-6">
                {hardwareFeature.body}
              </p>

              {/* Hardware specifications list */}
              <ul className="space-y-4 mb-8 text-[1.0625rem] text-[var(--color-muted)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] font-bold mt-0.5">•</span>
                  <span><strong>IoT-Enabled Tracking:</strong> Continuous real-time GPS stream coordinates map positions to commuters instantly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] font-bold mt-0.5">•</span>
                  <span><strong>NFC Cashless Fare:</strong> Seamless tap-to-board transaction processing via on-board RFID reader.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] font-bold mt-0.5">•</span>
                  <span><strong>LED Destination Updates:</strong> Dynamically publishes passenger count metrics and route details on the exterior display.</span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-4 relative z-20">
                <button
                  onClick={() => openModal('image', hardwareFeature.image)}
                  className="demo-button text-xs uppercase tracking-wider"
                >
                  View Physical Unit Photo
                </button>
              </div>
            </FadeUp>
          </div>

          {/* Right: 3D CAD STL Model Viewer */}
          <div className="lg:col-span-5 relative w-full">
            <FadeUp delay={150}>
              <div className="relative w-full">
                <ModuleModel3D />
              </div>
            </FadeUp>
          </div>

        </div>

        {/* Sleek divider track */}
        <div className="relative h-px bg-[var(--color-border)] w-full mb-24">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-bg)] px-4 text-xs font-bold tracking-[0.2em] text-[var(--color-muted)] uppercase">
            Software Layers
          </div>
        </div>

        {/* Commuter Mobile App (3D Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-12 items-center mb-24 sm:mb-28 lg:mb-32 relative">
          
          {/* Left: 3D Phone Model */}
          <div className="lg:col-span-5 relative w-full flex justify-center order-2 lg:order-1">
            <FadeUp delay={150}>
              <div className="relative w-[180px] sm:w-[240px] md:w-[320px] aspect-[9/19]">
                <PhoneModel3D textureUrl="/passenger.jpg" />
              </div>
            </FadeUp>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
            <FadeUp>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-gold)] shadow-inner">
                  <MapPin size={28} />
                </div>
                <span className="font-sans font-bold text-xs uppercase tracking-[0.15em] text-[var(--color-gold)]">
                  The Commuter Layer
                </span>
              </div>
              <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[var(--color-text)] mb-5">
                Commuter Mobile App
              </h3>
              <p className="text-[var(--color-muted)] text-[1.0625rem] leading-relaxed mb-6">
                Track jeepneys live on a map. Search routes with transfer options. Tap your NFC card to board and alight — no coins needed. Fares are computed automatically using GPS distance and the LTFRB matrix.
              </p>

              {/* Commuter specifications list */}
              <ul className="space-y-4 mb-8 text-[1.0625rem] text-[var(--color-muted)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] font-bold mt-0.5">•</span>
                  <span><strong>Live Transit Map:</strong> Track jeepney locations and estimated arrival times in real-time.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] font-bold mt-0.5">•</span>
                  <span><strong>Smart Route Planner:</strong> Find optimal routes with multi-stop transfer suggestions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] font-bold mt-0.5">•</span>
                  <span><strong>Distance-Based Fares:</strong> Automatic calculations using GPS distance and official LTFRB matrices.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] font-bold mt-0.5">•</span>
                  <span><strong>NFC Fare Integration:</strong> Tap-to-pay using digital card balances with automated wallet sync.</span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-4 relative z-20">
                <button
                  onClick={() => openModal('image', '/passenger.jpg')}
                  className="demo-button text-xs uppercase tracking-wider"
                >
                  View App Screenshot
                </button>
              </div>
            </FadeUp>
          </div>

        </div>

        {/* Driver Dashboard (Text Left, 3D Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-12 items-center mb-24 sm:mb-28 lg:mb-32 relative">
          
          {/* Left: Info */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <FadeUp>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-gold)] shadow-inner">
                  <Tablet size={28} />
                </div>
                <span className="font-sans font-bold text-xs uppercase tracking-[0.15em] text-[var(--color-gold)]">
                  The Operator Layer
                </span>
              </div>
              <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[var(--color-text)] mb-5">
                Driver Dashboard
              </h3>
              <p className="text-[var(--color-muted)] text-[1.0625rem] leading-relaxed mb-6">
                A tablet app mounted in the cabin. Shows live passenger count, total earnings, trip log, and real-time RFID events. Drivers get the information they need without lifting a finger.
              </p>

              {/* Driver specifications list */}
              <ul className="space-y-4 mb-8 text-[1.0625rem] text-[var(--color-muted)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] font-bold mt-0.5">•</span>
                  <span><strong>Mounted Cabin Display:</strong> Sleek interface designed for minimal driver distraction on the road.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] font-bold mt-0.5">•</span>
                  <span><strong>Real-Time RFID Logging:</strong> Instant visual feed of boarding events and fare confirmations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] font-bold mt-0.5">•</span>
                  <span><strong>Trip & Analytics Feed:</strong> Track daily earnings and passenger totals.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] font-bold mt-0.5">•</span>
                  <span><strong>Automated Logging:</strong> GPS-based dispatch logs auto-submitted to the operator cloud.</span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-4 relative z-20">
                <button
                  onClick={() => openModal('image', '/driver.jpg')}
                  className="demo-button text-xs uppercase tracking-wider"
                >
                  View Dashboard Screenshot
                </button>
              </div>
            </FadeUp>
          </div>

          {/* Right: 3D Tablet Model */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            <FadeUp delay={150}>
              <div className="relative w-[280px] sm:w-[420px] md:w-[500px] aspect-[16/10]">
                <TabletModel3D textureUrl="/driver.jpg" />
              </div>
            </FadeUp>
          </div>

        </div>

        {/* Sleek divider track */}
        <div className="relative h-px bg-[var(--color-border)] w-full my-24">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-bg)] px-4 text-xs font-bold tracking-[0.2em] text-[var(--color-muted)] uppercase">
            Ecosystem Integration
          </div>
        </div>

        {/* Full Vehicle Integration (3D Model Centered, Text Below) */}
        <div className="flex flex-col items-center mb-16 relative">
          
          {/* Centered 3D Model */}
          <div className="w-full max-w-[800px] mb-12 flex justify-center">
            <FadeUp delay={150} className="w-full">
              <JeepneyModel3D />
            </FadeUp>
          </div>

          {/* Text Below */}
          <div className="max-w-[800px] text-center px-4">
            <FadeUp>
              <h3 className="font-display font-semibold text-3xl sm:text-4xl text-[var(--color-text)] mb-6">
                Connected Vehicle Integration
              </h3>
              <p className="text-[var(--color-muted)] text-[1.125rem] leading-relaxed mb-8 max-w-[700px] mx-auto">
                See how all components unite in the physical vehicle. The Smart Jeepney Module coordinates real-time passenger counts, NFC transaction feeds, and GPS positions, publishing capacity counts directly to the exterior display and syncing with the driver and operator dashboards.
              </p>

              {/* Specs Grid below text */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-[750px] mx-auto text-[0.95rem] text-[var(--color-muted)]">
                <div className="bg-[var(--color-surface)] border-t-2 border-t-[var(--color-gold)] p-5 rounded-sm">
                  <h4 className="font-bold text-[var(--color-text)] mb-2">Cabin Placement</h4>
                  <p>The core module fits securely within the driver's reach, processing NFC transactions and GPS tracking.</p>
                </div>
                <div className="bg-[var(--color-surface)] border-t-2 border-t-[var(--color-gold)] p-5 rounded-sm">
                  <h4 className="font-bold text-[var(--color-text)] mb-2">Exterior Capacity Board</h4>
                  <p>Updates dynamically to display live occupancy limits (e.g. 17 / 23) and routes to commuters waiting at the curbside.</p>
                </div>
                <div className="bg-[var(--color-surface)] border-t-2 border-t-[var(--color-gold)] p-5 rounded-sm">
                  <h4 className="font-bold text-[var(--color-text)] mb-2">Unified Data Loop</h4>
                  <p>Streams telemetry data to the operator dashboards, syncing passenger counts and trip progress.</p>
                </div>
              </div>
            </FadeUp>
          </div>

        </div>

      </div>

      {/* Lightbox / Modal overlay with smooth fade-in/out backdrop */}
      <InteractiveModal
        isOpen={isRendered && modalType === 'image'}
        onClose={closeModal}
        imageSrc={selectedImage || ''}
        title={
          selectedImage === hardwareFeature.image 
            ? 'Physical IoT ESP32 Prototype Module' 
            : selectedImage === '/passenger.jpg'
            ? 'Passenger App'
            : 'Sleek Tablet App Mounted in Driver Cabin'
        }
      />
    </section>
  )
}
