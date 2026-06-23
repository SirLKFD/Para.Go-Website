import { Facebook, ChevronRight } from 'lucide-react'

export default function Banner() {
  return (
    <section className="bg-[#fcd116] p-8 md:p-12 text-center text-[#0c0714] border-4 border-white mb-6">
      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter m-0 leading-none mb-4">
        THANK YOU FOR SUPPORTING US!
      </h2>
      <div className="flex justify-center items-center gap-2 mb-6">
        <span className="h-3 w-3 bg-[#0c0714] rounded-full" />
        <span className="text-lg md:text-xl font-bold uppercase tracking-widest">
          BUCKLE UP! SOON...
        </span>
        <span className="h-3 w-3 bg-[#0c0714] rounded-full" />
      </div>

      <a
        href="https://www.facebook.com/profile.php?id=61579400990238"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-[#0c0714] text-[#fcd116] px-8 py-4 text-base font-black uppercase tracking-widest hover:bg-white hover:text-[#0c0714] border-2 border-[#0c0714] transition"
      >
        <Facebook className="h-5 w-5" />
        VISIT OUR FACEBOOK PAGE
        <ChevronRight className="h-5 w-5" />
      </a>
    </section>
  )
}
