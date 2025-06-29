// src/pages/new-zealand/index.tsx
import Head from 'next/head'
import Link from 'next/link'
import { Article } from '../../types'

const articles: Article[] = [
  {
    slug: 'bcp-technologies-pound-stablecoin-launch',
    title:
      'BCP Technologies Introduces New British Pound-Backed Stablecoin',
    excerpt:
      'BCP Technologies has launched tGBP, a pound-backed stablecoin designed as a blueprint for future FCA regulations.',
    imageUrl:
      '/images/bcp-technologies-pound-stablecoin-launch1.png',
    publishedAt: '2025-06-15',
    category: 'NewZealand',
  },
  {
    slug: 'uk-crypto-investigator-insolvency-cases',
    title:
      'UK Strengthens Efforts to Recover Crypto from Insolvency and Criminal Cases',
    excerpt:
      'In response to a dramatic surge in insolvency cases involving cryptocurrencies, the UK Insolvency Service has appointed its first dedicated crypto specialist.',
    imageUrl: '/images/uk-crypto-investigator-insolvency-cases1.png',
    publishedAt: '2025-06-15',
    category: 'NewZealand',
  },
  {
    slug: 'reform-uk-accepts-crypto-donations-nigel-farage',
    title:
      'Reform UK Embraces Crypto Donations, Announces Ambitious Digital Finance Agenda',
    excerpt:
      'Nigel Farage, leader of Reform UK, announced a landmark decision allowing the party to accept cryptocurrency donations, making it the first major British party to adopt digital currencies.',
    imageUrl:
      '/images/reform-uk-accepts-crypto-donations-nigel-farage1.png',
    publishedAt: '2025-06-15',
    category: 'NewZealand',
  },
  {
    slug: 'ig-group-crypto-trading-uk-retail-investors',
    title: 'IG Group Introduces Direct Crypto Trading for UK Retail Investors',
    excerpt:
      'IG Group, the prominent UK-based trading and financial services provider, has officially launched direct cryptocurrency trading for retail investors.',
    imageUrl: '/images/ig-group-crypto-trading-uk-retail-investors1.png',
    publishedAt: '2025-06-15',
    category: 'NewZealand',
  },
  {
    slug: 'uk-fca-crypto-etns-retail-investors',
    title: "UK's FCA Proposes Removing Ban on Crypto ETNs for Retail Investors",
    excerpt:
      "The UK's Financial Conduct Authority has proposed ending its prohibition on retail investors accessing crypto ETNs.",
    imageUrl:
      '/images/uk-fca-crypto-etns-retail-investors1.png',
    publishedAt: '2025-06-15',
    category: 'NewZealand',
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
    category: 'NewZealand',
  },
  {
    slug: 'uk-crypto-ownership-growth-2025',
    title:
      'UK Tops Global Crypto Ownership Growth in 2025 Amid Regulatory Ambiguity',
    excerpt:
      'In 2025, the UK recorded the fastest year-over-year increase in crypto ownership among major markets.',
    imageUrl:
      '/images/uk-crypto-ownership-growth-20251.png',
    publishedAt: '2025-06-15',
    category: 'NewZealand',
  },
]

const newZealandArticles: Article[] = [
  articles[2], // Reform UK
  articles[6], // Ownership Growth
  articles[4], // FCA ETNs (destaque principal)
  articles[0],
  articles[1],
  articles[3],
  articles[5],
]

const [feature1, feature2, special, ...rest] = newZealandArticles

const specialText = `A proposta da FCA de liberar ETNs para investidores de varejo pode inspirar mudanças regulatórias na Nova Zelândia, ampliando o acesso a esses produtos sintéticos de criptomoedas.`

export default function NewZealandIndexPage() {
  return (
    <>
      <Head>
        <title>New Zealand – iDontKnowCrypto</title>
        <meta
          name="description"
          content="Tendências cripto na Nova Zelândia: doações, produtos e regulamentos."
        />
      </Head>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Special Top Story */}
        <section className="mb-12 flex flex-col items-center text-center lg:flex-row lg:items-start gap-6">
          <Link href={`/new-zealand/${special.slug}`} legacyBehavior>
            <a className="block lg:w-1/2">
              <img
                src={special.imageUrl}
                alt={special.title}
                className="w-full h-56 md:h-64 lg:h-72 object-cover rounded"
              />
            </a>
          </Link>
          <div className="lg:w-1/2">
            <Link href={`/new-zealand/${special.slug}`} legacyBehavior>
              <a>
                <h2 className="text-2xl font-bold hover:underline">
                  {special.title}
                </h2>
              </a>
            </Link>
            <p className="mt-4 text-base text-justify">{specialText}</p>
            <Link href={`/new-zealand/${special.slug}`} legacyBehavior>
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
              <Link href={`/new-zealand/${article.slug}`} legacyBehavior>
                <a className="block">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-64 object-cover rounded"
                  />
                </a>
              </Link>
              <Link href={`/new-zealand/${article.slug}`} legacyBehavior>
                <a>
                  <h2 className="mt-4 text-2xl font-bold">
                    {article.title}
                  </h2>
                </a>
              </Link>
              <p className="mt-2 text-lg text-justify">{article.excerpt}</p>
            </article>
          ))}
        </div>

        {/* Grid of Others */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article) => (
            <article key={article.slug}>
              <Link href={`/new-zealand/${article.slug}`} legacyBehavior>
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
