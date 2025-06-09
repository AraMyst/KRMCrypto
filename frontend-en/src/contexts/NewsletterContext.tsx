import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import apiClient from '../utils/apiClient';

interface NewsletterContextType {
  isSubscribed: boolean;
  loading: boolean;
  error: string | null;
  subscribe: (email: string) => Promise<void>;
}

const NewsletterContext = createContext<NewsletterContextType | undefined>(
  undefined
);

export function NewsletterProvider({ children }: { children: ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tenta restaurar do localStorage se o usuário já se inscreveu antes
  useEffect(() => {
    try {
      const flag = localStorage.getItem('newsletterSubscribed');
      if (flag === 'true') {
        setIsSubscribed(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const subscribe = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.post('/api/newsletter/subscribe', { email });
      setIsSubscribed(true);
      localStorage.setItem('newsletterSubscribed', 'true');
    } catch (err: any) {
      setError(
        err.response?.data?.message ?? 'Failed to subscribe. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <NewsletterContext.Provider
      value={{ isSubscribed, loading, error, subscribe }}
    >
      {children}
    </NewsletterContext.Provider>
  );
}

export function useNewsletter() {
  const ctx = useContext(NewsletterContext);
  if (!ctx) {
    throw new Error(
      'useNewsletter must be used within a NewsletterProvider'
    );
  }
  return ctx;
}
