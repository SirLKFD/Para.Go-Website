import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

// Components
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import TheProblem from '../components/TheProblem'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import CompetitorComparison from '../components/CompetitorComparison'
import Tracker from '../components/Tracker'
import Beneficiaries from '../components/Beneficiaries'
import Awards from '../components/Awards'
import Roadmap from '../components/Roadmap'
import BusinessModel from '../components/BusinessModel'
import Partnerships from '../components/Partnerships'
import Origins from '../components/Origins'
import Download from '../components/Download'
import Contact from '../components/Contact'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Para.Go - Cebu\'s Smart Jeepney Transit System' },
      { name: 'description', content: 'Cebu\'s Open Track Champion smart transit system. IoT hardware, mobile apps, and cashless fares for jeepneys.' },
      { name: 'keywords', content: 'Para.Go, smart jeepney Cebu, modern public transport, Cebu transit tracker, cashless fare cards, CIT-University, smart transport system Philippines' },
      { property: 'og:title', content: 'Para.Go - Cebu\'s Smart Jeepney Transit System' },
      { property: 'og:description', content: 'Cebu\'s Open Track Champion smart transit system. IoT hardware, mobile apps, and cashless fares for jeepneys.' },
      { property: 'og:image', content: 'https://parago.top/og-image.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:url', content: 'https://parago.top' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Para.Go - Cebu\'s Smart Jeepney Transit System' },
      { name: 'twitter:description', content: 'Cebu\'s Open Track Champion smart transit system. IoT hardware, mobile apps, and cashless fares for jeepneys.' },
      { name: 'twitter:image', content: 'https://parago.top/og-image.png' },
    ],
  }),
  component: LandingPage,
})

function LandingPage() {
  // Scroll-Spy Intersection Observer Hook
  useEffect(() => {
    const sectionIds = [
      'home', 'problem', 'features', 'how-it-works', 'why', 
      'tracker', 'beneficiaries', 'awards', 'roadmap', 
      'model', 'partners', 'origins', 'download', 'contact'
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
    <main className="bg-[#0c0714] text-white">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Stats Bar */}
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

      {/* 7. Live Tracker */}
      <div className="spaceship-reveal">
        <Tracker />
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
    </main>
  )
}
