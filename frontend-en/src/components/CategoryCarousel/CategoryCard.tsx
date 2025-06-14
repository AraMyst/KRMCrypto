import Link from 'next/link';
import Image from 'next/image';
import { Article } from './CategoryCarousel';

interface CategoryCardProps {
  article: Article;
}

export default function CategoryCard({ article }: CategoryCardProps) {
  return (
    <Link className="relative block w-48 h-32 rounded overflow-hidden shadow-lg hover:shadow-xl transition" href={`/news/${article.category}/${article.slug}`}>
        <Image
          src={article.imageUrl}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          className="transform hover:scale-105 transition"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <p className="text-white text-sm p-2 line-clamp-2">
            {article.title}
          </p>
        </div>
    </Link>
  );
}
