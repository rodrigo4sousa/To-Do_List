import { AuthService, User, AuthResponse } from '../services/AuthService';

export class AuthRepository {
  async login(email: string, password: string): Promise<AuthResponse> {
    return AuthService.login(email, password);
  }

  async register(email: string, password: string, name?: string): Promise<AuthResponse> {
    return AuthService.register(email, password, name);
  }

  async logout(): Promise<void> {
    AuthService.logout();
  }

  async getCurrentUser(): Promise<User | null> {
    return AuthService.getCurrentUser();
  }

  getToken(): string | null {
    return AuthService.getToken();
  }

  isAuthenticated(): boolean {
    return AuthService.isAuthenticated();
  }
}

export const authRepository = new AuthRepository();

