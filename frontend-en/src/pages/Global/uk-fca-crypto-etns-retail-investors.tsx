// src/pages/news/Global/uk-fca-crypto-etns-retail-investors.tsx
import Head from 'next/head'
import Link from 'next/link'
import { formatDate } from '../../utils/date'

export default function UKFcaCryptoETNsRetailInvestorsPage() {
  const now = new Date().toISOString()
  return (
    <>
      <Head>
        <title>UK FCA Considers Allowing Retail Investors Access to Crypto ETNs – iDontKnowCrypto</title>
        <meta
          name="description"
          content="The UK's Financial Conduct Authority proposes lifting the ban on crypto ETNs for retail investors, indicating a major shift towards regulated crypto investments."
        />
      </Head>
      <article className="prose lg:prose-xl space-y-6 max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif font-bold">
          UK's FCA Proposes Removing Ban on Crypto ETNs for Retail Investors
        </h1>

        <p className="text-sm text-gray-500">
          Published on {formatDate('2025-06-15')} • Updated on {formatDate(now)} • By{' '}
          <Link href="/Authors/cora-elmwick" legacyBehavior >
            <a className="text-blue-600 hover:underline">Cora Elmwick</a>
          </Link>
        </p>

        <img
          src="/images/uk-fca-crypto-etns-retail-investors1.png"
          alt="Financial Conduct Authority (FCA) headquarters in London"
          className="w-full h-auto rounded"
        />

        <p>
          The UK's Financial Conduct Authority (FCA) has proposed ending its prohibition on retail investors accessing cryptocurrency exchange-traded notes (ETNs), marking a significant policy shift in the UK’s approach towards regulated crypto investments.
        </p>

        <h2 className="text-3xl font-serif font-bold">
          Proposed Change Signals Regulatory Shift
        </h2>
        <p>
          According to a recent statement, the FCA intends to enable individual investors to buy and sell crypto ETNs, provided these financial instruments are listed on exchanges recognised by the FCA. This move would provide retail investors more options to engage with cryptocurrency markets through regulated and transparent investment vehicles.
        </p>
        <p>
          David Geale, Executive Director of Payments and Digital Assets at the FCA, highlighted the rationale behind the change, stating: “We want investors to have the freedom to decide if such high-risk investments align with their financial strategies, fully aware{' '}
          <Link href="/news/Global/uk-crypto-investigator-insolvency-cases" legacyBehavior >
            <a className="text-blue-600 hover:underline">that they risk losing</a>
          </Link>{' '}
          their entire investment.”
        </p>

        <h2 className="text-3xl font-serif font-bold">
          Industry Welcomes Regulatory Clarity
        </h2>
        <p>
          Experts and stakeholders within the cryptocurrency industry have responded positively to the proposal, suggesting it demonstrates the UK's evolving stance towards crypto regulation. Diego Ballon Ossio, partner at law firm Clifford Chance, emphasised{' '}
          <a
            href="https://www.fca.org.uk/news/press-releases/fca-seeks-further-views-stablecoins-and-crypto-custody"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            that the FCA’s proposal
          </a>{' '}
          aligns with broader ambitions to establish the UK as a leading global financial hub for cryptocurrency, commenting that this move “clearly signals the UK's openness towards crypto innovation and regulated market participation.”
        </p>

        <img
          src="/images/uk-fca-crypto-etns-retail-investors2.png"
          alt="Various cryptocurrencies representing the rise in crypto asset investment"
          className="w-full h-auto rounded"
        />
      </article>
    </>
  )
}
