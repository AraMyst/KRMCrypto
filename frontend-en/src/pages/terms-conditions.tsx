// src/pages/terms-conditions.tsx
import Head from 'next/head'

export default function TermsConditionsPage() {
  return (
    <>
      <Head>
        <title>Terms & Conditions – iDontKnowCrypto</title>
        <meta
          name="description"
          content="Read the terms and conditions governing your use of iDontKnowCrypto."
        />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
        <p className="mb-4">
          Welcome to iDontKnowCrypto. By accessing or using our site, you agree to comply
          with these terms. Please take a moment to read them carefully.
        </p>
        <h2 className="text-2xl font-semibold mb-2">1. Content</h2>
        <p className="mb-4">
          All articles, images and data on this site are provided for informational
          purposes only. We strive for accuracy, but make no guarantees regarding
          completeness or timeliness.
        </p>
        <h2 className="text-2xl font-semibold mb-2">2. User Conduct</h2>
        <p className="mb-4">
          You agree not to misuse our site by interfering with it or accessing it using
          a method other than the interface provided. Any fraudulent, abusive or illegal
          activity is strictly prohibited.
        </p>
        <h2 className="text-2xl font-semibold mb-2">3. Limitation of Liability</h2>
        <p className="mb-4">
          iDontKnowCrypto and its contributors will not be liable for any damages arising
          from your use of the site. You assume full responsibility for how you use our
          content.
        </p>
        <h2 className="text-2xl font-semibold mb-2">4. Changes</h2>
        <p className="mb-4">
          We may revise these terms at any time. Continued use after changes constitutes
          acceptance of the new terms. Please review this page periodically.
        </p>
        <p>
          If you have any questions, visit our{' '}
          <a href="/contact" className="text-blue-600 hover:underline">
            Contact page
          </a>.
        </p>
      </main>
    </>
  )
}
