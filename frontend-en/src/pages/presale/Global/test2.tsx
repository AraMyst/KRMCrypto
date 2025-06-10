// src/pages/presale/Global/test2.tsx
import Head from 'next/head';
import { formatDate } from '../../../utils/date';

export default function GlobalTest2Page() {
  const now = new Date().toISOString();
  return (
    <>
      <Head>
        <title>test2 – iDontKnowCrypto</title>
        <meta name="description" content="test2" />
      </Head>
      <article className="prose lg:prose-xl max-w-3xl mx-auto px-4 py-8">
        <h1>test2</h1>
        <p className="text-sm text-gray-500">
          {formatDate(now)} in Global
        </p>
        <img
          src="/images/test2-global.png"
          alt="test2"
          className="w-full h-auto rounded my-6"
        />
        <div>
          <p>test2</p>
        </div>
      </article>
    </>
  );
}
