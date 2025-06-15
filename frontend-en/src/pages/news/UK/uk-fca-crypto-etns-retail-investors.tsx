// src/pages/news/UK/uk-fca-crypto-etns-retail-investors.tsx
import Head from 'next/head'
import { formatDate } from '../../../utils/date'

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
      <article className="prose lg:prose-xl max-w-3xl mx-auto px-4 py-8">
        <h1>UK's FCA Proposes Removing Ban on Crypto ETNs for Retail Investors</h1>
        <p className="text-sm text-gray-500">{formatDate(now)} in UK</p>

        <img
          src="/images/uk-fca-crypto-etns-retail-investors1.png"
          alt="Financial Conduct Authority (FCA) headquarters in London, UK"
          className="w-full h-auto rounded my-6"
        />

        <p>
          The UK's Financial Conduct Authority (FCA) has proposed ending its prohibition on retail investors accessing cryptocurrency exchange‐traded notes (ETNs), marking a significant policy shift in the UK’s approach towards regulated crypto investments.
        </p>

        <h2>Proposed Change Signals Regulatory Shift</h2>
        <p>
          According to a recent statement, the FCA intends to enable individual investors to buy and sell crypto ETNs, provided these financial instruments are listed on exchanges recognised by the FCA. This move would provide retail investors more options to engage with cryptocurrency markets through regulated and transparent investment vehicles.
        </p>
        <p>
          David Geale, Executive Director of Payments and Digital Assets at the FCA, highlighted the rationale behind the change, stating: “We want investors to have the freedom to decide if such high‐risk investments align with their financial strategies, fully aware that they risk losing their entire investment.”
        </p>

        <h2>Industry Welcomes Regulatory Clarity</h2>
        <p>
          Experts and stakeholders within the cryptocurrency industry have responded positively to the proposal, suggesting it demonstrates the UK's evolving stance towards crypto regulation.
        </p>
        <p>
          Diego Ballon Ossio, partner at law firm Clifford Chance, emphasised that the FCA’s proposal aligns with broader ambitions to establish the UK as a leading global financial hub for cryptocurrency, commenting that this move “clearly signals the UK's openness towards crypto innovation and regulated market participation.”
        </p>
        <p>
          Similarly, Bivu Das, General Manager for Kraken UK, applauded the FCA's announcement, stating that lifting the ban reflects the regulator’s acknowledgment of the crypto market's significant maturation. He added, “Outdated bans no longer effectively protect consumers and instead restrict legitimate investment opportunities.”
        </p>

        <h2>Broader Crypto Regulatory Framework Under Development</h2>
        <p>
          The FCA’s proposed adjustment to crypto ETNs forms part of broader regulatory changes currently underway. In recent months, the FCA has sought industry feedback regarding new regulations for stablecoins and cryptocurrency custody solutions.
        </p>
        <p>
          The ongoing regulatory activities align with Chancellor Rachel Reeves' vision of creating a comprehensive regulatory regime, positioning the UK as a leading global jurisdiction for digital assets. This push comes amid data showing the UK surpassing other major economies, including the US, in cryptocurrency adoption rates in 2025.
        </p>
        <p>
          Additionally, concerns regarding transparency in political funding have arisen, prompting lawmakers to debate the regulation of cryptocurrency donations. Cabinet Office Minister Pat McFadden has emphasised updating regulations to maintain election transparency and integrity amid evolving financial practices.
        </p>

        <img
          src="/images/uk-fca-crypto-etns-retail-investors2.png"
          alt="Various cryptocurrencies, representing the rise in crypto asset investment in the UK"
          className="w-full h-auto rounded my-6"
        />
      </article>
    </>
  )
}
