"use server";

import { Box, Flex, Heading, Section, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostContent from "../../components/PostContent";
import {
  fetchWpExperienceItem,
  fetchWpMediaById,
} from "../../lib/server-lib";

interface ExperiencePageProps {
  params: Promise<{
    slug: string;
  }>;
}

const formatDateRange = (
  startDate: string,
  endDate: string | undefined
): string => {
  if (endDate) {
    return `${startDate} - ${endDate}`;
  }
  return `${startDate} - Present`;
};

export default async function ExperiencePage({
  params,
}: ExperiencePageProps) {
  const { slug } = await params;

  const experience = await fetchWpExperienceItem(slug);

  if (!experience) {
    notFound();
  }

  const featuredMedia = experience.featured_media
    ? await fetchWpMediaById(experience.featured_media)
    : null;

  const role = experience.meta._portfolio_experience_role;
  const company = experience.meta._portfolio_experience_company;
  const location = experience.meta._portfolio_experience_location;
  const employmentType = experience.meta._portfolio_experience_employment_type;
  const dateStart = experience.meta._portfolio_experience_date_start;
  const dateEnd = experience.meta._portfolio_experience_date_end;

  const dateRange = dateStart ? formatDateRange(dateStart, dateEnd) : "";

  return (
    <>
      {featuredMedia && "source_url" in featuredMedia && (
        <Box className="relative w-full h-[32rem] overflow-hidden bg-gray-900">
          <Image
            src={featuredMedia.source_url}
            alt={experience.title.rendered}
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
            {role || experience.title.rendered}
          </Heading>

          {company && (
            <Heading as="h2" size="6" className="mb-6 text-gray-solid-hover">
              {company}
            </Heading>
          )}

          <Flex
            direction="column"
            gap="3"
            className="mb-8 pb-8 border-b border-gray-border"
          >
            <Flex align="center" gap="2" className="flex-wrap">
              {dateRange && (
                <Text size="2" className="text-gray-solid-hover">
                  {dateRange}
                </Text>
              )}
              {employmentType && (
                <>
                  <span className="text-gray-border">•</span>
                  <Text size="2" className="text-gray-solid-hover capitalize">
                    {employmentType.replace("-", " ")}
                  </Text>
                </>
              )}
              {location && (
                <>
                  <span className="text-gray-border">•</span>
                  <Text size="2" className="text-gray-solid-hover">
                    {location}
                  </Text>
                </>
              )}
            </Flex>
          </Flex>

          <Box className="mb-12">
            <PostContent html={experience.content.rendered} />
          </Box>

          <Box className="mt-12 pt-8 border-t border-gray-border">
            <Link
              href="/#experience"
              className="inline-flex items-center text-gray-solid-hover hover:text-gray-text-contrast transition-colors"
            >
              <span className="mr-2">←</span>
              Back to all experience
            </Link>
          </Box>
        </Box>
      </Section>
    </>
  );
}
