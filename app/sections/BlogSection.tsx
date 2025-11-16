import React from 'react';
import { Suspense } from 'react';
import { Heading, Text, Box, Flex } from '@radix-ui/themes';
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
    <Box id="blog-section" className="space-y-6 sm:space-y-8">
      <Flex direction="column" gap="3" className="sm:gap-4">
        <Heading as="h2" size="7" className="text-gray-12">Blog</Heading>
        <Text as="p" size="2" className="text-gray-9">Technical articles and insights</Text>
      </Flex>

      <Box className="space-y-6 sm:space-y-8">
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
          <Text as="p" className="text-gray-9">No blog posts yet.</Text>
        )}
      </Box>
    </Box>
  );
};

const BlogSection: React.FC = async () => {
  const posts = await fetchWpPosts();
  const categories = await fetchWpAllCategories();
  const tags = await fetchWpAllTags();

  if (!posts || !categories || !tags) {
    return (
      <Box className="text-gray-400">
        <Text>Unable to load blog posts. Please try again later.</Text>
      </Box>
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
