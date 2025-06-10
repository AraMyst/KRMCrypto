// src/pages/news/UK/index.tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ArticleCard from '../../../components/ArticleCard';
import { Article } from '../../../types';

const testArticles: Article[] = [
  {
    slug: 'test1',
    category: 'UK',
    title: 'test1',
    excerpt: 'test1',
    imageUrl: '/images/test1-uk.png',
  },
  {
    slug: 'test2',
    category: 'UK',
    title: 'test2',
    excerpt: 'test2',
    imageUrl: '/images/test2-uk.png',
  },
  {
    slug: 'test3',
    category: 'UK',
    title: 'test3',
    excerpt: 'test3',
    imageUrl: '/images/test3-uk.png',
  },
];

interface UKNewsTestIndexProps {
  articles: Article[];
}

export default
