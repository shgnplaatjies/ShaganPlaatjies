import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { DefaultFeaturedImage } from "../lib/constants";
import TaxonomyList from "./TaxonomyList";

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
  return (
    <Box mt={"8"}>
      <Flex
        direction="column"
        px="3"
        className="rounded border border-gray-border-1"
        pb="5"
      >
        <Flex justify="center" mt={"-8"} mb="4" height="10rem">
          <Image
            className="rounded border border-gray-border-1"
            src={featuredMedia}
            width={200}
            height={100}
            alt={"Some Image and stuff"}
          />
        </Flex>
        <Flex direction="column" gap="3" mx="3">
          <Flex justify="between" className="opacity-60">
            <Text size="2">{id < 10 ? `0${id}` : id}</Text>
            <Text size="2">{dateGmt.slice(0, 4)}</Text>
          </Flex>
          <Heading wrap="wrap" as="h2">
            {titleRendered}
          </Heading>
          {categories && <TaxonomyList taxonomies={categories} />}
          {tags && <TaxonomyList taxonomies={tags} />}
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProjectCard;
