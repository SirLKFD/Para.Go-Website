import { Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Menu, X, Trophy } from 'lucide-react'

export default function Header() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isBannerVisible, setIsBannerVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Features', id: 'features' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Why Para.Go', id: 'why' },
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

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
      navigate({
        hash: id,
        replace: true,
        resetScroll: false
      })
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
        className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-300 flex items-center justify-between px-6 h-16 ${
          isMobileMenuOpen
            ? 'w-[calc(100%-2rem)] max-w-[1200px] bg-transparent border-transparent shadow-none'
            : isScrolled
              ? 'w-[calc(100%-2rem)] max-w-[1200px] rounded-lg bg-[var(--color-bg)]/60 backdrop-blur-md border border-[var(--color-border)] shadow-lg shadow-black/40'
              : 'w-full max-w-none rounded-none bg-[var(--color-bg)]/60 backdrop-blur-md border-b border-[var(--color-border)]/60 shadow-none'
        }`}
        style={{ top: isScrolled ? '1rem' : (isBannerVisible ? '2.5rem' : '0px') }}
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            resetScroll={false}
            className="flex items-center gap-3 group shrink-0 mr-8 xl:mr-16"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setActiveSection('home')
              navigate({ to: '/', replace: true, resetScroll: false })
            }}
          >
            <img src="/parago-icon.png" alt="Para.Go Logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            <div className="flex items-center gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`/#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all whitespace-nowrap rounded-lg border border-transparent ${
                    activeSection === link.id 
                      ? 'bg-white/10 text-[var(--color-gold)] font-bold border-white/5' 
                      : 'text-[var(--color-muted)] hover:text-[var(--color-gold)] hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <a 
              href="/#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="bg-[var(--color-gold)] !text-[#0c0714] px-5 py-2 rounded-md font-semibold hover:bg-white transition-colors uppercase tracking-[0.12em] text-xs whitespace-nowrap border border-[var(--color-gold)]"
            >
              Partner With Us
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="xl:hidden p-2 text-[var(--color-text)] hover:bg-white/5 rounded-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Drawer */}
      <div 
        className={`fixed inset-0 z-30 bg-[var(--color-bg)] pt-32 px-6 transition-transform duration-300 xl:hidden overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`/#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-xl font-display font-bold text-[var(--color-text)] hover:text-[var(--color-gold)] py-3 border-b border-[var(--color-border)] rounded-none block"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="/#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="bg-[var(--color-gold)] !text-[#0c0714] px-6 py-4 mt-6 text-center rounded-none font-bold text-lg hover:bg-white transition-colors uppercase tracking-[0.12em] block"
          >
            Partner With Us
          </a>
        </nav>
      </div>
    </>
  )
}
