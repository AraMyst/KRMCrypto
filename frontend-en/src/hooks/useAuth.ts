// Hook que expõe login, register, logout, user, token, loading e error
import { useAuth as useAuthContext } from '../contexts/AuthContext';

export default function useAuth() {
  return useAuthContext();
}
