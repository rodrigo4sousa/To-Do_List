/**
 * User data model
 */
export interface User {
  id: string;
  email: string;
  name: string;
}

/**
 * Authentication response from backend
 */
export interface AuthResponse {
  token: string;
  user: User;
}

