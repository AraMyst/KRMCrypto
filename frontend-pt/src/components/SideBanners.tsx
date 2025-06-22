import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNewsletter } from '../contexts/NewsletterContext';

export default function SideBanners() {
  const { user } = useAuth();
  const { subscribe, isSubscribed, loading, error, success } = useNewsletter();
  const [email, setEmail] = useState(user?.email ?? '');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    await subscribe(email.trim());
    setEmail('');
  };

  return (
    <aside className="fixed top-1/3 right-4 flex flex-col space-y-6 z-40">
      {/* Banner Newsletter */}
      <div className="block w-40 p-4 bg-primary text-white rounded-l-lg shadow text-center">
        <h3 className="font-bold mb-1 text-center">Newsletter</h3>
        {success ? (
          <p className="text-sm">{success}</p>
        ) : isSubscribed ? (
          <p className="text-sm">You are already subscribed to our newsletter.</p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full rounded px-2 py-1 text-black"
            />
            <button
              type="submit"
              disabled={loading}
              className="underline text-sm hover:text-gray-300 disabled:opacity-50 block mx-auto"
            >
              {loading ? 'Submitting…' : 'Subscribe'}
            </button>
            {error && (
              <p className="text-xs text-red-300 text-center mt-1">{error}</p>
            )}
          </form>
        )}
      </div>

      {/* Banner Premium */}
      <div className="block w-40 p-4 bg-green-600 text-white rounded-l-lg shadow">
        <h3 className="font-bold mb-1 text-center">Premium</h3>
        <p className="text-sm text-center">Get early price analysis from our experts</p>
        <Link className="mt-2 block w-fit px-3 py-1 bg-white text-green-700 rounded text-sm font-semibold mx-auto text-center" href="/auth/register">
            Go Premium
        </Link>
      </div>
    </aside>
  );
}
