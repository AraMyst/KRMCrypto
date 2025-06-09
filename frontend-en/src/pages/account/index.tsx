// src/pages/account/index.tsx
import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import useAuth from '../../hooks/useAuth';
import { getSubscription, cancelSubscription } from '../../services/paymentService';
import { updateProfile } from '../../services/userService';
import { Subscription } from '../../types';

export default function AccountPage() {
  const { user, loading: authLoading, logout } = useAuth();

  // Profile form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

  // Subscription state
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [subLoading, setSubLoading] = useState(true);
  const [subError, setSubError] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  // Initialize form values and fetch subscription
  useEffect(() => {
    if (!authLoading && user) {
      setName(user.name);
      setEmail(user.email);

      (async () => {
        try {
          const sub = await getSubscription();
          setSubscription(sub);
        } catch {
          setSubError('Failed to load subscription.');
        } finally {
          setSubLoading(false);
        }
      })();
    }
  }, [authLoading, user]);

  // Handle profile updates
  async function handleProfileSubmit(e: FormEvent) {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError(null);
    setProfileSuccess(null);
    try {
      await updateProfile({ name, email });
      setProfileSuccess('Profile updated successfully.');
    } catch (err: any) {
      setProfileError(err.response?.data?.message || 'Update failed.');
    } finally {
      setProfileLoading(false);
    }
  }

  // Handle subscription cancellation
  async function handleCancel() {
    if (!confirm('Are you sure you want to cancel your subscription?')) return;
    setCancelLoading(true);
    try {
      await cancelSubscription();
      setSubscription(null);
    } catch {
      alert('Cancellation failed.');
    } finally {
      setCancelLoading(false);
    }
  }

  if (authLoading || subLoading) {
    return (
      <div className="pt-24 text-center">
        Loading your account…
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">My Account</h1>

      {/* Profile Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Profile</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {profileError && <p className="text-red-600">{profileError}</p>}
          {profileSuccess && <p className="text-green-600">{profileSuccess}</p>}
          <button
            type="submit"
            disabled={profileLoading}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50"
          >
            {profileLoading ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </section>

      {/* Subscription Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Subscription</h2>
        {subscription ? (
          <div className="space-y-2">
            <p>
              <span className="font-medium">Plan:</span> {subscription.plan}
            </p>
            <p>
              <span className="font-medium">Status:</span> {subscription.status}
            </p>
            <p>
              <span className="font-medium">Next Payment:</span>{' '}
              {subscription.nextBillingDate}
            </p>
            <div className="flex space-x-4">
              <Link href="/account/payment">
                <a className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Edit Payment Method
                </a>
              </Link>
              <button
                onClick={handleCancel}
                disabled={cancelLoading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {cancelLoading ? 'Cancelling…' : 'Cancel Subscription'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>You do not have an active subscription.</p>
            <Link href="/checkout">
              <a className="inline-block mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
                Subscribe Now
              </a>
            </Link>
          </div>
        )}
      </section>

      {/* Logout */}
      <section>
        <button
          onClick={logout}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Log Out
        </button>
      </section>
    </div>
);
}
