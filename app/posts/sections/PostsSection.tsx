import ProjectCard, { PlaceholderPost } from "@/app/components/ProjectCard";
import { Flex, Section } from "@radix-ui/themes";
import { Suspense } from "react";
import AccentedHeading from "../../components/AccentedHeading";
import { WpPost, fetchWpPosts } from "../../lib/server-lib";

export const revalidate = 3600; // 1 hour

const PostsSection: React.FC = async () => {
  const posts: WpPost[] | false = await fetchWpPosts();

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
            posts.map((WpPost, i) => (
              <ProjectCard
                key={WpPost.id}
                post={{
                  id: i + 1,
                  dateGmt: WpPost.date_gmt,
                  modifiedGmt: WpPost.modified_gmt,
                  slug: WpPost.slug,
                  status: WpPost.status,
                  link: WpPost.link,
                  titleRendered: WpPost.title.rendered,
                  featuredMedia: WpPost.featured_media,
                  categories: WpPost.categories,
                  tags: WpPost.tags,
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
