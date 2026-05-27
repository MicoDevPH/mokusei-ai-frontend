import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const features = [
  {
    icon: '✦',
    title: 'Specialized by Design',
    description:
      'Each agent is purpose-built for a specific domain, from data analysis to creative generation.',
  },
  {
    icon: '◈',
    title: 'Seamless Integration',
    description:
      'Plug into your existing workflow via API, with zero configuration overhead.',
  },
  {
    icon: '◇',
    title: 'Evolving Ecosystem',
    description:
      'New agents added regularly. Start with Ganymede, grow with Europa and beyond.',
  },
]

function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [toast, setToast] = useState(false)
  const [visible, setVisible] = useState(
    typeof IntersectionObserver === 'undefined'
      ? { features: true, agents: true, cta: true }
      : {}
  )

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const sections = document.querySelectorAll('[data-observe]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const name = entry.target.dataset.observe
            setVisible((prev) => ({ ...prev, [name]: true }))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  function handleEuropa() {
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  return (
    <main className="grow">
      {/* Hero */}
      <section className="flex flex-col items-center text-center px-4 pt-24 sm:pt-32 lg:pt-40 pb-32">
        <span className="animate-[fade-up_0.6s_ease-out_both] text-xs tracking-[0.3em] uppercase text-foreground/60 px-4 py-1.5 rounded-full border border-border bg-surface/50">
          Welcome to
        </span>
        <h1 className="animate-[fade-up_0.6s_ease-out_0.15s_both] font-pixel text-heading text-4xl sm:text-5xl md:text-7xl leading-tight sm:leading-relaxed mt-6">
          MOKUSEI AI
        </h1>
        <p className="animate-[fade-up_0.6s_ease-out_0.3s_both] text-muted font-serif text-xl max-w-lg mt-6 leading-relaxed">
          Specialized Agents that you can use on your projects
        </p>
        <div className="animate-[fade-up_0.6s_ease-out_0.6s_both] flex items-center gap-4 mt-10">
          <button
            onClick={() => navigate('/agents')}
            className="text-background font-serif font-normal text-base px-6 py-2.5 rounded-md bg-accent transition-colors duration-200 hover:bg-accent-hover cursor-pointer"
          >
            Explore Agents
          </button>
          <button
            onClick={() => navigate(user ? '/agents' : '/login')}
            className="text-heading font-serif font-normal text-base px-6 py-2.5 rounded-md border border-border transition-colors duration-200 hover:bg-surface cursor-pointer"
          >
            {user ? 'Go to Agents' : 'Get Started'}
          </button>
        </div>
      </section>

      {/* Features */}
      <section
        data-observe="features"
        className={`px-4 pb-32 transition-all duration-700 ease-out ${visible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="bg-surface rounded-md border border-border p-8 transition-all duration-300 hover:border-accent hover:shadow-lg group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-300">
                <span className="text-accent text-lg">{feature.icon}</span>
              </div>
              <h3 className="text-heading font-serif font-medium text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Agents Preview */}
      <section
        data-observe="agents"
        className={`px-4 pb-32 transition-all duration-700 ease-out ${visible.agents ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-heading font-serif font-medium text-2xl text-center mb-12">
            Our Agents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-md border border-border p-8 transition-all duration-300 hover:border-accent hover:shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-heading font-serif font-medium text-xl">Ganymede</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 border border-green-200">
                  Available
                </span>
              </div>
              <p className="text-muted text-sm leading-relaxed mb-5">
                A specialized AI agent designed to transform your online portfolio with an intelligent, interactive personal assistant.
              </p>
              <button
                onClick={() => navigate('/agents/ganymede')}
                className="text-accent font-serif text-sm hover:text-accent-hover transition-colors duration-200 cursor-pointer"
              >
                Learn more &rarr;
              </button>
            </div>
            <div className="bg-surface rounded-md border border-border p-8 transition-all duration-300 hover:border-accent hover:shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-heading font-serif font-medium text-xl">Europa</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-jupiter-100 text-jupiter-800 border border-jupiter-200">
                  Coming soon
                </span>
              </div>
              <button
                onClick={handleEuropa}
                className="text-muted font-serif text-sm hover:text-heading transition-colors duration-200 mt-5 cursor-pointer"
              >
                Learn more &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        data-observe="cta"
        className={`px-4 pb-32 transition-all duration-700 ease-out ${visible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-3xl mx-auto bg-surface rounded-md border border-border p-6 sm:p-8 lg:p-12 text-center">
          <h2 className="text-heading font-serif font-medium text-2xl mb-3">
            Use MOKUSEI AI on your projects!
          </h2>
          <p className="text-muted text-base max-w-lg mx-auto leading-relaxed mb-8">
            Join the ecosystem and integrate your project with Mokusei AI!
          </p>
          <button
            onClick={() => navigate(user ? '/agents' : '/login')}
            className="text-background font-serif font-normal text-base px-8 py-2.5 rounded-md bg-accent transition-colors duration-200 hover:bg-accent-hover cursor-pointer"
          >
            {user ? 'Go to Agents' : 'Sign In'}
          </button>
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-md bg-heading text-background font-serif text-sm shadow-lg animate-[toast-in_0.3s_ease-out]">
          Europa &mdash; coming soon
        </div>
      )}
    </main>
  )
}

export default Home
