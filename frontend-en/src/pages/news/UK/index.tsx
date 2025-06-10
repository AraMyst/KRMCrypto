// src/pages/news/UK/index.tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ArticleCard from '../../../components/ArticleCard';
import { Article } from '../../../types';

interface UKNewsPageProps {
  articles: Article[];
}

export default function UKNewsPage({ articles }: UKNewsPageProps) {
  return (
    <>
      <Head>
        <title>UK News – iDontKnowCrypto</title>
        <meta
          name="description"
          content="Stay up to date with the latest UK crypto news."
        />
      </Head>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">UK News</h1>
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
            <p>No articles found in the UK category.</p>
          )}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts?category=uk`
    );
    const articles: Article[] = await res.json();
    return { props: { articles } };
  } catch (err) {
    console.error('Error fetching UK articles:', err);
    return { props: { articles: [] } };
  }
};
