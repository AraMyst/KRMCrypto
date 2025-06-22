import { useCrypto } from '../contexts/CryptoContext'

/**
 * Hook que expõe preços de cripto, estado de carregamento e erros.
 */
export default function useCryptoPrices() {
  const { prices, loading, error } = useCrypto()
  return { prices, loading, error }
}
