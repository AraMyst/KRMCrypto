import { FormEvent, useState, useEffect, useRef } from 'react';

interface SearchDropdownProps {
  onClose: () => void;
}

export default function SearchDropdown({ onClose }: SearchDropdownProps) {
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(query.trim())}`;
    }
  }

  return (
    <div
      ref={ref}
      className="absolute right-24 top-full mt-2 bg-white p-4 shadow rounded w-64 z-40"
    >
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type keywords..."
          className="flex-grow border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
          autoFocus
        />
        <button
          type="submit"
          className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Search
        </button>
      </form>
    </div>
  );
}
