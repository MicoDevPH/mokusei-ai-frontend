import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import Nav from './Nav'

function renderNav() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Nav />
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('Nav', () => {
  it('renders the brand name', () => {
    renderNav()
    expect(screen.getByText('MOKUSEI AI')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    renderNav()
    const links = ['Home', 'Agents', 'Pricing', 'Login']
    links.forEach((link) => {
      const elements = screen.getAllByText(link)
      expect(elements.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('renders correct number of link elements and dropdown trigger', () => {
    renderNav()
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4)
    const agentsElements = screen.getAllByText('Agents')
    expect(agentsElements.length).toBe(2)
  })
})
