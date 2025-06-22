// Categoria de notícias (país, tema, etc.)
export interface Category {
  name: string
  slug: string
}

// Artigo / Notícia
export interface Article {
  slug: string
  category: string
  title: string
  excerpt: string
  imageUrl: string
  publishedAt: string
  // author?: string
}

// Preço de criptomoeda (ticker)
export interface CryptoPrice {
  symbol: string
  price: number
  change24h: number   // variação nas últimas 24h
}
