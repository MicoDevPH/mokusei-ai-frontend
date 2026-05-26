import { render, screen, within } from '@testing-library/react'
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

  it('renders the description', () => {
    renderApp()
    expect(
      screen.getByText('An ecosystem of AI agents, each with unique specialties')
    ).toBeInTheDocument()
  })

  it('renders the navigation', () => {
    renderApp()
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
