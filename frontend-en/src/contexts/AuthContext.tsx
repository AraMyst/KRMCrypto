// src/contexts/AuthContext.tsx
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ao montar, tenta restaurar sessão do localStorage
  useEffect(() => {
    const savedToken = typeof window !== 'undefined' && localStorage.getItem('jwtToken');
    if (savedToken) {
      setToken(savedToken);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
      // opcional: buscar dados do usuário logado
      apiClient.get<User>('/api/auth/me')
        .then(res => setUser(res.data))
        .catch(() => { /* token inválido, ignora */ })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.post<{ token: string; user: User }>('/api/auth/login', { email, password });
      const { token: jwt, user: u } = res.data;
      localStorage.setItem('jwtToken', jwt);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      setToken(jwt);
      setUser(u);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  async function register(name: string, email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.post<{ token: string; user: User }>('/api/auth/register', { name, email, password });
      const { token: jwt, user: u } = res.data;
      localStorage.setItem('jwtToken', jwt);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      setToken(jwt);
      setUser(u);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('jwtToken');
    delete apiClient.defaults.headers.common['Authorization'];
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para consumir o contexto
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
