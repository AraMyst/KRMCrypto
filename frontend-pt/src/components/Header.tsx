import Navbar from './Navbar/Navbar';
import CryptoTicker from './CryptoTicker';
import CategoryMenu from './CategoryMenu';

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* Barra principal de navegação */}
      <Navbar />

      {/* Barra de preços de criptomoedas */}
      <CryptoTicker />

      {/* Menu de categorias ordenadas por geolocalização */}
      <CategoryMenu />
    </header>
  );
}
