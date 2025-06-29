import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { CryptoPrice } from '../types'

interface CryptoContextType {
  prices: CryptoPrice[]
  loading: boolean
  error: string | null
}

const CryptoContext = createContext<CryptoContextType | undefined>(
  undefined
)

export function CryptoProvider({ children }: { children: ReactNode }) {
  const [prices, setPrices] = useState<CryptoPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // busca os preços de cripto do backend
    async function fetchPrices() {
      setLoading(true)
      setError(null)
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/crypto/ticker`
        )
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const data = (await resp.json()) as CryptoPrice[]
        setPrices(data)
      } catch (err: any) {
        console.error('Falha ao carregar preços de criptomoedas', err)
        setError('Falha ao carregar preços de criptomoedas')
      } finally {
        setLoading(false)
      }
    }

    fetchPrices()
    const intervalo = setInterval(fetchPrices, 60_000) // atualiza a cada 60s
    return () => clearInterval(intervalo)
  }, [])

  return (
    <CryptoContext.Provider value={{ prices, loading, error }}>
      {children}
    </CryptoContext.Provider>
  )
}

export function useCrypto() {
  const ctx = useContext(CryptoContext)
  if (!ctx) {
    throw new Error('useCrypto deve ser usado dentro de um CryptoProvider')
  }
  return ctx
}
