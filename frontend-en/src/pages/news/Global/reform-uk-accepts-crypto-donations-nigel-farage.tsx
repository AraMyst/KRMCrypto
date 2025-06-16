// src/pages/news/Global/reform-uk-accepts-crypto-donations-nigel-farage.tsx
import Head from 'next/head'
import Link from 'next/link'
import { formatDate } from '../../../utils/date'

export default function ReformUKAcceptsCryptoDonationsNigelFaragePage() {
  const now = new Date().toISOString()
  return (
    <>
      <Head>
        <title>Reform UK Now Accepts Cryptocurrency Donations – Nigel Farage Announcement – iDontKnowCrypto</title>
        <meta
          name="description"
          content="Nigel Farage reveals Reform UK's groundbreaking move to accept crypto donations, plans new legislation, and proposes a UK Bitcoin reserve."
        />
      </Head>
      <article className="prose lg:prose-xl space-y-6 max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif font-bold">
          Reform UK Embraces Crypto Donations, Announces Ambitious Digital Finance Agenda
        </h1>

        <p className="text-sm text-gray-500">
          Published on {formatDate('2025-06-15')} • Updated on {formatDate(now)} • By{' '}
          <Link href="/Authors/cora-elmwick">
            <a className="text-blue-600 hover:underline">Cora Elmwick</a>
          </Link>
        </p>

        <img
          src="/images/reform-uk-accepts-crypto-donations-nigel-farage1.png"
          alt="Nigel Farage speaking at Bitcoin 2025 conference in Las Vegas announcing crypto donations acceptance."
          className="w-full h-auto rounded"
        />

        <p>
          Nigel Farage, leader of Reform UK, announced a landmark decision allowing the party to accept cryptocurrency donations, making it the first significant British political group to officially adopt digital currencies.
        </p>

        <h2 className="text-3xl font-serif font-bold">
          Groundbreaking Move in British Politics
        </h2>
        <p>
          Speaking at the prominent Bitcoin 2025 conference in Las Vegas on May 29, Farage emphasised the significance of this move, highlighting the party's progressive stance towards digital finance. “We are proud to be the first mainstream political party in Britain to accept donations in Bitcoin and other cryptocurrencies. It’s time we caught up to the forward-thinking approaches being taken elsewhere,” Farage declared.
        </p>

        <h2 className="text-3xl font-serif font-bold">
          Proposals for Crypto-Friendly Legislation
        </h2>
        <p>
          Farage also shared Reform UK's ambitious plans to introduce a “Cryptoassets and Digital Finance Bill” should they secure power in the next general election, anticipated by August 2029. The bill would aim to streamline crypto regulation, fostering innovation while safeguarding investors.
        </p>

        <p>
          Additionally, Farage articulated his opposition to the introduction of a central bank digital currency (CBDC) in the UK, advocating instead for the establishment of a Bitcoin reserve within the Bank of England. This proposal underscores the party’s commitment to decentralised finance and economic innovation.
        </p>

        <img
          src="/images/reform-uk-accepts-crypto-donations-nigel-farage2.png"
          alt="Representation of Bitcoin cryptocurrency and Reform UK party logo illustrating the acceptance of crypto donations."
          className="w-full h-auto rounded"
        />
      </article>
    </>
  )
}
