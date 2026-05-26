const API_BASE = ''

async function request(endpoint, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  }

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body)
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config)

  if (response.status === 422) {
    const data = await response.json()
    throw { status: 422, errors: data.errors, message: data.message }
  }

  if (response.status === 429) {
    throw { status: 429, message: 'Too many requests. Please try again later.' }
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw { status: response.status, message: data.message || 'An error occurred' }
  }

  return response.json()
}

export async function getCsrfCookie() {
  await fetch('/sanctum/csrf-cookie', {
    method: 'GET',
    credentials: 'include',
  })
}

export function login(email, password, remember = false) {
  return request('/api/login', {
    method: 'POST',
    body: { email, password, remember },
  })
}

export function register(name, email, password) {
  return request('/api/register', {
    method: 'POST',
    body: { name, email, password },
  })
}

export function logout() {
  return request('/api/logout', {
    method: 'POST',
  })
}

export function fetchUser() {
  return request('/api/user')
}
