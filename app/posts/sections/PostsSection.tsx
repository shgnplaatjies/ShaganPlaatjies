"use server";
import { PlaceholderPost } from "@/app/components/ProjectCard/PlaceholderProject";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import CodeGlitch from "@/app/components/transitions/CodeGlitch";
import DataStream from "@/app/components/transitions/DataStream";
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

const PostsSection: React.FC = async () => {
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

  const postsList = posts.map(async (post, i) => ({
    index: i,
    post,
    featuredMedia: await fetchWpMediaById(post.featured_media).then((res) =>
      res ? res.source_url : undefined
    ),
    categories: getTaxonomyNamesByIds(post.categories, categories),
    tags: getTaxonomyNamesByIds(post.tags, tags),
  }));

  const resolvedPosts = await Promise.all(postsList);

  return (
    <Section>
      <AccentedHeading
        className="mb-12"
        wrap="balance"
        align="center"
        textAs="h1"
        size="9"
        preText="View my "
        accentedText="Blog Posts"
      />
      <Suspense fallback={<PlaceholderPost text="Fetching blog posts..." />}>
        {!posts || posts.length === 0 ? (
          <PlaceholderPost
            title="Error!"
            text="Error while fetching blog posts... Please try again later."
          />
        ) : (
          <Flex direction="column" gap="0">
            {resolvedPosts.map((item, idx) => (
              <div key={item.post.id}>
                <ProjectCard
                  post={{
                    id: item.index + 1,
                    dateGmt: item.post.date_gmt,
                    modifiedGmt: item.post.modified_gmt,
                    slug: item.post.slug,
                    status: item.post.status,
                    link: item.post.link,
                    titleRendered: item.post.title.rendered,
                    featuredMedia: item.featuredMedia,
                    categories: item.categories,
                    tags: item.tags,
                  }}
                />
                {idx < resolvedPosts.length - 1 && (
                  <div className="my-8">
                    {idx % 2 === 0 ? (
                      <CodeGlitch code="// more insights ahead" />
                    ) : (
                      <DataStream
                        items={["Learn", "Build", "Share", "Grow"]}
                        direction="right"
                        speed={3}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </Flex>
        )}
      </Suspense>
    </Section>
  );
};

export default PostsSection;
