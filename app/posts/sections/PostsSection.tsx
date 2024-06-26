import ProjectCard, { PlaceholderPost } from "@/app/components/ProjectCard";
import { Flex, Section } from "@radix-ui/themes";
import { Suspense } from "react";
import AccentedHeading from "../../components/AccentedHeading";
import { WpPostApiResponse, fetchWpPosts } from "../../lib/server-lib";

export const revalidate = 3600; // 1 hour

const PostsSection: React.FC = async () => {
  const posts: WpPostApiResponse[] | false = await fetchWpPosts();

  return (
    <Section>
      <AccentedHeading
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
            posts.map((post, i) => (
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
                  featuredMedia: post.featured_media,
                  categories: post.categories,
                  tags: post.tags,
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
