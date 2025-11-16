import { DefaultFeaturedImage } from "@/app/lib/constants";
import { Box, Flex, Heading, Text, Badge } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TaxonomyList from "../widgets/TaxonomyList";

export type BlogPostExcerpt = {
  id: number;
  dateGmt: string;
  modifiedGmt: string;
  slug: string;
  status: string;
  link?: string; // url (deprecated - using slug now)
  titleRendered: string;
  featuredMedia?: string; // url
  categories?: string[];
  tags?: string[];
};

const ProjectImage: React.FC<{ src: string; alt: string }> = ({ alt, src }) => (
  <Image
    className="rounded-sm overflow-hidden group-hover:opacity-90 transition-all duration-300"
    src={src}
    width={600}
    height={600}
    alt={alt}
  />
);

const ProjectLabels: React.FC<{ labels: string[] }> = ({ labels }) => (
  <Flex wrap="wrap" gap="2">
    {labels.map((label) => (
      <Badge
        key={label}
        className="text-xs"
      >
        {label}
      </Badge>
    ))}
  </Flex>
);

const ProjectDate: React.FC<{ date: string }> = ({ date }) => (
  <Text size="2" className="text-gray-9">
    {date.slice(0, 4)}
  </Text>
);

const ProjectTitle: React.FC<{ title: string }> = ({ title }) => (
  <Heading
    className="pb-3 text-balance font-semibold text-xl leading-tight text-gray-12"
    as="h2"
  >
    {title}
  </Heading>
);

const ProjectId: React.FC<{ id: string | number }> = ({ id }) => (
  <Text size="1" className="text-gray-9 tracking-wide">
    {isNaN(Number(id)) ? id : (id as number) < 10 ? `0${id}` : id}
  </Text>
);

type ProjectCardInternalProps = {
  date: string;
  id: string | number;
  labels: string[];
  mediaSrc: string;
  title: string;
};

const ProjectSmallScreen: React.FC<ProjectCardInternalProps> = ({
  date,
  id,
  labels,
  mediaSrc,
  title,
}) => (
  <Box className="pb-12 border-b border-gray-5 hover:border-gray-7 transition-all duration-300 group">
    {/* Metadata Section */}
    <Flex justify="between" align="center" className="mb-6 opacity-75">
      <ProjectId id={id} />
      <ProjectDate date={date} />
    </Flex>

    {/* Title */}
    <Box className="mb-6">
      <ProjectTitle title={title} />
    </Box>

    {/* Featured Image - Large */}
    <Box className="mb-6 h-64 overflow-hidden rounded-lg group-hover:opacity-80 transition-opacity duration-300">
      <ProjectImage src={mediaSrc} alt={title} />
    </Box>

    {/* Tech Stack */}
    <ProjectLabels labels={labels} />
  </Box>
);

const ProjectMediumScreen: React.FC<ProjectCardInternalProps> = ({
  date,
  id,
  labels,
  mediaSrc,
  title,
}) => (
  <Box className="pb-12 border-b border-gray-5 hover:border-gray-7 transition-all duration-300 group">
    {/* Metadata Section */}
    <Flex justify="between" align="center" className="mb-6 opacity-75">
      <ProjectId id={id} />
      <ProjectDate date={date} />
    </Flex>

    {/* Title */}
    <Box className="mb-8">
      <ProjectTitle title={title} />
    </Box>

    {/* Featured Image - Right Aligned */}
    <Flex justify="end" className="mb-8">
      <Box className="max-w-xs h-48 overflow-hidden rounded-lg group-hover:opacity-80 transition-opacity duration-300">
        <ProjectImage src={mediaSrc} alt={title} />
      </Box>
    </Flex>

    {/* Tech Stack */}
    <ProjectLabels labels={labels} />
  </Box>
);

const ProjectLargeScreen: React.FC<ProjectCardInternalProps> = ({
  date,
  id,
  labels,
  mediaSrc,
  title,
}) => (
  <Box className="pb-12 border-b border-gray-5 hover:border-gray-7 transition-all duration-300 group">
    {/* Top Row: ID | Title + Tags | Image | Date */}
    <Flex gap="6" justify="between" align="start" className="items-start">
      {/* Project ID */}
      <Box className="flex-shrink-0 pt-1">
        <ProjectId id={id} />
      </Box>

      {/* Title & Tags Section */}
      <Box className="flex-1">
        <ProjectTitle title={title} />
        <Box className="mt-4">
          <ProjectLabels labels={labels} />
        </Box>
      </Box>

      {/* Featured Image - Reveal on Hover */}
      <Box className="flex-shrink-0 max-w-xs h-40 overflow-hidden rounded-lg opacity-0 w-0 transition-all duration-500 ease-in-out group-hover:w-xs group-hover:opacity-100">
        <ProjectImage src={mediaSrc} alt={title} />
      </Box>

      {/* Date */}
      <Box className="flex-shrink-0 pt-1">
        <ProjectDate date={date} />
      </Box>
    </Flex>
  </Box>
);

const ProjectCard: React.FC<{
  post: BlogPostExcerpt & { labels?: string[] };
}> = ({
  post: {
    id,
    dateGmt,
    slug,
    titleRendered,
    featuredMedia,
    categories,
    tags,
    labels,
  },
}) => {
  const projectProps: ProjectCardInternalProps = {
    date: dateGmt,
    mediaSrc: featuredMedia ?? DefaultFeaturedImage,
    title: titleRendered,
    id,
    labels: labels ?? [...(categories ?? []), ...(tags ?? [])],
  };

  return (
    <Box mt={"8"} asChild>
      <Flex
        direction="column"
        px="3"
        className="flex self-center rounded-sm border border-gray-5 hover:border-gray-6 hover:bg-gray-2 transition-all duration-300"
      >
        <Link href={`/posts/${slug}`} className="group">
          <div className="block sm:hidden">
            <ProjectSmallScreen {...projectProps} />
          </div>
          <div className="hidden sm:block md:hidden">
            <ProjectMediumScreen {...projectProps} />
          </div>
          <div className="hidden md:flex self-center">
            <ProjectLargeScreen {...projectProps} />
          </div>
        </Link>
      </Flex>
    </Box>
  );
};

export default ProjectCard;
