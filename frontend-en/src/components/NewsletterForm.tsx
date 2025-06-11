import { FormEvent, useState } from 'react';
import { useNewsletter } from '../contexts/NewsletterContext';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const { subscribe, loading, success, error } = useNewsletter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    await subscribe(email.trim());
    setEmail('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
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
        disabled={loading}
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition disabled:opacity-50"
      >
        {loading ? 'Submitting…' : 'Subscribe'}
      </button>

      {success && <p className="mt-2 text-green-600 text-sm">{success}</p>}
      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
    </form>
  );
}
