// src/components/ArticleCard.tsx
import Link from 'next/link';
import Image from 'next/image';

export interface ArticleCardProps {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  imageUrl: string;
}

export default function ArticleCard({
  slug,
  category,
  title,
  excerpt,
  imageUrl,
}: ArticleCardProps) {
  return (
    <Link className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition" href={`/news/${category}/${slug}`}>
        {/* Imagem de capa */}
        <div className="relative w-full md:w-48 h-40 md:h-auto flex-shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Conteúdo textual */}
        <div className="p-4 flex flex-col justify-between">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
          <span className="text-xs text-primary font-medium hover:underline">
            Read more →
          </span>
        </div>
    </Link>
  );
}
