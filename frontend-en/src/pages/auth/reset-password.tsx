// src/pages/auth/reset-password.tsx
import { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import apiClient from '../../utils/apiClient';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle');
  const [message, setMessage] = useState('');

  // se não houver token, redireciona para forgot-password
  useEffect(() => {
    if (!token) {
      router.replace('/auth/forgot-password');
    }
  }, [token, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setStatus('error');
      setMessage('Passwords do not match.');
      return;
    }
    setStatus('submitting');
    setMessage('');
    try {
      await apiClient.post('/api/auth/reset-password', {
        token,
        newPassword: password,
      });
      setStatus('success');
      setMessage('Password reset successfully! You can log in now.');
    } catch (err: any) {
      console.error('Reset password error', err);
      setStatus('error');
      setMessage(
        err.response?.data?.message ||
        'Unable to reset password. The link may have expired.'
      );
    }
  }

  return (
    <>
      <Head>
        <title>Reset Password – iDontKnowCrypto</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
          <h1 className="text-2xl font-semibold mb-4 text-center">Reset Password</h1>

          {status === 'success' ? (
            <>
              <p className="text-green-600 mb-4">{message}</p>
              <p className="block text-center text-primary">Use the login button in the navigation bar.</p>
            </>
          ) : (
            <>
              {status === 'error' && <p className="text-red-600 mb-2">{message}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
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
                    minLength={6}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Submitting…' : 'Reset Password'}
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
