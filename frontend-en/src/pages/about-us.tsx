// src/pages/about-us.tsx
import Head from 'next/head'

export default function AboutUsPage() {
  return (
    <>
      <Head>
        <title>About Us – iDontKnowCrypto</title>
        <meta
          name="description"
          content="Learn more about iDontKnowCrypto: our mission, team and what drives us."
        />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About iDontKnowCrypto</h1>
        <p className="mb-4">
          At iDontKnowCrypto, we believe that smart, data-driven insights should be
          accessible to everyone—from seasoned traders to curious newcomers. Our
          international team of writers and developers publishes timely, in-depth
          articles on sports betting, online casinos and the ever-evolving world of
          cryptocurrencies.
        </p>
        <p className="mb-4">
          We combine real-world data with clear explanations, so you can make informed
          decisions without wading through jargon. Whether you’re looking for the
          latest regulatory updates, strategy guides or market analysis, we’ve got you
          covered.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Accuracy</strong> – Every fact is double-checked against reliable sources.</li>
          <li><strong>Clarity</strong> – We write in natural, engaging language, free of fluff.</li>
          <li><strong>Transparency</strong> – Our data comes from public reports and on-chain analysis, always cited.</li>
        </ul>
        <p>
          Want to join us or have an idea for an article? Head over to the{' '}
          <a href="/contact" className="text-blue-600 hover:underline">
            Contact page
          </a>{' '}
          and let’s start a conversation.
        </p>
      </main>
    </>
  )
}
