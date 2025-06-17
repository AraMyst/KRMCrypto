// src/pages/news/Global/index.tsx
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import ArticleCard from '../../../components/ArticleCard'
import { Article } from '../../../types'

interface GlobalNewsIndexProps {
  articles: Article[]
}

export default function GlobalNewsIndexPage({ articles }: GlobalNewsIndexProps) {
  // ordena do mais recente para o mais antigo
  const sorted = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  const featured = sorted.slice(0, 3)
  const others = sorted.slice(3)

  return (
    <>
      <Head>
        <title>Global News – iDontKnowCrypto</title>
        <meta
          name="description"
          content="As últimas notícias Global, com destaques e lista completa."
        />
      </Head>
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        <h1 className="text-3xl font-bold">Global News</h1>

        {/* Destaques: três mais recentes com imagem grande, título sobreposto e excerpt abaixo */}
        <div className="space-y-12">
          {featured.map((article) => (
            <article key={article.slug}>
              <Link href={`/news/Global/${article.slug}`} legacyBehavior>
                <a className="block relative">
                  <div className="w-full h-64 relative rounded overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      layout="fill"
                      objectFit="cover"
                    />
                    <h2 className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-2xl p-4 font-semibold">
                      {article.title}
                    </h2>
                  </div>
                </a>
              </Link>
              <p className="mt-4 text-lg leading-relaxed">{article.excerpt}</p>
            </article>
          ))}
        </div>

        {/* Outros artigos: grid de cards menores */}
        {others.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">More Global News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((article) => (
                <ArticleCard
                  key={article.slug}
                  slug={article.slug}
                  category={article.category}
                  title={article.title}
                  excerpt={article.excerpt}
                  imageUrl={article.imageUrl}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<GlobalNewsIndexProps> = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/news?category=global`
    )
    const articles: Article[] = await res.json()
    return { props: { articles } }
  } catch (err) {
    console.error('Error fetching Global articles:', err)
    return { props: { articles: [] } }
  }
}
