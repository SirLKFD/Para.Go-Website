import { Facebook, Github } from 'lucide-react'

export default function Footer() {
  const sdgs = [
    { src: '/sdg3-en.png', alt: 'SDG 3' },
    { src: '/Sustainable_Development_Goal_9.png', alt: 'SDG 9' },
    { src: '/sdg11.png', alt: 'SDG 11' },
    { src: '/Sustainable_Development_Goal_13Climate.svg.png', alt: 'SDG 13' }
  ]

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Features', id: 'features' },
    { name: 'Tracker', id: 'tracker' },
    { name: 'Awards', id: 'awards' },
    { name: 'Partners', id: 'partners' },
    { name: 'Contact', id: 'contact' }
  ]

  return (
    <footer className="bg-[var(--bg-base)] transition-colors duration-1000 border-t border-[var(--color-border)] pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Left: Branding */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <img src="/parago-icon.png" alt="Para.Go Logo" className="h-8 w-auto" />
            </div>
            <h4 className="font-display font-bold text-xl text-[var(--color-text)] mb-2 uppercase tracking-wide">
              Commute Cebu. Smarter.
            </h4>
            <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-8">
              Bridging Youth Innovation with Civic Impact
            </p>
            
            {/* SDG Small Badges */}
            <div className="flex flex-wrap gap-2">
              {sdgs.map((sdg, idx) => (
                <img 
                  key={idx}
                  src={sdg.src}
                  alt={sdg.alt}
                  className="w-10 h-10 object-contain rounded-sm"
                  title={sdg.alt}
                />
              ))}
            </div>
          </div>

          {/* Center: Quick Nav */}
          <div className="md:col-span-4 lg:col-span-4 lg:justify-self-center">
            <h5 className="font-sans font-semibold text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-6">
              Navigation
            </h5>
            <ul className="space-y-4">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={`/#${link.id}`} 
                    className="text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Social & Contact Mini */}
          <div className="md:col-span-3 lg:col-span-4 lg:justify-self-end">
            <h5 className="font-sans font-semibold text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-6">
              Connect
            </h5>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61579400990238" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] hover:!text-[#0c0714] hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://github.com/SirLKFD/Para.Go-Website.git" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] hover:!text-[#0c0714] hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-[var(--color-muted)] text-[0.75rem]">
            © 2026 Para.Go — Smart Jeepney Monitoring and Commuter Information System
          </p>
          
        </div>

      </div>
    </footer>
  )
}
