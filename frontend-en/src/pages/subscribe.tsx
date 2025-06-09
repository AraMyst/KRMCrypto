// src/pages/subscribe.tsx
import Head from 'next/head';
import NewsletterForm from '../components/NewsletterForm';

export default function SubscribePage() {
  return (
    <>
      <Head>
        <title>Subscribe – iDontKnowCrypto</title>
        <meta name="description" content="Join our crypto newsletter for free weekly insights." />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
        <NewsletterForm />
      </div>
    </>
  );
}
