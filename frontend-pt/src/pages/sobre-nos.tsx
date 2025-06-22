// src/pages/sobre-nos.tsx
import Head from 'next/head'

export default function SobreNosPage() {
  return (
    <>
      <Head>
        <title>Sobre Nós – NaoseiCripto</title>
        <meta
          name="description"
          content="Conheça a equipe de especialistas do NaoseiCripto e nossa missão de tornar a cripto simples para todos."
        />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-8 prose prose-lg">
        <h1>Quem Somos</h1>
        <p>
          O NaoseiCripto nasceu da vontade de levar informação clara e acessível sobre criptomoedas
          para quem está começando. Sabemos que termos como “blockchain”, “DeFi” ou “stablecoin”
          podem assustar quem ainda não está familiarizado com o universo digital.
        </p>
        <p>
          Por isso, nossa equipe reúne jornalistas e analistas com formação em economia, mercado
          financeiro e tecnologia. São anos de experiência cobrindo desde lançamentos de projetos
          inovadores até movimentos regulatórios que impactam a vida de investidores.
        </p>
        <p>
          Nosso compromisso é descomplicar: explicamos conceitos complexos em linguagem simples,
          damos exemplos práticos e mostramos passo a passo como acompanhar preços, proteger seus
          ativos e aproveitar oportunidades. Quem visita o NaoseiCripto encontra glossários,
          guias rápidos, notícias em tempo real e análises aprofundadas — tudo pensado no público
          iniciante.
        </p>
        <h2>Nossa Missão</h2>
        <p>
          Acreditamos que o conhecimento é a melhor ferramenta para tomar decisões financeiras
          seguras. Queremos empoderar pessoas comuns, sem jargões ou rodeios, para que todos possam
          entender os riscos e benefícios desse novo ecossistema.
        </p>
        <h2>Visão de Futuro</h2>
        <p>
          Vemos um mundo onde a tecnologia blockchain e as criptomoedas sejam tão naturais quanto usar
          um smartphone. Trabalhamos para conectar nossos leitores a essa realidade, trazendo
          sempre atualizações rigorosas e contextualizadas.
        </p>
        <h2>Fale Conosco</h2>
        <p>
          Tem sugestões, críticas ou quer fazer parte do time? Acesse nossa página de
          <a href="/contato" className="underline ml-1">Contato</a> ou envie um e-mail para
          <a href="mailto:contato@naoseicripto.com" className="underline ml-1">contato@naoseicripto.com</a>.
        </p>
      </main>
    </>
  )
}
