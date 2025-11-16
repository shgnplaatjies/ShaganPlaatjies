import React from 'react';
import { Suspense } from 'react';
import ExperienceCard from '../components/ExperienceCard';
import {
  fetchWpPosts,
  fetchWpAllCategories,
  fetchWpAllTags,
  fetchWpMediaById,
} from '../lib/server-lib';
import { WORDPRESS_CATEGORIES, type WordPressCategory, type WordPressTag, type WordPressPost } from '../lib/wordpress-types';

const ExperienceSectionContent: React.FC<{
  posts: WordPressPost[];
  categories: WordPressCategory[];
  tags: WordPressTag[];
  mediaMap: Record<number, string>;
}> = ({ posts, categories, tags, mediaMap }) => {
  const getTaxonomyNamesByIds = (ids: number[], taxonomy: (WordPressCategory | WordPressTag)[]): string[] =>
    ids
      .map(id => taxonomy.find(tax => tax.id === id)?.name)
      .filter((name): name is string => Boolean(name));

  const experiencePosts = posts.filter(post => {
    const categoryId = categories.find(c => c.slug === WORDPRESS_CATEGORIES.WORK_EXPERIENCE)?.id;
    return categoryId ? post.categories.includes(categoryId) : false;
  });

  return (
    <div id="experience-section" className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-12 mb-4 sm:mb-6">Experience</h2>
        <p className="text-sm sm:text-base text-gray-9 mb-6 sm:mb-8">Professional roles and key projects</p>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {experiencePosts.map((post) => {
          const featuredImageUrl = post.featured_media ? mediaMap[post.featured_media] : undefined;

          return (
            <ExperienceCard
              key={post.id}
              title={post.title.rendered}
              description={post.excerpt.rendered}
              tags={getTaxonomyNamesByIds(post.tags, tags)}
              featuredImage={featuredImageUrl}
            />
          );
        })}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-border">
        <a
          href={process.env.NEXT_PUBLIC_RESUME_URL || "/resume"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-gray-10 hover:text-gray-12 transition-colors"
        >
          Download Resume →
        </a>
      </div>
    </div>
  );
};

const ExperienceSection: React.FC = async () => {
  const posts = await fetchWpPosts();
  const categories = await fetchWpAllCategories();
  const tags = await fetchWpAllTags();

  if (!posts || !categories || !tags) {
    return (
      <div className="text-gray-400">
        Unable to load experience data. Please try again later.
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
    <Suspense fallback={<div className="text-gray-400">Loading experience...</div>}>
      <ExperienceSectionContent posts={posts} categories={categories} tags={tags} mediaMap={mediaMap} />
    </Suspense>
  );
};

export default ExperienceSection;
