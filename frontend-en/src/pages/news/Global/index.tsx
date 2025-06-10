// src/pages/news/Global/index.tsx
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

interface GlobalNewsTestIndexProps {
  articles: Article[];
}

export default function GlobalNewsTestIndex({
  articles,
}: GlobalNewsTestIndexProps) {
  return (
    <>
      <Head>
        <title>Global News – iDontKnowCrypto (Test)</title>
        <meta
          name="description"
          content="Página de teste Global News com artigos estáticos."
        />
      </Head>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Global News (Test)</h1>
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/news?category=global`
    );
    const articles: Article[] = await res.json();
    return { props: { articles } };
  } catch (err) {
    console.error('Error fetching Global articles:', err);
    return { props: { articles: [] } };
  }
};
