// src/pages/portugal/index.tsx
import Head from 'next/head'
import { useEffect, useState } from 'react'
import apiClient from '../../utils/apiClient'
import { Article } from '../../types'
import ArticleCard from '../../components/ArticleCard'

export default function PortugalPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const resp = await apiClient.get<Article[]>(
          '/api/articles?category=portugal'
        )
        setArticles(resp.data)
      } catch (err) {
        console.error('Erro ao carregar artigos de Portugal', err)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  return (
    <>
      <Head>
        <title>Portugal – NaoseiCripto</title>
        <meta
          name="description"
          content="Notícias sobre criptomoedas no mercado português, apresentadas de forma simples."
        />
      </Head>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Portugal</h1>

        {loading ? (
          <p>Carregando notícias de Portugal…</p>
        ) : articles.length === 0 ? (
          <p className="text-gray-600">Nenhuma notícia publicada para Portugal ainda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map(article => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
