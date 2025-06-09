// src/pages/account/payment.tsx
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { updatePaymentMethod } from '../../services/paymentService';

export default function PaymentPage() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Ajuste paymentData conforme seu backend espera
      await updatePaymentMethod({ cardNumber, expiry, cvc });
      setSuccess(true);
      // opcional: redirecionar de volta ao dashboard
      setTimeout(() => router.push('/account'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Edit Payment Method</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expiry (MM/YY)</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="08/25"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CVC</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="123"
            required
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">Payment updated!</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Updating…' : 'Update Payment'}
        </button>
      </form>
    </div>
  );
}
