import { Mail, MapPin, Send } from 'lucide-react'
import FacebookIcon from './FacebookIcon'

const CONTACT_EMAIL = 'lordkentdinampo@gmail.com'

export default function Contact() {
  const needs = [
    {
      title: 'Partnerships',
      body: 'Access to modern jeepney operators and cooperatives'
    },
    {
      title: 'Infrastructure',
      body: 'A dedicated innovation hub or lab space'
    },
    {
      title: 'Mentorship',
      body: 'Professional business and operations guidance'
    },
    {
      title: 'Funding',
      body: 'Capital for hardware deployment and commercial rollout'
    }
  ]

  return (
    <section id="contact" className="py-24  transition-colors duration-1000">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        
        <div className="mb-16">
          <span className="block font-sans font-semibold text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-4">
            GET IN TOUCH
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight text-[var(--color-text)] mb-12">
            Let's bring Para.Go<br />
            to more routes.
          </h2>

          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-xl max-w-3xl">
            <h3 className="font-display font-medium text-[var(--color-text)] text-xl mb-6">
              What we're looking for:
            </h3>
            <div className="space-y-4">
              {needs.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <span className="font-display font-bold text-xl text-[var(--color-gold)] leading-none mt-0.5 whitespace-nowrap shrink-0">
                    {idx + 1}.
                  </span>
                  <div>
                    <span className="font-semibold text-[var(--color-text)] mr-2">{item.title} —</span>
                    <span className="text-[var(--color-muted)]">{item.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Contact Info */}
          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full flex items-center justify-center text-[var(--color-gold)] shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-1">Email</h4>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--color-text)] font-medium text-lg hover:text-[var(--color-gold)] transition-colors">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full flex items-center justify-center text-[var(--color-gold)] shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-1">Location</h4>
                  <p className="text-[var(--color-text)] font-medium text-lg">
                    CIT-University, N. Bacalso Ave,<br />Cebu City 6000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full flex items-center justify-center text-[var(--color-gold)] shrink-0">
                  <FacebookIcon size={20} />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-1">Social</h4>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61579400990238" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[var(--color-text)] font-medium text-lg hover:text-[var(--color-gold)] transition-colors"
                  >
                    Para.Go Facebook Page
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Send Us a Message CTA */}
          <div>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-xl flex flex-col items-center text-center justify-center min-h-[400px] h-full">
              <div className="w-16 h-16 bg-[var(--color-gold)]/10 rounded-full flex items-center justify-center text-[var(--color-gold)] mb-6">
                <Mail size={36} />
              </div>
              <h3 className="font-display font-semibold text-2xl text-[var(--color-text)] mb-3">
                Send Us a Message
              </h3>
              <p className="text-[var(--color-muted)] text-[1rem] leading-relaxed max-w-md mb-8">
                Interested in partnering with Para.Go? Reach out to us via email and our team will get back to you shortly.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Para.Go Partnership Inquiry')}`}
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-gold)] !text-[#0c0714] px-8 py-4 rounded-sm font-bold tracking-wider uppercase transition-colors hover:bg-white cursor-pointer"
              >
                <Send size={18} />
                Open Email Client
              </a>
            </div>
          </div>

          {/* 
            TODO: Re-enable the inline contact form once a backend email service 
            (e.g., EmailJS or a Cloud Function) is set up. The previous form code 
            has been removed — see git history for the original implementation.
          */}

        </div>

      </div>
    </section>
  )
}
