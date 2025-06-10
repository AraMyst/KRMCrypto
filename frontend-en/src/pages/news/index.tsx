// src/pages/news/index.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useRef } from 'react';
import { Article } from '../../types';

const testArticles: Record<string, Article[]> = {
  uk: [
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
  ],
  usa: [
    {
      slug: 'test1',
      category: 'USA',
      title: 'test1',
      excerpt: 'test1',
      imageUrl: '/images/test1-usa.png',
    },
    {
      slug: 'test2',
      category: 'USA',
      title: 'test2',
      excerpt: 'test2',
      imageUrl: '/images/test2-usa.png',
    },
    {
      slug: 'test3',
      category: 'USA',
      title: 'test3',
      excerpt: 'test3',
      imageUrl: '/images/test3-usa.png',
    },
  ],
  global: [
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
  ],
};

function CarouselSection({ country }: { country: 'UK' | 'USA' | 'Global' }) {
  const ref = useRef<HTMLDivElement>(null);
  const key = country.toLowerCase();
  const items = testArticles[key];

  const scroll = (delta: number) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: delta * 300, behavior: 'smooth' });
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{country} News (Test)</h2>
      <div className="relative">
        {/* seta esquerda */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-75 p-2 rounded-full"
        >
          ‹
        </button>

        {/* container rolável */}
        <div
          ref={ref}
          className="flex overflow-x-auto space-x-4 scroll-smooth py-2"
        >
          {items.map((art) => (
            <Link
              key={art.slug}
              href={`/news/${country}/${art.slug}`}
              passHref
            >
              <a className="relative flex-shrink-0 w-64 h-40 rounded overflow-hidden">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-semibold">
                  {art.title}
                </div>
              </a>
            </Link>
          ))}
        </div>

        {/* seta direita */}
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-75 p-2 rounded-full"
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default function NewsIndexPage() {
  return (
    <>
      <Head>
        <title>News – iDontKnowCrypto (Test)</title>
        <meta
          name="description"
          content="Página de testes para News: UK, USA e Global."
        />
      </Head>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <CarouselSection country="UK" />
        <CarouselSection country="USA" />
        <CarouselSection country="Global" />
      </main>
    </>
  );
}
