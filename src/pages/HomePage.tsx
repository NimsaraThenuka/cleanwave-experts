import { useState, useEffect, useRef } from 'react'
import { Star, ChevronUp, ChevronDown, ShieldCheck, Leaf, Calendar, CheckCircle2, Building2, KeyRound, Home, Sparkles, Layers, Droplets, Zap, Award, Users, ChevronLeft, ChevronRight, Check, Phone, Mail, MapPin, Construction, Briefcase } from 'lucide-react'

interface HomePageProps {
  setCurrentPage: (page: string) => void
}

const slides = [
  {
    image: 'https://res.cloudinary.com/dyp247eoh/image/upload/v1786884989/professional-cleaning-service-people-working-together-office_h4ft1z.webp',
    badge: "Australia's #1 Rated Service",
    title: "Australia's Top\nCleaning Service",
    sub: 'Better. Quicker. Quality.',
    desc: 'Our teams are ready to deploy. We deliver professional-grade cleaning for homes, offices, and large-scale projects with unmatched speed and precision.',
  },
  {
    image: 'https://res.cloudinary.com/dyp247eoh/image/upload/v1786884895/full-shot-people-cleaning-office_xavq21.webp',
    badge: 'Eco-Friendly & Safe',
    title: "Cleaning That Cares\nFor Your Family",
    sub: 'Non-toxic. Sustainable. Safe.',
    desc: 'We use only eco-friendly, non-toxic products — gentle on children, pets, and the planet. Experience a clean you can feel good about.',
  },
  {
    image: 'https://res.cloudinary.com/dyp247eoh/image/upload/v1786885070/medium-shot-people-cleaning-building_efegux.webp',
    badge: '100% Bond Back Guarantee',
    title: "Melbourne's Trusted\nCleaning Partner",
    sub: 'Wave Standard. Every Time.',
    desc: 'From end-of-lease cleans to commercial facilities, we deliver the Wave Standard of excellence. Not happy? We come back — for free.',
  },
]

const SERVICES = [
  {
    image: 'https://res.cloudinary.com/dyp247eoh/image/upload/v1786885612/professional-cleaning-service-person-cleaning-office_23-2150520592_foqken.jpg',
    num: '01', title: 'Office Cleaning',
    desc: 'Elevate your workspace with top-notch cleaning. A clean office is a productive office  we make yours shine.',
    price: '$200',
  },
  {
    image: 'https://res.cloudinary.com/dyp247eoh/image/upload/v1786885666/african-american-man-vacuuming-floors-living-room-cleaning-apartment-with-girlfriend-young-adult-using-vacuum-cleaner-woman-wiping-shelves-with-all-purpose-cleaner-tripod-shot_482257-64035_wey64p.jpg',
    num: '02', title: 'End of Lease Cleaning',
    desc: 'Ensure your full bond return with our meticulous end-of-lease clean. We leave no corner untouched  guaranteed.',
    price: '$400',
  },
  {
    image: 'https://res.cloudinary.com/dyp247eoh/image/upload/v1786885726/man-servant-getting-payed-by-owner_23-2149587635_xo8t8q.jpg',
    num: '03', title: 'Pre-Sale Property Cleaning',
    desc: 'Make your property stand out in the market with a pristine presentation. First impressions matter  let us make yours count.',
    price: '$350',
  },
  {
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop&auto=format',
    num: '04', title: 'Spring Clean',
    desc: 'Embrace the freshness with our comprehensive deep clean. We refresh your entire home from top to bottom.',
    price: '$150',
  },
  {
    image: 'https://res.cloudinary.com/dyp247eoh/image/upload/v1786885815/cleaning-window-with-special-brush-blue-sky_157402-1149_rcidka.jpg',
    num: '05', title: 'Window Cleaning',
    desc: 'Crystal-clear views with our expert window cleaning for residential and commercial properties. Streak-free guaranteed.',
    price: '$70',
  },
  {
    image: 'https://res.cloudinary.com/dyp247eoh/image/upload/v1786885852/professional-cleaning-service-person-using-steam-cleaner-office_23-2150520640_uftspk.jpg',
    num: '06', title: 'Steam Cleaning',
    desc: 'Modern technology delivering deep steam cleaning for carpets, upholstery, and hard floors. Sanitised and refreshed.',
    price: '$120',
  },
]

