import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Clock, MessageSquare, AlertCircle, Map, X, User, Sparkles } from 'lucide-react'
import StrokeText from '../components/StrokeText'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', suburb: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showAllSuburbs, setShowAllSuburbs] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
        } else {
          e.target.classList.remove('visible')
        }
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData(prev => ({ ...prev, [field]: e.target.value }))

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: 'var(--navy)' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1612415491873-144fd5e03169?w=1400&h=600&fit=crop&auto=format"
            alt="Melbourne city"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,27,64,0.97) 0%, rgba(13,27,64,0.6) 100%)' }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="section-badge section-badge-orange mb-5">Get In Touch</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
            <span>We&apos;re Here to</span>
            <span className="inline-block max-w-[240px] sm:max-w-[320px] md:max-w-none">
              <StrokeText text="Help You." strokeColor="var(--orange)" fillColor="var(--orange)" fontSize={52} trigger="scroll" letterSpacing={0} fillMode="fade" fontWeight={900} />
            </span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Have questions about our services or need a custom quote? Our friendly Melbourne team is ready to assist you with any cleaning requirements.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: 60 }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Phone className="w-7 h-7 text-blue-500" />,
                title: 'Call Us',
                val: '+61 0414 051 820',
                sub: 'Mon–Fri, 8am – 6pm for immediate assistance.',
                href: 'tel:+61414051820',
                color: 'var(--primary)',
              },
              {
                icon: <Mail className="w-7 h-7 text-orange-500" />,
                title: 'Email Us',
                val: 'info@cleanwaveexperts.com.au',
                sub: 'We typically respond within 2 business hours.',
                href: 'mailto:info@cleanwaveexperts.com.au',
                color: 'var(--orange)',
              },
              {
                icon: <MapPin className="w-7 h-7 text-emerald-500" />,
                title: 'Visit Us',
                val: 'Melbourne, VIC',
                sub: '',
                href: '#',
                color: '#059669',
              },
              {
                icon: <Clock className="w-7 h-7 text-purple-500" />,
                title: 'Business Hours',
                val: 'Mon–Fri: 8am–6pm',
                sub: 'Sat: 9am–4pm  |  Sun: Emergency only',
                href: '#',
                color: '#7C3AED',
              },
            ].map((c, i) => {
              const cardContent = (
                <>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `linear-gradient(135deg, ${c.color}18, ${c.color}30)` }}
                  >
                    {c.icon}
                  </div>
                  <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: c.color }}>{c.title}</p>
                  {c.title === 'Call Us' ? (
                    <div className="space-y-1 mb-1">
                      <a href="tel:+61451812155" className="block font-black text-sm text-navy hover:text-primary transition-colors">
                        +61 451 812 155
                      </a>
                      <a href="tel:+61414051820" className="block font-black text-sm text-navy hover:text-primary transition-colors">
                        +61 414 051 820
                      </a>
                    </div>
                  ) : (
                    <p className="font-black text-sm mb-1" style={{ color: 'var(--navy)' }}>{c.val}</p>
                  )}
                  {c.sub && <p className="text-xs text-gray-400 leading-relaxed">{c.sub}</p>}
                </>
              );

              if (c.title === 'Call Us') {
                return (
                  <div
                    key={c.title}
                    className="reveal service-card block p-6 rounded-2xl bg-white group"
                    style={{
                      border: '1px solid rgba(27,111,234,0.1)',
                      boxShadow: '0 4px 24px rgba(27,111,234,0.06)',
                      transitionDelay: `${i * 80}ms`,
                    }}
                  >
                    {cardContent}
                  </div>
                );
              }

              return (
                <a
                  key={c.title}
                  href={c.href}
                  className="reveal service-card block p-6 rounded-2xl bg-white group"
                  style={{
                    border: '1px solid rgba(27,111,234,0.1)',
                    boxShadow: '0 4px 24px rgba(27,111,234,0.06)',
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  {cardContent}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main form + info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--blue-pale-2)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3 reveal-left">
            <div className="bg-white rounded-2xl p-8 shadow-lg" style={{ border: '1px solid rgba(27,111,234,0.1)' }}>
              <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--navy)' }}>Send Us a Message</h2>
              <p className="text-sm text-gray-400 mb-7">We&apos;ll get back to you with a personalised quote within 2 hours.</p>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-black mb-2" style={{ color: 'var(--navy)' }}>Message Sent!</h3>
                  <p className="text-gray-400">Our team will contact you within 2 business hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', service: '', suburb: '', message: '' }) }}
                    className="mt-6 px-6 py-2.5 rounded-full text-white text-sm font-bold"
                    style={{ background: 'var(--primary)' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--navy)' }}>Full Name *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text" required
                          placeholder="Sarah Jenkins"
                          value={formData.name} onChange={set('name')}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl text-sm text-navy outline-none transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--navy)' }}>Email Address *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email" required
                          placeholder="sarah@email.com"
                          value={formData.email} onChange={set('email')}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl text-sm text-navy outline-none transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--navy)' }}>Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          placeholder="+61 0414 051 820"
                          value={formData.phone} onChange={set('phone')}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl text-sm text-navy outline-none transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--navy)' }}>Your Suburb</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          placeholder="Port Melbourne"
                          value={formData.suburb} onChange={set('suburb')}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl text-sm text-navy outline-none transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--navy)' }}>Service Required *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <select
                        required value={formData.service} onChange={set('service')}
                        className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl text-sm text-navy outline-none transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select a service…</option>
                        {['Residential Cleaning', 'Commercial / Office Cleaning', 'End of Lease Cleaning', 'Pre-Sale Property Cleaning', 'Spring / Deep Clean', 'Window Cleaning', 'Carpet & Steam Cleaning', 'Post-Construction Cleaning', 'Custom / Other'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--navy)' }}>Your Message</label>
                    <div className="relative">
                      <div className="absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none text-slate-400">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your property size, specific requirements, preferred dates…"
                        value={formData.message} onChange={set('message')}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl text-sm text-navy outline-none transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn-shine w-full py-4 rounded-xl text-white font-black text-sm shadow-lg cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, var(--orange), var(--orange-dark))' }}
                  >
                    Send My Free Quote Request →
                  </button>
                  <p className="text-xs text-gray-400 text-center">We typically respond within 2 business hours. No obligation, completely free.</p>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6 reveal-right">
            {/* Social */}
            <div className="bg-white rounded-2xl p-7" style={{ border: '1px solid rgba(27,111,234,0.1)', boxShadow: '0 4px 24px rgba(27,111,234,0.06)' }}>
              <h3 className="font-black mb-2" style={{ color: 'var(--navy)' }}>Follow Our Journey</h3>
              <p className="text-sm text-gray-400 mb-5">Stay updated with cleaning tips, transformations, and exclusive Australian offers.</p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  { name: 'Facebook', icon: <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" /></svg>, color: '#1877F2' },
                  { name: 'Instagram', icon: <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, color: '#E4405F' },
                  { name: 'LinkedIn', icon: <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>, color: '#0A66C2' },
                  { name: 'Twitter / X', icon: <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>, color: '#000' },
                ].map(s => (
                  <a
                    key={s.name}
                    href="#"
                    className="flex items-center gap-1.5 sm:gap-3 p-2 sm:p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all hover:shadow-md truncate"
                    style={{ border: `1px solid ${s.color}22`, color: s.color, backgroundColor: `${s.color}08` }}
                  >
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.color }}>
                      {s.icon}
                    </span>
                    <span className="truncate">{s.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Live chat */}
            <div
              className="rounded-2xl p-7 text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 bg-white translate-x-8 -translate-y-8" />
              <h3 className="font-black mb-2">Need Immediate Help?</h3>
              <p className="text-white/70 text-sm mb-5">Our live chat support is available during business hours for quick questions.</p>
              <a
                href="https://wa.me/61414051820?text=Hello%20Clean%20Wave!%20I%20have%20a%20question%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white font-bold text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
                style={{ color: '#25D366' }}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat with Us
              </a>
            </div>

            {/* Emergency */}
            <div className="rounded-2xl p-7" style={{ background: 'linear-gradient(135deg, var(--orange), var(--orange-dark))' }}>
              <h3 className="font-black text-white mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-5 h-5" /> Emergency Clean?
              </h3>
              <p className="text-white/80 text-sm mb-4">Need urgent cleaning services outside business hours? Call us directly.</p>
              <a href="tel:+61414051820" className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white font-black text-sm" style={{ color: 'var(--orange-dark)' }}>
                <Phone className="w-4 h-4" /> Call Now: +61 0414 051 820
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 reveal">
            <h2 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: 'var(--navy)' }}>
              Our Service Areas
            </h2>
            <p className="text-gray-400 text-sm">Covering 30+ suburbs across victoria</p>
          </div>

          <div className="reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {((isMobile && !showAllSuburbs) ? [
              'Port Melbourne', 'South Melbourne', 'Malvern', 'Camberwell', 'Glen Iris', 'Caulfield',
              'Armadale', 'Hampton', 'St Kilda', 'Brighton', 'Sandringham', 'Moorabbin',
              'Elsternwick', 'Elwood', 'Mordialloc', 'Cheltenham', 'Parkdale', 'Frankston',
              'Albert Park', 'Beaumaris', 'Middle Park', 'Black Rock', 'Mentone', 'Gardenvale',
              'Edithvale', 'Chelsea', 'Highett', 'Balaclava', 'Ripponlea', 'McKinnon',
            ].slice(0, 8) : [
              'Port Melbourne', 'South Melbourne', 'Malvern', 'Camberwell', 'Glen Iris', 'Caulfield',
              'Armadale', 'Hampton', 'St Kilda', 'Brighton', 'Sandringham', 'Moorabbin',
              'Elsternwick', 'Elwood', 'Mordialloc', 'Cheltenham', 'Parkdale', 'Frankston',
              'Albert Park', 'Beaumaris', 'Middle Park', 'Black Rock', 'Mentone', 'Gardenvale',
              'Edithvale', 'Chelsea', 'Highett', 'Balaclava', 'Ripponlea', 'McKinnon',
            ]).map(suburb => (
              <div
                key={suburb}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:shadow-md cursor-default bg-white border"
                style={{ borderColor: 'rgba(27,111,234,0.12)', color: 'var(--navy)' }}
              >
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                {suburb}
              </div>
            ))}
          </div>

          {isMobile && (
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowAllSuburbs(!showAllSuburbs)}
                className="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white"
              >
                {showAllSuburbs ? 'Show Less ↑' : 'Show All Suburbs ↓'}
              </button>
            </div>
          )}

          <div className="reveal text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border" style={{ borderColor: 'rgba(27,111,234,0.2)' }}>
              <Map className="w-8 h-8 text-blue-500" />
              <div className="text-left">
                <p className="font-black text-sm" style={{ color: 'var(--navy)' }}>Don&apos;t see your suburb?</p>
                <p className="text-xs text-gray-400">Contact us to check availability in your area — we&apos;re always expanding!</p>
              </div>
              <a href="tel:+61414051820" className="btn-shine px-5 py-2.5 rounded-xl text-white text-xs font-bold flex-shrink-0" style={{ background: 'var(--primary)' }}>
                Call Us →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Chat modal */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl" style={{ border: '1px solid rgba(27,111,234,0.2)' }}>
          <div className="flex items-center justify-between p-4 rounded-t-2xl text-white" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}>
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-white" />
              <div>
                <p className="font-bold text-sm">Clean Wave Support</p>
                <p className="text-xs text-white/70">Usually replies instantly</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <div className="bg-gray-100 rounded-xl rounded-tl-none p-3 text-sm text-gray-700">
              👋 Hi! Thanks for reaching out to Clean Wave. How can we help you today?
            </div>
            <div className="grid grid-cols-1 gap-2">
              {["I'd like a quote", "What services do you offer?", "What are your prices?"].map(opt => (
                <button key={opt} className="text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:bg-blue-50 border" style={{ borderColor: 'rgba(27,111,234,0.2)', color: 'var(--primary)' }}>
                  {opt}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message…"
                className="flex-1 px-3 py-2 rounded-xl text-xs border focus:outline-none"
                style={{ borderColor: 'rgba(27,111,234,0.2)' }}
              />
              <button className="px-3 py-2 rounded-xl text-white text-xs font-bold" style={{ background: 'var(--primary)' }}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
