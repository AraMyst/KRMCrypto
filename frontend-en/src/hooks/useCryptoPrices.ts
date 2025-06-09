// Hook que devolve preços, loading e error do CryptoContext
import { useCrypto } from '../contexts/CryptoContext';

export default function useCryptoPrices() {
  const { prices, loading, error } = useCrypto();
  return { prices, loading, error };
}