const PRICING = [
  {
    name: 'Residential Cleaning',
    price: '$150',
    period: 'Per Hour / Per Cleaner',
    features: ['All rooms covered', 'Eco-friendly products', 'Flexible scheduling', 'Satisfaction guarantee'],
    featured: false,
  },
  {
    name: 'Commercial Cleaning',
    price: '$200',
    period: 'Per Hour / Per Cleaner',
    features: ['Office & retail spaces', 'Waste management', 'Floor maintenance', 'Dedicated account mgr'],
    featured: true,
    badge: 'Best Plan',
  },
  {
    name: 'End-of-Lease Cleaning',
    price: '$400',
    period: 'Standard 3-Bed Property',
    features: ['100% bond guarantee', 'Inside oven & cupboards', 'Window tracks & sills', 'Full sanitization'],
    featured: false,
  },
  {
    name: 'Custom Solutions',
    price: 'Custom',
    period: 'Tailored to Your Needs',
    features: ['Any scale project', 'Priority scheduling', 'Dedicated team', 'Flexible invoicing'],
    featured: false,
  },
]

const FAQS = [
  {
    q: 'Do I need to be home for the cleaning?',
    a: "No, you don't need to be home. Many of our clients provide us with a spare key or an entry code. We're fully insured and our team members are thoroughly vetted for your peace of mind.",
  },
  {
    q: 'What is included in a standard residential clean?',
    a: 'Our standard clean includes dusting all surfaces, vacuuming and mopping floors, cleaning bathrooms (toilets, showers, mirrors), and a thorough kitchen wipe-down (stovetop, exterior of appliances, countertops).',
  },
  {
    q: 'Are your cleaning products safe for pets and children?',
    a: 'Yes! We use eco-friendly, non-toxic cleaning products that are safe for both pets and children. If you have specific sensitivities or preferences, please let us know in the special instructions.',
  },
  {
    q: 'What is your 100% Satisfaction Guarantee?',
    a: "If you're not completely satisfied with our service, let us know within 24 hours and we'll come back to re-clean any areas that didn't meet your expectations , at no extra cost, no questions asked.",
  },
  {
    q: 'How do I pay for the service?',
    a: 'We accept all major credit cards, bank transfers, and cash. Payment is typically processed after the cleaning is completed to ensure you are happy with the results.',
  },
  {
    q: 'What areas do you service in Melbourne?',
    a: 'We cover the South Eastern suburbs including Port Melbourne, South Melbourne, Malvern, Camberwell, Glen Iris, Caulfield, St Kilda, Brighton, Sandringham, Frankston, and many more. Contact us to check your suburb!',
  },
]

const TESTIMONIALS = [
  { name: 'Sarah Jenkins', location: 'Port Melbourne, VIC', stars: 5, text: "Absolutely the best cleaning service I've used. They were punctual, professional, and my house has never looked better. Highly recommend!" },
  { name: 'Amelia Foster', location: 'Moorabbin, VIC', stars: 5, text: "I've tried three other cleaning companies before and none of them came close to Clean Wave. Consistent, reliable, and genuinely care about quality." },
  { name: 'Priya Sharma', location: 'Glen Iris, VIC', stars: 5, text: "The team arrived on time, worked quietly and efficiently, and left everything immaculate. Will definitely be a regular customer." },
  { name: 'Tom Wallace', location: 'Caulfield, VIC', stars: 5, text: "Used Clean Wave for our office fitout clean. Flawless result, very professional crew. Our clients noticed straight away!" },
]

const testimonialGroups: typeof TESTIMONIALS[] = []
for (let i = 0; i < TESTIMONIALS.length; i += 3) {
  testimonialGroups.push(TESTIMONIALS.slice(i, i + 3))
}

const SUBURBS = [
  'Port Melbourne', 'South Melbourne', 'Malvern', 'Camberwell', 'Glen Iris', 'Caulfield',
  'Armadale', 'Hampton', 'St Kilda', 'Brighton', 'Sandringham', 'Moorabbin',
  'Elsternwick', 'Elwood', 'Mordialloc', 'Cheltenham', 'Parkdale', 'Frankston',
  'Albert Park', 'Beaumaris', 'Middle Park', 'Black Rock', 'Mentone', 'Gardenvale',
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
      ))}
    </div>
  )
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map(n => n[0]).join('')
  const colors = ['#1B6FEA', '#0D1B40', '#F97316', '#059669', '#7C3AED', '#DC2626']
  const color = colors[name.length % colors.length]
  return (
    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: color }}>
      {initials}
    </div>
  )
}

function Counter({ target, duration = 1500, suffix = '' }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (elementRef.current) {
      observer.observe(elementRef.current)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return

    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [started, target, duration])

  return <span ref={elementRef}>{count}{suffix}</span>
}

