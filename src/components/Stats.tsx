import { useEffect, useRef, useState } from 'react'

interface StatItemProps {
  endValue: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
  isString?: boolean
  stringValue?: string
}

function StatCounter({ endValue, suffix = '', prefix = '', label, duration = 1500, isString = false, stringValue = '' }: StatItemProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible || isString) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)
      
      // Easing function: easeOutQuart
      const easeOut = 1 - Math.pow(1 - percentage, 4)
      
      setCount(Math.floor(easeOut * endValue))

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        // Handle decimals if endValue is a float (we're assuming ints for this specific use case, except 3.5)
        setCount(endValue)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, endValue, duration, isString])

  return (
    <div ref={elementRef} className="flex flex-col items-center text-center p-4">
      <div className="font-display font-bold text-4xl md:text-5xl text-[var(--color-gold)] mb-3 flex items-center justify-center min-h-[60px]">
        {isString ? (
          <span className={`transition-opacity duration-1000 leading-tight ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {stringValue}
          </span>
        ) : (
          <span className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {prefix}{endValue % 1 !== 0 ? count.toFixed(1) : count}{suffix}
          </span>
        )}
      </div>
      <p className="text-[var(--color-text)] font-medium text-sm md:text-base leading-snug max-w-[200px]">
        {label}
      </p>
    </div>
  )
}

export default function Stats() {
  return (
    <section className=" transition-colors duration-1000 py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCounter 
            endValue={3.5} 
            suffix="M" 
            label="Daily transit trips in Metro Cebu" 
          />
          <StatCounter 
            endValue={60} 
            suffix="%" 
            label="Of residents dependent on public transport" 
          />
          <StatCounter 
            endValue={4} 
            label="Integrated systems in one platform" 
          />
          <StatCounter 
            endValue={0} 
            isString={true}
            stringValue="SDG 3, 9, 11, 13"
            label="UN Sustainable Development Goals aligned" 
          />
        </div>
      </div>
    </section>
  )
}
