"use client";

import { DefaultFeaturedImage } from "@/app/lib/constants";
import { Box, Flex, Heading, Text, Badge } from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TaxonomyList from "../widgets/TaxonomyList";
import { ProjectMeta } from "@/app/lib/wordpress-types";

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
  meta?: ProjectMeta;
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
      <Badge key={label} className="text-xs">
        {label}
      </Badge>
    ))}
  </Flex>
);

const formatDate = (dateString: string, format: string): string => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const day = String(date.getDate()).padStart(2, "0");

  switch (format) {
    case "yyyy":
      return `${year}`;
    case "mm/yyyy":
      return `${month}/${year}`;
    case "dd/mm/yyyy":
      return `${day}/${month}/${year}`;
    default:
      return `${month}/${year}`;
  }
};

const formatDateRange = (
  startDate: string,
  endDate: string | undefined,
  dateFormat: string
): string => {
  const formattedStart = formatDate(startDate, dateFormat);
  if (endDate) {
    const formattedEnd = formatDate(endDate, dateFormat);
    return `${formattedStart} - ${formattedEnd}`;
  }
  return `${formattedStart} - Present`;
};

const ProjectDate: React.FC<{ date: string }> = ({ date }) => (
  <Text size="2" className="text-gray-9">
    {date.slice(0, 4)}
  </Text>
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
  role?: string;
  company?: string;
};

const ProjectSmallScreen: React.FC<ProjectCardInternalProps> = ({
  date,
  id,
  labels,
  mediaSrc,
  role,
  company,
}) => (
  <Flex direction="column" gap="4" width="100%">
    <Flex className="justify-center max-h-48 overflow-hidden">
      <ProjectImage src={mediaSrc} alt={role || company || "Project"} />
    </Flex>
    <Flex direction="column" gap="3">
      <Flex justify="between" className="opacity-70">
        <ProjectId id={id} />
        <ProjectDate date={date} />
      </Flex>
      <ProjectLabels labels={labels} />
    </Flex>
  </Flex>
);

const ProjectMediumScreen: React.FC<ProjectCardInternalProps> = ({
  date,
  id,
  labels,
  mediaSrc,
  role,
  company,
}) => (
  <Flex direction="column" gap="4" width="100%" pb="6">
    <Flex justify="end" className="max-h-80">
      <Box className="max-w-[45%]">
        <ProjectImage src={mediaSrc} alt={role || company || "Project"} />
      </Box>
    </Flex>
    <Flex direction="column" gap="3">
      <Flex justify="between" className="opacity-70">
        <ProjectId id={id} />
        <ProjectDate date={date} />
      </Flex>
      <ProjectLabels labels={labels} />
    </Flex>
  </Flex>
);

const ProjectLargeScreen: React.FC<ProjectCardInternalProps> = ({
  date,
  id,
  labels,
  mediaSrc,
  role,
  company,
}) => (
  <Flex
    gapX="3"
    justify="between"
    py="6"
    width="100%"
    align="start"
  >
    <Box ml="6" pt="1" flexShrink="0">
      <ProjectId id={id} />
    </Box>

    <Box className="flex-1 max-w-[55%]">
      <ProjectLabels labels={labels} />
    </Box>

    <Box className="max-w-56 h-32 flex-shrink-0 overflow-visible opacity-0 w-0 transition-all duration-500 ease-in-out group-hover:w-56 group-hover:opacity-100">
      <ProjectImage src={mediaSrc} alt={role || company || "Project"} />
    </Box>

    <Box px="8" pt="1" flexShrink="0">
      <ProjectDate date={date} />
    </Box>
  </Flex>
);

const ProjectMetaInfo: React.FC<{ meta?: ProjectMeta }> = ({ meta }) => {
  if (!meta) return null;

  const role = meta._project_role;
  const company = meta._project_company;
  const companyUrl = meta._project_company_url;
  const location = meta._project_location;
  const employmentType = meta._project_employment_type;
  const dateStart = meta._project_date_start;
  const dateEnd = meta._project_date_end;
  const dateFormat = meta._project_date_format || "mm/yyyy";

  const dateRange = dateStart
    ? formatDateRange(dateStart, dateEnd, dateFormat)
    : "";
  const hasMetaInfo =
    role || company || location || employmentType || dateRange;

  if (!hasMetaInfo) return null;

  return (
    <Flex direction="column" gap="2" className="text-sm mb-3">
      {role && (
        <Text size="2" className="font-medium text-gray-text-contrast">
          {role}
        </Text>
      )}
      {company && (
        <Flex align="center" gap="2">
          {companyUrl ? (
            <Flex
              align="center"
              gap="1"
              className="text-cyan-9 cursor-pointer hover:text-cyan-10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                window.open(companyUrl, '_blank');
              }}
            >
              <Text size="2" className="font-medium">
                {company}
              </Text>
              <ExternalLinkIcon width="14" height="14" />
            </Flex>
          ) : (
            <Text size="2" className="text-gray-solid-hover">
              {company}
            </Text>
          )}
        </Flex>
      )}
      <Flex align="center" gap="3" wrap="wrap" className="text-xs">
        {employmentType && (
          <Text size="1" className="text-gray-solid-hover capitalize">
            {employmentType.replace("-", " ")}
          </Text>
        )}
        {location && (
          <Text size="1" className="text-gray-solid-hover">
            {location}
          </Text>
        )}
        {dateRange && (
          <Text size="1" className="text-gray-solid-hover">
            {dateRange}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

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
    meta,
  },
}) => {
  const projectProps: ProjectCardInternalProps = {
    date: dateGmt,
    mediaSrc: featuredMedia ?? DefaultFeaturedImage,
    role: meta?._project_role,
    company: meta?._project_company,
    id,
    labels: labels ?? [...(categories ?? []), ...(tags ?? [])],
  };

  return (
    <Box mt={"8"} asChild>
      <Flex
        direction="column"
        px="3"
        className="flex self-center rounded-sm border border-gray-border hover:border-gray-border-hover hover:bg-gray-bg-secondary transition-all duration-300"
      >
        <Link href={`/projects/${slug}`} className="group">
          <Box width="100%">
            <Box className="block sm:hidden">
              <ProjectSmallScreen {...projectProps} />
              <ProjectMetaInfo meta={meta} />
            </Box>
            <Box className="hidden sm:block md:hidden">
              <ProjectMediumScreen {...projectProps} />
              <ProjectMetaInfo meta={meta} />
            </Box>
            <Box className="hidden md:block">
              <ProjectLargeScreen {...projectProps} />
              <ProjectMetaInfo meta={meta} />
            </Box>
          </Box>
        </Link>
      </Flex>
    </Box>
  );
};

export default ProjectCard;
