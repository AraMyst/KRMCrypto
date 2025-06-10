// src/pages/bitcoin/Global/index.tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ArticleCard from '../../../components/ArticleCard';
import { Article } from '../../../types';

const testArticles: Article[] = [
  {
    slug: 'test1',
    category: 'Global',
    title: 'test1',
    excerpt: 'test1',
    imageUrl: '/images/test1-global.png',
  },
  {
    slug: 'test2',
    category: 'Global',
    title: 'test2',
    excerpt: 'test2',
    imageUrl: '/images/test2-global.png',
  },
  {
    slug: 'test3',
    category: 'Global',
    title: 'test3',
    excerpt: 'test3',
    imageUrl: '/images/test3-global.png',
  },
];

interface BitcoinGlobalIndexProps {
  articles: Article[];
}

export default function BitcoinGlobalIndex({ articles }: BitcoinGlobalIndexProps) {
  return (
    <>
      <Head>
        <title>Global Bitcoin – iDontKnowCrypto (Test)</title>
        <meta
          name="description"
          content="Página de teste Global Bitcoin com artigos estáticos."
        />
      </Head>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Global Bitcoin (Test)</h1>
        <div className="space-y-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              slug={article.slug}
              category={article.category}
              title={article.title}
              excerpt={article.excerpt}
              imageUrl={article.imageUrl}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      articles: testArticles,
    },
  };
};
