import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import apiClient from '../utils/apiClient';
import { CryptoPrice } from '../types';

interface CryptoContextType {
  prices: CryptoPrice[];
  loading: boolean;
  error: string | null;
}

const CryptoContext = createContext<CryptoContextType | undefined>(
  undefined
);

export function CryptoProvider({ children }: { children: ReactNode }) {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timer;

    const fetchPrices = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await apiClient.get<CryptoPrice[]>('/api/crypto/prices');
        setPrices(resp.data);
      } catch (err: any) {
        console.error('Crypto fetch error', err);
        setError('Failed to load crypto prices');
      } finally {
        setLoading(false);
      }
    };

    // Fetch inicial
    fetchPrices();

    // Re-fetch a cada 60 segundos
    intervalId = setInterval(fetchPrices, 60_000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <CryptoContext.Provider value={{ prices, loading, error }}>
      {children}
    </CryptoContext.Provider>
  );
}

export function useCrypto() {
  const ctx = useContext(CryptoContext);
  if (!ctx) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return ctx;
}
