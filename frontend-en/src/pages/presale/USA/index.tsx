// src/pages/presale/USA/index.tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ArticleCard from '../../../components/ArticleCard';
import { Article } from '../../../types';

const testArticles: Article[] = [
  {
    slug: 'test1',
    category: 'USA',
    title: 'test1',
    excerpt: 'test1',
    imageUrl: '/images/test1-usa.png',
    publishedAt: '2023-01-01',
  },
  {
    slug: 'test2',
    category: 'USA',
    title: 'test2',
    excerpt: 'test2',
    imageUrl: '/images/test2-usa.png',
    publishedAt: '2023-01-02',
  },
  {
    slug: 'test3',
    category: 'USA',
    title: 'test3',
    excerpt: 'test3',
    imageUrl: '/images/test3-usa.png',
    publishedAt: '2023-01-03',
  },
];

interface USAPresaleTestIndexProps {
  articles: Article[];
}

export default function USAPresaleTestIndex({
  articles,
}: USAPresaleTestIndexProps) {
  return (
    <>
      <Head>
        <title>USA Presale – iDontKnowCrypto (Test)</title>
        <meta
          name="description"
          content="Página de teste USA Presale com artigos estáticos."
        />
      </Head>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">USA Presale (Test)</h1>
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
