import React from 'react';
import { Suspense } from 'react';
import BlogCard from '../components/BlogCard';
import {
  fetchWpPosts,
  fetchWpAllCategories,
  fetchWpAllTags,
  fetchWpMediaById,
} from '../lib/server-lib';
import { WORDPRESS_CATEGORIES, type WordPressCategory, type WordPressTag, type WordPressPost } from '../lib/wordpress-types';

const BlogSectionContent: React.FC<{
  posts: WordPressPost[];
  categories: WordPressCategory[];
  tags: WordPressTag[];
  mediaMap: Record<number, string>;
}> = ({ posts, categories, tags, mediaMap }) => {
  const getTaxonomyNamesByIds = (ids: number[], taxonomy: (WordPressCategory | WordPressTag)[]): string[] =>
    ids
      .map(id => taxonomy.find(tax => tax.id === id)?.name)
      .filter((name): name is string => Boolean(name));

  const blogPosts = posts.filter(post => {
    const categoryId = categories.find(c => c.slug === WORDPRESS_CATEGORIES.BLOG_POST)?.id;
    return categoryId ? post.categories.includes(categoryId) : false;
  });

  return (
    <div id="blog-section" className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-12 mb-4 sm:mb-6">Blog</h2>
        <p className="text-sm sm:text-base text-gray-9 mb-6 sm:mb-8">Technical articles and insights</p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {blogPosts.length > 0 ? (
          blogPosts.map(post => {
            const featuredImageUrl = post.featured_media ? mediaMap[post.featured_media] : undefined;

            return (
              <BlogCard
                key={post.id}
                title={post.title.rendered}
                date={post.date_gmt}
                excerpt={post.excerpt.rendered}
                slug={post.slug}
                tags={getTaxonomyNamesByIds(post.tags, tags)}
                featuredImage={featuredImageUrl}
              />
            );
          })
        ) : (
          <p className="text-gray-9">No blog posts yet.</p>
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

  const mediaIds = new Set<number>();
  posts.forEach(post => {
    if (post.featured_media) {
      mediaIds.add(post.featured_media);
    }
  });

  const mediaMap: Record<number, string> = {};
  for (const mediaId of mediaIds) {
    try {
      const media = await fetchWpMediaById(mediaId);
      if (media && typeof media === 'object' && 'source_url' in media && media.source_url) {
        mediaMap[mediaId] = media.source_url;
      }
    } catch (error) {
      console.error(`Failed to fetch media ${mediaId}:`, error);
    }
  }

  return (
    <Suspense fallback={<div className="text-gray-400">Loading blog posts...</div>}>
      <BlogSectionContent posts={posts} categories={categories} tags={tags} mediaMap={mediaMap} />
    </Suspense>
  );
};

export default BlogSection;
