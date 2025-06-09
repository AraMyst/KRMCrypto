import Link from 'next/link';
import useGeoCategories, { Category } from '../hooks/useGeoCategories';

export default function CategoryMenu() {
  const { categories, loading, error } = useGeoCategories();

  if (loading) {
    return (
      <nav className="bg-white border-t border-b py-2 px-4">
        <span className="text-gray-500">Loading categories…</span>
      </nav>
    );
  }

  if (error) {
    return (
      <nav className="bg-white border-t border-b py-2 px-4">
        <span className="text-red-600">Failed to load categories</span>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-t border-b overflow-x-auto no-scrollbar">
      <ul className="flex space-x-4 px-4">
        {categories.map((cat: Category) => (
          <li key={cat.slug}>
            <Link href={`/news/${cat.slug}`}>
              <a className="block py-2 text-gray-700 hover:text-blue-600 capitalize whitespace-nowrap">
                {cat.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
