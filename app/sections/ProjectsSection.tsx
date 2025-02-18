import { Box, Section } from "@radix-ui/themes";
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
    <Section>
      <AccentedHeading
        textAs="h2"
        size="9"
        preText="Projects & "
        accentedText="Experience"
      />
      <Box>
        <Suspense fallback={<PlaceholderPost text="Fetching blog posts..." />}>
          {!posts ? (
            <PlaceholderPost
              title="Error!"
              text="Error while fetching blog posts... Please try again later."
            />
          ) : (
            posts
              .filter((currentPost) => {
                const projectsCategoryId = categories.filter((category) => {
                  console.log(category.slug);
                  return category.slug === "project";
                });
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
              ))
          )}
        </Suspense>
      </Box>
      <CTAButton href="/projects" text="View All" />
    </Section>
  );
};

export { ProjectsSection };
