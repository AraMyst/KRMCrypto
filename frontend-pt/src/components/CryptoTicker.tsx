import { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';

// 1. Atualizei a interface para incluir o campo 'change24h'
interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
}

export default function CryptoTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const resp = await apiClient.get<CryptoPrice[]>('/api/crypto/ticker');
        setPrices(resp.data);
      } catch (err) {
        console.error('Failed to load crypto prices', err);
      }
    }

    fetchPrices();
    const interval = setInterval(fetchPrices, 300_000); // atualiza a cada 5min
    return () => clearInterval(interval);
  }, []);

  if (prices.length === 0) return null;

  const renderTickerItem = (crypto: CryptoPrice, key: string) => (
    <div key={key} className="mx-6 flex-shrink-0 flex items-center">
      <span className="font-semibold">{crypto.symbol}:</span>
      <span className="ml-2 flex items-center">
        {/* 2. Lógica para mostrar a seta com base no valor de change24h */}
        {crypto.change24h >= 0 ? (
          // Se for positivo ou zero, seta verde para cima
          <span className="text-green-500 mr-1">↑</span>
        ) : (
          // Se for negativo, seta vermelha para baixo
          <span className="text-red-500 mr-1">↓</span>
        )}
        ${crypto.price.toFixed(2)}
      </span>
    </div>
  );

  return (
    <div className="w-full bg-gray-100 py-2 overflow-hidden">
      <div className="inline-flex animate-marquee whitespace-nowrap">
        {/* 3. Renderiza a lista principal usando a função auxiliar */}
        {prices.map((c) => renderTickerItem(c, c.symbol))}
        
        {/* duplicar para loop contínuo */}
        {prices.map((c) => renderTickerItem(c, `${c.symbol}-dup`))}
      </div>

      {/* animação CSS (não precisa de alteração) */}
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