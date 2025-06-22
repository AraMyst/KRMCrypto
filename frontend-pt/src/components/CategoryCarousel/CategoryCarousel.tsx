import { useRef } from 'react'
import CategoryCard from './CategoryCard'

export interface Article {
  title: string
  slug: string
  category: string
  imageUrl: string
}

interface CategoryCarouselProps {
  localidade: string
  articles: Article[]
  /** Quando true exibe cards maiores (por ex. na página inicial) */
  bigCards?: boolean
}

export default function CategoryCarousel({
  localidade,
  articles,
  bigCards = false,
}: CategoryCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)

  // define o tamanho do card conforme o modo
  const sizeClasses = bigCards ? 'w-64 h-40' : 'w-48 h-32'

  const scroll = (direction: 'esquerda' | 'direita') => {
    if (!carouselRef.current) return
    const { clientWidth } = carouselRef.current
    const scrollAmount = direction === 'esquerda' ? -clientWidth : clientWidth
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <section className="carousel-section">
      <h2 className="carousel-title">{localidade}</h2>
      <div className="carousel-wrapper">
        <button
          aria-label="Rolar para a esquerda"
          onClick={() => scroll('esquerda')}
          className="scroll-button left-0"
        >
          <svg
            className="h-6 w-6 text-current"
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
          aria-label="Rolar para a direita"
          onClick={() => scroll('direita')}
          className="scroll-button right-0"
        >
          <svg
            className="h-6 w-6 text-current"
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
