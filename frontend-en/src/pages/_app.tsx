import '../styles/globals.css';
import '../styles/_navbar.css';
import '../styles/_ticker.css';
import '../styles/_carousel.css';
import '../styles/_banners.css';
import '../styles/_footer.css';

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
