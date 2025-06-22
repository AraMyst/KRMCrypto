import { useState, useEffect } from 'react'
import apiClient from '../utils/apiClient'

interface CryptoPrice {
  symbol: string
  price: number
  change24h: number
}

export default function CryptoTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([])

  useEffect(() => {
    async function fetchPrices() {
      try {
        const resp = await apiClient.get<CryptoPrice[]>('/api/crypto/ticker')
        setPrices(resp.data)
      } catch (err) {
        console.error('Falha ao carregar preços de cripto', err)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 300_000) // 5 min
    return () => clearInterval(interval)
  }, [])

  if (prices.length === 0) return null

  const renderTickerItem = (crypto: CryptoPrice, key: string) => (
    <div key={key} className="mx-6 flex-shrink-0 flex items-center">
      <span className="font-semibold">{crypto.symbol}:</span>
      <span className="ml-2 flex items-center">
        {crypto.change24h >= 0 ? (
          <span className="text-green-500 mr-1">↑</span>
        ) : (
          <span className="text-red-500 mr-1">↓</span>
        )}
        ${crypto.price.toFixed(2)}
      </span>
    </div>
  )

  return (
    <div className="w-full bg-purple-50 py-2 overflow-hidden">
      <div className="inline-flex animate-marquee whitespace-nowrap">
        {prices.map(c => renderTickerItem(c, c.symbol))}
        {prices.map(c => renderTickerItem(c, `${c.symbol}-dup`))}
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
