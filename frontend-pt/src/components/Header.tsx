import Navbar from './Navbar/Navbar'
import CryptoTicker from './CryptoTicker'
import CategoryMenu from './CategoryMenu'

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* Navegação principal */}
      <Navbar />

      {/* Ticker de preços de criptomoedas */}
      <CryptoTicker />

      {/* Menu de categorias por localidade */}
      <CategoryMenu />
    </header>
  )
}
