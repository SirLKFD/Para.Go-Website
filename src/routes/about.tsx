import { createFileRoute } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import FacebookIcon from '../components/FacebookIcon'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About Para.Go - Tech-Driven Public Transit Modernization in Cebu' },
      { name: 'description', content: 'Learn about Para.Go\'s roots at Cebu Institute of Technology - University. Discover our story, transit modernization research, and active public service initiatives for Cebuanos.' },
      { name: 'keywords', content: 'About Para.Go, parago, para go, parago about, CIT-University engineering, Cebu jeepney research, transit modernization team, smart transportation story, parago history' },
      { property: 'og:title', content: 'About Para.Go - CIT-U Roots & Transit Mission' },
      { property: 'og:description', content: 'Designed and developed by CIT-University engineering graduates. Bringing live tracking, comfort automation, and seamless cashless boarding to Cebuano public vehicles.' },
      { property: 'og:image', content: 'https://parago.top/og-image.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:alt', content: 'About Para.Go - CIT-U Roots & Transit Mission' },
      { property: 'og:url', content: 'https://parago.top/about' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'About Para.Go - CIT-U Roots & Transit Mission' },
      { name: 'twitter:description', content: 'Designed and developed by CIT-University engineering graduates.' },
      { name: 'twitter:image', content: 'https://parago.top/og-image.png' },
    ],
    links: [
      { rel: 'canonical', href: 'https://parago.top/about' },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <main className="page-wrap px-4 py-8 md:py-16">
      <section className="border-4 border-[#fcd116] bg-[#160d24] p-6 md:p-12 mb-12">
        <div className="mb-6">
          <span className="yellow-badge mb-2">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#fcd116] leading-none m-0">
            About Para.Go
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Main Story Narrative */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-lg md:text-xl text-[var(--sea-ink-soft)] leading-relaxed font-semibold">
              Para.Go is a smart commuter information and passenger monitoring system designed to bring modern convenience, safety, and operational intelligence to public transit vehicles in Cebu.
            </p>

            <h3 className="text-xl font-bold uppercase tracking-wider text-[#fcd116] m-0">
              CIT-University Roots
            </h3>
            <p className="text-base text-[var(--sea-ink-soft)] leading-relaxed m-0">
              The project was conceived, designed, and constructed by a pioneering engineering research team at **Cebu Institute of Technology - University (CIT-U)**. What started as an academic thesis to modernize the Cebuano commute has grown into an active transit service initiative.
            </p>

            <h3 className="text-xl font-bold uppercase tracking-wider text-[#fcd116] m-0">
              Transition to Active Service
            </h3>
            <p className="text-base text-[var(--sea-ink-soft)] leading-relaxed m-0">
              Recognizing the daily challenges of commuting in Cebu City, our team has dedicated itself to moving this technology from the research lab to the streets. By integrating automatic passenger counting displays and live GPS tracking, we aim to make everyday travel seamless, reliable, and convenient.
            </p>
          </div>

          {/* Quick Facts Sidebar */}
          <div className="border-4 border-[#2d1847] bg-[#0c0714] p-6 flex flex-col justify-between">
            <div>
              <span className="yellow-badge text-[10px] mb-4">Quick Details</span>
              <ul className="space-y-4 p-0 list-none text-sm text-[var(--sea-ink-soft)] font-medium">
                <li>
                  <strong className="text-white block uppercase tracking-wide text-xs">
                    Origin
                  </strong>
                  Cebu Institute of Technology - University
                </li>
                <li>
                  <strong className="text-white block uppercase tracking-wide text-xs">
                    Focus Area
                  </strong>
                  Cebu City Routes
                </li>
                <li>
                  <strong className="text-white block uppercase tracking-wide text-xs">
                    Primary Features
                  </strong>
                  Live seat capacity, automatic cooling, contactless cards, real-time tracking
                </li>
                <li>
                  <strong className="text-white block uppercase tracking-wide text-xs">
                    Goal
                  </strong>
                  Modernize public transport for Cebuanos
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t-2 border-[#2d1847]">
              <a
                href="https://www.facebook.com/profile.php?id=61579400990238"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full bg-[#fcd116] text-[#0c0714] px-4 py-3 text-xs font-black uppercase tracking-wider hover:bg-white hover:text-[#0c0714] transition"
              >
                <span className="flex items-center gap-2">
                  <FacebookIcon className="h-4 w-4" />
                  Follow our progress
                </span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
