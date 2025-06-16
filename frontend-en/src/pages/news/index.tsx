// src/pages/news/index.tsx
import Head from 'next/head'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { Article } from '../../types'

const CARD_WIDTH = 256
const GAP = 16
const FULL_WIDTH = CARD_WIDTH + GAP

// List of all regions to display
const regions = [
  { name: 'UK', slug: 'uk' },
  { name: 'USA', slug: 'usa' },
  { name: 'Global', slug: 'global' },
  { name: 'Canada', slug: 'canada' },
  { name: 'New Zealand', slug: 'new-zealand' },
  { name: 'Africa', slug: 'africa' },
  { name: 'Ireland', slug: 'ireland' },
  { name: 'Australia', slug: 'australia' },
  { name: 'Europe', slug: 'europe' },
]

// Base articles (same for every region)
const baseArticles: Omit<Article, 'category'>[] = [
  {
    slug: 'uk-crypto-investigator-insolvency-cases',
    title:
      'UK Strengthens Efforts to Recover Crypto from Insolvency and Criminal Cases',
    excerpt:
      'In response to a dramatic surge in insolvency cases involving cryptocurrencies, the UK Insolvency Service has recently appointed its first dedicated crypto specialist.',
    imageUrl: '/images/uk-crypto-investigator-insolvency-cases1.png',
    publishedAt: '2025-06-15',
  },
  {
    slug: 'uk-fca-crypto-etns-retail-investors',
    title: "UK's FCA Proposes Removing Ban on Crypto ETNs for Retail Investors",
    excerpt:
      "The UK's Financial Conduct Authority has proposed ending its prohibition on retail investors accessing crypto ETNs, marking a significant policy shift.",
    imageUrl: '/images/uk-fca-crypto-etns-retail-investors1.png',
    publishedAt: '2025-06-15',
  },
  {
    slug: 'ig-group-crypto-trading-uk-retail-investors',
    title: 'IG Group Introduces Direct Crypto Trading for UK Retail Investors',
    excerpt:
      'IG Group has launched direct spot trading for 31 cryptocurrencies to its retail clients.',
    imageUrl: '/images/ig-group-crypto-trading-uk-retail-investors1.png',
    publishedAt: '2025-06-15',
  },
  {
    slug: 'reform-uk-accepts-crypto-donations-nigel-farage',
    title:
      'Reform UK Embraces Crypto Donations, Announces Ambitious Digital Finance Agenda',
    excerpt:
      'Nigel Farage announced Reform UK will accept cryptocurrency donations, a first among major British parties.',
    imageUrl: '/images/reform-uk-accepts-crypto-donations-nigel-farage1.png',
    publishedAt: '2025-06-15',
  },
  {
    slug: 'uk-fca-stablecoin-crypto-custody-regulation',
    title:
      'UK’s FCA Opens Consultation on Stablecoin and Crypto Custody Regulations',
    excerpt:
      'The FCA has opened a consultation for feedback on stablecoin issuers and crypto custody providers.',
    imageUrl: '/images/uk-fca-stablecoin-crypto-custody-regulation1.png',
    publishedAt: '2025-06-15',
  },
  {
    slug: 'uk-crypto-ownership-growth-2025',
    title: 'UK Tops Global Crypto Ownership Growth in 2025 Amid Regulatory Ambiguity',
    excerpt:
      'In 2025, the UK recorded the fastest year-over-year increase in crypto ownership among major markets.',
    imageUrl: '/images/uk-crypto-ownership-growth-20251.png',
    publishedAt: '2025-06-15',
  },
  {
    slug: 'bcp-technologies-pound-stablecoin-launch',
    title: 'BCP Technologies Introduces New British Pound-Backed Stablecoin',
    excerpt:
      'BCP Technologies has launched tGBP, a pound-backed stablecoin designed as a blueprint for future FCA regulations.',
    imageUrl: '/images/bcp-technologies-pound-stablecoin-launch1.png',
    publishedAt: '2025-06-15',
  },
]

// Build per-region articles, preserving same imageUrl and slug
const testArticles: Record<string, Article[]> = {}
regions.forEach(({ name, slug }) => {
  testArticles[slug] = baseArticles.map(a => ({
    ...a,
    category: name,
  }))
})

function CarouselSection({ region }: { region: typeof regions[0] }) {
  const { name, slug } = region
  const items = [...testArticles[slug]].sort(
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
  const visibleItems = items.slice(start, start + visibleCount)

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">
        <Link href={`/news/${slug}`}>
          <a className="hover:underline">{name} News</a>
        </Link>
      </h2>

      <div className="relative">
        <button
          onClick={() => setStart(s => Math.max(0, s - 1)))}
          disabled={start === 0}
          style={{ color: '#5293C6' }}
          className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-75 p-2 rounded-full"
        >
          ‹
        </button>

        <div
          ref={containerRef}
          className="flex overflow-hidden space-x-4 py-2"
        >
          {visibleItems.map(article => (
            <Link
              key={article.slug}
              href={`/news/${slug}/${article.slug}`}
              passHref
              className="relative flex-shrink-0 w-64 h-40 rounded overflow-hidden"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-semibold">
                {article.title}
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={() => setStart(s => Math.min(maxStart, s + 1)))}
          disabled={start >= maxStart}
          style={{ color: '#5293C6' }}
          className="absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-75 p-2 rounded-full"
        >
          ›
        </button>
      </div>
    </section>
  )
}

export default function NewsIndexPage() {
  return (
    <>
      <Head>
        <title>News – iDontKnowCrypto</title>
        <meta
          name="description"
          content="Latest news across regions: UK, USA, Global, Canada, New Zealand, Africa, Ireland, Australia, Europe."
        />
      </Head>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {regions.map(region => (
          <CarouselSection key={region.slug} region={region} />
        ))}
      </main>
    </>
  )
}
