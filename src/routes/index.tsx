import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

// Modular components import
import Hero from '../components/Hero'
import Showcase from '../components/Showcase'
import Tracker from '../components/Tracker'
import Features from '../components/Features'
import Fares from '../components/Fares'
import Safety from '../components/Safety'
import Fleet from '../components/Fleet'
import Origins from '../components/Origins'
import Help from '../components/Help'
import Banner from '../components/Banner'

// Animated transit separators import
import {
  TransitDividerWave,
  TransitDividerTracks,
  TransitDividerChevrons,
  TransitDividerNfc,
  TransitDividerGps,
} from '../components/TransitDividers'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Para.Go - Smart Modern Jeepney Transit Service in Cebu' },
      { name: 'description', content: 'Experience Cebu\'s smartest modern jeepney transit service. Real-time GPS vehicle tracking, automatic cabin temperature cooling, and cashless NFC tap boarding pass by CIT-U graduates.' },
      { name: 'keywords', content: 'Para.Go, smart jeepney Cebu, modern public transport, Cebu transit tracker, cashless fare cards, CIT-University, smart transport system Philippines' },
      { property: 'og:title', content: 'Para.Go - Cebu\'s Smart Modern Jeepney System' },
      { property: 'og:description', content: 'Seamlessly tracking coordinates, cashless fare matrix calculations, and automated cabin comfort for Cebuano commuters. Developed by CIT-University.' },
      { property: 'og:image', content: '/logo512.png' },
      { property: 'og:url', content: 'https://parago.ph' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: LandingPage,
})

function LandingPage() {
  // Scroll-Spy Intersection Observer Hook
  useEffect(() => {
    const sectionIds = ['hero', 'tracker', 'features', 'fares', 'safety', 'fleet', 'origins', 'contact']
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Triggers when section occupies middle viewport
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          // Notify header navigation on active highlight anchor change
          const event = new CustomEvent('active-section-changed', { detail: id })
          window.dispatchEvent(event)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  return (
    <main className="page-wrap px-4 py-8 md:py-16">
      {/* 1. Hero Section */}
      <Hero />
      <TransitDividerWave />

      {/* 2. App & Pass Showcase */}
      <Showcase />
      <TransitDividerTracks />

      {/* 3. Live Route Tracker Map */}
      <Tracker />
      <TransitDividerChevrons />

      {/* 4. Transit Features List */}
      <Features />
      <TransitDividerNfc />

      {/* 5. GPS Fare Calculation Guide */}
      <Fares />
      <TransitDividerGps />

      {/* 6. Safety & Automated Climate */}
      <Safety />
      <TransitDividerWave />

      {/* 7. Operator Solutions & Tablet Mockup */}
      <Fleet />
      <TransitDividerChevrons />

      {/* 8. CIT-U Origins Collage */}
      <Origins />
      <TransitDividerChevrons />

      {/* 9. Commuter Trip Logs Inquiries */}
      <Help />
      <TransitDividerChevrons />

      {/* 10. Thank You Redirection Banner */}
      <Banner />
    </main>
  )
}
