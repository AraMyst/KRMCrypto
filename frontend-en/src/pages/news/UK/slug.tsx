// src/pages/news/UK/[slug].tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Article } from '../../../types';
import { formatDate } from '../../../utils/date';

interface UKArticlePageProps {
  article: Article & { content: string };
}

export default function UKArticlePage({ article }: UKArticlePageProps) {
  return (
    <>
      <Head>
        <title>{article.title} – iDontKnowCrypto</title>
        <meta name="description" content={article.excerpt} />
      </Head>
      <article className="prose lg:prose-xl max-w-3xl mx-auto px-4 py-8">
        <h1>{article.title}</h1>
        <p className="text-sm text-gray-500">
          {formatDate(article.publishedAt)} in {article.category}
        </p>
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-auto rounded my-6"
        />
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params!;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/news/${encodeURIComponent(
        slug as string
      )}`
    );
    if (!res.ok) {
      return { notFound: true };
    }
    const article: Article & { content: string } = await res.json();
    return { props: { article } };
  } catch (err) {
    console.error('Error fetching UK article:', err);
    return { notFound: true };
  }
};
