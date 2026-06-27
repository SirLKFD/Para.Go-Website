import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

// Components
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import TheProblem from '../components/TheProblem'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import CompetitorComparison from '../components/CompetitorComparison'
import Beneficiaries from '../components/Beneficiaries'
import Awards from '../components/Awards'
import Roadmap from '../components/Roadmap'
import BusinessModel from '../components/BusinessModel'
import Partnerships from '../components/Partnerships'
import Origins from '../components/Origins'
import Download from '../components/Download'
import Contact from '../components/Contact'
import KickstarterVideo from '../components/KickstarterVideo'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Para.Go: Cebu\'s Smart Jeepney Transit System' },
      { name: 'description', content: 'Cebu\'s Open Track Champion smart transit system. IoT hardware, mobile apps, and cashless fares for jeepneys.' },
      { name: 'keywords', content: 'Para.Go, parago, para go, para-go, smart jeepney, smart jeepney Cebu, modern public transport, Cebu transit tracker, cashless fare cards, CIT-University, smart transport system Philippines, modern jeepney cebu, jeepney boarding card, parago transit' },
      { property: 'og:title', content: 'Para.Go: Cebu\'s Smart Jeepney Transit System' },
      { property: 'og:description', content: 'Cebu\'s Open Track Champion smart transit system. IoT hardware, mobile apps, and cashless fares for jeepneys.' },
      { property: 'og:image', content: 'https://parago.top/og-image.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:url', content: 'https://parago.top' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Para.Go: Cebu\'s Smart Jeepney Transit System' },
      { name: 'twitter:description', content: 'Cebu\'s Open Track Champion smart transit system. IoT hardware, mobile apps, and cashless fares for jeepneys.' },
      { name: 'twitter:image', content: 'https://parago.top/og-image.png' },
    ],
    links: [
      { rel: 'canonical', href: 'https://parago.top/' },
    ],
  }),
  component: LandingPage,
})

function LandingPage() {
  // Dynamic glow effect and section color observer handling
  const [activeColor, setActiveColor] = useState('rgba(40, 10, 80, 0.4)')

  // Scroll-Spy Intersection Observer Hook
  useEffect(() => {
    const sectionIds = [
      { id: 'home', color: 'rgba(40, 10, 80, 0.4)' }, 
      { id: 'kickstarter', color: 'rgba(38, 11, 82, 0.4)' },
      { id: 'problem', color: 'rgba(35, 12, 85, 0.4)' }, 
      { id: 'features', color: 'rgba(30, 15, 95, 0.4)' }, 
      { id: 'how-it-works', color: 'rgba(25, 20, 105, 0.4)' }, 
      { id: 'why', color: 'rgba(20, 25, 110, 0.4)' }, 
      { id: 'beneficiaries', color: 'rgba(10, 35, 130, 0.4)' }, 
      { id: 'awards', color: 'rgba(5, 40, 140, 0.4)' }, 
      { id: 'roadmap', color: 'rgba(10, 35, 130, 0.4)' }, 
      { id: 'model', color: 'rgba(15, 30, 120, 0.4)' }, 
      { id: 'partners', color: 'rgba(20, 25, 110, 0.4)' }, 
      { id: 'origins', color: 'rgba(25, 20, 105, 0.4)' }, 
      { id: 'download', color: 'rgba(30, 15, 95, 0.4)' }, 
      { id: 'contact', color: 'rgba(35, 12, 85, 0.4)' }
    ]
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Triggers when section occupies middle viewport
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          
          const matchedSection = sectionIds.find(s => s.id === id)
          if(matchedSection) {
             setActiveColor(matchedSection.color)
          }

          // Notify header navigation on active highlight anchor change
          const event = new CustomEvent('active-section-changed', { detail: id })
          window.dispatchEvent(event)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionIds.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      sectionIds.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  // Viewport scroll-reveal triggers
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .spaceship-reveal')
    
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { rootMargin: '0px 0px -100px 0px', threshold: 0.1 },
    )

    revealEls.forEach((el) => revealObserver.observe(el))

    return () => {
      revealEls.forEach((el) => revealObserver.unobserve(el))
    }
  }, [])

  return (
    <main 
      className="relative text-white min-h-screen bg-black overflow-hidden transition-colors duration-1000 ease-in-out"
      style={{
        background: `radial-gradient(ellipse at center, ${activeColor} 0%, rgba(0,0,0,1) 80%)`
      }}
    >
      {/* Content wrapper needs relative/z-10 so it's above base bg but affected by overlay */}
      <div className="relative z-10 w-full overflow-hidden">
        {/* 1. Hero Section */}
        <Hero />

      {/* 2. Kickstarter Video */}
      <div className="spaceship-reveal">
        <KickstarterVideo />
      </div>

      {/* 3. Stats Bar */}
      <div className="spaceship-reveal">
        <Stats />
      </div>

      {/* 3. The Problem */}
      <div className="spaceship-reveal">
        <TheProblem />
      </div>

      {/* 4. Features */}
      <div className="spaceship-reveal">
        <Features />
      </div>

      {/* 5. How It Works */}
      <div className="spaceship-reveal">
        <HowItWorks />
      </div>

      {/* 6. Competitor Comparison */}
      <div className="spaceship-reveal">
        <CompetitorComparison />
      </div>

      {/* 8. Beneficiaries */}
      <div className="spaceship-reveal">
        <Beneficiaries />
      </div>

      {/* 9. Awards */}
      <div className="spaceship-reveal">
        <Awards />
      </div>

      {/* 10. Roadmap */}
      <div className="spaceship-reveal">
        <Roadmap />
      </div>

      {/* 11. Business Model */}
      <div className="spaceship-reveal">
        <BusinessModel />
      </div>

      {/* 12. Partnerships */}
      <div className="spaceship-reveal">
        <Partnerships />
      </div>

      {/* 13. Origins / Story */}
      <div className="spaceship-reveal">
        <Origins />
      </div>

      {/* 14. Download the App */}
      <div className="spaceship-reveal">
        <Download />
      </div>

      {/* 15. Contact / CTA */}
      <div className="spaceship-reveal">
        <Contact />
      </div>
      </div>
    </main>
  )
}
