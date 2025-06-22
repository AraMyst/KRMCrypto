import { ReactNode } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>NaoseiCripto – Notícias de Criptomoedas</title>
        <meta
          name="description"
          content="Últimas notícias de criptomoedas, análises de mercado e insights globais."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Cabeçalho fixo: navbar, ticker e menu */}
      <Header />

      {/* Conteúdo da página */}
      <main>{children}</main>

      {/* Rodapé institucional */}
      <Footer />
    </>
  )
}
