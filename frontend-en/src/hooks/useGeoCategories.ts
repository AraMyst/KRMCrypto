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
        // Busca todas as categorias disponíveis
        const catRes = await apiClient.get<Category[]>('/api/categories');
        const fetched = catRes.data;

        // Sem geolocalização, apenas usa a ordem vinda da API
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
