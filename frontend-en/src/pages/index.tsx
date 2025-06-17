// src/pages/index.tsx
import { useState, useEffect } from 'react'
import Link from 'next/link'
import CategoryCarousel, { Article } from '../components/CategoryCarousel/CategoryCarousel'
import apiClient from '../utils/apiClient'
import { fetchUserGeo } from '../utils/geo'

export default function HomePage() {
  // Região para o News: 'uk' | 'europe' | 'global'
  const [region, setRegion] = useState<'uk' | 'europe' | 'global'>('global')
  const [newsPosts, setNewsPosts] = useState<Article[]>([])
  const [articlesMap, setArticlesMap] = useState<Record<string, Article[]>>({})

  // Determina a região do usuário
  useEffect(() => {
    async function determineRegion() {
      try {
        const { countryCode2 } = await fetchUserGeo()
        const code = countryCode2 ?? ''
        const europeCodes = [
          'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR',
          'DE','GR','HU','IE','IT','LV','LT','LU','MT','NL',
          'PL','PT','RO','SK','SI','ES','SE'
        ]

        if (code === 'GB') setRegion('uk')
        else if (europeCodes.includes(code)) setRegion('europe')
        else setRegion('global')
      } catch {
        console.error('Erro ao determinar região, usando global')
        setRegion('global')
      }
    }
    determineRegion()
  }, [])

  // Busca as 3 últimas notícias de acordo com a região
  useEffect(() => {
    apiClient
      .get<Article[]>(`/api/posts?category=news&region=${region}&limit=3`)
      .then(resp => setNewsPosts(resp.data))
      .catch(err => {
        console.error('Falha ao buscar News', err)
        setNewsPosts([])
      })
  }, [region])

  // Configuração das outras quatro categorias
  const otherCats = [
    { slug: 'guides', name: 'Guides' },
    { slug: 'airdrops', name: 'Airdrops' },
    { slug: 'bitcoin', name: 'Bitcoin' },
    { slug: 'presale', name: 'Presale' },
  ]

  // Busca as 4 últimas publicações de cada categoria estática
  useEffect(() => {
    otherCats.forEach(cat => {
      apiClient
        .get<Article[]>(`/api/posts?category=${encodeURIComponent(cat.slug)}&limit=4`)
        .then(resp => {
          setArticlesMap(prev => ({ ...prev, [cat.slug]: resp.data }))
        })
        .catch(err => {
          console.error(`Falha ao buscar ${cat.slug}`, err)
          setArticlesMap(prev => ({ ...prev, [cat.slug]: [] }))
        })
    })
  }, [])

  return (
    <main className="max-w-7xl mx-auto px-4 pt-8 pb-16 space-y-16">
      {/* News */}
      <section>
        <Link href="/news" className="text-3xl font-bold mb-4 inline-block hover:underline" legacyBehavior>
          News
        </Link>
        <CategoryCarousel country="News" articles={newsPosts} bigCards />
      </section>

      {/* Guides, Airdrops, Bitcoin, Presale */}
      {otherCats.map(cat => (
        <section key={cat.slug}>
          <Link href={`/${cat.slug}`} className="text-3xl font-bold mb-4 inline-block hover:underline" legacyBehavior>
            {cat.name}
          </Link>
          <CategoryCarousel
            country={cat.name}
            articles={articlesMap[cat.slug] || []}
          />
        </section>
      ))}
    </main>
  )
}
