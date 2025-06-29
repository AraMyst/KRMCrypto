// src/pages/termos-condicoes.tsx
import Head from 'next/head'

export default function TermosCondicoesPage() {
  return (
    <>
      <Head>
        <title>Termos e Condições – NaoseiCripto</title>
        <meta
          name="description"
          content="Leia nossos termos e condições de uso para entender suas responsabilidades e direitos."
        />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-8 prose prose-sm text-justify">
        <h1>Termos e Condições</h1>

        <h2>1. Uso do Site</h2>
        <p>
          O NaoseiCripto oferece conteúdo informativo sobre criptomoedas. Todo material aqui
          publicado destina-se apenas a fins educacionais. Não constitui recomendação de compra,
          venda ou investimento.
        </p>

        <h2>2. Isenção de Responsabilidade</h2>
        <p>
          As criptomoedas são ativos voláteis e apresentam riscos. Embora busquemos apurar fatos
          e fontes, não garantimos acurácia total das informações. Você assume responsabilidade
          por suas decisões.
        </p>

        <h2>3. Propriedade Intelectual</h2>
        <p>
          Todo texto, imagem e design deste site são protegidos por direitos autorais. É proibida
          a reprodução integral ou parcial sem autorização prévia.
        </p>

        <h2>4. Privacidade</h2>
        <p>
          Respeitamos sua privacidade. Dados coletados em formulários são usados somente para
          responder seu contato. Consulte nossa <a href="/politica-privacidade" className="underline">Política de Privacidade</a>
          para mais detalhes.
        </p>

        <h2>5. Alterações</h2>
        <p>
          Podemos atualizar estes termos a qualquer momento. A data da última revisão estará
          indicada no rodapé. Recomendamos revisar periodicamente.
        </p>

        <p className="mt-6 text-xs text-gray-600 text-justify">
          Última revisão: junho de 2025
        </p>
      </main>
    </>
  )
}
