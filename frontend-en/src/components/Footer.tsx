import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Links institucionais */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold">Company</h4>
            <Link href="/about">
              <a className="block hover:underline">About Us</a>
            </Link>
            <Link href="/terms">
              <a className="block hover:underline">Terms & Conditions</a>
            </Link>
            <Link href="/contact">
              <a className="block hover:underline">Contact</a>
            </Link>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="mt-6 md:mt-0 text-sm">
            <p>© {new Date().getFullYear()} iDontKnowCrypto. All rights reserved.</p>
            <p className="mt-2">
              Disclaimer: This site provides information for educational purposes only. Not financial advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
