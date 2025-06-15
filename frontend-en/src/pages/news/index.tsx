// pages/news/index.tsx
import Head from 'next/head'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { Article } from '../../types'
import { fetchUserGeo } from '../../utils/geo'

const CARD_WIDTH = 256
const GAP = 16
const FULL_WIDTH = CARD_WIDTH + GAP

// Dados de teste — substitua pela sua fonte real (API, getStaticProps etc.)
const testArticles: Record<string, Article[]> = {
  uk: [
    { slug: 'test7', category: 'UK', title: 'test7', excerpt: 'excerpt7', imageUrl: '/images/test7-uk.png', publishedAt: '2023-01-07' },
    { slug: 'test6', category: 'UK', title: 'test6', excerpt: 'excerpt6', imageUrl: '/images/test6-uk.png', publishedAt: '2023-01-06' },
    { slug: 'test5', category: 'UK', title: 'test5', excerpt: 'excerpt5', imageUrl: '/images/test5-uk.png', publishedAt: '2023-01-05' },
    { slug: 'test4', category: 'UK', title: 'test4', excerpt: 'excerpt4', imageUrl: '/images/test4-uk.png', publishedAt: '2023-01-04' },
    { slug: 'test3', category: 'UK', title: 'test3', excerpt: 'excerpt3', imageUrl: '/images/test3-uk.png', publishedAt: '2023-01-03' },
    { slug: 'test2', category: 'UK', title: 'test2', excerpt: 'excerpt2', imageUrl: '/images/test2-uk.png', publishedAt: '2023-01-02' },
    { slug: 'test1', category: 'UK', title: 'test1', excerpt: 'excerpt1', imageUrl: '/images/test1-uk.png', publishedAt: '2023-01-01' },
  ],
  usa: [
    { slug: 'test7', category: 'USA', title: 'test7', excerpt: 'excerpt7', imageUrl: '/images/test7-usa.png', publishedAt: '2023-01-07' },
    { slug: 'test6', category: 'USA', title: 'test6', excerpt: 'excerpt6', imageUrl: '/images/test6-usa.png', publishedAt: '2023-01-06' },
    { slug: 'test5', category: 'USA', title: 'test5', excerpt: 'excerpt5', imageUrl: '/images/test5-usa.png', publishedAt: '2023-01-05' },
    { slug: 'test4', category: 'USA', title: 'test4', excerpt: 'excerpt4', imageUrl: '/images/test4-usa.png', publishedAt: '2023-01-04' },
    { slug: 'test3', category: 'USA', title: 'test3', excerpt: 'excerpt3', imageUrl: '/images/test3-usa.png', publishedAt: '2023-01-03' },
    { slug: 'test2', category: 'USA', title: 'test2', excerpt: 'excerpt2', imageUrl: '/images/test2-usa.png', publishedAt: '2023-01-02' },
    { slug: 'test1', category: 'USA', title: 'test1', excerpt: 'excerpt1', imageUrl: '/images/test1-usa.png', publishedAt: '2023-01-01' },
  ],
  global: [
    { slug: 'test7', category: 'Global', title: 'test7', excerpt: 'excerpt7', imageUrl: '/images/test7-global.png', publishedAt: '2023-01-07' },
    { slug: 'test6', category: 'Global', title: 'test6', excerpt: 'excerpt6', imageUrl: '/images/test6-global.png', publishedAt: '2023-01-06' },
    { slug: 'test5', category: 'Global', title: 'test5', excerpt: 'excerpt5', imageUrl: '/images/test5-global.png', publishedAt: '2023-01-05' },
    { slug: 'test4', category: 'Global', title: 'test4', excerpt: 'excerpt4', imageUrl: '/images/test4-global.png', publishedAt: '2023-01-04' },
    { slug: 'test3', category: 'Global', title: 'test3', excerpt: 'excerpt3', imageUrl: '/images/test3-global.png', publishedAt: '2023-01-03' },
    { slug: 'test2', category: 'Global', title: 'test2', excerpt: 'excerpt2', imageUrl: '/images/test2-global.png', publishedAt: '2023-01-02' },
    { slug: 'test1', category: 'Global', title: 'test1', excerpt: 'excerpt1', imageUrl: '/images/test1-global.png', publishedAt: '2023-01-01' },
  ],
}

function CarouselSection({ country }: { country: 'UK' | 'USA' | 'Global' }) {
  const key = country.toLowerCase()
  const items = [...testArticles[key]].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const [start, setStart] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)

  useEffect(() => {
    function updateCount() {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const count = Math.max(1, Math.min(4, Math.floor(width / FULL_WIDTH)))
      setVisibleCount(count)
      setStart(s => Math.min(s, items.length - count))
    }
    updateCount()
    window.addEventListener('resize', updateCount)
    return () => window.removeEventListener('resize', updateCount)
  }, [items.length])

  const maxStart = items.length - visibleCount
  const prevDisabled = start <= 0
  const nextDisabled = start >= maxStart
  const visibleItems = items.slice(start, start + visibleCount)

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">
        <Link href={`/news/${key}`}>
          <a className="hover:underline">{country} News</a>
        </Link>
      </h2>

      <div className="relative">
        {/* seta esquerda fixa na borda */}
        <button
          onClick={() => setStart(s => Math.max(0, s - 1))}
          disabled={prevDisabled}
          style={{ color: '#5293C6' }}
          className={`
            absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2
            z-10 bg-white bg-opacity-75 p-2 rounded-full
            ${prevDisabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          ‹
        </button>

        <div
          ref={containerRef}
          className="flex overflow-hidden space-x-4 py-2"
        >
          {visibleItems.map(art => (
            <Link
              key={art.slug}
              href={`/news/${country}/${art.slug}`}
              passHref
              className="relative flex-shrink-0 w-64 h-40 rounded overflow-hidden"
            >
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-semibold">
                {art.title}
              </div>
            </Link>
          ))}
        </div>

        {/* seta direita ajustada mais próxima ao último card */}
        <button
          onClick={() => setStart(s => Math.min(maxStart, s + 1))}
          disabled={nextDisabled}
          style={{ color: '#5293C6' }}
          className={`
            absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2
            z-10 bg-white bg-opacity-75 p-2 rounded-full
            ${nextDisabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          ›
        </button>
      </div>
    </section>
  )
}

export default function NewsIndexPage() {
  const [rankedCountries, setRankedCountries] = useState<
    ('UK' | 'USA' | 'Global')[]
  >(['Global', 'UK', 'USA'])

  useEffect(() => {
    ;(async () => {
      try {
        const { countryCode2 } = await fetchUserGeo()
        let primary: 'UK' | 'USA' | 'Global' = 'Global'
        if (countryCode2 === 'GB') primary = 'UK'
        else if (countryCode2 === 'US') primary = 'USA'
        const all: ('UK' | 'USA' | 'Global')[] = ['UK', 'USA', 'Global']
        setRankedCountries([primary, ...all.filter(c => c !== primary)])
      } catch {
        console.error('Falha na geo — usando ordem padrão.')
      }
    })()
  }, [])

  return (
    <>
      <Head>
        <title>News – iDontKnowCrypto</title>
        <meta
          name="description"
          content="Últimas notícias: UK, USA e Global, com navegação em carrossel."
        />
      </Head>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {rankedCountries.map(c => (
          <CarouselSection key={c} country={c} />
        ))}
      </main>
    </>
  )
}
