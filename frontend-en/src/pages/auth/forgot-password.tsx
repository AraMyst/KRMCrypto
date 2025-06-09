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
      // endpoint que dispara email com link de reset
      await apiClient.post('/api/auth/forgot-password', { email: email.trim() });
      setStatus('sent');
      setMessage('Se o e-mail existir em nosso sistema, você receberá instruções para redefinir sua senha.');
    } catch (err: any) {
      console.error('Forgot password error', err);
      setStatus('error');
      setMessage('Não foi possível processar sua solicitação. Tente novamente mais tarde.');
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
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending…' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}

          <p className="mt-6 text-center text-sm">
            <Link href="/auth/login">
              <a className="text-blue-600 hover:underline">Back to login</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
