import { FormEvent, useState } from 'react';
import apiClient from '../utils/apiClient';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      await apiClient.post('/api/newsletter/subscribe', { email: email.trim() });
      setStatus('success');
      setMessage('Subscribed successfully!');
      setEmail('');
    } catch (err) {
      console.error('Newsletter subscribe error', err);
      setStatus('error');
      setMessage('Oops, something went wrong.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-white p-4 rounded-lg shadow"
    >
      <h3 className="text-lg font-semibold mb-2">Join our Newsletter</h3>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition disabled:opacity-50"
      >
        {status === 'loading' ? 'Submitting…' : 'Subscribe'}
      </button>

      {status === 'success' && (
        <p className="mt-2 text-green-600 text-sm">{message}</p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-red-600 text-sm">{message}</p>
      )}
    </form>
  );
}
