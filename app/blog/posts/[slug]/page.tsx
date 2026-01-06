import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchWpPost } from '@/app/lib/server-lib';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchWpPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchWpPost(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <header className="entry-header mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title.rendered}
          </h1>
          <div className="text-sm text-gray-600 mb-6">
            <time dateTime={post.date_gmt}>
              {formatDate(post.date_gmt)}
            </time>
            <span className="mx-2">•</span>
            <span>By Admin</span>
          </div>
        </header>

        <div
          className="entry-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <footer className="entry-footer mt-8 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </footer>
      </article>
    </div>
  );
}
