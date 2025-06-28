// src/pages/regulacao/index.tsx
import Head from 'next/head'
import { useEffect, useState } from 'react'
import apiClient from '../../utils/apiClient'
import { Article } from '../../types'
import ArticleCard from '../../components/ArticleCard'

export default function RegulacaoPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const resp = await apiClient.get<Article[]>(
          '/articles?subcategory=regulacao'
        )
        setArticles(resp.data)
      } catch {
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  return (
    <>
      <Head>
        <title>Regulação – NaoseiCripto</title>
        <meta
          name="description"
          content="Notícias sobre regulação de criptomoedas explicadas de forma clara."
        />
      </Head>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Regulação</h1>

        {loading ? (
          <p>Carregando...</p>
        ) : articles.length === 0 ? (
          <p className="text-gray-600">Nenhum artigo publicado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
