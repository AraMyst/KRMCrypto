import { FormEvent, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

interface SearchModalProps {
  onClose: () => void
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-24 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-md mx-4 p-6 shadow-lg"
      >
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Pesquisar artigos</h2>
          <button
            onClick={onClose}
            aria-label="Fechar busca"
            className="text-gray-600 hover:text-gray-800"
          >
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Digite palavras-chave..."
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Pesquisar
          </button>
        </form>
      </div>
    </div>
  )
}
