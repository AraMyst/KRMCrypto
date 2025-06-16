// src/pages/news/index.tsx
import Head from 'next/head'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { Article } from '../../types'

// Width of one card + gap
const CARD_WIDTH = 256
const GAP = 16
const FULL_WIDTH = CARD_WIDTH + GAP

// Define all regions with display name and slug
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

// Seven test articles, reused for each region
const baseArticles = [
  {
    slug: 'uk-crypto-investigator-insolvency-cases',
    title: 'UK Strengthens Efforts to Recover Crypto from Insolvency and Criminal Cases',
    excerpt:
      'In response to a dramatic surge in insolvency cases involving cryptocurrencies, the UK Insolvency Service has appointed its first dedicated crypto specialist.',
    publishedAt: '2025-06-15',
  },
  {
    slug: 'uk-fca-crypto-etns-retail-investors',
    title: "UK's FCA Proposes Removing Ban on Crypto ETNs for Retail Investors",
    excerpt:
      "The UK's Financial Conduct Authority has proposed ending its prohibition on retail investors accessing crypto exchange‐traded notes.",
    publishedAt: '2025-06-15',
  },
  {
    slug: 'ig-group-crypto-trading-uk-retail-investors',
    title: 'IG Group Introduces Direct Crypto Trading for UK Retail Investors',
    excerpt:
      'IG Group now offers direct spot trading of 31 cryptocurrencies to its UK retail clients via a partnership with Uphold.',
    publishedAt: '2025-06-15',
  },
  {
    slug: 'reform-uk-accepts-crypto-donations-nigel-farage',
    title: 'Reform UK Embraces Crypto Donations, Announces Ambitious Digital Finance Agenda',
    excerpt:
      "Nigel Farage announced Reform UK will accept crypto donations, becoming the first major British party to do so.",
    publishedAt: '2025-06-15',
  },
  {
    slug: 'uk-fca-stablecoin-crypto-custody-regulation',
    title: 'UK’s FCA Opens Consultation on Stablecoin and Crypto Custody Regulations',
    excerpt:
      'The FCA has opened a consultation to gather feedback on rules for stablecoin issuers and crypto custody providers.',
    publishedAt: '2025-06-15',
  },
  {
    slug: 'uk-crypto-ownership-growth-2025',
    title: 'UK Tops Global Crypto Ownership Growth in 2025 Amid Regulatory Ambiguity',
    excerpt:
      'In 2025, UK recorded the fastest year-over-year increase in crypto ownership among major economies.',
    publishedAt: '2025-06-15',
  },
  {
    slug: 'bcp-technologies-pound-stablecoin-launch',
    title: 'BCP Technologies Introduces New British Pound-Backed Stablecoin',
    excerpt:
      'BCP has launched tGBP, a pound-backed stablecoin serving as a blueprint for upcoming FCA regulations.',
    publishedAt: '2025-06-15',
  },
]

// Build testArticles per region
const testArticles: Record<string, Article[]> = {}
regions.forEach(({ name, slug }) => {
  testArticles[slug] = baseArticles.map(a => ({
    slug: a.slug,
    category: name,
    title: a.title,
    excerpt: a.excerpt,
    imageUrl: `/images/${a.slug}-${slug}.png`,
    publishedAt: a.publishedAt,
  }))
})

function CarouselSection({ region }: { region: typeof regions[0] }) {
  const { name, slug } = region
  const items = [...testArticles[slug]].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const ref = useRef<HTMLDivElement>(null)
  const [start, setStart] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)

  useEffect(() => {
    function update() {
      if (!ref.current) return
      const width = ref.current.clientWidth
      const count = Math.max(1, Math.min(4, Math.floor(width / FULL_WIDTH)))
      setVisibleCount(count)
      setStart(s => Math.min(s, items.length - count))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
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
          onClick={() => setStart(s => Math.max(0, s - 1))}
          disabled={start === 0}
          style={{ color: '#5293C6' }}
          className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-75 p-2 rounded-full"
        >
          ‹
        </button>
        <div ref={ref} className="flex overflow-hidden space-x-4 py-2">
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
          onClick={() => setStart(s => Math.min(maxStart, s + 1))}
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
          content="Latest news across multiple regions with carousel navigation."
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
