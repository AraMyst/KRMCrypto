// src/pages/Authors/karla-goncalves.tsx
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function KarlaGoncalves() {
  return (
    <>
      <Head>
        <title>Karla Gonçalves – Autor</title>
        <meta
          name="description"
          content="Karla Gonçalves, especialista em notícias de criptomoedas no mercado brasileiro."
        />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Cabeçalho do autor */}
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="w-32 h-32 relative rounded-full overflow-hidden mb-4 md:mb-0">
            <Image
              src="/images/karla-goncalves.png"
              alt="Foto de Karla Gonçalves"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <div className="md:ml-6 text-center md:text-left">
            <h1 className="text-3xl font-bold">Karla Gonçalves</h1>
            <p className="text-gray-600">Especialista no mercado brasileiro de criptomoedas</p>
          </div>
        </div>

        {/* Biografia */}
        <article className="prose prose-lg text-justify">
          <p>
            Karla Gonçalves é redatora e analista com mais de cinco anos de experiência cobrindo
            o ecossistema de criptomoedas no Brasil. Formada em Jornalismo pela Universidade Federal,
            Karla descobriu cedo a paixão por finanças descentralizadas, dedicando-se a traduzir
            conceitos complexos em conteúdo acessível ao grande público.
          </p>

          <p>
            Ao longo da carreira, Karla reportou lançamentos de projetos pioneiros na América Latina,
            conduziu entrevistas exclusivas com executivos de exchanges brasileiras e internacionalizou
            a voz dos investidores nacionais em conferências como a CryptoBrasil Summit. Seu olhar
            aguçado para mudanças regulatórias e movimentos de mercado tornou seus artigos leitura
            obrigatória para quem busca entender o cenário local.
          </p>

          <p>
            No NaoseiCripto, Karla é responsável por guiar o leitor através dos aspectos mais
            relevantes do mercado de Bitcoin, DeFi e tokens nacionais—sempre com foco em impactos
            práticos para investidores e desenvolvedores. Com estilo fluido, mescla referências
            históricas e dados de câmbio para oferecer um panorama completo.
          </p>

          <p>
            Além de publicar análises diárias, ela mantém uma newsletter semanal dedicada às
            oportunidades emergentes no Brasil, revelando projetos promissores de stablecoins e
            NFTs criados por artistas locais. Karla também colabora com podcasts e webinários,
            sem jamais perder a linguagem didática que caracteriza seu trabalho.
          </p>

          <p>
            Quando não está escrevendo, dedica-se a mentorias para jornalistas iniciantes e
            participa de grupos de pesquisa em blockchain. Acredita no poder transformador da
            tecnologia descentralizada para democratizar o acesso a serviços financeiros.
          </p>
        </article>
      </main>
    </>
  )
}
