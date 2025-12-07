import { fetchWpPosts } from '@/app/lib/server-lib';
import BlogPostCard from '@/app/components/blog/BlogPostCard';

export const metadata = {
  title: 'Blog',
  description: 'Latest blog posts and articles',
};

export default async function BlogPage() {
  const posts = await fetchWpPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <main id="main" className="max-w-4xl mx-auto">
        {posts && posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-600 text-lg">No posts found.</p>
          </div>
        )}
      </main>
    </div>
  );
}
