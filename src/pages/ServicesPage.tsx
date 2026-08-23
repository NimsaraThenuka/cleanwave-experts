import { useEffect } from 'react'
import { Home, Building2, KeyRound, Sparkles, Layout, Droplets, Paintbrush, CalendarCheck, UserCheck, ThumbsUp, Check, Phone, School } from 'lucide-react'
import StrokeText from '../components/StrokeText'

interface ServicesPageProps {
  setCurrentPage: (page: string, service?: string) => void
  scrollToAnchor?: string
}

const SERVICES = [
  {
    icon: <Home className="w-10 h-10 text-white" />,
    title: 'Residential Cleaning',
    desc: 'Comprehensive cleaning for your home  covering everything from kitchens to bedrooms, ensuring a great living space every visit.',
    features: ['Dusting & Polishing', 'Vacuuming & Mopping', 'Kitchen Sanitization', 'Bathroom Deep Clean', 'Window Cleaning'],
    price: '$150',
    period: 'Per Hour / Per Cleaner',
    image: 'https://res.cloudinary.com/dyp247eoh/image/upload/v1786884989/professional-cleaning-service-people-working-together-office_h4ft1z.webp',
    color: 'var(--primary)',
  },
  {
    icon: <Building2 className="w-10 h-10 text-white" />,
    title: 'Commercial Cleaning',
    desc: 'Tailored cleaning solutions for offices, retail spaces, and commercial facilities. Maintain a professional environment that impresses.',
    features: ['Desk & Surface Cleaning', 'Common Area Sanitization', 'Waste Management', 'Floor Maintenance', 'Window Cleaning'],
    price: '$200',
    period: 'Per Hour / Per Cleaner',
    image: 'https://res.cloudinary.com/dyp247eoh/image/upload/v1786885194/professional-cleaning-service-people-working-together-office_23-2150520639_oxl3rl.avif',
    color: 'var(--navy)',
  },
  {
    icon: <KeyRound className="w-10 h-10 text-white" />,
    title: 'End of Lease Cleaning',
    desc: 'Specialised move-out cleaning designed to meet strict real estate standards. Our 100% Bond Back Guarantee gives you total peace of mind.',
    features: ['Wall Spot Cleaning', 'Inside Cupboards & Oven', 'Window Tracks & Sills', 'Full Property Sanitization'],
    price: '$400',
    period: 'Standard 3-Bedroom Property',
    image: 'https://res.cloudinary.com/dyp247eoh/image/upload/v1786885247/man-doing-professional-home-cleaning-service_23-2150359025_oqzoaa.avif',
    color: '#059669',
    badge: '100% Bond Back',
  },
  {
    icon: <Layout className="w-10 h-10 text-white" />,
    title: 'Window Cleaning',
    desc: 'Professional window washing for crystal-clear views. We handle both interior and exterior glass surfaces with a streak-free guarantee.',
    features: ['Streak-free Finish', 'Screen Cleaning', 'Track & Frame Wipe', 'High-reach Equipment'],
    price: '$70',
    period: 'Starting From',
    image: 'https://res.cloudinary.com/dyp247eoh/image/upload/v1786885319/man-doing-professional-home-cleaning-service_23-2150358980_gorg3s.jpg',
    color: '#0EA5E9',
  },
  {
    icon: <Droplets className="w-10 h-10 text-white" />,
    title: 'Carpet & Steam Cleaning',
    desc: 'Deep steam cleaning to remove stains, allergens, and odors from your carpets and upholstery. Sanitised and refreshed.',
    features: ['Hot Water Extraction', 'Stain Pre-treatment', 'Deodorizing', 'Fast Drying Process'],
    price: '$120',
    period: 'Starting From',
    image: 'https://res.cloudinary.com/dyp247eoh/image/upload/v1786885403/man-doing-professional-home-cleaning-service_23-2150359034_bliajx.jpg',
    color: '#7C3AED',
  },
  {
    icon: <Paintbrush className="w-10 h-10 text-white" />,
    title: 'Post-Construction Cleaning',
    desc: 'Heavy-duty cleaning for newly built or renovated properties. We remove dust, debris, and paint splatters  delivering a move-in-ready space.',
    features: ['Fine Dust Removal', 'Debris Clearance', 'Surface Polishing', 'Safety Inspection'],
    price: '$350',
    period: 'Starting From',
    image: 'https://res.cloudinary.com/dyp247eoh/image/upload/v1786885495/tiler-working-renovation-apartment_23-2149278577_om4m2v.jpg',
    color: 'var(--orange)',
  },
  {
    icon: <School className="w-10 h-10 text-white" />,
    title: 'School Cleaning',
    desc: 'Our cleaning service helps maintain a clean, safe, and hygienic environment for students, teachers, and staff. We provide thorough cleaning of classrooms, hallways, lunch areas, offices, and common spaces, with attention to the high-traffic areas that require regular care.',
    features: ['Vacuuming & Mopping', 'Sanitization', 'Washroom cleaning', 'Waste Management', 'Floor Maintenance'],
    price: 'Custom',
    period: 'Contact for Quote',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop',
    color: '#4f46e5',
  },
]

