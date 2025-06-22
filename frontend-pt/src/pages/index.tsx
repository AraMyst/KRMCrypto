// src/pages/index.tsx
import Head from 'next/head'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { Article } from '../types'
import { fetchUserGeo } from '../utils/geo'

const CARD_WIDTH = 256
const GAP = 16
const FULL_WIDTH = CARD_WIDTH + GAP

const categorias = [
  { label: 'Brasil',   folder: 'brasil'   },
  { label: 'África',   folder: 'africa'   },
  { label: 'Portugal', folder: 'portugal' },
  { label: 'Global',   folder: 'global'   },
] as const

type Categoria = typeof categorias[number]

// Como ainda não há artigos publicados, deixamos cada lista vazia:
const artigosPorCategoria: Record<string, Article[]> = {}
categorias.forEach(({ folder }) => {
  artigosPorCategoria[folder] = []
})

function CarouselSection({ categoria }: { categoria: Categoria }) {
  const { label, folder } = categoria
  const items = artigosPorCategoria[folder]

  const containerRef = useRef<HTMLDivElement>(null)
  const [start, setStart] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)

  useEffect(() => {
    function updateCount() {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const count = Math.max(1, Math.min(4, Math.floor(width / FULL_WIDTH)))
      setVisibleCount(count)
      setStart(s => Math.min(s, Math.max(0, items.length - count)))
    }
    updateCount()
    window.addEventListener('resize', updateCount)
    return () => window.removeEventListener('resize', updateCount)
  }, [items.length])

  const maxStart = Math.max(0, items.length - visibleCount)
  const visibleItems = items.slice(start, start + visibleCount)

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">
        <Link href={`/${folder}`}>
          <a className="hover:underline">{label}</a>
        </Link>
      </h2>

      <div className="relative">
        <button
          onClick={() => setStart(s => Math.max(0, s - 1))}
          disabled={start === 0}
          className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-75 p-2 rounded-full"
        >
          ‹
        </button>

        <div
          ref={containerRef}
          className="flex overflow-hidden space-x-4 py-2"
        >
          {visibleItems.map(article => (
            <Link
              key={article.slug}
              href={`/${folder}/${article.slug}`}
              passHref
              className="relative flex-shrink-0 w-64 h-40 rounded overflow-hidden"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-semibold p-2 text-center">
                {article.title}
              </div>
            </Link>
          ))}

          {items.length === 0 && (
            <div className="w-full text-center text-gray-500 py-8">
              Sem notícias publicadas ainda.
            </div>
          )}
        </div>

        <button
          onClick={() => setStart(s => Math.min(maxStart, s + 1))}
          disabled={start >= maxStart}
          className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-75 p-2 rounded-full"
        >
          ›
        </button>
      </div>
    </section>
  )
}

export default function HomePage() {
  const [order, setOrder] = useState<string[]>(categorias.map(c => c.folder))

  useEffect(() => {
    ;(async () => {
      try {
        const { countryCode2 } = await fetchUserGeo()
        const code = countryCode2 ?? ''

        // determina categoria principal pela sigla
        let primary = 'global'
        if (code === 'BR')      primary = 'brasil'
        else if (code === 'PT') primary = 'portugal'
        else if ([
          'DZ','AO','BJ','BW','BF','BI','CM','CV','CF','TD','KM','CG','CD',
          'CI','DJ','EG','GQ','ER','SZ','ET','GA','GM','GH','GN','GW','KE',
          'LS','LR','LY','MG','MW','ML','MR','MU','YT','MA','MZ','NA','NE',
          'NG','RW','RE','SH','ST','SN','SC','SL','SO','ZA','SS','SD','TZ',
          'TG','TN','UG','EH','ZM','ZW'
        ].includes(code)) {
          primary = 'africa'
        }

        const staticOrder = categorias.map(c => c.folder)
        let newOrder: string[]

        if (primary !== 'global') {
          newOrder = [
            primary,
            'global',
            ...staticOrder.filter(f => f !== primary && f !== 'global'),
          ]
        } else {
          newOrder = [
            'global',
            ...staticOrder.filter(f => f !== 'global'),
          ]
        }

        setOrder(newOrder)
      } catch {
        // se falhar, fica no ordem padrão
      }
    })()
  }, [])

  return (
    <>
      <Head>
        <title>Notícias – NaoseiCripto</title>
        <meta
          name="description"
          content="Últimas notícias de criptomoedas, ordenadas conforme sua localização."
        />
      </Head>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {order.map(folder => {
          const cat = categorias.find(c => c.folder === folder)!
          return <CarouselSection key={folder} categoria={cat} />
        })}
      </main>
    </>
  )
}
