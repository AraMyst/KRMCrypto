// src/pages/guides/index.tsx
import Head from 'next/head'
import Link from 'next/link'
import { Article } from '../../types'

const articles: Article[] = [
  {
    slug: 'ig-group-crypto-trading-uk-retail-investors',
    title: 'IG Group Introduces Direct Crypto Trading for UK Retail Investors',
    excerpt:
      'IG Group, the prominent UK-based trading and financial services provider, has officially launched direct cryptocurrency trading for retail investors.',
    imageUrl: '/images/ig-group-crypto-trading-uk-retail-investors1.png',
    publishedAt: '2025-06-15',
    category: 'Guides',
  },
  {
    slug: 'uk-fca-stablecoin-crypto-custody-regulation',
    title:
      'UK’s FCA Opens Consultation on Stablecoin and Crypto Custody Regulations',
    excerpt:
      'The FCA has opened a consultation for feedback on stablecoin issuers and crypto custody providers.',
    imageUrl:
      '/images/uk-fca-stablecoin-crypto-custody-regulation1.png',
    publishedAt: '2025-06-15',
    category: 'Guides',
  },
  {
    slug: 'uk-crypto-investigator-insolvency-cases',
    title:
      'UK Strengthens Efforts to Recover Crypto from Insolvency and Criminal Cases',
    excerpt:
      'In response to a dramatic surge in insolvency cases involving cryptocurrencies, the UK Insolvency Service has appointed its first dedicated crypto specialist.',
    imageUrl: '/images/uk-crypto-investigator-insolvency-cases1.png',
    publishedAt: '2025-06-15',
    category: 'Guides',
  },
  {
    slug: 'uk-fca-crypto-etns-retail-investors',
    title: "UK's FCA Proposes Removing Ban on Crypto ETNs for Retail Investors",
    excerpt:
      "The UK's Financial Conduct Authority has proposed ending its prohibition on retail investors accessing crypto ETNs.",
    imageUrl: '/images/uk-fca-crypto-etns-retail-investors1.png',
    publishedAt: '2025-06-15',
    category: 'Guides',
  },
  {
    slug: 'reform-uk-accepts-crypto-donations-nigel-farage',
    title:
      'Reform UK Embraces Crypto Donations, Announces Ambitious Digital Finance Agenda',
    excerpt:
      'Nigel Farage announced Reform UK will accept cryptocurrency donations, a first among major British parties.',
    imageUrl:
      '/images/reform-uk-accepts-crypto-donations-nigel-farage1.png',
    publishedAt: '2025-06-15',
    category: 'Guides',
  },
  {
    slug: 'uk-crypto-ownership-growth-2025',
    title:
      'UK Tops Global Crypto Ownership Growth in 2025 Amid Regulatory Ambiguity',
    excerpt:
      'In 2025, the UK recorded the fastest year-over-year increase in crypto ownership among major markets.',
    imageUrl: '/images/uk-crypto-ownership-growth-20251.png',
    publishedAt: '2025-06-15',
    category: 'Guides',
  },
  {
    slug: 'bcp-technologies-pound-stablecoin-launch',
    title:
      'BCP Technologies Introduces New British Pound-Backed Stablecoin',
    excerpt:
      'BCP Technologies has launched tGBP, a pound-backed stablecoin designed as a blueprint for future FCA regulations.',
    imageUrl:
      '/images/bcp-technologies-pound-stablecoin-launch1.png',
    publishedAt: '2025-06-15',
    category: 'Guides',
  },
]

const [feature1, feature2, special, ...rest] = articles

const specialText = `Andrew Small, previously a police investigator with extensive expertise in economic crime, has been recruited specifically to address the complex challenge of tracing and reclaiming cryptocurrencies. Small will leverage his background in forensic financial investigations to support the Insolvency Service’s efforts to locate crypto assets concealed or unreported in insolvency and criminal proceedings. His appointment follows a year-over-year surge in crypto-related bankruptcies that saw digital asset holdings locked away in failed businesses.`

export default function GuidesIndexPage() {
  return (
    <>
      <Head>
        <title>Guides – iDontKnowCrypto</title>
        <meta
          name="description"
          content="In-depth guides to help you navigate sports betting, casinos and cryptocurrencies."
        />
      </Head>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Special Top Story */}
        <section className="mb-12 flex flex-col lg:flex-row items-start gap-6">
          <img
            src={special.imageUrl}
            alt={special.title}
            className="w-full lg:w-1/2 h-auto object-cover rounded"
          />
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold">{special.title}</h2>
            <p className="mt-4 text-base">{specialText}</p>
            <Link href={`/guides/${special.slug}`} legacyBehavior>
              <a className="mt-4 inline-block text-blue-600 hover:underline">
                Read more
              </a>
            </Link>
          </div>
        </section>

        {/* Two Big Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {[feature1, feature2].map((article) => (
            <article key={article.slug}>
              <Link href={`/guides/${article.slug}`} legacyBehavior>
                <a className="block">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-64 object-cover rounded"
                  />
                  <h2 className="mt-4 text-2xl font-bold">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-lg">{article.excerpt}</p>
                </a>
              </Link>
            </article>
          ))}
        </div>

        {/* Grid of Others */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article) => (
            <article key={article.slug}>
              <Link href={`/guides/${article.slug}`} legacyBehavior>
                <a className="block relative h-48 overflow-hidden rounded">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-2">
                    <h3 className="text-white text-lg font-semibold">
                      {article.title}
                    </h3>
                  </div>
                </a>
              </Link>
            </article>
          ))}
        </section>
      </main>
    </>
  )
}
