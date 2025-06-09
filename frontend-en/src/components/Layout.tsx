import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import SideBanners from './SideBanners';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>iDontKnowCrypto – Global Crypto News</title>
        <meta name="description" content="Latest crypto news, airdrops, guides and market analysis." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Cabeçalho completo com nav, ticker e menu */}
      <Header />

      {/* Conteúdo de cada página */}
      <main className="pt-0">
        {children}
      </main>

      {/* Banners laterais de captura de leads */}
      <SideBanners />

      {/* Rodapé institucional e disclaimer */}
      <Footer />
    </>
  );
}
