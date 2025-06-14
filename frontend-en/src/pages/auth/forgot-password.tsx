// src/pages/auth/forgot-password.tsx
import { FormEvent, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import apiClient from '../../utils/apiClient';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'sent'|'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setMessage('');
    try {
      // Endpoint that sends an email with the reset link
      await apiClient.post('/api/auth/forgot-password', { email: email.trim() });
      setStatus('sent');
      setMessage('If the email exists in our system, you will receive instructions to reset your password.');
    } catch (err: any) {
      console.error('Forgot password error', err);
      setStatus('error');
      setMessage('Unable to process your request. Please try again later.');
    }
  }

  return (
    <>
      <Head>
        <title>Forgot Password – iDontKnowCrypto</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
          <h1 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h1>

          {status === 'sent' ? (
            <p className="text-green-600">{message}</p>
          ) : (
            <>
              {status === 'error' && <p className="text-red-600">{message}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
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
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending…' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}

          <p className="mt-6 text-center text-sm">
            Use the login button in the navigation bar.
          </p>
        </div>
      </div>
    </>
  );
}
