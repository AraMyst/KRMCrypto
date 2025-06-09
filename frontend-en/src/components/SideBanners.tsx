import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNewsletter } from '../contexts/NewsletterContext';

export default function SideBanners() {
  const { user } = useAuth();
  const { subscribe, isSubscribed, loading } = useNewsletter();
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
      <div className="block w-40 p-4 bg-primary text-white rounded-l-lg shadow">
        <h3 className="font-bold mb-1">Newsletter</h3>
        {user && isSubscribed ? (
          <p className="text-sm">Congrats, you're already subscribed!</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
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
              className="underline text-sm hover:text-gray-300 disabled:opacity-50"
            >
              {loading ? 'Submitting…' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>

      {/* Banner Subscription */}
      <Link href="/auth/register">
        <a className="block w-40 p-4 bg-green-600 text-white rounded-l-lg shadow hover:text-gray-300 transition">
          <h3 className="font-bold mb-1">Subscription</h3>
          <p className="text-sm">Get early analyses from our experts</p>
        </a>
      </Link>
    </aside>
  );
}
