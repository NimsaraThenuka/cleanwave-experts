import { useState, useEffect } from 'react'
import { Calendar, Clock, User, Mail, Phone, MapPin, Sparkles, MessageSquare, ArrowRight, ArrowLeft, Send } from 'lucide-react'

interface BookingPageProps {
  setCurrentPage: (page: string, service?: string) => void
  initialService?: string
  previousPage?: string
}

export default function BookingPage({ setCurrentPage, initialService, previousPage }: BookingPageProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    suburb: '',
    service: initialService || '',
    date: '',
    time: '',
    message: '',
  })

  // Sync initialService if it changes
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }))
    }
  }, [initialService])

  useEffect(() => {
    window.scrollTo(0, 0)
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
  }, [step])

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData(prev => ({ ...prev, [field]: e.target.value }))

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  // Pre-formatted messages
  const getWhatsAppUrl = () => {
    const formattedText = 
      `Hello Clean Wave! I would like to book a cleaning service:\n\n` +
      `🧹 *Service:* ${formData.service}\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📞 *Phone:* ${formData.phone || 'N/A'}\n` +
      `📍 *Suburb:* ${formData.suburb}\n` +
      `📅 *Date:* ${formData.date}\n` +
      `🕒 *Time:* ${formData.time}\n` +
      `📝 *Details:* ${formData.message || 'None'}\n\n` +
      `Please confirm my booking. Thank you!`;
    return `https://wa.me/61414051820?text=${encodeURIComponent(formattedText)}`;
  }

  const getEmailUrl = () => {
    const subject = `Clean Wave Booking Request - ${formData.service}`;
    const body = 
      `Hello Clean Wave,\n\n` +
      `I would like to request a cleaning service. Here are the details:\n\n` +
      `- Service: ${formData.service}\n` +
      `- Name: ${formData.name}\n` +
      `- Email: ${formData.email}\n` +
      `- Phone: ${formData.phone || 'N/A'}\n` +
      `- Suburb: ${formData.suburb}\n` +
      `- Preferred Date: ${formData.date}\n` +
      `- Preferred Time: ${formData.time}\n` +
      `- Additional Details: ${formData.message || 'None'}\n\n` +
      `Please contact me to confirm. Thank you!`;
    return `mailto:info@cleanwaveexperts.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--blue-pale-2)' }}>
      {/* Hero Header */}
      <section className="relative pt-24 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: 'var(--navy)' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&h=400&fit=crop&auto=format"
            alt="Professional Cleaning Setup"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,27,64,0.97) 0%, rgba(13,27,64,0.6) 100%)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto mb-4 sm:mb-6 text-left">
          <button
            onClick={() => setCurrentPage(previousPage || 'home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all duration-300 text-xs sm:text-sm font-bold cursor-pointer group backdrop-blur-sm shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {previousPage === 'services' && 'Back to Services'}
            {previousPage === 'about' && 'Back to About Us'}
            {previousPage === 'contact' && 'Back to Contact'}
            {(!previousPage || previousPage === 'home') && 'Back to Home'}
          </button>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="section-badge section-badge-orange mb-5">Book Online</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Book Your <span className="text-gradient-orange">Clean Wave</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Book in 2 easy steps. Select your service, then choose how you want to confirm your booking.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: 40 }}>
          <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40 Z" fill="var(--blue-pale-2)" />
          </svg>
        </div>
      </section>

      {/* Main flow wrapper */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="max-w-3xl mx-auto">
          {/* Progress Indicators */}
          <div className="flex items-center justify-between mb-10 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 max-w-xl mx-auto">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 flex-shrink-0 ${step === 1 ? 'bg-[#1b6fea] text-white ring-4 ring-[#1b6fea]/10' : 'bg-[#10b981] text-white'}`}>
                {step > 1 ? '✓' : '1'}
              </div>
              <span className={`text-sm font-bold transition-colors duration-300 ${step === 1 ? 'text-[#1b6fea]' : 'text-gray-400'}`}>Booking Details</span>
            </div>
            <div className="flex-1 h-0.5 mx-4 bg-slate-100 relative rounded-full overflow-hidden">
              <div className={`absolute inset-y-0 left-0 bg-[#1b6fea] transition-all duration-500 ${step > 1 ? 'w-full' : 'w-0'}`} />
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 flex-shrink-0 ${step === 2 ? 'bg-[#1b6fea] text-white ring-4 ring-[#1b6fea]/10' : 'bg-slate-100 text-slate-400'}`}>
                2
              </div>
              <span className={`text-sm font-bold transition-colors duration-300 ${step === 2 ? 'text-[#1b6fea]' : 'text-gray-400'}`}>Confirm Method</span>
            </div>
          </div>

          {/* Form Step 1: Details */}
          {step === 1 && (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 reveal">
              <h2 className="text-2xl font-black mb-2 text-navy flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" /> Select Service & Info
              </h2>
              <p className="text-sm text-gray-400 mb-8">All fields marked with * are required to get an accurate booking.</p>

              <form onSubmit={handleNext} className="space-y-6">
                {/* Service Select */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5 text-navy">Service Required *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <select
                      required value={formData.service} onChange={set('service')}
                      className="w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl text-sm text-navy outline-none transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a service…</option>
                      {['Residential Cleaning', 'Commercial / Office Cleaning', 'School Cleaning', 'End of Lease Cleaning', 'Pre-Sale Property Cleaning', 'Spring / Deep Clean', 'Window Cleaning', 'Carpet & Steam Cleaning', 'Post-Construction Cleaning', 'Custom / Other'].map(s => (
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

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5 text-navy">Full Name *</label>
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
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5 text-navy">Email Address *</label>
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

                {/* Phone & Suburb */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5 text-navy">Phone Number *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel" required
                        placeholder="+61 0414 051 820"
                        value={formData.phone} onChange={set('phone')}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl text-sm text-navy outline-none transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5 text-navy">Your Suburb *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <input
                        type="text" required
                        placeholder="Port Melbourne"
                        value={formData.suburb} onChange={set('suburb')}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl text-sm text-navy outline-none transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5 text-navy">Preferred Date *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        type="date" required
                        value={formData.date} onChange={set('date')}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl text-sm text-navy outline-none transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5 text-navy">Preferred Time *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <Clock className="w-4 h-4" />
                      </div>
                      <input
                        type="time" required
                        value={formData.time} onChange={set('time')}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl text-sm text-navy outline-none transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5 text-navy">Additional Details / Notes</label>
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

                {/* Next Button */}
                <button
                  type="submit"
                  className="btn-shine w-full py-4 rounded-xl text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
                >
                  Continue to Confirm Step <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Form Step 2: Confirmation Channels */}
          {step === 2 && (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 reveal">
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={() => setStep(1)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-navy rounded-full transition-colors cursor-pointer"
                  aria-label="Back to step 1"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h2 className="text-2xl font-black text-navy">Choose Booking Method</h2>
                  <p className="text-sm text-gray-400 mt-0.5">Choose a channel below to send your structured details to Clean Wave.</p>
                </div>
              </div>

              {/* Booking Summary Box */}
              <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100/50 mb-6 space-y-3">
                <h3 className="font-bold text-navy text-sm uppercase tracking-wider mb-2">Booking Summary</h3>
                <div className="grid grid-cols-2 gap-y-2.5 text-sm">
                  <span className="text-gray-500 font-semibold">Service:</span>
                  <span className="text-navy font-bold">{formData.service}</span>
                  
                  <span className="text-gray-500 font-semibold">Customer:</span>
                  <span className="text-navy font-bold">{formData.name} ({formData.suburb})</span>
                  
                  <span className="text-gray-500 font-semibold">Date & Time:</span>
                  <span className="text-navy font-bold">{formData.date} at {formData.time}</span>
                </div>
              </div>

              {/* Booking instructions message requested by user */}
              <div className="text-center mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-sm font-extrabold text-[#1b6fea]">Please choose one of the options below to confirm your booking details:</p>
              </div>

              {/* Channel Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* WhatsApp Option */}
                <a 
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-between p-6 rounded-2xl text-center border hover:border-emerald-400 hover:bg-emerald-50/10 shadow-sm transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                  style={{ borderColor: 'rgba(16,185,129,0.15)' }}
                >
                  <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-base mb-1.5">Book via WhatsApp</h3>
                    <p className="text-xs text-gray-400 mb-4 leading-relaxed">Sends a structured chat message directly to our staff.</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white rounded-full text-xs font-bold shadow-md uppercase tracking-wider">
                    Send Chat
                  </span>
                </a>

                {/* Email Option */}
                <a 
                  href={getEmailUrl()}
                  className="flex flex-col items-center justify-between p-6 rounded-2xl text-center border hover:border-blue-400 hover:bg-blue-50/10 shadow-sm transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                  style={{ borderColor: 'rgba(27,111,234,0.15)' }}
                >
                  <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.58,19.1068l-12.69-8.0757A3,3,0,0,1,7.1109,5.97l9.31,5.9243L24.78,6.0428A3,3,0,0,1,28.22,10.9579Z" fill="#ea4335" />
                      <path d="M25.5,5.5h4a0,0,0,0,1,0,0v18a3,3,0,0,1-3,3h0a3,3,0,0,1-3-3V7.5a2,2,0,0,1,2-2Z" fill="#00ac47" transform="translate(53.0001 32.0007) rotate(180)" />
                      <path d="M29.4562,8.0656c-.0088-.06-.0081-.1213-.0206-.1812-.0192-.0918-.0549-.1766-.0823-.2652a2.9312,2.9312,0,0,0-.0958-.2993c-.02-.0475-.0508-.0892-.0735-.1354A2.9838,2.9838,0,0,0,28.9686,6.8c-.04-.0581-.09-.1076-.1342-.1626a3.0282,3.0282,0,0,0-.2455-.2849c-.0665-.0647-.1423-.1188-.2146-.1771a3.02,3.02,0,0,0-.24-.1857c-.0793-.0518-.1661-.0917-.25-.1359-.0884-.0461-.175-.0963-.267-.1331-.0889-.0358-.1837-.0586-.2766-.0859s-.1853-.06-.2807-.0777a3.0543,3.0543,0,0,0-.357-.036c-.0759-.0053-.1511-.0186-.2273-.018a2.9778,2.9778,0,0,0-.4219.0425c-.0563.0084-.113.0077-.1689.0193a33.211,33.211,0,0,0-.5645.178c-.0515.022-.0966.0547-.1465.0795A2.901,2.901,0,0,0,23.5,8.5v5.762l4.72-3.3043a2.8878,2.8878,0,0,0,1.2359-2.8923Z" fill="#ffba00" />
                      <path d="M5.5,5.5h0a3,3,0,0,1,3,3v18a0,0,0,0,1,0,0h-4a2,2,0,0,1-2-2V8.5a3,3,0,0,1,3-3Z" fill="#4285f4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-base mb-1.5">Book via Email</h3>
                    <p className="text-xs text-gray-400 mb-4 leading-relaxed">Pre-fills an email with your details to send to support.</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1b6fea] text-white rounded-full text-xs font-bold shadow-md uppercase tracking-wider">
                    Send Email
                  </span>
                </a>

                {/* Call Option */}
                <a 
                  href="tel:+61414051820"
                  className="flex flex-col items-center justify-between p-6 rounded-2xl text-center border hover:border-orange-400 hover:bg-orange-50/10 shadow-sm transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                  style={{ borderColor: 'rgba(249,115,22,0.15)' }}
                >
                  <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-base mb-1.5">Book via Call</h3>
                    <p className="text-xs text-gray-400 mb-4 leading-relaxed">Quick direct dial to our Melbourne booking center.</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white rounded-full text-xs font-bold shadow-md uppercase tracking-wider">
                    Call Hotline
                  </span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
