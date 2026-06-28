import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, ZoomIn, ZoomOut } from 'lucide-react'

interface InteractiveModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  title?: string
}

export default function InteractiveModal({ isOpen, onClose, imageSrc, title }: InteractiveModalProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const imgRef = useRef<HTMLImageElement>(null)

  // Manage mount lifecycle
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      // Small tick delay to trigger scale animations
      const animTimer = requestAnimationFrame(() => {
        setIsAnimating(true)
      })
      return () => cancelAnimationFrame(animTimer)
    } else {
      setIsAnimating(false)
      const mountTimer = setTimeout(() => {
        setIsMounted(false)
      }, 300) // matches transition duration
      return () => clearTimeout(mountTimer)
    }
  }, [isOpen])

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Reset viewport state when image changes
  useEffect(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [imageSrc, isOpen])

  // Cleanup body style overflow lock on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (!isMounted || typeof document === 'undefined') return null

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setScale(prev => {
      const next = Math.max(prev - 0.25, 0.5)
      if (next === 1) setPosition({ x: 0, y: 0 })
      return next
    })
  }

  const handleReset = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleDoubleClick = () => {
    if (scale > 1) {
      handleReset()
    } else {
      setScale(2)
    }
  }

  // Panning & dragging event listeners (Mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Panning & dragging event listeners (Touch mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale <= 1 || e.touches.length !== 1) return
    setIsDragging(true)
    setDragStart({
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 md:p-8 transition-all duration-300 ease-out select-none cursor-default ${
        isAnimating 
          ? 'bg-black/95 backdrop-blur-xl opacity-100' 
          : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Action bar menu */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3 z-50">
        <div className="flex items-center gap-1 bg-[#160d24] border border-[var(--color-border)] rounded-full p-1 shadow-2xl">
          <button
            onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
            className="text-white hover:text-[var(--color-gold)] p-2 hover:bg-white/5 rounded-full transition-all disabled:opacity-30 disabled:hover:text-white"
            title="Zoom Out"
            disabled={scale <= 0.5}
          >
            <ZoomOut size={18} />
          </button>
          <span className="text-white text-xs font-mono px-1 min-w-[36px] text-center select-none">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
            className="text-white hover:text-[var(--color-gold)] p-2 hover:bg-white/5 rounded-full transition-all disabled:opacity-30 disabled:hover:text-white"
            title="Zoom In"
            disabled={scale >= 3}
          >
            <ZoomIn size={18} />
          </button>
        </div>

        <button
          onClick={onClose}
          className="text-white bg-[#160d24] border border-[var(--color-border)] p-2.5 hover:bg-white/10 hover:border-[var(--color-gold)] rounded-full transition-all shadow-2xl cursor-pointer"
          title="Close Viewer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Interactive viewport image wrapper */}
      <div 
        className="w-full flex-1 flex flex-col items-center justify-center relative overflow-hidden"
        onClick={onClose}
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            ref={imgRef}
            src={imageSrc}
            alt={title || "Expanded view"}
            onDoubleClick={handleDoubleClick}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`max-w-[90vw] max-h-[75vh] object-contain rounded-xl shadow-2xl select-none transition-all duration-300 ${
              isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
            } ${
              scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
            }`}
            draggable={false}
          />
        </div>
      </div>

      {/* Description / Caption Footer */}
      {title && (
        <div className={`mt-4 text-center z-40 transition-all duration-500 delay-100 ${
          isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-white text-base md:text-lg font-display font-medium max-w-2xl px-6 py-2 rounded-full bg-black/60 border border-white/5 backdrop-blur-md">
            {title}
          </p>
        </div>
      )}
    </div>,
    document.body
  )
}
