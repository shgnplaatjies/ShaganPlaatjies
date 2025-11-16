import React from 'react';
import { Suspense } from 'react';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import {
  fetchWpPosts,
  fetchWpAllCategories,
  fetchWpAllTags,
  fetchWpMediaById,
} from '../lib/server-lib';
import { WORDPRESS_CATEGORIES, type WordPressCategory, type WordPressTag, type WordPressPost } from '../lib/wordpress-types';

const ProjectsSectionContent: React.FC<{
  posts: WordPressPost[];
  categories: WordPressCategory[];
  tags: WordPressTag[];
  mediaMap: Record<number, string>;
}> = ({ posts, categories, tags, mediaMap }) => {
  const getTaxonomyNamesByIds = (ids: number[], taxonomy: (WordPressCategory | WordPressTag)[]): string[] =>
    ids
      .map(id => taxonomy.find(tax => tax.id === id)?.name)
      .filter((name): name is string => Boolean(name));

  const projectPosts = posts.filter(post => {
    const categoryId = categories.find(c => c.slug === WORDPRESS_CATEGORIES.PROJECT)?.id;
    return categoryId ? post.categories.includes(categoryId) : false;
  });

  return (
    <div id="projects-section" className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-12 mb-4 sm:mb-6">Projects</h2>
        <p className="text-sm sm:text-base text-gray-9 mb-6 sm:mb-8">Portfolio of work and technical solutions</p>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {projectPosts.map((post, index) => {
          const featuredImageUrl = post.featured_media ? mediaMap[post.featured_media] : undefined;

          return (
            <ProjectCard
              key={post.id}
              post={{
                id: index + 1,
                dateGmt: post.date_gmt,
                modifiedGmt: post.modified_gmt,
                slug: post.slug,
                status: post.status,
                link: post.link,
                titleRendered: post.title.rendered,
                featuredMedia: featuredImageUrl,
                categories: getTaxonomyNamesByIds(post.categories, categories),
                tags: getTaxonomyNamesByIds(post.tags, tags),
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = async () => {
  const posts = await fetchWpPosts();
  const categories = await fetchWpAllCategories();
  const tags = await fetchWpAllTags();

  if (!posts || !categories || !tags) {
    return (
      <div className="text-gray-400">
        Unable to load projects. Please try again later.
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
    <Suspense fallback={<div className="text-gray-400">Loading projects...</div>}>
      <ProjectsSectionContent posts={posts} categories={categories} tags={tags} mediaMap={mediaMap} />
    </Suspense>
  );
};

export default ProjectsSection;
