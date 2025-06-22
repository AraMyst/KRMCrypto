// src/pages/contato.tsx
import Head from 'next/head'
import { FormEvent, useState } from 'react'

export default function ContatoPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Aqui você pode integrar com sua API ou enviar por e-mail
    // Por ora só simulamos sucesso
    console.log({ nome, email, mensagem })
    setEnviado(true)
    setNome(''); setEmail(''); setMensagem('')
  }

  return (
    <>
      <Head>
        <title>Contato – NaoseiCripto</title>
        <meta name="description" content="Fale conosco: dúvidas, sugestões ou parcerias." />
      </Head>
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Fale Conosco</h1>
        <p className="mb-6">
          Tem dúvidas sobre criptomoedas ou sugestões para o NaoseiCripto?
          Use o formulário abaixo e nossa equipe responderá o mais breve possível.
        </p>

        {enviado && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
            Sua mensagem foi enviada com sucesso! Obrigado pelo contato.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="font-medium">Nome</span>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </label>

          <label className="block">
            <span className="font-medium">E-mail</span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </label>

          <label className="block">
            <span className="font-medium">Mensagem</span>
            <textarea
              value={mensagem}
              onChange={e => setMensagem(e.target.value)}
              rows={6}
              required
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </label>

          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
          >
            Enviar
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-600">
          Ou envie direto para: <a href="mailto:contato@naoseicripto.com" className="underline">contato@naoseicripto.com</a>
        </p>
      </main>
    </>
  )
}
