"use server";

import { Box, Flex, Heading, Section, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostContent from "../../components/PostContent";
import { fetchWpProject, fetchWpMediaById } from "../../lib/server-lib";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = await fetchWpProject(slug);

  if (!project) {
    notFound();
  }

  const featuredMedia = project.featured_media
    ? await fetchWpMediaById(project.featured_media)
    : null;

  const role = project.meta._portfolio_role;
  const company = project.meta._portfolio_company;
  const sourceUrl = project.meta._portfolio_source_url;

  const publishedDate = new Date(project.date_gmt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {featuredMedia && "source_url" in featuredMedia && (
        <Box className="relative w-full h-[32rem] overflow-hidden bg-gray-900">
          <Image
            src={featuredMedia.source_url}
            alt={project.title.rendered}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </Box>
      )}

      <Section>
        <Box className="max-w-3xl mx-auto mb-12">
          <Heading as="h1" size="8" className="mb-6 font-semibold">
            {project.title.rendered}
          </Heading>

          <Flex
            direction="column"
            gap="3"
            className="mb-8 pb-8 border-b border-gray-border"
          >
            <Flex align="center" gap="2" className="flex-wrap">
              <Text size="2" className="text-gray-solid-hover">
                {publishedDate}
              </Text>
              {role && (
                <>
                  <span className="text-gray-border">•</span>
                  <Text size="2" className="text-gray-solid-hover">
                    {role}
                  </Text>
                </>
              )}
              {company && (
                <>
                  <span className="text-gray-border">•</span>
                  <Text size="2" className="text-gray-solid-hover">
                    {company}
                  </Text>
                </>
              )}
            </Flex>
          </Flex>

          <Box className="mb-12">
            <PostContent html={project.content.rendered} />
          </Box>

          {sourceUrl && (
            <Box className="pt-8 border-t border-gray-border">
              <Link
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-cyan-solid hover:text-gray-solid-hover transition-colors"
              >
                View Project →
              </Link>
            </Box>
          )}

          <Box className="mt-12 pt-8 border-t border-gray-border">
            <Link
              href="/#projects"
              className="inline-flex items-center text-cyan-solid hover:text-gray-solid-hover transition-colors"
            >
              <span className="mr-2">←</span>
              Back to all projects
            </Link>
          </Box>
        </Box>
      </Section>
    </>
  );
}
