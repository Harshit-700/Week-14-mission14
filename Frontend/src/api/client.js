

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

if (import.meta.env.PROD && !import.meta.env.VITE_API_URL) {
  console.error(
    '[client.js] ⚠️  VITE_API_URL is not set! ' +
    'All API requests will fail in production. ' +
    'Add VITE_API_URL=https://<your-render-app>.onrender.com/api to your Vercel environment variables.'
  );
}

const TOKEN_KEY = 'auth_token';


export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  remove: () => localStorage.removeItem(TOKEN_KEY),
  isValid: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now() + 30_000;
    } catch {
      return false;
    }
  },
};


const request = async (endpoint, options = {}) => {
  const token = tokenStorage.get();

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Request failed');
    error.status = response.status;
    error.code = data.code;
    throw error;
  }

  return data;
};

export const authAPI = {
  register: (name, email, password) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: () => request('/auth/me'),

  logout: () => request('/auth/logout', { method: 'POST' }),
};

export const tasksAPI = {
  getAll: () => request('/tasks'),
  create: (title, description) =>
    request('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
    }),
  toggle: (id) => request(`/tasks/${id}`, { method: 'PATCH' }),
  delete: (id) => request(`/tasks/${id}`, { method: 'DELETE' }),
};