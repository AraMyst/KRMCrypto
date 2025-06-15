import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { Article } from '../../types';
import { fetchUserGeo } from '../../utils/geo';


const testArticles: Record<string, Article[]> = {
  uk: [
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
  ],
  usa: [
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
  ],
  global: [
    {
      slug: 'test1',
      category: 'Global',
      title: 'test1',
      excerpt: 'test1',
      imageUrl: '/images/test1-global.png',
      publishedAt: '2023-01-01',
    },
    {
      slug: 'test2',
      category: 'Global',
      title: 'test2',
      excerpt: 'test2',
      imageUrl: '/images/test2-global.png',
      publishedAt: '2023-01-02',
    },
    {
      slug: 'test3',
      category: 'Global',
      title: 'test3',
      excerpt: 'test3',
      imageUrl: '/images/test3-global.png',
      publishedAt: '2023-01-03',
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
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-75 p-2 rounded-full"
        >
          ‹
        </button>
        <div
          ref={ref}
          className="flex overflow-x-auto space-x-4 scroll-smooth py-2"
        >
          {items.map((art) => (
            <Link
              key={art.slug}
              href={`/news/${country}/${art.slug}`}
              passHref
              className="relative flex-shrink-0 w-64 h-40 rounded overflow-hidden"
            >
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-semibold">
                  {art.title}
                </div>
            </Link>
          ))}
        </div>
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
  const [rankedCountries, setRankedCountries] = useState<('UK' | 'USA' | 'Global')[]>(['Global', 'UK', 'USA']);
  useEffect(() => {
    const determineCountryOrder = async () => {
      try {
        const geoData = await fetchUserGeo();
        const countryCode = geoData.countryCode2;

        let primaryCountry: 'UK' | 'USA' | 'Global' = 'Global';

        if (countryCode === 'GB') {
          primaryCountry = 'UK';
        } else if (countryCode === 'US') { 
          primaryCountry = 'USA';
        }
        
        const allCountries: ('UK' | 'USA' | 'Global')[] = ['UK', 'USA', 'Global'];
        const newOrder = [
            primaryCountry, 
            ...allCountries.filter(c => c !== primaryCountry)
        ];
        

        setRankedCountries(newOrder as ('UK' | 'USA' | 'Global')[]);

      } catch (error) {
        console.error('Failed to fetch user geolocation, using default order.', error);
      }
    };

    determineCountryOrder();
  }, []); 

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
        {}
        {rankedCountries.map(country => (
          <CarouselSection key={country} country={country} />
        ))}
      </main>
    </>
  );
}