import { useRef } from 'react';
import CategoryCard from './CategoryCard';

export interface Article {
  title: string;
  slug: string;
  category: string;
  imageUrl: string;
}

interface CategoryCarouselProps {
  country: string;
  articles: Article[];
}

export default function CategoryCarousel({ country, articles }: CategoryCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const { clientWidth } = carouselRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4 capitalize">{country}</h2>

      <div className="relative">
        {/* Botão de scroll para esquerda */}
        <button
          aria-label="Scroll left"
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow hover:bg-opacity-100 z-10"
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Container do carrossel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth space-x-4 no-scrollbar px-8"
        >
          {articles.map((article) => (
            <CategoryCard key={article.slug} article={article} />
          ))}
        </div>

        {/* Botão de scroll para direita */}
        <button
          aria-label="Scroll right"
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow hover:bg-opacity-100 z-10"
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
