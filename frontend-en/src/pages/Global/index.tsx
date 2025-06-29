// src/pages/global/index.tsx
import Head from 'next/head'
import Link from 'next/link'
import { Article } from '../../types'

const articles: Article[] = [
  /* mesmos 7 artigos, com category: 'Global' */
]

const globalArticles: Article[] = [
  articles[5], // FCA Consulta
  articles[6], // Ownership Growth
  articles[1], // UK Crypto Investigator (destaque)
  articles[0],
  articles[2],
  articles[3],
  articles[4],
]

const [feature1, feature2, special, ...rest] = globalArticles

const specialText = `Diante do aumento expressivo de casos de insolvência envolvendo cripto, o UK Insolvency Service nomeou seu primeiro especialista em cripto para otimizar processos de recuperação de ativos digitais.`

export default function GlobalIndexPage() {
  return (
    <>
      <Head>
        <title>Global – iDontKnowCrypto</title>
        <meta
          name="description"
          content="Notícias globais sobre criptomoedas: reguladores, mercado e inovações."
        />
      </Head>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-12 flex flex-col items-center text-center lg:flex-row lg:items-start gap-6">
          <Link href={`/global/${special.slug}`} legacyBehavior>
            <a className="block lg:w-1/2">
              <img
                src={special.imageUrl}
                alt={special.title}
                className="w-full h-56 md:h-64 lg:h-72 object-cover rounded"
              />
            </a>
          </Link>
          <div className="lg:w-1/2">
            <Link href={`/global/${special.slug}`} legacyBehavior>
              <a>
                <h2 className="text-2xl font-bold hover:underline">
                  {special.title}
                </h2>
              </a>
            </Link>
            <p className="mt-4 text-base text-justify">{specialText}</p>
            <Link href={`/global/${special.slug}`} legacyBehavior>
              <a className="mt-4 inline-block text-blue-600 hover:underline">
                Read more
              </a>
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {[feature1, feature2].map((article) => (
            <article key={article.slug}>
              <Link href={`/global/${article.slug}`} legacyBehavior>
                <a className="block">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-64 object-cover rounded"
                  />
                </a>
              </Link>
              <Link href={`/global/${article.slug}`} legacyBehavior>
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

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article) => (
            <article key={article.slug}>
              <Link href={`/global/${article.slug}`} legacyBehavior>
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
