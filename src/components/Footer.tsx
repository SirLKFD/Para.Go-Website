import { Mail, Phone, MapPin, Facebook } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t-2 border-[#fcd116] bg-[#0c0714] px-4 pb-14 pt-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap grid gap-8 md:grid-cols-3 mb-10 text-left">
        {/* Brand Logo only & Slogan Box */}
        <div className="border-l-2 border-[#fcd116] pl-4 flex flex-col justify-between items-start gap-4">
          <div>
            <img src="/parago-icon.png" alt="Para.Go Logo" className="h-10 w-auto mb-2 block" />
            <div className="mt-2">
              <span className="bg-[#fcd116] text-[#0c0714] font-black uppercase tracking-wider px-3 py-1 text-[10px] inline-block">
                COMMUTE CEBU. SMARTER
              </span>
            </div>
            <p className="mt-4 text-xs text-[var(--sea-ink-soft)] max-w-xs leading-relaxed">
              Modernizing the Cebuano public transit environment. Designed and developed by Cebu Institute of Technology - University graduates.
            </p>
          </div>
        </div>

        {/* Contact Info Placeholders */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
            Contact Details
          </h4>
          <div className="flex items-center gap-2 text-sm text-[var(--sea-ink-soft)]">
            <Mail className="h-4 w-4 text-[#fcd116] flex-shrink-0" />
            <span>info@parago.ph</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--sea-ink-soft)]">
            <Phone className="h-4 w-4 text-[#fcd116] flex-shrink-0" />
            <span>+63 (32) 123 4567</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--sea-ink-soft)]">
            <MapPin className="h-4 w-4 text-[#fcd116] flex-shrink-0" />
            <span>Cebu Institute of Technology - University<br/>N. Bacalso Ave, Cebu City, 6000</span>
          </div>
        </div>

        {/* Action / Social Link */}
        <div className="flex flex-col justify-between items-start">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Community
            </h4>
            <p className="text-xs text-[var(--sea-ink-soft)] leading-relaxed mb-4">
              Stay updated with our vehicle deployment and campus trials on our Facebook page.
            </p>
          </div>
          <a
            href="https://www.facebook.com/profile.php?id=61579400990238"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#fcd116] bg-[#160d24] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#fcd116] hover:bg-[#fcd116] hover:text-[#0c0714] w-full md:w-auto"
          >
            <Facebook className="h-4 w-4" />
            Follow us on Facebook
          </a>
        </div>
      </div>

      <div className="page-wrap border-t border-[#2d1847] pt-6 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-xs font-semibold uppercase tracking-wider">
          &copy; {year} Para.Go. All rights reserved.
        </p>
        <p className="m-0 text-[10px] font-semibold uppercase tracking-widest text-[#fcd116]">
          Home of the Technologians
        </p>
      </div>
    </footer>
  )
}
