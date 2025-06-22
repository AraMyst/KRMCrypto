// components/CategoryCarousel/CategoryCarousel.tsx
import { useRef } from 'react'
import CategoryCard from './CategoryCard'

export interface Article {
  title: string
  slug: string
  category: string
  imageUrl: string
}

interface CategoryCarouselProps {
  country: string
  articles: Article[]
  /** Quando true exibe cards maiores (por ex. no News) */
  bigCards?: boolean
}

export default function CategoryCarousel({
  country,
  articles,
  bigCards = false,
}: CategoryCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)

  // define tamanho do card conforme o modo
  const sizeClasses = bigCards ? 'w-64 h-40' : 'w-48 h-32'

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    const { clientWidth } = carouselRef.current
    const scrollAmount = direction === 'left' ? -clientWidth : clientWidth
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <section className="carousel-section">
      <h2 className="carousel-title">{country}</h2>
      <div className="carousel-wrapper">
        <button
          aria-label="Scroll left"
          onClick={() => scroll('left')}
          className="scroll-button left-0"
        >
          <svg
            className="h-6 w-6 text-[#5293C6]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div ref={carouselRef} className="scroll-container">
          {articles.map((article) => (
            <CategoryCard
              key={article.slug}
              article={article}
              sizeClasses={sizeClasses}
            />
          ))}
        </div>

        <button
          aria-label="Scroll right"
          onClick={() => scroll('right')}
          className="scroll-button right-0"
        >
          <svg
            className="h-6 w-6 text-[#5293C6]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  )
}
