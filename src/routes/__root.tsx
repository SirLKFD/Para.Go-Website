import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

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
        title: 'Para.Go - Cebu\'s Smart Jeepney',
      },
      {
        name: 'description',
        content: 'Cebu\'s smart modern jeepney transit service. Live seat monitoring, automated comfort, and NFC tap boarding cards by CIT-U graduates.',
      },
      {
        name: 'keywords',
        content: 'Para.Go, smart jeepney, Cebu transit, public transport Cebu, CIT-University, modern transit',
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
      if (section === 'tracker' || section === 'download') {
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
