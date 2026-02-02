const API_BASE_URL = 'http://localhost:3001';

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

async function withAuthHeaders(extraHeaders: HeadersInit = {}) {
  const token = getAuthToken();

  if (!token) {
    throw new Error('User not authenticated');
  }

  return {
    ...extraHeaders,
    Authorization: `Bearer ${token}`
  };
}

export const api = {
  get: async (url: string) => {
    const headers = await withAuthHeaders();
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  },

  post: async (url: string, data: any) => {
    const headers = await withAuthHeaders({
      'Content-Type': 'application/json'
    });

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  },

  patch: async (url: string, data?: any) => {
    const headers = await withAuthHeaders({
      'Content-Type': 'application/json'
    });

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PATCH',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  },

  delete: async (url: string): Promise<void> => {
    const headers = await withAuthHeaders();

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
  }
};
