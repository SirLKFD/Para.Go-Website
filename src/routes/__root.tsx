import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { MapPinOff, ArrowLeft } from 'lucide-react'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Para.Go: Cebu\'s Smart Jeepney',
      },
      {
        name: 'description',
        content: 'Cebu\'s smart modern jeepney transit service. Live seat monitoring, automated comfort, and NFC tap boarding cards by CIT-U graduates.',
      },
      {
        name: 'keywords',
        content: 'Para.Go, parago, para go, para-go, smart jeepney, modern jeepney, Cebu transit, public transport Cebu, CIT-University, CIT-U jeepney, modern transit, Cebu jeepney tracking, jeepney app',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:site_name',
        content: 'Para.Go',
      },
      {
        property: 'og:image',
        content: 'https://parago.top/og-image.png',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '630',
      },
      {
        property: 'og:image:type',
        content: 'image/png',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/maplibre-gl@5/dist/maplibre-gl.css',
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/logo192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/logo192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        href: '/logo512.png',
      },
      {
        rel: 'apple-touch-icon',
        href: '/logo192.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
  }),
  notFoundComponent: NotFoundComponent,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  // Setup scroll variables on native scroll
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Scroll listener for CSS variables
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const percent = Math.min(1, scrolled / Math.max(1, maxScroll))
      document.documentElement.style.setProperty('--scroll-y', `${scrolled}px`)
      document.documentElement.style.setProperty('--scroll-percent', `${percent}`)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Background color shifting based on active section
  useEffect(() => {
    const handleActiveSection = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      const section = customEvent.detail
      
      let bg = '#0c0714' // Base Deep Purple-Black
      if (section === 'download') {
        bg = '#060e22' // Dark Celestial Navy
      } else if (section === 'why' || section === 'beneficiaries' || section === 'awards' || section === 'partners' || section === 'contact') {
        bg = '#090510' // Transition shade
      }
      
      document.documentElement.style.setProperty('--bg-base', bg)
    }

    window.addEventListener('active-section-changed', handleActiveSection)
    return () => {
      window.removeEventListener('active-section-changed', handleActiveSection)
    }
  }, [])

  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
        <script src="https://unpkg.com/maplibre-gl@5/dist/maplibre-gl.js"></script>
        <script src="https://unpkg.com/@maplibre/maplibre-gl-leaflet/leaflet-maplibre-gl.js"></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Para.Go",
              "alternateName": [
                "Parago",
                "Para Go",
                "Para-Go",
                "Cebu Smart Jeepney",
                "Smart Jeepney"
              ],
              "url": "https://parago.top",
              "description": "Cebu's smart modern jeepney transit service. Live seat monitoring, automated comfort, and NFC tap boarding cards by CIT-U graduates.",
              "applicationCategory": "TravelApplication",
              "operatingSystem": "Android, iOS, Web",
              "creator": {
                "@type": "Organization",
                "name": "Para.Go Team"
              }
            })
          }}
        />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[#fcd116] selection:text-[#0c0714]">
        <Header />
        {children}
        <Footer />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-[#0c0714] text-white flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--color-surface)] rounded-full blur-[120px] opacity-40 z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-md flex flex-col items-center">
        <div className="w-20 h-20 bg-[var(--color-gold)]/10 rounded-full flex items-center justify-center text-[var(--color-gold)] mb-8 shadow-inner animate-pulse">
          <MapPinOff size={40} />
        </div>

        <h1 className="font-display font-bold text-7xl md:text-8xl text-[var(--color-text)] mb-4 tracking-tight">
          404
        </h1>
        
        <h2 className="font-display font-semibold text-xl md:text-2xl text-[var(--color-gold)] uppercase tracking-wider mb-6">
          Route Not Found
        </h2>
        
        <p className="text-[var(--color-muted)] text-[1rem] leading-relaxed mb-10">
          The public transit link you followed does not exist. The jeepney might have changed its route or destination.
        </p>

        <a
          href="/"
          className="inline-flex items-center gap-2 bg-[var(--color-gold)] !text-[#0c0714] px-6 py-3.5 rounded-sm font-bold tracking-wider uppercase transition-colors hover:bg-white cursor-pointer"
        >
          <ArrowLeft size={16} />
          Return to Hub
        </a>
      </div>
    </div>
  )
}
