// src/pages/news/USA/index.tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ArticleCard from '../../../components/ArticleCard';
import { Article } from '../../../types';

interface USANewsPageProps {
  articles: Article[];
}

export default function USANewsPage({ articles }: USANewsPageProps) {
  return (
    <>
      <Head>
        <title>USA News – iDontKnowCrypto</title>
        <meta
          name="description"
          content="Stay up to date with the latest USA crypto news."
        />
      </Head>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">USA News</h1>
        <div className="space-y-6">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard
                key={article.slug}
                slug={article.slug}
                category={article.category}
                title={article.title}
                excerpt={article.excerpt}
                imageUrl={article.imageUrl}
              />
            ))
          ) : (
            <p>No articles found in the USA category.</p>
          )}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts?category=usa`
    );
    const articles: Article[] = await res.json();
    return { props: { articles } };
  } catch (err) {
    console.error('Error fetching USA articles:', err);
    return { props: { articles: [] } };
  }
};
