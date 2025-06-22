import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-gray-200 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center">
        <p className="text-sm md:max-w-xl lg:max-w-3xl mx-auto whitespace-nowrap overflow-x-auto lg:overflow-visible footer-scrollbar">
          Este site fornece informações apenas para fins educacionais. Não é aconselhamento financeiro.
        </p>

        <div className="flex justify-center space-x-6">
          <Link href="/sobre-nos">
            <a className="text-footer-link hover:text-nav-primary-dark hover:underline">Sobre</a>
          </Link>
          <Link href="/termos-condicoes">
            <a className="text-footer-link hover:text-nav-primary-dark hover:underline">Termos e Condições</a>
          </Link>
          <Link href="/contato">
            <a className="text-footer-link hover:text-nav-primary-dark hover:underline">Contato</a>
          </Link>
        </div>

        <p className="text-sm">
          © {new Date().getFullYear()} NaoseiCripto. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
