import { Box, Flex, Section, Text } from "@radix-ui/themes";
import { Suspense } from "react";
import AccentedHeading from "../components/AccentedHeading";
import CTAButton from "../components/CTAButton";
import { PlaceholderPost } from "../components/ProjectCard/PlaceholderProject";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import {
  WpCategoryApiResponse,
  WpPostApiResponse,
  WpTagApiResponse,
  fetchWpAllCategories,
  fetchWpAllTags,
  fetchWpMediaById,
  fetchWpPosts,
} from "../lib/server-lib";

const ProjectsSection: React.FC = async () => {
  const getTaxonomyNamesByIds = (
    ids: number[],
    taxonomy: WpCategoryApiResponse[] | WpTagApiResponse[]
  ) =>
    ids
      .map((id) => taxonomy.find((tax) => tax.id === id)?.name)
      .filter(Boolean) as string[] | undefined;

  const posts: WpPostApiResponse[] | false = await fetchWpPosts();
  const tags: WpTagApiResponse[] | false = await fetchWpAllTags();
  const categories: WpCategoryApiResponse[] | false =
    await fetchWpAllCategories();

  if (!posts || !tags || !categories) return <PlaceholderPost />;

  return (
    <Section className="mt-8">
      <AccentedHeading
        textAs="h2"
        size="8"
        preText="Featured "
        accentedText="projects & solutions"
      />

      <Text as="p" size="2" className="mb-5 opacity-80 max-w-3xl">
        Enterprise-grade systems and scalable architectures delivered across fintech, insurance,
        telecommunications, and live entertainment. Each project represents solutions to complex
        technical challenges, from monolithic migrations to patented global-scale platforms.
      </Text>

      <Box className="my-4">
        <Suspense fallback={<PlaceholderPost text="Loading projects..." />}>
          {!posts ? (
            <PlaceholderPost
              title="Error!"
              text="Error while fetching projects... Please try again later."
            />
          ) : (
            <Flex direction="column" gap="3">
              {posts
                .filter((currentPost) => {
                  const projectsCategoryId = categories.filter(
                    (category) => category.slug === "project"
                  );
                  return currentPost.categories.includes(
                    projectsCategoryId[0]?.id
                  );
                })
                .map(async (post, i) => (
                  <ProjectCard
                    key={post.id}
                    post={{
                      id: i + 1,
                      dateGmt: post.date_gmt,
                      modifiedGmt: post.modified_gmt,
                      slug: post.slug,
                      status: post.status,
                      link: post.link,
                      titleRendered: post.title.rendered,
                      featuredMedia: await fetchWpMediaById(
                        post.featured_media
                      ).then((res) => (res ? res.source_url : undefined)),
                      categories: getTaxonomyNamesByIds(
                        post.categories,
                        categories
                      ),
                      tags: getTaxonomyNamesByIds(post.tags, tags),
                    }}
                  />
                ))}
            </Flex>
          )}
        </Suspense>
      </Box>

      <Flex justify="center" className="mt-4">
        <CTAButton href="/experience" text="Explore Full Portfolio" />
      </Flex>
    </Section>
  );
};

export { ProjectsSection };
