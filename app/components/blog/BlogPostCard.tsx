import Link from 'next/link';
import { WordPressPost } from '@/app/lib/wordpress-types';

interface BlogPostCardProps {
  post: WordPressPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const postUrl = `/blog/posts/${post.slug}`;

  return (
    <article
      id={`post-${post.id}`}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <header className="entry-header mb-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          <Link
            href={postUrl}
            className="hover:text-primary-600 transition-colors"
          >
            {post.title.rendered}
          </Link>
        </h2>
        <div className="text-sm text-gray-600">
          <time dateTime={post.date_gmt}>
            {formatDate(post.date_gmt)}
          </time>
          <span className="mx-2">•</span>
          <span>By Admin</span>
        </div>
      </header>

      <div
        className="entry-content prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />

      <footer className="entry-footer mt-4">
        <Link
          href={postUrl}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
        >
          Read More
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </footer>
    </article>
  );
}
