import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import App from './App'

function renderApp(initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('App', () => {
  it('renders the welcome section on home route', () => {
    renderApp()
    expect(screen.getByText('Welcome to')).toBeInTheDocument()
  })

  it('renders the main heading', () => {
    renderApp()
    const main = screen.getByRole('main')
    expect(within(main).getByText('MOKUSEI AI')).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    renderApp()
    expect(
      screen.getByText('Specialized Agents that you can use on your projects')
    ).toBeInTheDocument()
  })

  it('renders the navigation', () => {
    renderApp()
    const homeElements = screen.getAllByText('Home')
    expect(homeElements.length).toBeGreaterThanOrEqual(1)
  })

  it('renders CTA buttons in the hero', () => {
    renderApp()
    expect(screen.getByText('Explore Agents')).toBeInTheDocument()
    expect(screen.getByText('Get Started')).toBeInTheDocument()
  })

  it('renders the features section', () => {
    renderApp()
    expect(screen.getByText('Specialized by Design')).toBeInTheDocument()
    expect(screen.getByText('Seamless Integration')).toBeInTheDocument()
    expect(screen.getByText('Evolving Ecosystem')).toBeInTheDocument()
  })

  it('renders the agents preview section', () => {
    renderApp()
    const main = screen.getByRole('main')
    expect(within(main).getByText('Our Agents')).toBeInTheDocument()
    expect(within(main).getByText('Ganymede')).toBeInTheDocument()
    expect(within(main).getByText('Europa')).toBeInTheDocument()
    expect(within(main).getByText('Available')).toBeInTheDocument()
    expect(within(main).getByText('Coming soon')).toBeInTheDocument()
  })

  it('renders the bottom CTA section', () => {
    renderApp()
    expect(
      screen.getByText('Use MOKUSEI AI on your projects!')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Join the ecosystem and integrate your project with Mokusei AI!'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  it('shows Europa toast on click', async () => {
    renderApp()
    const user = userEvent.setup()
    const learnMoreButtons = screen.getAllByText('Learn more →')
    await user.click(learnMoreButtons[1])
    expect(screen.getByText('Europa — coming soon')).toBeInTheDocument()
  })
})
