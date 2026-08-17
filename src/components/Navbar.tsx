import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Calendar } from 'lucide-react'

interface NavbarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ]

  const go = (page: string) => {
    setCurrentPage(page)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300">
      {/* Top info bar */}
      <div style={{ backgroundColor: 'var(--navy)' }} className="py-2 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 text-xs text-white/80">
            <a href="tel:+61414051820" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              +61 0414 051 820
            </a>
            <a href="mailto:clean.wave96@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              clean.wave96@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/80">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            Melbourne, VIC &nbsp;🇦🇺
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Desktop background layer clipped diagonally when top, normal full-width when scrolled */}
        <div
          className={`absolute inset-y-0 -left-[100vw] z-0 hidden lg:block transition-all duration-300 shadow-lg ${scrolled
              ? 'nav-glass right-[-100vw] rounded-none'
              : 'bg-white right-[146px] clip-nav'
            }`}
        />

        <div
          className={`flex items-center justify-between h-16 lg:h-20 transition-all duration-300 relative z-10 w-full rounded-2xl lg:rounded-none px-6 lg:px-0 lg:shadow-none ${scrolled ? 'nav-glass lg:bg-transparent lg:backdrop-blur-none lg:shadow-none' : 'bg-white lg:bg-transparent lg:shadow-none'}`}
        >
          {/* Logo */}
          <button onClick={() => go('home')} className="flex items-center gap-3 group cursor-pointer">
            <img
              src="https://res.cloudinary.com/dyp247eoh/image/upload/v1786853139/logo-without-text_nyxi1p.png"
              alt="Clean Wave Logo"
              className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-xl font-black tracking-tight">
              <span style={{ color: 'var(--primary)' }}>Clean</span>
              <span style={{ color: 'var(--navy)' }}>Wave</span>
            </span>
          </button>

          {/* Desktop links - centered when scrolled, shifted when header is clipped */}
          <div className={`hidden lg:flex items-center gap-8 transition-all duration-300 ${scrolled ? 'lg:mr-0' : 'lg:mr-40'}`}>
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className="relative px-1 py-2 text-sm font-bold tracking-wide transition-colors duration-200 group cursor-pointer"
                style={{ color: currentPage === link.id ? 'var(--primary)' : 'var(--navy)' }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--primary)',
                    width: currentPage === link.id ? '100%' : '0%',
                  }}
                />
                {currentPage !== link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-300" style={{ backgroundColor: 'var(--primary)' }} />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>

          {/* Book Now Button (Outside the cut on desktop) */}
          <div className="hidden lg:flex items-center h-16 lg:h-20 bg-transparent relative z-20 lg:-mr-6">
            <button
              onClick={() => go('booking')}
              className="btn-shine flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-xs uppercase tracking-wider font-extrabold shadow-lg cursor-pointer"
              style={{ background: 'linear-gradient(135deg, var(--orange), var(--orange-dark))' }}
            >
              <Calendar className="w-4 h-4" />
              Book Now
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#0d1b40]/95 backdrop-blur-xl flex flex-col justify-between p-6 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between">
            <button onClick={() => go('home')} className="flex items-center gap-3 group cursor-pointer text-white">
              <img
                src="https://res.cloudinary.com/dyp247eoh/image/upload/v1786853139/logo-without-text_nyxi1p.png"
                alt="Clean Wave Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-black tracking-tight">
                <span className="text-[#1b6fea]">Clean</span>
                <span>Wave</span>
              </span>
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-full bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links in Center */}
          <div className="flex flex-col gap-6 my-auto text-center">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id

              return (
                <button
                  key={link.id}
                  onClick={() => go(link.id)}
                  className="relative px-6 py-2.5 text-3xl font-extrabold tracking-tight transition-all duration-300 cursor-pointer group w-fit mx-auto rounded-2xl"
                  style={{
                    color: isActive ? '#1b6fea' : '#ffffff',
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent'
                  }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Subtle capsule glow on hover */}
                  <span className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              )
            })}
          </div>

          {/* Footer Contact & Button */}
          <div className="space-y-6 pt-6 pb-8 border-t border-white/5">
            <button
              onClick={() => go('booking')}
              className="btn-shine w-full py-4 rounded-full text-white text-xs uppercase tracking-wider font-extrabold shadow-lg cursor-pointer transition-transform active:scale-95"
              style={{ background: 'linear-gradient(135deg, var(--orange), var(--orange-dark))' }}
            >
              Book Now
            </button>
            
            <div className="flex flex-col items-center gap-2.5 text-xs text-white/50">
              <a href="tel:+61414051820" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>+61 0414 051 820</span>
              </a>
              <a href="mailto:clean.wave96@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>clean.wave96@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
