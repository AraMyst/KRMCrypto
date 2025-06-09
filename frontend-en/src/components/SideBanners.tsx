import Link from 'next/link';

export default function SideBanners() {
  return (
    <aside className="fixed top-1/3 right-4 flex flex-col space-y-6 z-40">
      {/* Banner Newsletter */}
      <Link href="/subscribe">
        <a className="block w-40 p-4 bg-primary text-white rounded-l-lg shadow hover:text-gray-300 transition">
          <h3 className="font-bold mb-1">Newsletter</h3>
          <p className="text-sm">Join our weekly insights</p>
        </a>
      </Link>

      {/* Banner Subscription */}
      <Link href="/checkout">
        <a className="block w-40 p-4 bg-green-600 text-white rounded-l-lg shadow hover:text-gray-300 transition">
          <h3 className="font-bold mb-1">Subscription</h3>
          <p className="text-sm">Daily/Weekly/Monthly Plans</p>
        </a>
      </Link>
    </aside>
  );
}
