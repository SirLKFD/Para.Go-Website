import { Mail, MapPin, Facebook, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', org: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      setStatus('error')
      setErrorMsg('Please enter your name.')
      return
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus('error')
      setErrorMsg('Please enter a valid email address.')
      return
    }
    if (!formData.message.trim()) {
      setStatus('error')
      setErrorMsg('Please enter your message.')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    // Simulate sending message API delay
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', org: '', email: '', message: '' })
    }, 1500)
  }

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
                  <span className="font-display font-bold text-xl text-[var(--color-gold)] leading-none mt-0.5">
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
                  <a href="mailto:info@parago.top" className="text-[var(--color-text)] font-medium text-lg hover:text-[var(--color-gold)] transition-colors">
                    info@parago.top
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
                  <Facebook size={20} />
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

          {/* Right Column: HTML Form or Success Message */}
          <div>
            {status === 'success' ? (
              <div className="bg-[var(--color-surface)] border border-[var(--color-gold)] p-8 rounded-xl flex flex-col items-center text-center justify-center min-h-[400px] h-full transition-all">
                <div className="w-16 h-16 bg-[var(--color-gold)]/10 rounded-full flex items-center justify-center text-[var(--color-gold)] mb-6">
                  <CheckCircle size={36} />
                </div>
                <h3 className="font-display font-semibold text-2xl text-[var(--color-text)] mb-3">
                  Message Sent!
                </h3>
                <p className="text-[var(--color-muted)] text-[1rem] leading-relaxed max-w-md mb-8">
                  Thank you for reaching out! Your partnership request has been submitted to <strong>info@parago.top</strong>. Our team will review your message and get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="bg-transparent border border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[#0c0714] px-6 py-3 rounded-sm font-semibold text-xs tracking-wider uppercase transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-xl" onSubmit={handleSubmit}>
                <div className="space-y-6">
                  
                  {status === 'error' && (
                    <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-sm text-sm">
                      <AlertCircle size={18} className="shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-[0.875rem] text-[var(--color-text)] mb-2 font-medium">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={status === 'loading'}
                      className="w-full bg-[#0c0714] border border-[var(--color-border)] rounded-sm px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] transition-all disabled:opacity-50"
                      placeholder="Juan Dela Cruz"
                    />
                  </div>

                  <div>
                    <label htmlFor="org" className="block text-[0.875rem] text-[var(--color-text)] mb-2 font-medium">Organization</label>
                    <input 
                      type="text" 
                      id="org" 
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      disabled={status === 'loading'}
                      className="w-full bg-[#0c0714] border border-[var(--color-border)] rounded-sm px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] transition-all disabled:opacity-50"
                      placeholder="Company or Cooperative"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[0.875rem] text-[var(--color-text)] mb-2 font-medium">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={status === 'loading'}
                      className="w-full bg-[#0c0714] border border-[var(--color-border)] rounded-sm px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] transition-all disabled:opacity-50"
                      placeholder="juan@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[0.875rem] text-[var(--color-text)] mb-2 font-medium">Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={status === 'loading'}
                      className="w-full bg-[#0c0714] border border-[var(--color-border)] rounded-sm px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] transition-all resize-y disabled:opacity-50"
                      placeholder="How can we partner together?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 bg-[var(--color-gold)] !text-[#0c0714] px-6 py-4 rounded-sm font-bold tracking-wider uppercase transition-colors hover:bg-white disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>

                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}
