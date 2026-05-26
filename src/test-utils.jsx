import { AuthProvider } from '../context/AuthContext'
import { MemoryRouter } from 'react-router-dom'

export function renderWithProviders(ui, { initialEntries = ['/'] } = {}) {
  return {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={initialEntries}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </MemoryRouter>
    ),
  }
}
