import apiClient from './apiClient';
import { User } from '../types';

export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Calls your backend to log in a user.
 * Returns the JWT plus user data.
 */
export async function loginRequest(
  email: string,
  password: string
): Promise<AuthResponse> {
  const resp = await apiClient.post<AuthResponse>('/api/auth/login', {
    email,
    password,
  });
  return resp.data;
}

/**
 * Calls your backend to register a new user.
 * Returns the JWT plus the newly created user.
 */
export async function registerRequest(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const resp = await apiClient.post<AuthResponse>('/api/auth/register', {
    name,
    email,
    password,
  });
  return resp.data;
}

/**
 * Logs out locally by clearing the token and axios header.
 */
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwtToken');
  }
  delete apiClient.defaults.headers.common['Authorization'];
}
