import { FormEvent, useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';

interface LoginDropdownProps {
  onClose: () => void;
}

export default function LoginDropdown({ onClose }: LoginDropdownProps) {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await login(email.trim(), password);
  }

  return (
    <div
      ref={ref}
      className="fixed top-0 right-0 h-full w-80 bg-white p-4 shadow-lg z-40"
    >
      <form onSubmit={handleSubmit} className="space-y-2">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-1 rounded hover:bg-primary-dark disabled:opacity-50"
        >
          {loading ? 'Logging in…' : 'Log In'}
        </button>
      </form>
    </div>
  );
}
