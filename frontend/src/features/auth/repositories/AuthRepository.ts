import { User, AuthResponse } from '../models/User';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * AuthRepository - Handles all HTTP communication with the backend auth API
 * This is the data layer that communicates directly with the backend
 */
export class AuthRepository {
  /**
   * Register a new user via backend API
   */
  async register(email: string, password: string, name?: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }

    return response.json();
  }

  /**
   * Login user via backend API
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return response.json();
  }

  /**
   * Verify token validity with backend (optional endpoint if backend supports it)
   */
  async verifyToken(token: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Invalid token');
    }

    return response.json();
  }
}

export const authRepository = new AuthRepository();

