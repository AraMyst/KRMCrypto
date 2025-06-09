// src/services/userService.ts
import apiClient from '../utils/apiClient';
import { User } from '../types';

export interface UpdateProfileData {
  name?: string;
  email?: string;
  // adicione outros campos permitidos pelo backend, ex: avatarUrl?
}

/**
 * Obtém os dados do usuário autenticado.
 */
export async function getCurrentUser(): Promise<User> {
  const resp = await apiClient.get<User>('/api/auth/me');
  return resp.data;
}

/**
 * Atualiza o perfil do usuário (nome, email, etc.).
 * O backend deve expor um endpoint PUT /api/auth/me para isso.
 */
export async function updateProfile(
  data: UpdateProfileData
): Promise<User> {
  const resp = await apiClient.put<User>('/api/auth/me', data);
  return resp.data;
}

/**
 * Altera a senha do usuário.
 * Supondo que o backend aceite POST /api/auth/me/password com
 * { currentPassword, newPassword }.
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  await apiClient.post('/api/auth/me/password', {
    currentPassword,
    newPassword,
  });
}
