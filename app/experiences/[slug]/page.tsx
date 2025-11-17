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

const formatDate = (dateString: string, format: string = 'mm/yyyy'): string => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const day = String(date.getDate()).padStart(2, '0');

  switch (format) {
    case 'yyyy':
      return `${year}`;
    case 'mm/yyyy':
      return `${month}/${year}`;
    case 'dd/mm/yyyy':
      return `${day}/${month}/${year}`;
    default:
      return `${month}/${year}`;
  }
};

const formatDateRange = (
  startDate: string,
  endDate: string | undefined,
  dateFormat: string = 'mm/yyyy'
): string => {
  const formattedStart = formatDate(startDate, dateFormat);
  if (endDate) {
    const formattedEnd = formatDate(endDate, dateFormat);
    return `${formattedStart} - ${formattedEnd}`;
  }
  return `${formattedStart} - Present`;
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
  const dateFormat = experience.meta._portfolio_experience_date_format || 'mm/yyyy';

  const dateRange = dateStart ? formatDateRange(dateStart, dateEnd, dateFormat) : "";

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
              className="inline-flex items-center text-cyan-solid hover:text-gray-solid-hover transition-colors"
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
