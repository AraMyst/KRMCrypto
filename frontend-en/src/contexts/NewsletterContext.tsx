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
  success: string | null;
  subscribe: (email: string) => Promise<void>;
}

const NewsletterContext = createContext<NewsletterContextType | undefined>(
  undefined
);

export function NewsletterProvider({ children }: { children: ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
    setSuccess(null);
    try {
      await apiClient.post('/api/newsletter/subscribe', { email });
      setIsSubscribed(true);
      setSuccess('Parabéns, você está inscrito na nossa newsletter!');
      localStorage.setItem('newsletterSubscribed', 'true');
    } catch (err: any) {
      const msg = err.response?.data?.message;
      if (msg && msg.includes('E-mail já cadastrado')) {
        setIsSubscribed(true);
        setSuccess('Você já está cadastrado na nossa newsletter.');
        localStorage.setItem('newsletterSubscribed', 'true');
      } else if (!err.response) {
        setError('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
      } else {
        setError(msg ?? 'Failed to subscribe. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <NewsletterContext.Provider
      value={{ isSubscribed, loading, error, success, subscribe }}
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
