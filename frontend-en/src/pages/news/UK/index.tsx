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
    publishedAt: '2023-01-01',
  },
  {
    slug: 'test2',
    category: 'UK',
    title: 'test2',
    excerpt: 'test2',
    imageUrl: '/images/test2-uk.png',
    publishedAt: '2023-01-02',
  },
  {
    slug: 'test3',
    category: 'UK',
    title: 'test3',
    excerpt: 'test3',
    imageUrl: '/images/test3-uk.png',
    publishedAt: '2023-01-03',
  },
];

interface UKNewsTestIndexProps {
  articles: Article[];
}

export default function UKNewsTestIndex({ articles }: UKNewsTestIndexProps) {
  return (
    <>
      <Head>
        <title>UK News – iDontKnowCrypto (Test)</title>
        <meta
          name="description"
          content="Página de teste UK News com artigos estáticos."
        />
      </Head>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">UK News (Test)</h1>
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
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/news?category=uk`
    );
    const articles: Article[] = await res.json();
    return { props: { articles } };
  } catch (err) {
    console.error('Error fetching UK articles:', err);
    return { props: { articles: [] } };
  }
};
