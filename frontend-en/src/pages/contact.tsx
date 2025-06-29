// src/pages/contact.tsx
import Head from 'next/head'

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us – iDontKnowCrypto</title>
        <meta
          name="description"
          content="Reach out to the iDontKnowCrypto team with questions, feedback or partnership ideas."
        />
      </Head>
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p>
          Whether you’ve got a question about our articles, want to suggest a topic
          or explore a collaboration, we’re here to listen. Send us a message below
          and we’ll get back to you as soon as we can.
        </p>
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Send Message
          </button>
        </form>
      </main>
    </>
  )
}
