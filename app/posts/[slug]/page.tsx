"use server";

import { Box, Flex, Heading, Section, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostContent from "../../components/PostContent";
import {
  WpCategoryApiResponse,
  WpPostApiResponse,
  WpTagApiResponse,
  fetchWpAllCategories,
  fetchWpAllTags,
  fetchWpMediaById,
  fetchWpPost,
} from "../../lib/server-lib";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const getTaxonomyNamesByIds = (
  ids: number[],
  taxonomy: WpCategoryApiResponse[] | WpTagApiResponse[]
) =>
  ids
    .map((id) => taxonomy.find((tax) => tax.id === id)?.name)
    .filter(Boolean) as string[];

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  const post: WpPostApiResponse | false = await fetchWpPost(slug);

  if (!post) {
    notFound();
  }

  const [featuredMedia, tags, categories] = await Promise.all([
    fetchWpMediaById(post.featured_media),
    fetchWpAllTags(),
    fetchWpAllCategories(),
  ]);

  const categoryNames = getTaxonomyNamesByIds(post.categories, categories || []);
  const tagNames = getTaxonomyNamesByIds(post.tags, tags || []);

  const publishedDate = new Date(post.date_gmt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full h-full overflow-y-auto">
      {featuredMedia && (
        <Box className="relative w-full h-[32rem] overflow-hidden bg-gray-900">
          <Image
            src={featuredMedia.source_url}
            alt={post.title.rendered}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </Box>
      )}

      <Section>
        <Box className="max-w-3xl mx-auto mb-12">
          <Heading
            as="h1"
            size="8"
            className="mb-6 font-semibold"
          >
            {post.title.rendered}
          </Heading>

          <Flex direction="column" gap="3" className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
            <Flex align="center" gap="2" className="flex-wrap">
              <Text size="2" className="text-gray-600 dark:text-gray-400">
                {publishedDate}
              </Text>
              {categoryNames.length > 0 && (
                <>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <Flex gap="2">
                    {categoryNames.map((category) => (
                      <span
                        key={category}
                        className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20"
                      >
                        {category}
                      </span>
                    ))}
                  </Flex>
                </>
              )}
            </Flex>
          </Flex>

          <Box className="mb-12">
            <PostContent html={post.content.rendered} />
          </Box>

          {tagNames.length > 0 && (
            <Box className="pt-8 border-t border-gray-200 dark:border-gray-800">
              <Text size="2" className="text-gray-600 dark:text-gray-400 mb-3 block">
                Tags
              </Text>
              <Flex gap="2" className="flex-wrap">
                {tagNames.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </Flex>
            </Box>
          )}

          <Box className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <Link
              href="/posts"
              className="inline-flex items-center text-cyan-solid hover:text-gray-solid-hover transition-colors"
            >
              <span className="mr-2">←</span>
              Back to all posts
            </Link>
          </Box>
        </Box>
      </Section>
    </div>
  );
}
