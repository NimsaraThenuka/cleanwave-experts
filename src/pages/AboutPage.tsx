import { useEffect } from 'react'
import { Trophy, Smile, MapPin, Star, Leaf, Target, Award, ClipboardCheck, ShieldCheck, Briefcase, Check } from 'lucide-react'
import StrokeText from '../components/StrokeText'

interface AboutPageProps {
  setCurrentPage: (page: string) => void
}

export default function AboutPage({ setCurrentPage }: AboutPageProps) {
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
      <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: 'var(--navy)' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=1400&h=600&fit=crop&auto=format"
            alt="Melbourne cityscape"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,27,64,0.97) 0%, rgba(13,27,64,0.6) 100%)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="section-badge section-badge-orange mb-5">Our Story</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Our Mission is</span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block max-w-[240px] sm:max-w-[320px] md:max-w-none">
                  <StrokeText text="Excellence" strokeColor="var(--orange)" fillColor="var(--orange)" fontSize={52} trigger="scroll" letterSpacing={0} fillMode="fade" fontWeight={900} />
                </span>
                <span>in</span>
              </span>
              <span>Every Corner.</span>
            </h1>
            <p className="text-white/70 leading-relaxed text-lg">
              Founded in Melbourne, Clean Wave was built on the belief that professional cleaning should be reliable, fast, and of the highest quality. We&apos;ve grown from a small family team to Australia&apos;s most trusted cleaning partner.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: '10+', label: 'Years of Industry Experience', icon: <Trophy className="w-8 h-8 text-orange-400 mx-auto" /> },
              { num: '500+', label: 'Happy Clients', icon: <Smile className="w-8 h-8 text-blue-400 mx-auto" /> },
              { num: '30+', label: 'Melbourne Suburbs', icon: <MapPin className="w-8 h-8 text-emerald-400 mx-auto" /> },
              { num: '100%', label: 'Satisfaction Rate', icon: <Star className="w-8 h-8 text-yellow-400 mx-auto fill-current" /> },
            ].map((stat, idx) => (
              <div key={idx} className="p-6 rounded-2xl text-center flex flex-col justify-center items-center" style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="mb-2">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-black text-white mb-1">{stat.num}</div>
                <div className="text-xs text-white/50 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: 60 }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-left text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="section-badge mb-5">Our Journey</div>
            <h2 className="text-3xl sm:text-4xl font-black mb-6" style={{ color: 'var(--navy)' }}>
              From Family Team to Melbourne&apos;s <span className="text-gradient">Most Trusted</span>
            </h2>
            <div className="space-y-6 text-gray-500 leading-relaxed">
              <p>
                Clean Wave was born in 2018 from a simple vision: to bring genuine professionalism and reliability to Melbourne&apos;s cleaning industry. Our founders, tired of unreliable services, set out to build something different.
              </p>
              <p>
                Today, we&apos;re proud to serve over 500 households and businesses across Melbourne. Every clean is backed by our Wave Standard  a multi-point quality check that ensures consistency across every visit.
              </p>
              <p>
                What sets us apart isn&apos;t just our spotless results  it&apos;s our people. Every team member is background-checked, fully trained, and committed to delivering a level of care that goes beyond a standard clean.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              {['Background Checked', 'Fully Insured', 'Eco-Friendly', 'Labour Hire Licensed'].map(tag => (
                <span key={tag} className="px-4 py-2 rounded-full text-xs font-bold" style={{ backgroundColor: 'var(--blue-pale)', color: 'var(--primary)' }}>
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="reveal-right relative">
            <div className="rounded-2xl overflow-hidden" style={{ height: 420 }}>
              <img
                src="https://res.cloudinary.com/dyp247eoh/image/upload/v1786885996/medium-shot-people-cleaning-building_23-2150454517_wnx2vc.avif"
                alt="Eco-friendly cleaning products"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--blue-pale-2)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <div className="section-badge mb-4">Our Difference</div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: 'var(--navy)' }}>
              Why Australians <span className="text-gradient">Choose Us</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              From first impressions to lasting results, here&apos;s what sets us apart and keeps our clients coming back.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500" />,
                title: 'Eco-Friendly Cleaning',
                desc: 'We use only non-toxic, environmentally safe products that are gentle on your family, pets, and the Australian environment we all share.',
                color: '#059669',
              },
              {
                icon: <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />,
                title: '10+ Years of Industry Experience',
                desc: "With a solid foundation of 10+ years in the business, our skilled team brings a wealth of experience to elevate every cleaning project.",
                color: 'var(--primary)',
              },
              {
                icon: <Target className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />,
                title: 'Tailored Solutions',
                desc: "Every space has its own personality. Our services are customised to fit your unique needs  ensuring a perfect fit for your property.",
                color: 'var(--orange)',
              },
              {
                icon: <Award className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />,
                title: 'Guaranteed Satisfaction',
                desc: "Your satisfaction isn't just a goal , it's our priority. We stand by our work with an unwavering commitment to delivering results that truly dazzle.",
                color: '#7C3AED',
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="reveal service-card p-5 sm:p-8 rounded-2xl bg-white flex gap-4 sm:gap-6 items-start"
                style={{
                  border: '1px solid rgba(27,111,234,0.1)',
                  boxShadow: '0 4px 24px rgba(27,111,234,0.06)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${item.color}18, ${item.color}30)` }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black mb-1 sm:mb-2" style={{ color: 'var(--navy)' }}>{item.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licences & Coverage */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal">
            <div className="section-badge mb-4">Licensed &amp; Insured</div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: 'var(--navy)' }}>
              Our Coverage &amp; <span className="text-gradient">Licences</span>
            </h2>
            <p className="text-gray-500">We operate with full compliance and complete peace of mind for our clients.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: <ClipboardCheck className="w-10 h-10 text-blue-500" />, title: 'Labour Hire Licence', desc: 'Fully licensed labour hire provider operating within Victorian regulations.' },
              { icon: <ShieldCheck className="w-10 h-10 text-emerald-500" />, title: 'Employee Work Cover', desc: 'All our staff are covered under comprehensive WorkCover insurance.' },
              { icon: <Briefcase className="w-10 h-10 text-orange-500" />, title: 'Public Liability Insurance', desc: 'Full public liability coverage up to $20M for your complete peace of mind.' },
            ].map((lic, i) => (
              <div
                key={lic.title}
                className="reveal p-7 rounded-2xl flex flex-col items-center text-center justify-center bg-white"
                style={{
                  border: '2px solid rgba(27,111,234,0.12)',
                  boxShadow: '0 4px 24px rgba(27,111,234,0.07)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="mb-4">{lic.icon}</div>
                <h3 className="font-black text-base mb-2" style={{ color: 'var(--navy)' }}>{lic.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{lic.desc}</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#DCFCE7', color: '#059669' }}>
                  <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                  Verified &amp; Active
                </div>
              </div>
            ))}
          </div>

          {/* Team culture strip */}
          <div className="reveal rounded-2xl overflow-visible p-8 lg:p-10 text-white relative" style={{ background: 'linear-gradient(135deg, var(--primary), var(--navy))' }}>
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 bg-white translate-x-16 -translate-y-16 pointer-events-none" />
            <div className="lg:pr-56 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-black mb-3 flex items-center justify-center lg:justify-start gap-2">
                <img
                  src="https://flagcdn.com/w40/au.png"
                  srcSet="https://flagcdn.com/w80/au.png 2x"
                  width="32"
                  height="24"
                  alt="Australia"
                  className="rounded-sm shadow-sm inline-block"
                />
                Proudly Australian
              </h3>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                Clean Wave is a 100% Australian owned business, deeply committed to Melbourne&apos;s community and environment. Our team coordinates to deliver standard setting Wave Excellence across all suburbs.
              </p>
            </div>

            {/* Mobile view character image */}
            <div className="mt-6 flex justify-center lg:hidden">
              <img
                src="https://res.cloudinary.com/dyp247eoh/image/upload/v1786862111/cleaning_team_angles_03_r9go0n.png"
                alt="3D Cleaning Team"
                className="h-44 object-contain"
              />
            </div>

            {/* Larger absolute character that doesn't stretch section height */}
            <div className="absolute bottom-0 right-8 lg:right-16 hidden lg:block reveal-right" style={{ transitionDelay: '200ms' }}>
              <img
                src="https://res.cloudinary.com/dyp247eoh/image/upload/v1786862111/cleaning_team_angles_03_r9go0n.png"
                alt="3D Cleaning Team standing proud"
                className="h-52 object-contain hover:scale-105 transition-transform duration-500 origin-bottom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-4xl mx-auto reveal">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-100 shadow-xl overflow-hidden text-center">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 bg-[#1b6fea] translate-x-8 -translate-y-8" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-5 bg-[#1b6fea] -translate-x-8 translate-y-8" />

            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#1b6fea]/10 flex items-center justify-center text-[#1b6fea]">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: 'var(--navy)' }}>
              Message from  CEO
            </h2>
            <p className="text-xs uppercase tracking-widest font-extrabold text-[#1b6fea] mb-8">
              Commitment to Wave Excellence
            </p>

            <p className="text-gray-600 italic text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              &ldquo;At Clean Wave, we believe that a clean environment is the foundation of a healthy, happy life. What started as a local family endeavor has grown into Melbourne&apos;s standard-setting cleaning partner, built on a simple promise: transparency, reliability, and unmatched attention to detail. We don&apos;t just clean spaces; we restore time and peace of mind for families and businesses across our community. Thank you for welcoming us into your spaces,we are honored to serve you.&rdquo;
            </p>

            <div className="inline-flex flex-col items-center">
              {/* Decorative signature line */}
              <div className="w-16 h-1 bg-[#1b6fea]/30 rounded-full mb-3" />
              <span className="text-sm font-black text-navy uppercase tracking-wider">CEO &amp; Founder</span>
              <span className="text-xs text-gray-400 mt-1">Clean Wave Australia</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--blue-pale-2)' }}>
        <div className="max-w-3xl mx-auto text-center reveal">
          <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: 'var(--navy)' }}>
            Ready to Experience the <span className="text-gradient">Difference?</span>
          </h2>
          <p className="text-gray-500 mb-8">Join thousands of happy Australians who trust Clean Wave for their cleaning needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCurrentPage('services')}
              className="btn-shine px-8 py-4 rounded-full text-white font-bold"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
            >
              Explore Our Services →
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="btn-shine px-8 py-4 rounded-full font-bold border-2"
              style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