export default function ServicesPage({ setCurrentPage, scrollToAnchor }: ServicesPageProps) {
  useEffect(() => {
    if (scrollToAnchor) {
      const t = setTimeout(() => {
        const el = document.getElementById(scrollToAnchor)
        if (el) {
          const navbarHeight = 80
          const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 150)
      return () => clearTimeout(t)
    }
  }, [scrollToAnchor])

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

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: 'var(--navy)' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1740657254989-42fe9c3b8cce?w=1400&h=600&fit=crop&auto=format"
            alt="Professional cleaning"
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,27,64,0.95) 40%, rgba(13,27,64,0.6) 100%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="section-badge section-badge-orange mb-5">Our Services</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
            <span>Cleaning Solutions</span>
            <span className="inline-block max-w-[240px] sm:max-w-[320px] md:max-w-none">
              <StrokeText text="Perfected." strokeColor="var(--orange)" fillColor="var(--orange)" fontSize={52} trigger="scroll" letterSpacing={0} fillMode="fade" fontWeight={900} />
            </span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            From cosy apartments to sprawling commercial complexes, we deliver the same high standard of Wave Excellence across all our services.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: 60 }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.title}
              id={svc.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div
                className={`reveal-${i % 2 === 0 ? 'left' : 'right'} relative rounded-2xl overflow-hidden h-48 sm:h-80 ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}
              >
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${svc.color}22, transparent)` }} />
                {svc.badge && (
                  <span className="absolute top-4 left-4 px-4 py-2 rounded-full text-white text-xs font-black" style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}>
                    {svc.badge}
                  </span>
                )}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-xs font-black" style={{ color: svc.color }}>From {svc.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className={`reveal-${i % 2 === 0 ? 'right' : 'left'} ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="flex items-center gap-3 mb-2 lg:mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${svc.color}, ${svc.color}dd)` }}
                  >
                    {svc.icon}
                  </div>
                  <div className="h-px flex-1" style={{ backgroundColor: svc.color, opacity: 0.2 }} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black mb-2 lg:mb-3" style={{ color: 'var(--navy)' }}>{svc.title}</h2>
                <p className="text-gray-500 leading-relaxed mb-4 lg:mb-6">{svc.desc}</p>
                <div className="grid grid-cols-2 gap-2.5 mb-7">
                  {svc.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${svc.color}18` }}>
                        <Check className="w-3 h-3" style={{ color: svc.color }} strokeWidth={3} />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage('booking', svc.title)}
                  className="btn-shine px-7 py-3.5 rounded-full text-white font-bold text-sm shadow-lg cursor-pointer"
                  style={{ backgroundColor: svc.color }}
                >
                  Book This Service →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--blue-pale-2)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 reveal">
            <div className="section-badge mb-4">Simple Process</div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: 'var(--navy)' }}>
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-gray-500">Booking a professional clean has never been easier. Three simple steps.</p>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                num: '01',
                icon: <CalendarCheck className="w-6 h-6" />,
                title: 'Book Online',
                desc: 'Choose your service and preferred time slot in under 60 seconds through our easy booking system.',
                color: 'var(--primary)',
                bg: 'rgba(27,111,234,0.08)',
              },
              {
                num: '02',
                icon: <UserCheck className="w-6 h-6" />,
                title: 'We Clean',
                desc: 'Our vetted, background-checked professionals arrive on time and transform your space to Wave Standard.',
                color: 'var(--orange)',
                bg: 'rgba(249,115,22,0.08)',
              },
              {
                num: '03',
                icon: <ThumbsUp className="w-6 h-6" />,
                title: 'You Relax',
                desc: 'Enjoy your spotless environment with our 100% satisfaction guarantee. Love it or we come back free.',
                color: '#059669',
                bg: 'rgba(5,150,105,0.08)',
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className="reveal group bg-white rounded-3xl p-8 border text-center relative z-10"
                style={{
                  borderColor: '#E2E8F0',
                  boxShadow: '0 10px 30px -10px rgba(13,27,64,0.04)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: `${i * 120}ms`
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = step.color;
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = `0 20px 35px -12px ${step.color}22`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(13,27,64,0.04)';
                }}
              >
                {/* Floating Badge */}
                <div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white shadow-md"
                  style={{ backgroundColor: step.color }}
                >
                  {step.num}
                </div>

                {/* Centered connecting arrow to the next step (Desktop only) */}
                {i < 2 && (
                  <div className="absolute left-[calc(100%+4px)] top-[60px] -translate-y-1/2 w-8 h-6 hidden md:flex items-center justify-center z-20 text-gray-300/80 pointer-events-none">
                    <svg className="w-8 h-4 animate-pulse" fill="none" viewBox="0 0 32 16" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 8h24M20 3l5 5-5 5" />
                    </svg>
                  </div>
                )}

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: step.bg, color: step.color }}
                >
                  {step.icon}
                </div>

                <h3 className="text-xl font-black mb-3" style={{ color: 'var(--navy)' }}>{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 3D Character (Mop) */}
            <div className="lg:col-span-3 hidden lg:flex justify-end reveal-left">
              <img
                src="https://res.cloudinary.com/dyp247eoh/image/upload/v1786861792/cleaning_character_female_mop_wxrik0.png"
                alt="3D Cleaner character with mop"
                className="h-80 object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Center Content */}
            <div className="lg:col-span-6 text-center reveal">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Ready for a Cleaner Space?</h2>
              <p className="text-white/70 mb-8 max-w-md mx-auto">Get your personalised quote within 2 hours. No obligation, completely free.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setCurrentPage('booking')}
                  className="btn-shine px-8 py-4 rounded-full text-white font-bold shadow-xl cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, var(--orange), var(--orange-dark))' }}
                >
                  Book Now — Free Quote
                </button>
                <a
                  href="tel:+61414051820"
                  className="btn-shine flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4" /> +61 0414 051 820
                </a>
              </div>
            </div>

            {/* Right 3D Character (Squeegee) */}
            <div className="lg:col-span-3 hidden lg:flex justify-start reveal-right">
              <img
                src="https://res.cloudinary.com/dyp247eoh/image/upload/v1786861792/cleaning_character_male_squeegee_tbspzk.png"
                alt="3D Cleaner character with squeegee"
                className="h-80 object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
