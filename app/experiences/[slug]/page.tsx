"use server";

import { Box, Flex, Heading, Section, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostContent from "../../components/PostContent";
import { fetchWpProject, fetchWpMediaById } from "../../lib/server-lib";
import { WORDPRESS_CATEGORIES } from "../../lib/constants";

interface ExperiencePageProps {
  params: Promise<{
    slug: string;
  }>;
}

const formatDate = (dateString: string, format: string = "mm/yyyy"): string => {
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
  dateFormat: string = "mm/yyyy"
): string => {
  const formattedStart = formatDate(startDate, dateFormat);
  if (endDate) {
    const formattedEnd = formatDate(endDate, dateFormat);
    return `${formattedStart} - ${formattedEnd}`;
  }
  return `${formattedStart} - Present`;
};

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { slug } = await params;

  const project = await fetchWpProject(slug);

  if (!project || !project.categories?.includes(WORDPRESS_CATEGORIES.WORK_EXPERIENCE.id)) {
    notFound();
  }

  const experience = project;

  const featuredMedia = experience.featured_media
    ? await fetchWpMediaById(experience.featured_media)
    : null;

  const role = experience.meta._project_role;
  const company = experience.meta._project_company;
  const location = experience.meta._project_location;
  const employmentType = experience.meta._project_employment_type;
  const dateStart = experience.meta._project_date_start;
  const dateEnd = experience.meta._project_date_end;
  const dateFormat = experience.meta._project_date_format || "mm/yyyy";
  const gallery = experience.meta._project_gallery;

  const dateRange = dateStart
    ? formatDateRange(dateStart, dateEnd, dateFormat)
    : "";

  const galleryIds = gallery ? gallery.split(",").map((id) => id.trim()) : [];
  const mediaMap: Record<number, { url: string; caption?: string }> = {};

  for (const idStr of galleryIds) {
    const mediaId = parseInt(idStr, 10);
    if (!isNaN(mediaId)) {
      try {
        const media = await fetchWpMediaById(mediaId);
        if (
          media &&
          typeof media === "object" &&
          "source_url" in media &&
          media.source_url
        ) {
          mediaMap[mediaId] = {
            url: media.source_url,
            caption:
              "caption" in media && media.caption
                ? typeof media.caption === "string"
                  ? media.caption
                  : "caption" in media && typeof media.caption === "object" &&
                      "rendered" in media.caption
                    ? (media.caption as { rendered: string }).rendered
                    : undefined
                : undefined,
          };
        }
      } catch (error) {
        console.error(`Failed to fetch media ${mediaId}:`, error);
      }
    }
  }

  return (
    <div className="w-full h-full overflow-y-auto">
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

          {galleryIds.length > 0 && (
            <Box className="mb-12 pt-8 border-t border-gray-border">
              <Heading as="h2" size="6" className="mb-8">
                Gallery
              </Heading>
              <Flex direction="column" gap="8">
                {galleryIds.map((idStr) => {
                  const mediaId = parseInt(idStr, 10);
                  const media = mediaMap[mediaId];
                  return media ? (
                    <figure key={idStr} className="my-8 text-center">
                      <Image
                        src={media.url}
                        alt="Gallery item"
                        width={800}
                        height={600}
                        unoptimized
                        className="w-full rounded object-cover"
                      />
                      {media.caption && (
                        <figcaption className="text-sm text-gray-solid dark:text-gray-border-hover mt-3 italic">
                          {media.caption}
                        </figcaption>
                      )}
                    </figure>
                  ) : null;
                })}
              </Flex>
            </Box>
          )}

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
    </div>
  );
}
