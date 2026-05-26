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
      expect(screen.getByText(link)).toBeInTheDocument()
    })
  })

  it('renders correct number of links and dropdown trigger', () => {
    renderNav()
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4)
    expect(screen.getByText('Agents')).toBeInTheDocument()
  })
})
