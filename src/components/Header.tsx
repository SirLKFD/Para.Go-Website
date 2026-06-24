import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Menu, X, Trophy } from 'lucide-react'

export default function Header() {
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isBannerVisible, setIsBannerVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Features', id: 'features' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Why Para.Go', id: 'why' },
    { name: 'Tracker', id: 'tracker' },
    { name: 'Awards', id: 'awards' },
    { name: 'Roadmap', id: 'roadmap' },
    { name: 'Partners', id: 'partners' },
    { name: 'Contact', id: 'contact' }
  ]

  useEffect(() => {
    // Check session storage for banner dismissal
    const bannerDismissed = sessionStorage.getItem('bannerDismissed')
    if (bannerDismissed === 'true') {
      setIsBannerVisible(false)
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = navLinks.map(link => document.getElementById(link.id))
      const allSections = [document.getElementById('home'), ...sections].filter(Boolean) as HTMLElement[]
      
      let currentSection = activeSection
      for (const section of allSections) {
        const rect = section.getBoundingClientRect()
        // If the top of the section is near the middle/top of the viewport
        if (rect.top <= 250 && rect.bottom >= 250) {
          currentSection = section.id
          break
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const dismissBanner = () => {
    setIsBannerVisible(false)
    sessionStorage.setItem('bannerDismissed', 'true')
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const element = document.getElementById(id)
    if (element) {
      e.preventDefault()
      setIsMobileMenuOpen(false)
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
      window.history.pushState(null, '', `/#${id}`)
    } else {
      setIsMobileMenuOpen(false)
    }
  }



  return (
    <>
      {/* Top announcement banner */}
      {isBannerVisible && (
        <div className="bg-[var(--color-gold)] !text-[#0c0714] px-4 py-2 text-sm font-semibold flex items-center justify-center relative z-50">
          <div className="flex items-center gap-2">
            <Trophy size={16} />
            <span>Open Track Champion — Cebu SolutionsFest 2026 · Organized by CCCI</span>
          </div>
          <button 
            onClick={dismissBanner}
            className="absolute right-4 p-1 hover:bg-black/10 rounded"
            aria-label="Dismiss announcement"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)]' 
            : 'bg-[var(--color-bg)] border-b border-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0 mr-12 lg:mr-24"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setActiveSection('home')
            }}
          >
            <img src="/parago-icon.png" alt="Para.Go Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            <div className="flex items-center gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`/#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative py-1 text-sm font-medium transition-colors hover:text-[var(--color-gold)] uppercase tracking-[0.12em] whitespace-nowrap ${
                    activeSection === link.id ? 'text-[var(--color-gold)]' : 'text-[var(--color-muted)]'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-gold)] rounded-full transition-all duration-300"></span>
                  )}
                </a>
              ))}
            </div>
            
            <a 
              href="/#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="bg-[var(--color-gold)] !text-[#0c0714] px-6 py-2.5 rounded-sm font-semibold hover:bg-white transition-colors uppercase tracking-[0.12em] text-xs whitespace-nowrap"
            >
              Partner With Us
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="xl:hidden p-2 text-[var(--color-text)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Drawer */}
      <div 
        className={`fixed inset-0 z-30 bg-[var(--color-bg)] pt-24 px-6 transition-transform duration-300 xl:hidden overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`/#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-2xl font-display font-semibold text-[var(--color-text)] hover:text-[var(--color-gold)]"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="/#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="bg-[var(--color-gold)] !text-[#0c0714] px-6 py-4 mt-4 text-center rounded-sm font-bold text-lg hover:bg-white transition-colors uppercase tracking-[0.12em]"
          >
            Partner With Us
          </a>
        </nav>
      </div>
    </>
  )
}
