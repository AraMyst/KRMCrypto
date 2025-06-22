import { FormEvent, useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface SearchModalProps {
  onClose: () => void;
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  // Fecha o modal ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // redireciona para página de busca com query param
    if (query.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(query.trim())}`;
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-24 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-md mx-4 p-6 shadow-lg"
      >
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Search Articles</h2>
          <button
            onClick={onClose}
            aria-label="Close search"
            className="text-gray-600 hover:text-gray-800"
          >
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type keywords..."
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Search
          </button>
        </form>

        {/* Espaço para resultados futuros */}
        {/* <ul className="mt-4 space-y-2">
          {results.map(r => (
            <li key={r.slug}>
              <Link href={`/news/${r.category}/${r.slug}`}>
                <a className="block hover:bg-gray-100 p-2 rounded">{r.title}</a>
              </Link>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}
