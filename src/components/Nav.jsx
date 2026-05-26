import { useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Pricing', to: '/pricing' },
]

function Nav() {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [toast, setToast] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  function handleEuropa() {
    setDropdownOpen(false)
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  function handleGanymede() {
    setDropdownOpen(false)
    navigate('/agents/ganymede')
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-jupiter-700/30 backdrop-blur-lg">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-8 py-5">
        <NavLink to="/" className="font-pixel text-heading text-lg tracking-wide pb-1 border-b-2 border-transparent">
          MOKUSEI AI
        </NavLink>
        <div className="flex items-center gap-16">
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
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="flex items-center gap-1 text-heading font-serif font-normal text-base pb-1 border-b-2 border-transparent select-none">
              Agents
              <svg
                className={`w-3.5 h-3.5 mt-0.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
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
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-44 bg-surface rounded-md border border-border shadow-lg z-10 overflow-hidden transition-all duration-200 ease-out ${dropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-1 pointer-events-none'}`}
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
              <span className="text-heading font-serif text-sm opacity-70">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-background font-serif font-normal text-base px-4 py-1.5 rounded-md bg-accent transition-colors duration-200 hover:bg-accent-hover pb-1 border-b-2 border-transparent cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-background font-serif font-normal text-base px-4 py-1.5 rounded-md bg-accent transition-colors duration-200 hover:bg-accent-hover pb-1 border-b-2 border-transparent"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-md bg-heading text-background font-serif text-sm shadow-lg animate-[toast-in_0.3s_ease-out]">
          Europa — coming soon
        </div>
      )}
    </nav>
  )
}

export default Nav
