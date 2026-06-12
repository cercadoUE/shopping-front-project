const API_BASE = '/api'

async function request(url, options = {}) {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  })

  let data
  try {
    data = await res.json()
  } catch {
    throw new Error('Error de conexión con el servidor')
  }

  if (!res.ok) {
    throw new Error(data.message || data.error || 'Error en la solicitud')
  }

  return data
}

export function login(email, password) {
  return request('/user/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function register(userData) {
  return request('/user', {
    method: 'POST',
    body: JSON.stringify(userData),
  })
}
