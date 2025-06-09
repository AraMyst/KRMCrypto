// src/pages/account/subscription.tsx
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
import { getPlans, createCheckoutSession, getSubscription } from '../../services/paymentService';
import { Plan } from '../../services/paymentService';
import { Subscription } from '../../types';

export default function SubscriptionPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingSession, setCreatingSession] = useState(false);

  // Fetch plans and current subscription
  useEffect(() => {
    if (!authLoading) {
      Promise.all([
        getPlans(),
        getSubscription().catch(() => null),
      ])
        .then(([plansData, subData]) => {
          setPlans(plansData);
          setSubscription(subData);
          if (subData) setSelectedPlan(subData.plan);
        })
        .catch(() => setError('Failed to load subscription data.'))
        .finally(() => setLoading(false));
    }
  }, [authLoading]);

  // Redirect non-logged-in users
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/auth/login');
    }
  }, [user, authLoading, router]);

  // Start checkout session
  async function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!selectedPlan) {
      setError('Please select a plan first.');
      return;
    }
    setCreatingSession(true);
    try {
      const session = await createCheckoutSession(selectedPlan);
      window.location.href = session.checkoutUrl;
    } catch {
      setError('Could not start checkout. Try again.');
    } finally {
      setCreatingSession(false);
    }
  }

  if (authLoading || loading) {
    return <div className="pt-24 text-center">Loading subscription options…</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Manage Subscription</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubscribe} className="space-y-6">
        {plans.map((plan) => (
          <label
            key={plan.id}
            className="flex items-start border rounded-lg p-4 hover:shadow-md transition"
          >
            <input
              type="radio"
              name="plan"
              value={plan.id}
              checked={selectedPlan === plan.id}
              onChange={() => setSelectedPlan(plan.id)}
              className="mt-1 mr-3"
            />
            <div>
              <p className="font-semibold">{plan.name}</p>
              <p className="text-gray-700">${plan.price.toFixed(2)} / {plan.interval}</p>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </div>
          </label>
        ))}

        <button
          type="submit"
          disabled={creatingSession}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {subscription ? 'Change Plan' : 'Subscribe Now'}
        </button>
      </form>

      {subscription && (
        <p className="mt-4 text-sm text-gray-600">
          Current plan: <span className="font-medium">{subscription.plan}</span>
        </p>
      )}
    </div>
  );
}
