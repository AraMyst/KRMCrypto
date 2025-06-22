// src/pages/Authors/cora-elmwick.tsx
import Head from 'next/head'
import Link from 'next/link'

export default function CoraElmwick() {
  return (
    <>
      <Head>
        <title>Cora Elmwick – Author</title>
        <meta
          name="description"
          content="Cora Elmwick reports on UK cryptocurrency regulation and market trends."
        />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold">Cora Elmwick</h1>
        <p>
          Cora Elmwick is a financial journalist with a focus on cryptocurrency policy in the United Kingdom. She provides clear insights into how regulatory changes affect everyday investors.
        </p>
        <p>
          <Link href="/" legacyBehavior>
            <a className="text-blue-600 hover:underline">← Back to home</a>
          </Link>
        </p>
      </main>
    </>
  )
}
