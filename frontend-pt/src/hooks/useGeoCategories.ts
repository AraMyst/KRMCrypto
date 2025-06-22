import { useState, useEffect } from 'react'
import apiClient from '../utils/apiClient'
import { fetchUserGeo } from '../utils/geo'

export interface Category {
  name: string
  slug: string
}

interface GeoCategoriesHook {
  categories: Category[]
  loading: boolean
  error: string | null
}

/**
 * Hook que busca todas as categorias (países) do backend
 * e coloca primeiro a que corresponde à localização do usuário.
 */
export default function useGeoCategories(): GeoCategoriesHook {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function carregar() {
      setLoading(true)
      setError(null)
      try {
        // busca lista completa de categorias
        const resp = await apiClient.get<Category[]>('/api/categories')
        let lista = resp.data

        // tenta obter país do usuário
        try {
          const geo = await fetchUserGeo()
          const country = geo.countryName?.toLowerCase()
          if (country) {
            lista = [...lista].sort((a, b) => {
              const aMatch =
                a.name.toLowerCase() === country ||
                a.slug.toLowerCase() === country
              const bMatch =
                b.name.toLowerCase() === country ||
                b.slug.toLowerCase() === country
              if (aMatch && !bMatch) return -1
              if (!aMatch && bMatch) return 1
              return 0
            })
          }
        } catch {
          // falha na geolocalização, segue sem ordenar
        }

        setCategories(lista)
      } catch (err: any) {
        console.error('Falha ao carregar categorias', err)
        setError('Falha ao carregar categorias')
      } finally {
        setLoading(false)
      }
    }

    carregar()
  }, [])

  return { categories, loading, error }
}
