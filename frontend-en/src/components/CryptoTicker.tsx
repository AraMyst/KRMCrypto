import { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';

interface CryptoPrice {
  symbol: string;
  price: number;
}

export default function CryptoTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const resp = await apiClient.get<CryptoPrice[]>('/api/crypto/prices');
        setPrices(resp.data);
      } catch (err) {
        console.error('Failed to load crypto prices', err);
      }
    }

    fetchPrices();
    const interval = setInterval(fetchPrices, 60_000); // atualiza a cada 60s
    return () => clearInterval(interval);
  }, []);

  if (prices.length === 0) return null;

  return (
    <div className="w-full bg-gray-100 py-2 overflow-hidden">
      <div className="inline-flex animate-marquee whitespace-nowrap">
        {prices.map((c) => (
          <div key={c.symbol} className="mx-6 flex-shrink-0">
            <span className="font-semibold">{c.symbol}</span>: ${c.price.toFixed(2)}
          </div>
        ))}
        {/* duplicar para loop contínuo */}
        {prices.map((c) => (
          <div key={`${c.symbol}-dup`} className="mx-6 flex-shrink-0">
            <span className="font-semibold">{c.symbol}</span>: ${c.price.toFixed(2)}
          </div>
        ))}
      </div>

      {/* animação CSS */}
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
  );
}
