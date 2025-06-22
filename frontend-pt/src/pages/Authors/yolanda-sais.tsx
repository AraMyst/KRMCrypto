// src/pages/Authors/yolanda-sais.tsx
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function YolandaSais() {
  return (
    <>
      <Head>
        <title>Yolanda Sais – Autor</title>
        <meta
          name="description"
          content="Yolanda Sais, jornalista especializada no mercado de criptomoedas em Portugal."
        />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Cabeçalho do autor */}
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="w-32 h-32 relative rounded-full overflow-hidden mb-4 md:mb-0">
            <Image
              src="/images/error-pt-logo.png"
              alt="Foto de perfil não disponível"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <div className="md:ml-6 text-center md:text-left">
            <h1 className="text-3xl font-bold">Yolanda Sais</h1>
            <p className="text-gray-600">Especialista no mercado português de criptomoedas</p>
          </div>
        </div>

        {/* Biografia */}
        <article className="prose prose-lg">
          <p>
            Yolanda Sais é jornalista e pesquisadora que se dedica à cobertura do universo
            cripto em Portugal. Licenciada em Comunicação Social, destacou-se pelos artigos
            investigativos sobre blockchain e regulação europeia, publicando em veículos
            nacionais e internacionais.
          </p>

          <p>
            Nos últimos três anos, Yolanda acompanhou de perto a evolução do mercado português:
            da adoção das primeiras exchanges locais ao surgimento de comunidades de DeFi em
            Lisboa e Porto. Seu compromisso é traduzir para os leitores o impacto das decisões
            do Banco de Portugal e da Comissão Europeia sobre investidores retail e institucionais.
          </p>

          <p>
            No NaoseiCripto, ela produz reportagens que misturam entrevistas com reguladores,
            análises de risco e cenários prospectivos. Destaca tanto inovações em stablecoins
            quanto iniciativas de tokenização de ativos tradicionais, sempre com olhar crítico
            e fundamentado em dados.
          </p>

          <p>
            Yolanda assina uma coluna mensal em que debate políticas públicas voltadas à
            criptoeconomia e promove debates online com especialistas do setor em parceria
            com universidades. Além disso, coordena um boletim informativo regional que mapeia
            ICOs, airdrops e oportunidades de investimento em startups lusófonas.
          </p>

          <p>
            Fora da redação, participa de workshops sobre inclusão financeira e atua como
            mentora para jovens jornalistas interessados em finanças digitais. Acredita que
            um jornalismo ético e profundo é essencial para guiar a transição para uma economia
            mais transparente e descentralizada.
          </p>
        </article>
      </main>
    </>
  )
}
