import { useState, useEffect, useRef, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NAV_LINKS = [
  { label: 'Bitcoin',  href: '/bitcoin'  },
  { label: 'Ethereum', href: '/ethereum' },
  { label: 'Altcoins',  href: '/altcoins' },
  { label: 'Regulação', href: '/regulacao' },
  { label: 'Blockchain', href: '/blockchain' },
  { label: 'NFT',      href: '/nft'      },
  { label: 'DeFi',     href: '/defi'     },
]

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen]     = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault()
    const termo = searchQuery.trim()
    if (termo) {
      router.push(`/search?query=${encodeURIComponent(termo)}`)
    }
  }

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex-shrink-0">
              <Image
                src="/images/naoseicripto-logo.png"
                alt="NaoseiCripto"
                width={140}
                height={40}
                priority
              />
            </a>
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex space-x-8">
            {NAV_LINKS.map(link => {
              const isActive = router.pathname === link.href
              return (
                <Link key={link.href} href={link.href}>
                  <a
                    className={`font-medium text-nav-primary hover:text-nav-primary-dark ${isActive ? 'border-b-2 border-nav-primary pb-1' : ''}`}
                  >
                    {link.label}
                  </a>
                </Link>
              )
            })}
          </div>

          {/* Mobile: Hambúrguer + Search */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setIsMenuOpen(v => !v)
              }}
              aria-label="Alternar menu"
              className="p-2 rounded hover:bg-gray-100 md:hidden"
            >
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <form onSubmit={handleSearchSubmit} className="flex items-center border rounded">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Pesquisar..."
                className="px-2 py-1 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Pesquisar artigos"
                className="p-2 hover:bg-gray-100 rounded"
              >
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.15 6.15a7.5 7.5 0 0 0 10.5 10.5z" />
                </svg>
              </button>
            </form>
          </div>
          </div>

          {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow border-t z-40">
            {NAV_LINKS.map(link => {
              const isActive = router.pathname === link.href
              return (
                <Link key={link.href} href={link.href}>
                  <a
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 font-medium text-nav-primary hover:text-nav-primary-dark ${isActive ? 'border-b-2 border-nav-primary' : ''}`}
                  >
                    {link.label}
                  </a>
                </Link>
              )
            })}
          </div>
        )}
      </nav>

      {/* Spacer para evitar overlap */}
      <div className="h-16" />
    </>
  )
}
