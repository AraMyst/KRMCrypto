// src/pages/news/UK/index.tsx
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import ArticleCard from '../../../components/ArticleCard'
import { Article } from '../../../types'

interface UKNewsIndexProps {
  articles: Article[]
}

export default function UKNewsIndexPage({ articles }: UKNewsIndexProps) {
  // ordena do mais recente para o mais antigo
  const sorted = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  const featured = sorted.slice(0, 3)
  const others = sorted.slice(3)

  return (
    <>
      <Head>
        <title>UK News – iDontKnowCrypto</title>
        <meta
          name="description"
          content="Últimas notícias do UK – iDontKnowCrypto"
        />
      </Head>
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        <h1 className="text-3xl font-bold">UK News</h1>

        {/* Destaques */}
        <div className="space-y-12">
          {featured.map((article) => (
            <article key={article.slug}>
              <Link href={`/news/UK/${article.slug}`}>
                <a className="block relative">
                  <div className="w-full h-64 relative">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                    <h2 className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-2xl p-4 font-semibold w-full">
                      {article.title}
                    </h2>
                  </div>
                </a>
              </Link>
              <p className="mt-4 text-lg leading-relaxed">{article.excerpt}</p>
            </article>
          ))}
        </div>

        {/* Outros artigos */}
        {others.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">More UK News</h2>
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

export const getServerSideProps: GetServerSideProps<UKNewsIndexProps> = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/news?category=uk`
    )
    const articles: Article[] = await res.json()
    return { props: { articles } }
  } catch (err) {
    console.error('Error fetching UK articles:', err)
    return { props: { articles: [] } }
  }
}
