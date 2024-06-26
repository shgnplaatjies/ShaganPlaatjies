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
  featuredMedia: number;
  categories?: string[];
  tags?: string[];
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
    <h1>{title}</h1>
    <p>{text}</p>
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
