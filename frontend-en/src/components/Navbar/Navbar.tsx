// src/components/Navbar/Navbar.tsx
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SearchDropdown from '../SearchDropdown'
import LoginDropdown from '../LoginDropdown'

// atualizei apenas aqui:
const NAV_LINKS = [
  { label: 'News',    href: '/news'       },
  { label: 'Airdrops', href: '/airdrops'  },
  { label: 'Guides',   href: '/guides'    },
  { label: 'Bitcoin',  href: '/bitcoin'   },
  { label: 'Pre-sale', href: '/presale'   },
]

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen]   = useState(false)
  const [isMenuOpen, setIsMenuOpen]     = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex-shrink-0">
              <Image
                src="/images/idontknowcrypto-logo.png"
                alt="iDontKnowCrypto"
                width={140}
                height={40}
                priority
              />
            </a>
          </Link>

          {/* Nav links desktop */}
          <div className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className="text-gray-700 hover:text-primary font-medium">
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger + Search + Login */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setIsMenuOpen((v) => !v)
                setIsSearchOpen(false)
                setIsLoginOpen(false)
              }}
              aria-label="Toggle menu"
              className="p-2 rounded hover:bg-gray-100 md:hidden"
            >
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <button
              onClick={() => {
                setIsSearchOpen((v) => !v)
                setIsMenuOpen(false)
                setIsLoginOpen(false)
              }}
              aria-label="Search articles"
              className="p-2 rounded hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.15 6.15a7.5 7.5 0 0 0 10.5 10.5z" />
              </svg>
            </button>

            <button
              onClick={() => {
                setIsLoginOpen((v) => !v)
                setIsSearchOpen(false)
                setIsMenuOpen(false)
              }}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            >
              Log in
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow border-t z-40">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        )}

        {/* Dropdowns */}
        {isSearchOpen && <SearchDropdown onClose={() => setIsSearchOpen(false)} />}
        {isLoginOpen  && <LoginDropdown onClose={() => setIsLoginOpen(false)} />}
      </nav>

      {/* Spacer para evitar overlap */}
      <div className="h-16" />
    </>
  )
}
