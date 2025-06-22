import { FormEvent, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

interface SearchDropdownProps {
  onClose: () => void
}

export default function SearchDropdown({ onClose }: SearchDropdownProps) {
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const termo = query.trim()
    if (termo) {
      router.push(`/search?query=${encodeURIComponent(termo)}`)
      onClose()
    }
  }

  return (
    <div
      ref={ref}
      className="absolute right-4 top-full mt-2 bg-white p-4 shadow rounded w-64 z-40"
    >
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Digite palavras-chave..."
          className="flex-grow border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
          autoFocus
        />
        <button
          type="submit"
          className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Pesquisar
        </button>
      </form>
    </div>
  )
}
