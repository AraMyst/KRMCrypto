// src/types/index.d.ts

// Dados básicos do usuário retornados pela API
export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  // outros campos se houver, ex: role, subscriptionStatus…
}

// Categoria (país, tema, etc.)
export interface Category {
  name: string;
  slug: string;
}

// Artigo / Notícia
export interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  publishedAt: string;
  // author?: string;
}

// Preço de criptomoeda
export interface CryptoPrice {
  symbol: string;
  price: number;
}

// Dados de assinatura
export interface Subscription {
  id: string;
  plan: 'daily' | 'weekly' | 'monthly';
  status: string;
  nextBillingDate: string;
}
