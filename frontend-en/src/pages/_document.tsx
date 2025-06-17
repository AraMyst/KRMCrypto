// src/pages/_document.tsx
import Document, {
  DocumentContext,
  DocumentInitialProps
} from 'next/document';
import { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Meta tags essenciais */}
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#1A73E8" />
          {/* Fontes via Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
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
