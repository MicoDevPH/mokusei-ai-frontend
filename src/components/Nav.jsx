import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Pricing', to: '/pricing' },
]

function Nav() {
  const { user, logout } = useAuth()
  const [toast, setToast] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [agentsOpen, setAgentsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  function handleEuropa() {
    setMobileOpen(false)
    setAgentsOpen(false)
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  function handleGanymede() {
    setMobileOpen(false)
    setAgentsOpen(false)
    navigate('/agents/ganymede')
  }

  function handleLogout() {
    setMobileOpen(false)
    logout()
    navigate('/')
  }

  function handleNavClick(to) {
    setMobileOpen(false)
    navigate(to)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-jupiter-700/30 backdrop-blur-lg">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-8 py-5">
          <NavLink to="/" className="font-pixel text-heading text-lg tracking-wide pb-1 border-b-2 border-transparent">
            MOKUSEI AI
          </NavLink>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-16">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `text-heading font-serif font-normal text-base transition-colors duration-200 hover:text-accent pb-1 border-b-2 transition-[border-color] duration-300 ${isActive ? 'border-accent' : 'border-transparent'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="relative group">
              <span className="flex items-center gap-1 text-heading font-serif font-normal text-base pb-1 border-b-2 border-transparent select-none cursor-default">
                Agents
                <svg
                  className="w-3.5 h-3.5 mt-0.5 transition-transform duration-200 group-hover:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 min-w-44 bg-surface rounded-md border border-border shadow-lg z-10 overflow-hidden transition-all duration-200 ease-out opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto pt-1.5"
              >
                <button
                  onClick={handleGanymede}
                  className="w-full text-left text-heading font-serif font-normal text-sm px-4 py-3 transition-colors duration-200 hover:bg-jupiter-600/30 cursor-pointer"
                >
                  Ganymede v1.0
                </button>
                <button
                  onClick={handleEuropa}
                  className="w-full text-left text-muted font-serif font-normal text-sm px-4 py-3 transition-colors duration-200 hover:bg-jupiter-600/30 cursor-pointer"
                >
                  Europa <span className="text-xs italic opacity-60">(Coming soon)</span>
                </button>
              </div>
            </div>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-heading font-serif text-sm opacity-70 hidden xl:block">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-background font-serif font-normal text-base px-4 py-1 lg:py-1.5 rounded-md bg-accent transition-colors duration-200 hover:bg-accent-hover cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="text-background font-serif font-normal text-base px-4 py-1 lg:py-1.5 rounded-md bg-accent transition-colors duration-200 hover:bg-accent-hover"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(prev => !prev)}
            className="lg:hidden flex flex-col gap-1.5 p-3 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-heading transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-heading transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-heading transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-md bg-heading text-background font-serif text-sm shadow-lg animate-[toast-in_0.3s_ease-out]">
            Europa — coming soon
          </div>
        )}
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 lg:hidden ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-surface border-l border-border shadow-xl transition-transform duration-300 ease-out lg:hidden ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="relative flex flex-col h-full pt-24 px-6 gap-1 bg-surface">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-md transition-colors duration-200 hover:bg-jupiter-600/30 cursor-pointer"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-heading" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.to)}
                className={`text-left font-serif font-normal text-base px-4 py-3 transition-colors duration-200 cursor-pointer ${isActive ? 'text-accent border-b-2 border-accent' : 'text-heading hover:text-accent'}`}
              >
                {link.label}
              </button>
            )
          })}

          {/* Mobile Agents sub-menu */}
          <div>
            <button
              onClick={() => setAgentsOpen(prev => !prev)}
              className={`flex items-center justify-between w-full text-left font-serif font-normal text-base px-4 py-3 transition-colors duration-200 cursor-pointer ${location.pathname.startsWith('/agents') ? 'text-accent border-b-2 border-accent' : 'text-heading hover:text-accent'}`}
            >
              Agents
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${agentsOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${agentsOpen ? 'max-h-40' : 'max-h-0'}`}>
              <div className="ml-4 border-l border-border pl-4 py-1 flex flex-col gap-1">
                <button
                  onClick={handleGanymede}
                  className="text-left text-heading font-serif font-normal text-sm px-4 py-3 rounded-md transition-colors duration-200 hover:bg-jupiter-600/30 cursor-pointer"
                >
                  Ganymede v1.0
                </button>
                <button
                  onClick={handleEuropa}
                  className="text-left text-muted font-serif font-normal text-sm px-4 py-3 rounded-md transition-colors duration-200 hover:bg-jupiter-600/30 cursor-pointer"
                >
                  Europa <span className="text-xs italic opacity-60">(Coming soon)</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            {user ? (
              <div className="flex flex-col gap-3 px-4">
                <span className="text-heading font-serif text-sm opacity-70">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="w-full text-background font-serif font-normal text-base px-4 py-3 rounded-md bg-accent transition-colors duration-200 hover:bg-accent-hover cursor-pointer text-center"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('/login')}
                className="w-full text-background font-serif font-normal text-base px-4 py-3 rounded-md bg-accent transition-colors duration-200 hover:bg-accent-hover cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav
