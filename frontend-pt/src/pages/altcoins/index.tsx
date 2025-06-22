// src/pages/altcoins/index.tsx
import Head from 'next/head'
import { useEffect, useState } from 'react'
import apiClient from '../../utils/apiClient'
import { Article } from '../../types'
import ArticleCard from '../../components/ArticleCard'

export default function AltcoinsPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const resp = await apiClient.get<Article[]>(
          '/posts?subcategory=altcoins'
        )
        setArticles(resp.data)
      } catch (err) {
        console.error('Erro ao carregar artigos de Altcoins', err)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  return (
    <>
      <Head>
        <title>Altcoins – NaoseiCripto</title>
        <meta
          name="description"
          content="Notícias sobre Altcoins explicadas de maneira simples para quem está começando."
        />
      </Head>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Altcoins</h1>

        {loading ? (
          <p>Carregando artigos...</p>
        ) : articles.length === 0 ? (
          <p className="text-gray-600">Nenhum artigo de Altcoins publicado ainda.</p>
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
