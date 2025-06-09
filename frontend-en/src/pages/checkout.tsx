// src/pages/checkout.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Se não estiver logado, envia para login; se já logado, vai para gestão de planos
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/auth/login?next=/checkout');
      } else {
        router.replace('/account/subscription');
      }
    }
  }, [user, loading, router]);

  return <div className="pt-24 text-center">Redirecting…</div>;
}
