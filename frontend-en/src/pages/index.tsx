// src/pages/index.tsx
import { useState, useEffect } from 'react';
import useGeoCategories, { Category } from '../hooks/useGeoCategories';
import CategoryCarousel, { Article } from '../components/CategoryCarousel/CategoryCarousel';
import apiClient from '../utils/apiClient';

export default function HomePage() {
  const { categories, loading, error } = useGeoCategories();
  const [articlesMap, setArticlesMap] = useState<Record<string, Article[]>>({});

  // Carrega os artigos para cada categoria assim que elas chegam
  useEffect(() => {
    if (loading || error) return;

    categories.forEach((cat: Category) => {
      // busca 5 artigos recentes para cada categoria
      apiClient
        .get<Article[]>(`/api/news?category=${encodeURIComponent(cat.slug)}&limit=5`)
        .then((resp) => {
          setArticlesMap((prev) => ({
            ...prev,
            [cat.slug]: resp.data,
          }));
        })
        .catch((err) => {
          console.error(`Failed fetching articles for ${cat.slug}:`, err);
          setArticlesMap((prev) => ({
            ...prev,
            [cat.slug]: [],
          }));
        });
    });
  }, [categories, loading, error]);

  if (loading) {
    return <div className="pt-24 text-center">Loading categories…</div>;
  }

  if (error) {
    return (
      <div className="pt-24 text-center text-red-600">
        Error loading categories: {error}
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 pt-8 pb-16">
      {categories.map((cat: Category) => (
        <CategoryCarousel
          key={cat.slug}
          country={cat.name}
          articles={articlesMap[cat.slug] || []}
        />
      ))}
    </main>
  );
}
