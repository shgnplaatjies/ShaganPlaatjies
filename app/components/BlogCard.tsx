import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DefaultFeaturedImage } from '@/app/lib/constants';

interface BlogCardProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  tags: string[];
  featuredImage?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  date,
  excerpt,
  slug,
  tags,
  featuredImage = DefaultFeaturedImage,
}) => {
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/posts/${slug}`}>
      <div className="group cursor-pointer pb-8 border-b border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
              {title}
            </h3>
            <span className="text-sm text-gray-500">
              {formatDate(date)}
            </span>
          </div>

          <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded group-hover:opacity-75 transition-all duration-200">
            <Image
              src={featuredImage}
              alt={title}
              width={96}
              height={96}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200"
            />
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {stripHtml(excerpt)}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default BlogCard;
