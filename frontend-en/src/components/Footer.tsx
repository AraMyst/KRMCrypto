import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center">
        <p className="text-sm md:max-w-xl mx-auto">
          This site provides information for educational purposes only. Not financial advice.
        </p>
        <div className="flex justify-center space-x-6">
          <Link className="hover:underline" href="/about-us" legacyBehavior>
          About Us
          </Link>
          <Link className="hover:underline" href="/terms-conditions" legacyBehavior>
          Terms &amp; Conditions
          </Link>
          <Link className="hover:underline" href="/contact" legacyBehavior>
          Contact
          </Link>
        </div>
        <p className="text-center text-sm">© 2025 iDontKnowCrypto. All rights reserved.</p>
      </div>
    </footer>
  );
}
