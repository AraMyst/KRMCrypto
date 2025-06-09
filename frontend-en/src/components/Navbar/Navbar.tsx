import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchModal from './SearchModal';

const NAV_LINKS = [
  { label: 'News', href: '/news/global' },
  { label: 'Airdrops', href: '/airdrops' },
  { label: 'Guides', href: '/guides' },
  { label: 'Bitcoin', href: '/category/bitcoin' },
  { label: 'Pre-sale', href: '/presale' },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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

          {/* Nav links */}
          <div className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className="text-gray-700 hover:text-primary font-medium">
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          {/* Search + Login */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search articles"
              className="p-2 rounded hover:bg-gray-100"
            >
              {/* lupa simples em SVG */}
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.15 6.15a7.5 7.5 0 0 0 10.5 10.5z"
                />
              </svg>
            </button>

            <Link href="/auth/login">
              <a className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
                Log in
              </a>
            </Link>
          </div>
        </div>
      </nav>

      {/* espaço para não sobrepor o conteúdo */}
      <div className="h-16" />

      {/* Search Modal */}
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </>
  );
}
