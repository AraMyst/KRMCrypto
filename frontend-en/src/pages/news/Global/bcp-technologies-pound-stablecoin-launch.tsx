// src/pages/news/Global/bcp-technologies-pound-stablecoin-launch.tsx
import Head from 'next/head'
import Link from 'next/link'
import { formatDate } from '../../../utils/date'

export default function BCPTechnologiesPoundStablecoinLaunchPage() {
  const now = new Date().toISOString()
  return (
    <>
      <Head>
        <title>BCP Technologies Launches Pound-Backed Stablecoin in the UK – iDontKnowCrypto</title>
        <meta
          name="description"
          content="BCP Technologies unveils its pound-backed stablecoin tGBP, aiming to become a benchmark for future UK FCA regulations and diverse blockchain financial solutions."
        />
      </Head>
      <article className="prose lg:prose-xl space-y-6 max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif font-bold">
          BCP Technologies Introduces New British Pound-Backed Stablecoin
        </h1>

        <p className="text-sm text-gray-500">
          Published on {formatDate('2025-06-15')} • Updated on {formatDate(now)} • By{' '}
          <Link href="/Authors/cora-elmwick" legacyBehavior>
            <a className="text-blue-600 hover:underline">Cora Elmwick</a>
          </Link>
        </p>

        <img
          src="/images/bcp-technologies-pound-stablecoin-launch1.png"
          alt="BCP Technologies CEO Benoit Marzouk presenting the tGBP stablecoin at a company event."
          className="w-full h-auto rounded"
        />

        <p>
          United Kingdom-based cryptocurrency firm, BCP Technologies, has officially launched its pound-backed stablecoin, Tokenised GBP (tGBP). This latest development underscores growing UK interest in digital currencies, coinciding closely with evolving regulatory frameworks.
        </p>
      </article>
    </>
  )
}
