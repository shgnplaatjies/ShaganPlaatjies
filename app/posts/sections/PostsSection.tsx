import { PlaceholderPost } from "@/app/components/ProjectCard/PlaceholderProject";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import { Flex, Section } from "@radix-ui/themes";
import { Suspense } from "react";
import AccentedHeading from "../../components/AccentedHeading";
import {
  WpCategoryApiResponse,
  WpPostApiResponse,
  WpTagApiResponse,
  fetchWpAllCategories,
  fetchWpAllTags,
  fetchWpMediaById,
  fetchWpPosts,
} from "../../lib/server-lib";

export const revalidate = 10; // 1 hour

const PostsSection: React.FC = async () => {
  "use server";
  const posts: WpPostApiResponse[] | false = await fetchWpPosts();
  const tags: WpTagApiResponse[] | false = await fetchWpAllTags();
  const categories: WpCategoryApiResponse[] | false =
    await fetchWpAllCategories();

  if (!posts || !tags || !categories) return <PlaceholderPost />;

  const getTaxonomyNamesByIds = (
    ids: number[],
    taxonomy: WpCategoryApiResponse[] | WpTagApiResponse[]
  ) =>
    ids
      .map((id) => taxonomy.find((tax) => tax.id === id)?.name)
      .filter(Boolean) as string[] | undefined;

  return (
    <Section>
      <AccentedHeading
        className="mb-9"
        wrap="balance"
        align="center"
        textAs="h1"
        size="9"
        preText="View my "
        accentedText="Blog Posts"
      />
      <Flex direction="column" gap="2">
        <Suspense fallback={<PlaceholderPost text="Fetching blog posts..." />}>
          {!posts ? (
            <PlaceholderPost
              title="Error!"
              text="Error while fetching blog posts... Please try again later."
            />
          ) : (
            posts.map(async (post, i) => (
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
      </Flex>
    </Section>
  );
};

export default PostsSection;
