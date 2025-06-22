// src/pages/_document.tsx
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          {/* Meta tags essenciais */}
          <meta charSet="utf-8" />
          {/* Cor principal do tema (roxo do logo) */}
          <meta name="theme-color" content="#6F2DBD" />
          {/* Fontes via Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap&subset=latin"
            rel="stylesheet"
          />
        </Head>
        <body className="antialiased bg-white text-gray-900 font-sans">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
