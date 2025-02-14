import { DefaultFeaturedImage } from "@/app/lib/constants";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TaxonomyList from "../TaxonomyList";

export type BlogPostExcerpt = {
  id: number;
  dateGmt: string;
  modifiedGmt: string;
  slug: string;
  status: string;
  link: string; // url
  titleRendered: string;
  featuredMedia?: string; // url
  categories?: string[];
  tags?: string[];
};

const ProjectImage: React.FC<{ src: string; alt: string }> = ({ alt, src }) => (
  <Image
    className="rounded border border-gray-border-1 -rotate-3"
    src={src}
    width={200}
    height={100}
    alt={alt}
  />
);

const ProjectLabels: React.FC<{ labels: string[] }> = ({ labels }) => (
  <>{<TaxonomyList taxonomies={labels} />}</>
);

const ProjectDate: React.FC<{ date: string }> = ({ date }) => (
  <Text size="2">{date.slice(0, 4)}</Text>
);

const ProjectTitle: React.FC<{ title: string }> = ({ title }) => (
  <Heading wrap="wrap" as="h2">
    {title}
  </Heading>
);

const ProjectId: React.FC<{ id: string | number }> = ({ id }) => (
  <>
    <Text size="2">
      {isNaN(Number(id)) ? id : (id as number) < 10 ? `0${id}` : id}
    </Text>
  </>
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
  <>
    <Flex justify="center" mt={"-8"} mb="4" height="10rem">
      {mediaSrc && <ProjectImage src={mediaSrc} alt={title} />}
    </Flex>
    <Flex direction="column" gap="3" mx="3">
      <Flex justify="between" className="opacity-60">
        <ProjectId id={id} />
        <ProjectDate date={date} />
      </Flex>
      <ProjectTitle title={title} />
      <ProjectLabels labels={labels} />
    </Flex>
  </>
);
const ProjectMediumScreen: React.FC<BlogPostExcerpt> = () => <></>;
const ProjectLargeScreen: React.FC<BlogPostExcerpt> = () => <></>;

const ProjectCard: React.FC<{ post: BlogPostExcerpt }> = ({
  post: {
    id,
    dateGmt,
    modifiedGmt,
    slug,
    status,
    link,
    titleRendered,
    featuredMedia = DefaultFeaturedImage,
    categories,
    tags,
  },
}) => {
  const projectProps: ProjectCardInternalProps = {
    date: dateGmt,
    mediaSrc: featuredMedia,
    title: titleRendered,
    id,
    labels: [...(categories ?? []), ...(tags ?? [])],
  };
  return (
    <Box mt={"8"} asChild>
      <Link href={link}>
        <Flex
          direction="column"
          px="3"
          className="rounded border border-gray-border-1"
          pb="5"
        >
          <ProjectSmallScreen {...projectProps} />
        </Flex>
      </Link>
    </Box>
  );
};

export default ProjectCard;
