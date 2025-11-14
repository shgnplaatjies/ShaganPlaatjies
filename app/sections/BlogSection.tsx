import React from 'react';
import { Suspense } from 'react';
import BlogCard from '../components/BlogCard';
import {
  fetchWpPosts,
  fetchWpAllCategories,
  fetchWpAllTags,
} from '../lib/server-lib';

const BlogSectionContent: React.FC<{
  posts: any[];
  categories: any[];
  tags: any[];
}> = ({ posts, categories, tags }) => {
  const getTaxonomyNamesByIds = (ids: number[], taxonomy: any[]) =>
    ids
      .map(id => taxonomy.find(tax => tax.id === id)?.name)
      .filter(Boolean);

  const blogPosts = posts.filter(post => {
    const categoryId = categories.find(c => c.slug === 'blog')?.id;
    return post.categories.includes(categoryId);
  });

  return (
    <div id="blog-section" className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-black dark:text-white mb-6">Blog</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Technical articles and insights</p>
      </div>

      <div className="space-y-8">
        {blogPosts.length > 0 ? (
          blogPosts.map(post => (
            <BlogCard
              key={post.id}
              title={post.title.rendered}
              date={post.date_gmt}
              excerpt={post.excerpt.rendered}
              slug={post.slug}
              tags={getTaxonomyNamesByIds(post.tags, tags)}
            />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-500">No blog posts yet.</p>
        )}
      </div>
    </div>
  );
};

const BlogSection: React.FC = async () => {
  const posts = await fetchWpPosts();
  const categories = await fetchWpAllCategories();
  const tags = await fetchWpAllTags();

  if (!posts || !categories || !tags) {
    return (
      <div className="text-gray-400">
        Unable to load blog posts. Please try again later.
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="text-gray-400">Loading blog posts...</div>}>
      <BlogSectionContent posts={posts} categories={categories} tags={tags} />
    </Suspense>
  );
};

export default BlogSection;
