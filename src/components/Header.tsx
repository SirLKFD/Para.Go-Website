import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export default function Header() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleSectionChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      setActiveSection(customEvent.detail)
    }
    window.addEventListener('active-section-changed', handleSectionChange)
    return () => {
      window.removeEventListener('active-section-changed', handleSectionChange)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#fcd116] bg-[#0c0714] px-4 py-1">
      <nav className="page-wrap flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3 sm:py-4">
        {/* Left Side: Logo asset directly, no borders or background */}
        <h2 className="m-0 flex-shrink-0">
          <Link
            to="/"
            className="flex items-center"
            aria-label="Para.Go Home"
          >
            <img src="/parago-icon.png" alt="Para.Go Logo" className="h-10 w-auto block" />
          </Link>
        </h2>

        {/* Center/Right: Expanded Nav Links with Scroll-Spy Highlight */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm font-bold uppercase tracking-wider">
          <Link
            to="/"
            className={`nav-link ${activeSection === 'hero' ? 'is-active' : ''}`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setActiveSection('hero')
            }}
          >
            Home
          </Link>
          <a
            href="/#tracker"
            className={`nav-link ${activeSection === 'tracker' ? 'is-active' : ''}`}
          >
            Tracker
          </a>
          <a
            href="/#features"
            className={`nav-link ${activeSection === 'features' ? 'is-active' : ''}`}
          >
            Features
          </a>
          <a
            href="/#fares"
            className={`nav-link ${activeSection === 'fares' ? 'is-active' : ''}`}
          >
            Fares
          </a>
          <a
            href="/#fleet"
            className={`nav-link ${activeSection === 'fleet' ? 'is-active' : ''}`}
          >
            Fleet
          </a>
          <a
            href="/#origins"
            className={`nav-link ${activeSection === 'origins' ? 'is-active' : ''}`}
          >
            Origins
          </a>
          <a
            href="/#contact"
            className={`nav-link ${activeSection === 'contact' ? 'is-active' : ''}`}
          >
            Contact
          </a>
          <Link
            to="/about"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  )
}
