// src/pages/presale/USA/test1.tsx
import Head from 'next/head';
import { formatDate } from '../../../utils/date';

export default function USATest1Page() {
  const now = new Date().toISOString();
  return (
    <>
      <Head>
        <title>test1 – iDontKnowCrypto</title>
        <meta name="description" content="test1" />
      </Head>
      <article className="prose lg:prose-xl max-w-3xl mx-auto px-4 py-8">
        <h1>test1</h1>
        <p className="text-sm text-gray-500">
          {formatDate(now)} in USA
        </p>
        <img
          src="/images/test1-usa.png"
          alt="test1"
          className="w-full h-auto rounded my-6"
        />
        <div>
          <p>test1</p>
        </div>
      </article>
    </>
  );
}
