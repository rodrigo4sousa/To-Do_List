import { authRepository } from '../repositories/AuthRepository';
import { User, AuthResponse } from '../models/User';


export class AuthService {
  private static TOKEN_KEY = 'auth_token';
  private static USER_KEY = 'auth_user';

  /**
   * Register a new user
   */
  static async register(email: string, password: string, name?: string): Promise<AuthResponse> {
    // Use repository to communicate with backend
    const data = await authRepository.register(email, password, name);
    
    // Store token and user locally
    this.setToken(data.token);
    this.setUser(data.user);
    
    return data;
  }

  /**
   * Login user
   */
  static async login(email: string, password: string): Promise<AuthResponse> {
    // Use repository to communicate with backend
    const data = await authRepository.login(email, password);
    
    // Store token and user locally
    this.setToken(data.token);
    this.setUser(data.user);
    
    return data;
  }

  /**
   * Logout user
   */
  static logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
  }

  /**
   * Get current user from localStorage
   */
  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userJson = localStorage.getItem(this.USER_KEY);
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }

  /**
   * Get stored token from localStorage
   */
  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Set token in localStorage
   */
  private static setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  /**
   * Set user in localStorage
   */
  private static setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  
}

/**
 * Login with Email and Password
 */
export async function loginEmail(email: string, password: string): Promise<User> {
  const response = await AuthService.login(email, password);
  return response.user;
}

/**
 * Sign up with Email and Password
 */
export async function signUpEmail(email: string, password: string, name?: string): Promise<User> {
  const response = await AuthService.register(email, password, name);
  return response.user;
}

/**
 * Logout
 */
export function logout(): void {
  AuthService.logout();
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  return AuthService.getCurrentUser();
}

