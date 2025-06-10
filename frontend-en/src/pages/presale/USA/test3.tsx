// src/pages/presale/USA/test3.tsx
import Head from 'next/head';
import { formatDate } from '../../../utils/date';

export default function USATest3Page() {
  const now = new Date().toISOString();
  return (
    <>
      <Head>
        <title>test3 – iDontKnowCrypto</title>
        <meta name="description" content="test3" />
      </Head>
      <article className="prose lg:prose-xl max-w-3xl mx-auto px-4 py-8">
        <h1>test3</h1>
        <p className="text-sm text-gray-500">
          {formatDate(now)} in USA
        </p>
        <img
          src="/images/test3-usa.png"
          alt="test3"
          className="w-full h-auto rounded my-6"
        />
        <div>
          <p>test3</p>
        </div>
      </article>
    </>
  );
}
