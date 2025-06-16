// src/pages/news/Global/ig-group-crypto-trading-uk-retail-investors.tsx
import Head from 'next/head'
import Link from 'next/link'
import { formatDate } from '../../../utils/date'

export default function IGGroupCryptoTradingUKRetailInvestorsPage() {
  const now = new Date().toISOString()
  return (
    <>
      <Head>
        <title>IG Group Expands Crypto Trading Services for UK Retail Investors – iDontKnowCrypto</title>
        <meta
          name="description"
          content="UK financial services leader IG Group introduces direct crypto trading for retail investors, partnering with Uphold to offer Bitcoin and major altcoins."
        />
      </Head>
      <article className="prose lg:prose-xl space-y-6 max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif font-bold">
          IG Group Introduces Direct Crypto Trading for UK Retail Investors
        </h1>

        <p className="text-sm text-gray-500">
          Published on {formatDate('2025-06-15')} • Updated on {formatDate(now)} • By{' '}
          <Link href="/Authors/cora-elmwick">
            <a className="text-blue-600 hover:underline">Cora Elmwick</a>
          </Link>
        </p>

        <img
          src="/images/ig-group-crypto-trading-uk-retail-investors1.png"
          alt="IG Group platform displaying cryptocurrency trading interface on a desktop screen."
          className="w-full h-auto rounded"
        />

        <p>
          IG Group, the prominent UK-based trading and financial services provider, has officially launched direct cryptocurrency trading for retail investors. This development significantly broadens IG's presence in the rapidly evolving crypto market, moving beyond its earlier offerings of cryptocurrency-related Contracts for Difference (CFDs).
        </p>

        <h2 className="text-3xl font-serif font-bold">
          Expanding Crypto Offerings and Enhanced User Experience
        </h2>
        <p>
          The London-listed IG Group has confirmed that its clients can now directly buy, sell, and hold a diverse selection of digital assets, including established cryptocurrencies such as Bitcoin (BTC), Ethereum (ETH), Ripple (XRP), alongside trending memecoins and altcoins. This new offering comprises 31 cryptocurrencies, marking a substantial expansion from its earlier CFD-focused crypto exposure.
        </p>

        <h2 className="text-3xl font-serif font-bold">
          Strategic Partnership with Uphold for Compliance and Security
        </h2>
        <p>
          The expansion into direct crypto trading is facilitated through a strategic partnership with Uphold, a US-based cryptocurrency infrastructure provider that operates under stringent regulatory compliance in both the United States and the United Kingdom. Uphold will manage transaction processing, custody, and real-time pricing data, ensuring secure and reliable services for IG’s clientele.
        </p>

        <p>
          IG UK Managing Director Michael Healy described the launch as “a pivotal development for IG and an important milestone for the UK's cryptocurrency ecosystem,” highlighting the significance of allowing retail investors easy and secure access to digital assets via a trusted financial services provider.
        </p>

        <img
          src="/images/ig-group-crypto-trading-uk-retail-investors2.png"
          alt="Logos of cryptocurrencies Bitcoin, Ethereum, XRP, and popular memecoins offered by IG Group."
          className="w-full h-auto rounded"
        />
      </article>
    </>
  )
}
