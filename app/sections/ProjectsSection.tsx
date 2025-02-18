"use client";
import { Box, Section } from "@radix-ui/themes";
import { Suspense, useEffect, useState } from "react";
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

  useEffect(() => {
    const getProjectDetails = async () => {
      setTags(await fetchWpAllTags());
      setCategories(await fetchWpAllCategories());
      setPosts(await fetchWpPosts());
    };

    getProjectDetails();
  }, []);

  const [posts, setPosts] = useState<WpPostApiResponse[] | false>();
  const [tags, setTags] = useState<WpTagApiResponse[] | false>();
  const [categories, setCategories] = useState<
    WpCategoryApiResponse[] | false
  >();

  if (!posts || !tags || !categories) return <PlaceholderPost />;

  return (
    <Section>
      <AccentedHeading
        textAs="h2"
        size="9"
        preText="Projects & "
        accentedText="Experience"
      />
      <Box maxWidth={"75%"}>
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
      </Box>
      <CTAButton href="/projects" text="View All" />
    </Section>
  );
};

export default ProjectsSection;
