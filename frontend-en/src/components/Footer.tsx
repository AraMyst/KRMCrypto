import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center">
        {/* Primeira linha com disclaimer e links */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
          <p className="text-sm md:max-w-xl text-center">
            Disclaimer: This site provides information for educational purposes only. Not financial advice.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 justify-center">
            <Link href="/about">
              <a className="hover:underline">About Us</a>
            </Link>
            <Link href="/terms">
              <a className="hover:underline">Terms &amp; Conditions</a>
            </Link>
            <Link href="/contact">
              <a className="hover:underline">Contact</a>
            </Link>
          </div>
        </div>
        {/* Segunda linha com copyright */}
        <p className="text-center text-sm">© 2025 iDontKnowCrypto. All rights reserved.</p>
      </div>
    </footer>
  );
}
