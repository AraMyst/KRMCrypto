// src/pages/news/Global/uk-crypto-ownership-growth-2025.tsx
import Head from 'next/head'
import Link from 'next/link'
import { formatDate } from '../../../utils/date'

export default function UKCryptoOwnershipGrowth2025Page() {
  const now = new Date().toISOString()
  return (
    <>
      <Head>
        <title>UK Leads Global Surge in Crypto Ownership in 2025 – iDontKnowCrypto</title>
        <meta
          name="description"
          content="The United Kingdom sees unprecedented crypto ownership growth in 2025, surpassing other major economies despite regulatory uncertainty. Discover what's driving this trend."
        />
      </Head>
      <article className="prose lg:prose-xl space-y-6 max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif font-bold">
          UK Tops Global Crypto Ownership Growth in 2025 Amid Regulatory Ambiguity
        </h1>

        <p className="text-sm text-gray-500">
          Published on {formatDate('2025-06-15')} • Updated on {formatDate(now)} • By{' '}
          <Link href="/Authors/cora-elmwick">
            <a className="text-blue-600 hover:underline">Cora Elmwick</a>
          </Link>
        </p>

        <img
          src="/images/uk-crypto-ownership-growth-20251.png"
          alt="UK crypto ownership growth chart 2025 illustrating rapid increase."
          className="w-full h-auto rounded"
        />

        <p>
          In 2025, the United Kingdom stands out as the global frontrunner in cryptocurrency adoption, outstripping major markets like the United States and Australia. Despite ongoing regulatory ambiguity, the UK has recorded the sharpest year-over-year increase in crypto ownership, as highlighted by the recent Gemini “State of Crypto” report.
        </p>
      </article>
    </>
  )
}
