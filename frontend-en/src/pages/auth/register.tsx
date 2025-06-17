// src/pages/auth/register.tsx
import { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
// Vamos assumir que 'Plan' tem um campo 'interval' que corresponde ao que o backend espera
import { getPlans, createCheckoutSession, Plan } from '../../services/paymentService';

export default function RegisterPage() {
  const router = useRouter();
  const { user, register, loading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [plans, setPlans] = useState<Plan[]>([]);
  // Este estado agora vai guardar o valor do intervalo ('daily', 'weekly', etc.)
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
    if (password !== confirm) {
      setValidationError('Passwords do not match.');
      return;
    }
    // A validação continua a mesma
    if (!selectedPlan) {
      setValidationError('Please select a plan.');
      return;
    }
    setValidationError(null);

    // O fluxo de registro e checkout continua o mesmo.
    // A variável 'selectedPlan' agora contém o valor correto ('daily', etc.)
    await register(name.trim(), email.trim(), password);
    try {
      // 'createCheckoutSession' agora receberá 'daily', 'weekly' ou 'monthly'
      const session = await createCheckoutSession(selectedPlan);
      window.location.href = session.checkoutUrl; // ou session.paymentLink, conforme a sua API
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
          {/* ... campos de name, email, password, confirm (sem alterações) ... */}
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
            {/* MUDANÇA PRINCIPAL AQUI */}
            {plans.map((plan) => (
              <label
                key={plan.id} // A 'key' continua sendo o ID, que é único
                className="flex items-start border rounded-lg p-2 mb-2"
              >
                <input
                  type="radio"
                  name="plan"
                  // MUDANÇA 1: O valor do input agora é o intervalo do plano
                  value={plan.interval}
                  // MUDANÇA 2: Verificamos a seleção comparando com o intervalo
                  checked={selectedPlan === plan.interval}
                  // MUDANÇA 3: Ao mudar, salvamos o intervalo no estado
                  onChange={() => setSelectedPlan(plan.interval)}
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