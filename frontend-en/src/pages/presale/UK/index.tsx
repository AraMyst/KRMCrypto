// src/pages/presale/UK/index.tsx
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

interface UKPresaleTestIndexProps {
  articles: Article[];
}

export default function UKPresaleTestIndex({
  articles,
}: UKPresaleTestIndexProps) {
  return (
    <>
      <Head>
        <title>UK Presale – iDontKnowCrypto (Test)</title>
        <meta
          name="description"
          content="Página de teste UK Presale com artigos estáticos."
        />
      </Head>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">UK Presale (Test)</h1>
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
