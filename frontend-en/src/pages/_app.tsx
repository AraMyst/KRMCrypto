// src/pages/_app.tsx
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { AuthProvider } from '../contexts/AuthContext';
import { NewsletterProvider } from '../contexts/NewsletterContext';
import { CryptoProvider } from '../contexts/CryptoContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NewsletterProvider>
        <CryptoProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CryptoProvider>
      </NewsletterProvider>
    </AuthProvider>
  );
}
