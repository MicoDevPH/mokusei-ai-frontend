import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function Login() {
  const { login, register, error, setError, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  if (user) {
    navigate('/')
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      if (isRegister) {
        await register(name, email, password)
      } else {
        await login(email, password)
      }
      navigate('/')
    } catch {
      // Error is handled by AuthContext
    } finally {
      setSubmitting(false)
    }
  }

  function toggleMode() {
    setIsRegister((prev) => !prev)
    setError(null)
  }

  return (
    <main className="grow flex items-center justify-center p-6">
      <div className="w-full max-w-sm text-center">
        <h2 className="font-serif text-2xl text-heading leading-snug">
          {isRegister ? 'Create your account' : 'Sign up or login with'}<br />Mokusei AI
        </h2>

        <form className="mt-8 flex flex-col items-center gap-5" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="flex flex-col gap-1.5 w-full max-w-xs">
              <label htmlFor="name" className="font-serif text-sm text-muted text-left">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-md bg-transparent text-foreground font-serif text-base placeholder:text-muted/50 outline-none transition-colors duration-200 border border-border focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5 w-full max-w-xs">
            <label htmlFor="email" className="font-serif text-sm text-muted text-left">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-md bg-transparent text-foreground font-serif text-base placeholder:text-muted/50 outline-none transition-colors duration-200 border border-border focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full max-w-xs">
            <label htmlFor="password" className="font-serif text-sm text-muted text-left">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="········"
                className="w-full px-4 py-2.5 pr-10 rounded-md bg-transparent text-foreground font-serif text-base placeholder:text-muted/50 outline-none transition-colors duration-200 border border-border focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-danger font-serif text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full max-w-xs py-2.5 rounded-md bg-accent text-background font-serif font-normal text-base transition-colors duration-200 hover:bg-accent-hover disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {submitting ? 'Please wait...' : isRegister ? 'Create account' : 'Continue with email'}
          </button>
        </form>

        <p className="mt-5 font-serif text-sm text-muted">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={toggleMode}
            className="underline underline-offset-2 text-accent hover:text-accent-hover transition-colors duration-200 cursor-pointer"
          >
            {isRegister ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </main>
  )
}

export default Login
