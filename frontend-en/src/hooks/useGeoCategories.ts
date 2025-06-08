import { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';

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
        // 1) Pega a localização do usuário
        const geoRes = await apiClient.get<{ country: string }>('/api/geo');
        const userCountry = geoRes.data.country.toLowerCase();

        // 2) Busca todas as categorias (países) disponíveis
        const catRes = await apiClient.get<Category[]>('/api/news/categories');
        const fetched = catRes.data;

        // 3) Reordena trazendo o país do usuário (ou "global") para primeiro
        const ordered = [...fetched];
        const matchIdx = ordered.findIndex(
          (c) =>
            c.slug.toLowerCase() === userCountry ||
            c.name.toLowerCase() === userCountry
        );

        if (matchIdx > 0) {
          const [matched] = ordered.splice(matchIdx, 1);
          ordered.unshift(matched);
        } else {
          // Se não achou, traz "global" como fallback
          const globalIdx = ordered.findIndex(
            (c) =>
              c.slug.toLowerCase() === 'global' ||
              c.name.toLowerCase() === 'global'
          );
          if (globalIdx > 0) {
            const [globalCat] = ordered.splice(globalIdx, 1);
            ordered.unshift(globalCat);
          }
        }

        setCategories(ordered);
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
