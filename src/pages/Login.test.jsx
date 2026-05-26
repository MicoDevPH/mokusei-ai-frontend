import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import Login from './Login'

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('Login', () => {
  it('renders the login heading', async () => {
    renderLogin()
    const heading = await waitFor(() =>
      screen.getByText((_, el) => el.tagName === 'H2' && el.textContent.includes('Mokusei AI'))
    )
    expect(heading).toBeInTheDocument()
  })

  it('renders email and password inputs', async () => {
    renderLogin()
    await waitFor(() => {
      expect(screen.getByLabelText('Email address')).toBeInTheDocument()
      expect(screen.getByLabelText('Password')).toBeInTheDocument()
    })
  })

  it('password input is hidden by default', async () => {
    renderLogin()
    const input = await waitFor(() => screen.getByLabelText('Password'))
    expect(input).toHaveAttribute('type', 'password')
  })

  it('clicking eye icon reveals password', async () => {
    const user = userEvent.setup()
    renderLogin()

    const eyeButton = await waitFor(() => screen.getByRole('button', { name: 'Show password' }))
    await user.click(eyeButton)

    const input = screen.getByLabelText('Password')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('clicking eye icon twice hides password again', async () => {
    const user = userEvent.setup()
    renderLogin()

    const eyeButton = await waitFor(() => screen.getByRole('button', { name: 'Show password' }))
    await user.click(eyeButton)
    await user.click(eyeButton)

    const input = screen.getByLabelText('Password')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('eye icon updates aria-label after clicking', async () => {
    const user = userEvent.setup()
    renderLogin()

    const eyeButton = await waitFor(() => screen.getByRole('button', { name: 'Show password' }))
    await user.click(eyeButton)

    expect(screen.getByRole('button', { name: 'Hide password' })).toBeInTheDocument()
  })

  it('shows name field when toggled to register mode', async () => {
    const user = userEvent.setup()
    renderLogin()

    const signUp = await waitFor(() => screen.getByText('Sign up'))
    await user.click(signUp)

    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create account' })).toBeInTheDocument()
  })

  it('hides name field when toggled back to login mode', async () => {
    const user = userEvent.setup()
    renderLogin()

    const signUp = await waitFor(() => screen.getByText('Sign up'))
    await user.click(signUp)
    await user.click(screen.getByText('Sign in'))

    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Continue with email' })).toBeInTheDocument()
  })
})