export default function HomePage({ setCurrentPage }: HomePageProps) {
  const [slide, setSlide] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [testimonialPage, setTestimonialPage] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const sectionRefs = useRef<HTMLElement[]>([])

  const [isMobile, setIsMobile] = useState(false)
  const [showAllSuburbs, setShowAllSuburbs] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const totalSlides = isMobile ? TESTIMONIALS.length : testimonialGroups.length

  // Prevent index overflow when screen size changes
  useEffect(() => {
    setTestimonialPage(0)
  }, [isMobile])

  // Hero auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setSlide(s => (s + 1) % slides.length)
        setAnimating(false)
      }, 400)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  // Testimonials auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setTestimonialPage(p => (p + 1) % totalSlides)
    }, 6000)
    return () => clearInterval(t)
  }, [totalSlides])

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          } else {
            entry.target.classList.remove('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const changeSlide = (dir: number) => {
    setAnimating(true)
    setTimeout(() => {
      setSlide(s => (s + dir + slides.length) % slides.length)
      setAnimating(false)
    }, 300)
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    const subject = `Clean Wave Quote Request - ${formData.service}`
    const body = 
      `Hello Clean Wave,\n\n` +
      `I would like to request a quote. Here are my details:\n\n` +
      `- Name: ${formData.name}\n` +
      `- Email: ${formData.email}\n` +
      `- Phone: ${formData.phone || 'N/A'}\n` +
      `- Service: ${formData.service}\n` +
      `- Message: ${formData.message || 'None'}\n\n` +
      `Thank you!`

    window.location.href = `mailto:cleanwave1996@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const cur = slides[slide]

  return (
    <div>
      {/* ══════════ HERO SLIDER ══════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div
          key={slide}
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{
            backgroundImage: `url(${cur.image})`,
            opacity: animating ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
          <div className="max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start mx-auto lg:mx-0" style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(20px)' : 'translateY(0)', transition: 'all 0.5s ease' }}>
            <div className="section-badge section-badge-orange mb-5">
              <Star className="w-3 h-3 fill-current" />
              {cur.badge}
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 whitespace-pre-line text-shadow-premium">
              {cur.title}
            </h1>
            <p className="text-lg sm:text-2xl font-bold mb-4 text-shadow-premium" style={{ color: '#60A5FA' }}>{cur.sub}</p>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-8 max-w-lg text-shadow-premium">{cur.desc}</p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={() => setCurrentPage('booking')}
                className="btn-shine px-7 py-3.5 rounded-full text-white font-bold text-sm shadow-xl cursor-pointer"
                style={{ background: 'linear-gradient(135deg, var(--orange), var(--orange-dark))' }}
              >
                Book Now — Free Quote
              </button>
              <button
                onClick={() => setCurrentPage('services')}
                className="btn-shine px-7 py-3.5 rounded-full font-bold text-sm border-2 border-white/40 text-white hover:bg-white/10"
              >
                View Our Services →
              </button>
            </div>
          </div>

          {/* Slide controls */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
            <button
              onClick={() => changeSlide(-1)}
              className="w-14 h-14 rounded-full bg-white/30 hover:bg-white border border-white/30 hover:border-white flex items-center justify-center text-white hover:text-[#0D1B40] backdrop-blur-md transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
            <button
              onClick={() => changeSlide(1)}
              className="w-14 h-14 rounded-full bg-white/30 hover:bg-white border border-white/30 hover:border-white flex items-center justify-center text-white hover:text-[#0D1B40] backdrop-blur-md transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-6 left-0 right-0 z-10">
          <div className="flex justify-center items-center gap-4">
            {/* Left arrow for mobile */}
            <button
              onClick={() => changeSlide(-1)}
              className="lg:hidden p-1.5 rounded-full bg-white/20 hover:bg-white/35 active:scale-90 transition-all cursor-pointer text-white flex items-center justify-center backdrop-blur-sm shadow-md"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className="transition-all duration-300 rounded-full cursor-pointer"
                  style={{
                    width: i === slide ? '32px' : '8px',
                    height: '8px',
                    backgroundColor: i === slide ? 'var(--orange)' : 'rgba(255,255,255,0.5)',
                  }}
                />
              ))}
            </div>

            {/* Right arrow for mobile */}
            <button
              onClick={() => changeSlide(1)}
              className="lg:hidden p-1.5 rounded-full bg-white/20 hover:bg-white/35 active:scale-90 transition-all cursor-pointer text-white flex items-center justify-center backdrop-blur-sm shadow-md"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-4 overflow-hidden border-b border-gray-100" style={{ backgroundColor: 'var(--blue-pale-2)' }}>
        <div className="flex animate-marquee whitespace-nowrap w-max">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 pr-8 flex-shrink-0">
              {['Fully Insured', 'Background Checked Staff', 'Eco-Friendly Products', 'Bond Back Guaranteed', 'Same-Day Booking Available', 'Serving Melbourne Since 2018', 'Labour Hire Licenced', '500+ 5-Star Reviews'].map(item => (
                <span key={item} className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--navy)' }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--primary)' }} />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ WHY TRUST US ══════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <div className="section-badge mb-4">Why Choose Clean Wave</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color: 'var(--navy)' }}>
              Why Customers <span className="text-gradient">Trust Us</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              We&apos;re more than just a cleaning company. We&apos;re your partners in maintaining a healthy, happy home. Our commitment to quality and Australian standards sets us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                icon: <Award className="w-8 h-8 text-blue-600" />,
                title: 'Licensed & Fully Insured',
                desc: 'We are Labour Hire Licensed and fully insured, adhering to strict industry standards for your absolute peace of mind.',
                delay: '0ms',
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
                title: 'Reliable & Professional',
                desc: 'Every cleaner undergoes a rigorous background check and in-person interview before joining our team.',
                delay: '100ms',
              },
              {
                icon: <Leaf className="w-8 h-8 text-emerald-500" />,
                title: 'Eco-Friendly Products',
                desc: 'We use non-toxic, sustainable cleaning products that are completely safe for kids and pets.',
                delay: '200ms',
              },
              {
                icon: <Calendar className="w-8 h-8 text-orange-500" />,
                title: 'Flexible Scheduling',
                desc: 'Book, reschedule, or cancel your clean easily through our online portal , no hassle guaranteed.',
                delay: '300ms',
              },
              {
                icon: <CheckCircle2 className="w-8 h-8 text-purple-500" />,
                title: 'Satisfaction Guaranteed',
                desc: "Not happy with the clean? We'll come back and fix it for free , no questions asked, ever.",
                delay: '400ms',
              },
            ].map(item => (
              <div
                key={item.title}
                className="reveal service-card group p-7 rounded-2xl border bg-white"
                style={{
                  borderColor: 'rgba(27,111,234,0.12)',
                  boxShadow: '0 4px 24px rgba(27,111,234,0.07)',
                  transitionDelay: item.delay,
                }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--navy)' }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => setCurrentPage('about')}
              className="btn-shine px-8 py-3.5 rounded-full text-white font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
            >
              Learn More About Us →
            </button>
          </div>

          {/* Stats Bar with Counter Effect */}
          <div className="mt-16 pt-12 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { target: 500, suffix: '+', label: 'Happy Clients' },
                { target: 10, suffix: '+', label: 'Years of Industry Experience' },
                { target: 100, suffix: '%', label: 'Satisfaction Rate' },
                { target: 7, suffix: ' Days', label: 'A Week Service' },
              ].map(stat => (
                <div key={stat.label} className="text-center reveal">
                  <p className="text-4xl sm:text-5xl font-black mb-1.5" style={{ color: 'var(--primary)' }}>
                    <Counter target={stat.target} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ KEY DIFFERENTIATORS ══════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--blue-pale-2)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-7 h-7 text-white" />,
                title: 'Rapid Deployment',
                desc: 'Our cleaners are ready to start immediately. We pride ourselves on the quickest turnaround in the industry  often same-day.',
                gradient: 'linear-gradient(135deg, #1B6FEA 0%, #104ab0 100%)',
                accentGlow: 'bg-blue-300/15'
              },
              {
                icon: <Award className="w-7 h-7 text-white" />,
                title: 'Superior Quality',
                desc: "We don't just clean , we restore. Our multi-point quality check ensures every project meets our 'Wave Standard' of excellence.",
                gradient: 'linear-gradient(135deg, #0D1B40 0%, #162554 100%)',
                accentGlow: 'bg-indigo-300/15'
              },
              {
                icon: <Users className="w-7 h-7 text-white" />,
                title: 'Scalable Teams',
                desc: 'From single apartments to entire commercial complexes, we have the manpower and equipment to handle projects of any size.',
                gradient: 'linear-gradient(135deg, #F97316 0%, #d65a00 100%)',
                accentGlow: 'bg-orange-300/15'
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="reveal p-8 rounded-3xl text-white relative overflow-hidden group flex flex-col justify-between"
                style={{
                  background: item.gradient,
                  boxShadow: '0 10px 30px -10px rgba(13,27,64,0.15)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: `${i * 100}ms`
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(13,27,64,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(13,27,64,0.15)';
                }}
              >
                {/* Floating Abstract Glow Blob */}
                <div className={`absolute top-0 right-0 w-36 h-36 rounded-full -translate-y-6 translate-x-6 transition-transform duration-700 group-hover:scale-125 ${item.accentGlow}`} style={{ filter: 'blur(20px)' }} />

                <div className="relative z-10 space-y-5">
                  {/* Glassmorphic Icon Wrapper */}
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2.5 tracking-tight text-white">{item.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES ══════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <div className="section-badge mb-4">What We Offer</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color: 'var(--navy)' }}>
              Our <span className="text-gradient">Professional Services</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              We provide a wide range of cleaning solutions tailored to meet the unique needs of Australian households and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc, i) => {
              const themeColors = [
                'var(--primary)',
                '#059669',
                'var(--navy)',
                'var(--orange)',
                '#0EA5E9',
                '#7C3AED'
              ];
              const themeColor = themeColors[i % themeColors.length];

              return (
                <div
                  key={svc.num}
                  className="reveal group bg-white rounded-2xl overflow-hidden border flex flex-col justify-between"
                  style={{
                    borderColor: '#E2E8F0',
                    boxShadow: '0 4px 20px -8px rgba(13,27,64,0.08)',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: `${(i % 3) * 60}ms`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = themeColor;
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = `0 20px 35px -12px ${themeColor}22`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px -8px rgba(13,27,64,0.08)';
                  }}
                >
                  {/* Card Image Wrapper (Compact) */}
                  <div className="relative h-44 overflow-hidden bg-gray-100">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />

                    {/* Large Transparent Watermark Number in Top Right */}
                    <span className="absolute top-1 right-3 text-5xl font-black text-white/40 select-none tracking-tighter">
                      {svc.num}
                    </span>
                  </div>

                  {/* Card Content (Compact Padding) */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-black mb-2 transition-colors duration-300 group-hover:text-primary" style={{ color: 'var(--navy)' }}>
                        {svc.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-5">{svc.desc}</p>
                    </div>

                    {/* Footer with Orange Price and Explore Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Starting From</span>
                        <span className="text-2xl font-black mt-0.5" style={{ color: 'var(--orange)' }}>{svc.price}</span>
                      </div>
                      <button
                        onClick={() => setCurrentPage('services')}
                        className="px-4 py-2 rounded-full text-xs font-bold text-white transition-all cursor-pointer shadow-md hover:scale-105"
                        style={{ backgroundColor: 'var(--navy)', boxShadow: '0 4px 12px rgba(13, 27, 64, 0.15)' }}
                      >
                        Explore →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setCurrentPage('services')}
              className="btn-shine px-8 py-3.5 rounded-full font-bold text-sm border-2"
              style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
            >
              View All Services →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════ B2B SECTION ══════════ */}
      <section className="py-24 px-6 sm:px-8 lg:px-8 relative overflow-hidden" style={{ backgroundColor: 'var(--navy)' }}>
        <div className="absolute inset-0 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1771678040857-51d00a11be7a?w=1200&h=800&fit=crop&auto=format"
            alt="Modern commercial space"
            loading="lazy"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <div className="section-badge section-badge-orange mb-5">B2B &amp; Commercial</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
                Scale Your Projects with <span className="text-gradient-orange">Reliable</span> Cleaning Partners
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                We work with real estate agencies, property developers, and facility managers to provide consistent, high-volume cleaning services. Get the reliability your projects deserve.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  'Priority scheduling for recurring projects',
                  'Dedicated account manager for bulk bookings',
                  'Detailed reporting and quality documentation',
                  'Flexible invoicing and competitive project rates',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-white/80 text-sm">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'var(--orange)' }}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setCurrentPage('contact')}
                className="btn-shine px-8 py-4 rounded-full text-white font-bold text-sm shadow-xl"
                style={{ background: 'linear-gradient(135deg, var(--orange), var(--orange-dark))' }}
              >
                Start a Partnership →
              </button>
            </div>

            <div className="reveal-right grid grid-cols-2 gap-4">
              {[
                { icon: <Building2 className="w-6 h-6 text-white/95" />, label: 'Real Estate Agencies', count: '80+' },
                { icon: <Construction className="w-6 h-6 text-white/95" />, label: 'Property Developers', count: '40+' },
                { icon: <Briefcase className="w-6 h-6 text-white/95" />, label: 'Commercial Facilities', count: '120+' },
                { icon: <Star className="w-6 h-6 text-white/95 fill-current" />, label: 'Partner Satisfaction', count: '100%' },
              ].map(stat => (
                <div key={stat.label} className="p-6 rounded-2xl flex flex-col items-center text-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <div className="mb-2">{stat.icon}</div>
                  <div className="text-2xl font-black text-white mb-1">{stat.count}</div>
                  <div className="text-xs text-white/60 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PRICING ══════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <div className="section-badge mb-4">Transparent Pricing</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color: 'var(--navy)' }}>
              We Are Offering The <span className="text-gradient">Best Pricing</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Competitive and transparent pricing with no hidden costs. Choose from our flexible cleaning plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRICING.map((plan, i) => (
              <div
                key={plan.name}
                className={`reveal rounded-2xl p-7 relative flex flex-col ${plan.featured ? 'pricing-card-featured' : ''}`}
                style={{
                  backgroundColor: plan.featured ? 'var(--navy)' : 'white',
                  border: plan.featured ? 'none' : '1px solid #CBD5E1',
                  boxShadow: plan.featured
                    ? '0 24px 64px rgba(13,27,64,0.3)'
                    : '0 4px 24px rgba(27,111,234,0.07)',
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black text-white" style={{ background: 'linear-gradient(135deg, var(--orange), var(--orange-dark))' }}>
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-sm font-bold mb-4" style={{ color: plan.featured ? 'rgba(255,255,255,0.7)' : 'var(--navy)' }}>
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-xs" style={{ color: plan.featured ? 'rgba(255,255,255,0.5)' : '#9CA3AF' }}>Starting from</span>
                  <p className="text-4xl font-black mt-1" style={{ color: plan.featured ? 'white' : 'var(--primary)' }}>
                    {plan.price}
                  </p>
                  <p className="text-xs mt-1" style={{ color: plan.featured ? 'rgba(255,255,255,0.5)' : '#9CA3AF' }}>{plan.period}</p>
                </div>
                <hr className="my-5" style={{ borderColor: plan.featured ? 'rgba(255,255,255,0.12)' : '#F1F5F9' }} />
                <ul className="space-y-2.5 flex-1 mb-7">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: plan.featured ? 'rgba(255,255,255,0.8)' : '#4B5563' }}>
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: plan.featured ? 'var(--orange)' : 'var(--primary)' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="btn-shine w-full py-3 rounded-xl text-sm font-bold transition-all"
                  style={
                    plan.featured
                      ? { background: 'linear-gradient(135deg, var(--orange), var(--orange-dark))', color: 'white' }
                      : { border: '2px solid var(--primary)', color: 'var(--primary)', background: 'transparent' }
                  }
                >
                  Get Started →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: 'var(--blue-pale-2)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 bg-primary -translate-y-24 translate-x-24 pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Heading and Support Block */}
            <div className="lg:col-span-5 space-y-8 reveal-left">
              <div>
                <div className="section-badge mb-4">Got Questions?</div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight" style={{ color: 'var(--navy)' }}>
                  Frequently Asked <span className="text-gradient">Questions</span>
                </h2>
                <p className="text-gray-500 leading-relaxed max-w-md">
                  Everything you need to know about our professional cleaning services in Melbourne. Can't find what you need?
                </p>
              </div>

              {/* Support Card */}
              <div className="p-6 rounded-2xl bg-white border border-blue-100/60 shadow-lg shadow-blue-500/5 space-y-4 max-w-md">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-navy" style={{ color: 'var(--navy)' }}>Still have questions?</h3>
                    <p className="text-xs text-gray-400 font-medium">We're here to help you 6 days a week.</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="w-full btn-shine py-3 rounded-xl text-white font-bold text-xs shadow-md"
                  style={{ background: 'linear-gradient(135deg, var(--orange), var(--orange-dark))' }}
                >
                  Contact Support Team →
                </button>
              </div>

            </div>

            {/* Right Column: Premium Accordions */}
            <div className="lg:col-span-7 space-y-3.5 reveal-right">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden bg-white border transition-all duration-300"
                  style={{
                    borderColor: openFaq === i ? 'var(--primary)' : '#E2E8F0',
                    boxShadow: openFaq === i ? '0 12px 32px -10px rgba(27,111,234,0.12)' : 'none',
                    backgroundColor: openFaq === i ? 'rgba(27,111,234,0.015)' : 'white',
                  }}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 p-5.5 text-left cursor-pointer group"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <div className="flex gap-4 items-center">
                      <span className={`text-xs font-black transition-colors ${openFaq === i ? 'text-primary' : 'text-gray-300'}`}>
                        0{i + 1}
                      </span>
                      <span className="font-bold text-sm sm:text-base transition-colors duration-300 group-hover:text-primary" style={{ color: 'var(--navy)' }}>
                        {faq.q}
                      </span>
                    </div>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        backgroundColor: openFaq === i ? 'var(--primary)' : 'rgba(27,111,234,0.06)',
                        transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      <ChevronDown className="w-3.5 h-3.5" style={{ color: openFaq === i ? 'white' : 'var(--primary)' }} />
                    </div>
                  </button>
                  <div className={`faq-body ${openFaq === i ? 'open' : ''}`}>
                    <p className="px-14 pb-5 text-gray-500 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <div className="section-badge mb-4">Client Stories</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color: 'var(--navy)' }}>
              What Our <span className="text-gradient">Clients Say</span>
            </h2>
            <p className="text-gray-500">Real feedback from happy Australian customers.</p>
          </div>

          {/* Desktop: 2-per-slide carousel */}
          <div className="hidden md:block w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translate3d(-${testimonialPage * 100}%, 0, 0)` }}
            >
              {[TESTIMONIALS.slice(0, 2), TESTIMONIALS.slice(2, 4)].map((group, pageIdx) => (
                <div key={pageIdx} className="w-full flex-shrink-0 grid grid-cols-2 gap-6 px-1">
                  {group.map((t) => (
                    <div
                      key={t.name}
                      className="service-card p-7 rounded-2xl bg-white flex flex-col justify-between"
                      style={{
                        border: '1px solid rgba(27,111,234,0.1)',
                        boxShadow: '0 4px 24px rgba(27,111,234,0.07)',
                      }}
                    >
                      <div>
                        <StarRating count={t.stars} />
                        <p className="mt-4 mb-6 text-gray-600 text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar name={t.name} />
                        <div>
                          <p className="font-bold text-sm" style={{ color: 'var(--navy)' }}>{t.name}</p>
                          <p className="text-xs text-gray-400">{t.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Desktop Controls */}
            <div className="flex justify-center items-center gap-6 mt-10">
              <button
                onClick={() => setTestimonialPage(p => (p - 1 + 2) % 2)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary hover:bg-blue-50 transition-all cursor-pointer shadow-sm"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {[0, 1].map((i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialPage(i)}
                    className="transition-all duration-300 rounded-full cursor-pointer"
                    style={{
                      width: i === testimonialPage ? '32px' : '10px',
                      height: '10px',
                      backgroundColor: i === testimonialPage ? 'var(--primary)' : '#D1D5DB',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => setTestimonialPage(p => (p + 1) % 2)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary hover:bg-blue-50 transition-all cursor-pointer shadow-sm"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile: 1-by-1 carousel */}
          <div className="md:hidden w-full overflow-hidden mb-10">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translate3d(-${testimonialPage * 100}%, 0, 0)` }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="w-full flex-shrink-0 px-2 flex justify-center">
                  <div
                    className="service-card p-7 rounded-2xl bg-white flex flex-col justify-between w-full max-w-md"
                    style={{
                      border: '1px solid rgba(27,111,234,0.1)',
                      boxShadow: '0 4px 24px rgba(27,111,234,0.07)',
                    }}
                  >
                    <div>
                      <StarRating count={t.stars} />
                      <p className="mt-4 mb-6 text-gray-600 text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar name={t.name} />
                      <div>
                        <p className="font-bold text-sm" style={{ color: 'var(--navy)' }}>{t.name}</p>
                        <p className="text-xs text-gray-400">{t.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Controls */}
            <div className="flex flex-col items-center gap-5 mt-10">
              <div className="flex gap-1.5 flex-wrap justify-center max-w-[280px]">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialPage(i)}
                    className="transition-all duration-300 rounded-full cursor-pointer"
                    style={{
                      width: i === testimonialPage ? '20px' : '7px',
                      height: '7px',
                      backgroundColor: i === testimonialPage ? 'var(--primary)' : '#D1D5DB',
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setTestimonialPage(p => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary hover:bg-blue-50 transition-all cursor-pointer shadow-sm active:scale-95"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setTestimonialPage(p => (p + 1) % TESTIMONIALS.length)}
                  className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary hover:bg-blue-50 transition-all cursor-pointer shadow-sm active:scale-95"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ SERVICE AREAS ══════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--blue-pale-2)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Col: Region Info */}
            <div className="lg:col-span-5 space-y-6 reveal-left">
              <div>
                <div className="section-badge mb-4">Coverage Area</div>
                <h2 className="text-3xl sm:text-4xl font-black mb-3 leading-tight" style={{ color: 'var(--navy)' }}>
                  Serving Melbourne&apos;s <span className="text-gradient">South East</span>
                </h2>
                <p className="text-gray-500 leading-relaxed">
                  We cover over 30+ suburbs across metropolitan Melbourne, bringing the trusted Wave Standard right to your doorstep with unmatched local reliability.
                </p>
              </div>

              {/* Trust badges for coverage */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { title: '30+ Suburbs', desc: 'Full SE metropolitan cover' },
                  { title: 'Local Cleaners', desc: 'Vetted & background checked' },
                  { title: 'Same-Day Service', desc: 'Subject to availability' },
                  { title: 'Fully Insured', desc: '$10M public liability cover' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary mt-0.5">
                      <Check className="w-3 h-3 font-bold" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-navy" style={{ color: 'var(--navy)' }}>{item.title}</h4>
                      <p className="text-[11px] text-gray-400 font-medium leading-normal mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Interactive Suburbs Grid */}
            <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-gray-150/70 shadow-xl shadow-blue-500/5 reveal-right">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
                <h3 className="font-black text-base flex items-center gap-2" style={{ color: 'var(--navy)' }}>
                  <MapPin className="w-4 h-4 text-orange-500" />
                  Active Suburbs &amp; Surrounding Areas
                </h3>
                <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-bold self-start sm:self-auto w-fit">30+ Suburbs</span>
              </div>

              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {((isMobile && !showAllSuburbs) ? SUBURBS.slice(0, 8) : SUBURBS).map(suburb => (
                  <span
                    key={suburb}
                    className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gray-50 text-gray-600 border border-gray-200/80 transition-all hover:bg-white hover:border-primary hover:text-primary hover:shadow-md cursor-default flex items-center gap-1.5"
                    style={{ transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary" />
                    {suburb}
                  </span>
                ))}
                {isMobile && (
                  <button
                    onClick={() => setShowAllSuburbs(!showAllSuburbs)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white"
                  >
                    {showAllSuburbs ? 'Show Less ↑' : 'Show All Suburbs ↓'}
                  </button>
                )}
                <button
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white transition-all cursor-pointer shadow-md hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, var(--orange), var(--orange-dark))' }}
                  onClick={() => setCurrentPage('contact')}
                >
                  + Book My Suburb →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ QUOTE CTA ══════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: 'var(--navy)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 bg-blue-400 translate-x-24 -translate-y-24" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5 bg-orange-400 -translate-x-12 translate-y-12" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            {/* Contact info */}
            <div className="reveal-left relative pb-12 lg:pb-0 lg:pr-72 flex flex-col justify-between">
              <div>
                <div className="section-badge section-badge-orange mb-5">Free Quote in 2 Hours</div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
                  Ready for a <span className="text-gradient-orange">Cleaner Space?</span>
                </h2>
                <p className="text-white/70 mb-10 leading-relaxed max-w-md">
                  Fill out the form and our team will provide a personalised quote within 2 hours.
                </p>

                <div className="space-y-5 max-w-sm">
                  {[
                    { icon: <Phone className="w-6 h-6 text-white" />, label: 'Call Us Anytime', val: '+61 451 812 155', href: 'tel:+61451812155' },
                    { icon: <Mail className="w-6 h-6 text-white" />, label: 'Email Support', val: 'info@cleanwaveexperts.com.au', href: 'mailto:info@cleanwaveexperts.com.au' },
                    { icon: <MapPin className="w-6 h-6 text-white" />, label: 'Our Location', val: 'Melbourne, VIC, Australia', href: '#' },
                  ].map((c, idx) => (
                    <a key={idx} href={c.href} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 text-white">
                        {c.icon}
                      </div>
                      <div>
                        <p className="text-xs text-white/50 font-semibold uppercase tracking-wide">{c.label}</p>
                        <p className="text-white font-bold group-hover:text-blue-300 transition-colors">{c.val}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile view character image */}
              <div className="mt-8 flex justify-center lg:hidden">
                <img
                  src="https://res.cloudinary.com/dyp247eoh/image/upload/v1786862113/cleaning_team_angles_01_ubqqbv.png"
                  alt="3D Cleaning Team professionals"
                  loading="lazy"
                  className="h-56 object-contain"
                />
              </div>

              {/* Large absolute positioned team illustration aligned to bottom */}
              <div className="absolute bottom-0 -right-24 hidden lg:block reveal-left" style={{ transitionDelay: '200ms' }}>
                <img
                  src="https://res.cloudinary.com/dyp247eoh/image/upload/v1786862113/cleaning_team_angles_01_ubqqbv.png"
                  alt="3D Cleaning Team professionals standing together"
                  loading="lazy"
                  className="h-80 object-contain hover:scale-105 transition-transform duration-500 origin-bottom"
                />
              </div>
            </div>

            {/* Form */}
            <div className="reveal-right p-8 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              {submitted ? (
                <div className="text-center py-10">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-black text-white mb-2">Request Sent!</h3>
                  <p className="text-white/70">We&apos;ll contact you within 2 hours with your personalised quote.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-black text-white mb-5">Get a Free Quote</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Sarah Jenkins' },
                      { id: 'email', label: 'Email', type: 'email', placeholder: 'sarah@email.com' },
                    ].map(field => (
                      <div key={field.id}>
                        <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wide">{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          required
                          value={(formData as Record<string, string>)[field.id]}
                          onChange={e => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 bg-white/10 border border-white/20 focus:outline-none focus:border-blue-400 transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wide">Phone</label>
                    <input
                      type="tel"
                      placeholder="+61 000 000 000"
                      value={formData.phone}
                      onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 bg-white/10 border border-white/20 focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wide">Service Required</label>
                    <select
                      required
                      value={formData.service}
                      onChange={e => setFormData(prev => ({ ...prev, service: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-white/10 border border-white/20 focus:outline-none focus:border-blue-400 transition-colors"
                      style={{ color: formData.service ? 'white' : 'rgba(255,255,255,0.3)' }}
                    >
                      <option value="" disabled style={{ color: '#374151' }}>Select a service…</option>
                      {['Residential Cleaning', 'Office Cleaning', 'End of Lease', 'Window Cleaning', 'Carpet / Steam', 'Post-Construction', 'Custom / Other'].map(s => (
                        <option key={s} value={s} style={{ color: '#374151' }}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wide">Message</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your property and cleaning needs…"
                      value={formData.message}
                      onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 bg-white/10 border border-white/20 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-shine w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-xl"
                    style={{ background: 'linear-gradient(135deg, var(--orange), var(--orange-dark))' }}
                  >
                    Send My Free Quote Request →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
