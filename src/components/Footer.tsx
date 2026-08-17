import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import StrokeText from './StrokeText'

interface FooterProps {
  setCurrentPage: (page: string) => void
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const go = (page: string) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const services = [
    'Office Cleaning', 'End of Lease', 'Residential Cleaning',
    'Window Cleaning', 'Carpet Cleaning', 'Post-Construction',
  ]

  const socialLinks = [
    { icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" /></svg>, href: '#', color: '#3B82F6', label: 'Facebook' },
    { icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>, href: '#', color: '#60A5FA', label: 'LinkedIn' },
    { icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, href: '#', color: '#F97316', label: 'Instagram' },
    { icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>, href: '#', color: '#38BDF8', label: 'Twitter' },
  ]

  return (
    <footer style={{ backgroundColor: 'var(--navy)' }} className="text-white">
      {/* Wave top */}
      <div className="overflow-hidden leading-none" style={{ height: 72 }}>
        <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,72 C360,0 1080,0 1440,72 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <button onClick={() => go('home')} className="flex items-center gap-3 mb-4 group">
              <img
                src="https://res.cloudinary.com/dyp247eoh/image/upload/v1786853139/logo-without-text_nyxi1p.png"
                alt="Clean Wave"
                className="h-11 w-11 object-contain group-hover:scale-110 transition-transform"
              />
              <span className="text-2xl font-black">
                <span style={{ color: '#60A5FA' }}>Clean</span>
                <span className="text-white">Wave</span>
              </span>
            </button>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Melbourne&apos;s most trusted professional cleaning partner. Delivering Wave Excellence across residential and commercial properties since 2015.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:opacity-90"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: s.color }}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-5" style={{ color: '#60A5FA' }}>Quick Links</h4>
            <ul className="space-y-3">
              {[
                { page: 'home', label: 'Home' },
                { page: 'services', label: 'Services' },
                { page: 'about', label: 'About Us' },
                { page: 'contact', label: 'Contact' },
                { page: 'booking', label: 'Book Now' },
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => go(item.page)}
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500 group-hover:w-3 transition-all duration-300" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-5" style={{ color: '#60A5FA' }}>Our Services</h4>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s}>
                  <button
                    onClick={() => go('services')}
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-orange-400 group-hover:w-3 transition-all duration-300" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-5" style={{ color: '#60A5FA' }}>Contact Us</h4>
            <div className="space-y-4">
              {[
                {
                  icon: <Phone className="w-4 h-4 text-blue-400" />,
                  text: '+61 0414 051 820',
                  href: 'tel:+61414051820',
                },
                {
                  icon: <Mail className="w-4 h-4 text-blue-400" />,
                  text: 'clean.wave96@gmail.com',
                  href: 'mailto:clean.wave96@gmail.com',
                },
                {
                  icon: <MapPin className="w-4 h-4 text-blue-400" />,
                  text: (
                    <span className="flex items-center gap-1.5">
                      Melbourne, VIC, Australia
                      <img 
                        src="https://flagcdn.com/w20/au.png" 
                        srcSet="https://flagcdn.com/w40/au.png 2x" 
                        width="16" 
                        height="12"
                        alt="Australia" 
                        className="inline-block rounded-sm shadow-sm"
                      />
                    </span>
                  ),
                  href: '#',
                },
              ].map((item, i) => (
                <a key={i} href={item.href} className="flex items-start gap-3 text-gray-400 hover:text-white text-sm transition-colors group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(27,111,234,0.25)' }}>
                    {item.icon}
                  </div>
                  <span className="mt-1 flex-1">{item.text}</span>
                </a>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: 'rgba(27,111,234,0.15)', border: '1px solid rgba(27,111,234,0.3)' }}>
              <p className="text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wide">Business Hours</p>
              <p className="text-sm text-white">Mon–Fri: 8am – 6pm</p>
              <p className="text-sm text-white">Sat: 9am – 4pm</p>
              <p className="text-sm text-gray-400">Sun: Emergency only</p>
            </div>
          </div>
        </div>

        {/* Giant footer brand animated text */}
        <div className="mt-8 flex justify-center overflow-hidden select-none pointer-events-none opacity-10">
          <div className="w-full max-w-5xl px-4">
            <StrokeText 
              text="CLEAN WAVE" 
              strokeColor="rgba(255, 255, 255, 0.4)" 
              fillColor="rgba(255, 255, 255, 0.15)" 
              fontSize={isMobile ? 48 : 140} 
              fontWeight={900} 
              trigger="scroll" 
              letterSpacing={isMobile ? -2 : -4} 
              fillMode="fade" 
              drawDuration={2.2}
            />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 md:mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-gray-500 text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-1.5">
            © 2026 Clean Wave. All rights reserved. &nbsp;
            <img 
              src="https://flagcdn.com/w20/au.png" 
              srcSet="https://flagcdn.com/w40/au.png 2x" 
              width="16" 
              height="12"
              alt="Australia" 
              className="inline-block rounded-sm shadow-sm"
            />
            Proudly serving Melbourne
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
