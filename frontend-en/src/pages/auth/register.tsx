// src/pages/auth/register.tsx
import { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
import { getPlans, createCheckoutSession, Plan } from '../../services/paymentService';

export default function RegisterPage() {
  const router = useRouter();
  const { user, register, loading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Se já estiver logado, vai pro dashboard
  useEffect(() => {
    if (user) {
      router.replace('/account');
    }
  }, [user, router]);

  useEffect(() => {
    getPlans().then(setPlans).catch(() => {
      setValidationError('Failed to load plans.');
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Validação básica de senha
    if (password !== confirm) {
      setValidationError('Passwords do not match.');
      return;
    }
    if (!selectedPlan) {
      setValidationError('Please select a plan.');
      return;
    }
    setValidationError(null);
    await register(name.trim(), email.trim(), password);
    try {
      const session = await createCheckoutSession(selectedPlan);
      window.location.href = session.checkoutUrl;
    } catch {
      setValidationError('Could not start checkout.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>
        {(validationError || error) && (
          <p className="text-red-600 mb-4">
            {validationError ?? error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Choose a plan</p>
          {plans.map((plan) => (
            <label
              key={plan.id}
              className="flex items-start border rounded-lg p-2 mb-2"
            >
              <input
                type="radio"
                name="plan"
                value={plan.id}
                checked={selectedPlan === plan.id}
                onChange={() => setSelectedPlan(plan.id)}
                className="mt-1 mr-2"
              />
              <span>
                <span className="font-semibold">{plan.name}</span>
                <span className="block text-gray-700 text-sm">
                  ${plan.price.toFixed(2)} / {plan.interval}
                </span>
                <span className="block text-xs text-gray-500">
                  {plan.description}
                </span>
              </span>
            </label>
          ))}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark disabled:opacity-50"
        >
          {loading ? 'Registering…' : 'Register'}
        </button>
      </form>
      </div>
    </div>
  );
}
