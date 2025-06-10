import { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';
import { fetchUserGeo } from '../utils/geo';

export interface Category {
  name: string;
  slug: string;
}

interface GeoCategoriesHook {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook que busca a lista de categorias (países) do backend e
 * ordena com base na localização do usuário via API de geolocalização.
 */
export default function useGeoCategories(): GeoCategoriesHook {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // Busca todas as categorias disponíveis
        const catRes = await apiClient.get<Category[]>('/api/categories');
        let fetched = catRes.data;

        try {
          const geo = await fetchUserGeo();
          const country = geo.countryName?.toLowerCase();
          if (country) {
            fetched = [...fetched].sort((a, b) => {
              const aMatch = a.name.toLowerCase() === country || a.slug.toLowerCase() === country;
              const bMatch = b.name.toLowerCase() === country || b.slug.toLowerCase() === country;
              if (aMatch && !bMatch) return -1;
              if (!aMatch && bMatch) return 1;
              return 0;
            });
          }
        } catch (geoErr) {
          // falha ao obter geolocalização não bloqueia
        }

        setCategories(fetched);
      } catch (err: any) {
        console.error('useGeoCategories error:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { categories, loading, error };
}
