import { Flex } from "@radix-ui/themes";
import React from "react";

export type BlogPostExcerpt = {
  id: number;
  dateGmt: string;
  modifiedGmt: string;
  slug: string;
  status: string;
  link: string;
  titleRendered: string;
  excerptRendered: string;
  featuredMedia: number;
  categories: number[];
  tags: number[];
};

export type ProjectCardProps = { post: BlogPostExcerpt };

export const PlaceholderPost = ({
  text = "Loading blog posts..",
  title = "Loading...",
}: {
  text?: string;
  title?: string;
}) => (
  <Flex>
    <p>Loading...</p>
    <h1>Loading...</h1>
    <p>Loading...</p>
  </Flex>
);

const ProjectCard: React.FC<ProjectCardProps> = ({
  post: {
    id,
    dateGmt,
    modifiedGmt,
    slug,
    status,
    link,
    titleRendered,
    excerptRendered,
    featuredMedia,
    categories,
    tags,
  },
}) => {
  return (
    <Flex>
      <p>{id}</p>
      <h1>{titleRendered}</h1>
      <p>{excerptRendered}</p>
    </Flex>
  );
};

export default ProjectCard;
