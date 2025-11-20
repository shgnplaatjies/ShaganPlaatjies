"use client";

import React from "react";
import Image from "next/image";
import { Heading, Text, Box, Flex, Link } from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { WpProjectApiResponse } from "@/app/lib/wordpress-types";

interface ExperienceCardProps extends WpProjectApiResponse {
  mediaMap?: Record<number, string>;
  isActive?: boolean;
}

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

const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, "");
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  content,
  meta,
  featured_media,
  slug,
  mediaMap = {},
  isActive = false,
}) => {
  const role = meta._project_role;
  const company = meta._project_company;
  const companyUrl = meta._project_company_url;
  const location = meta._project_location;
  const employmentType = meta._project_employment_type;
  const dateStart = meta._project_date_start;
  const dateEnd = meta._project_date_end;
  const dateFormat = meta._project_date_format || "mm/yyyy";
  const gallery = meta._project_gallery;

  const dateRange = dateStart
    ? formatDateRange(dateStart, dateEnd, dateFormat)
    : "";
  const titleText = typeof title === "string" ? title : title.rendered;
  const galleryIds = gallery ? gallery.split(",").map((id) => id.trim()) : [];

  const cardContent = (
    <div className="relative py-4">
      <div className="absolute -left-14 top-0 w-8 h-8 flex items-center justify-center">
        {isActive ? (
          <>
            <div className="w-6 h-6 rounded-full border-2 border-gray-8 bg-transparent"></div>
            <div className="absolute w-6 h-6 rounded-full border-2 border-gray-8 opacity-50 animate-pulse"></div>
          </>
        ) : (
          <div className="w-6 h-6 rounded-full bg-gray-8 border-2 border-gray-7"></div>
        )}
      </div>

      <Box className="hover:opacity-80 transition-opacity cursor-pointer">
        <Flex direction="column" gap="2" mb="3">
        <Heading as="h3" size="5" className="text-gray-text-contrast">
          {role || titleText}
        </Heading>

        {company && (
          <Flex align="center" gap="2">
            {companyUrl ? (
              <Link
                href={companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="cyan"
                onClick={(e) => e.stopPropagation()}
              >
                <Flex align="center" gap="1">
                  <Text size="2" className="font-medium">
                    {company}
                  </Text>
                  <ExternalLinkIcon width="14" height="14" />
                </Flex>
              </Link>
            ) : (
              <Text size="2" className="font-medium">
                {company}
              </Text>
            )}
          </Flex>
        )}

        <Flex align="center" gap="3" wrap="wrap" className="text-sm">
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

      {content && (
        <Text as="p" size="2" className="text-gray-solid-hover mb-3">
          {stripHtml(content.rendered).substring(0, 300)}...
        </Text>
      )}

      {galleryIds.length > 0 && (
        <Flex
          gap="2"
          wrap="wrap"
          align="center"
          className="mt-4 pt-4 border-t border-gray-border"
        >
          {galleryIds.map((idStr, index) => {
            const mediaId = parseInt(idStr, 10);
            const imageUrl = mediaMap[mediaId];
            return (
              <div key={idStr} className="flex items-center gap-2">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={`Gallery item ${index + 1}`}
                    width={64}
                    height={64}
                    className="flex-shrink-0 rounded object-cover border border-gray-border"
                  />
                ) : (
                  <div
                    className="flex-shrink-0 w-16 h-16 bg-gray-border rounded"
                    title={`Gallery item ${idStr}`}
                  />
                )}
              </div>
            );
          })}
        </Flex>
      )}
      </Box>
    </div>
  );

  return (
    <NextLink href={`/experiences/${slug}`}>
      {cardContent}
    </NextLink>
  );
};

export default ExperienceCard;
