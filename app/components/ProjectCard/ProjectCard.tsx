import { DefaultFeaturedImage } from "@/app/lib/constants";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
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
  link: string; // url
  titleRendered: string;
  featuredMedia?: string; // url
  categories?: string[];
  tags?: string[];
};

const ProjectImage: React.FC<{ src: string; alt: string }> = ({ alt, src }) => (
  <Image
    className="rounded border border-gray-border-1"
    src={src}
    width={600}
    height={600}
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
  <Heading className="pb-4 text-balance" as="h2">
    {title}
  </Heading>
);

const ProjectId: React.FC<{ id: string | number }> = ({ id }) => (
  <>
    <Text size="2" className="break-keep">
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
    <Flex className="justify-center -mt-8 mb-4 mx-3 max-h-48 overflow-hidden">
      <ProjectImage src={mediaSrc} alt={title} />
    </Flex>
    <Flex direction="column" gap="3" mx="3" className="pb-8">
      <Flex justify="between" className="opacity-60">
        <ProjectId id={id} />
        <ProjectDate date={date} />
      </Flex>
      <ProjectTitle title={title} />
      <ProjectLabels labels={labels} />
    </Flex>
  </>
);

const ProjectMediumScreen: React.FC<ProjectCardInternalProps> = ({
  date,
  id,
  labels,
  mediaSrc,
  title,
}) => (
  <div className="pb-10">
    <Flex className="justify-end max-h-96" mt={"-8"} mb="4">
      <div className="flex justify-self-end max-w-[40%] -rotate-3">
        <ProjectImage src={mediaSrc} alt={title} />
      </div>
    </Flex>
    <Flex direction="column" gap="3" mx="3">
      <Flex justify="between" className="opacity-60">
        <ProjectId id={id} />
        <ProjectDate date={date} />
      </Flex>
      <ProjectTitle title={title} />
      <ProjectLabels labels={labels} />
    </Flex>
  </div>
);

const ProjectLargeScreen: React.FC<ProjectCardInternalProps> = ({
  date,
  id,
  labels,
  mediaSrc,
  title,
}) => (
  <>
    <Flex gapX={"2"} justify={"between"} className="py-12 min-w-full">
      <Box className="ml-8 w-10 overflow-hidden transition-[max-width] duration-300 ease-in-out group-hover:max-w-0">
        <ProjectId id={id} />
      </Box>

      <Box className="max-w-[66%]">
        <ProjectTitle title={title} />
        <Flex>
          <ProjectLabels labels={labels} />
        </Flex>
      </Box>

      <Box className="-rotate-3 max-w-48 h-28 opacity-0 w-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-full group-hover:opacity-90 ">
        <ProjectImage src={mediaSrc} alt={title} />
      </Box>

      <Box className="px-10">
        <ProjectDate date={date} />
      </Box>
    </Flex>
  </>
);

const ProjectCard: React.FC<{
  post: BlogPostExcerpt & { labels?: string[] };
}> = ({
  post: {
    id,
    dateGmt,
    link,
    titleRendered,
    featuredMedia = DefaultFeaturedImage,
    categories,
    tags,
    labels,
  },
}) => {
  const projectProps: ProjectCardInternalProps = {
    date: dateGmt,
    mediaSrc: featuredMedia,
    title: titleRendered,
    id,
    labels: labels ?? [...(categories ?? []), ...(tags ?? [])],
  };
  return (
    <Box mt={"8"} asChild>
      <Flex
        direction="column"
        px="3"
        className="flex self-center rounded border border-gray-border-1 "
      >
        <Link href={link} className="group">
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
