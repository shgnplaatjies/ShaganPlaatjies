"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heading, Text, Box, Flex, Link } from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { WpProjectApiResponse } from "@/app/lib/wordpress-types";
import GalleryImageDialog from "./GalleryImageDialog";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const role = meta._project_role;
  const company = meta._project_company;
  const companyUrl = meta._project_company_url;
  const location = meta._project_location;
  const employmentType = meta._project_employment_type;
  const dateStart = meta._project_date_start;
  const dateEnd = meta._project_date_end;
  const dateFormat = meta._project_date_format || "mm/yyyy";
  const gallery = meta._project_gallery;
  const galleryCaptionsJson = meta._project_gallery_captions;

  const dateRange = dateStart
    ? formatDateRange(dateStart, dateEnd, dateFormat)
    : "";
  const titleText = typeof title === "string" ? title : title.rendered;
  const galleryIds = gallery ? gallery.split(",").map((id) => id.trim()) : [];

  // Parse gallery captions from JSON
  let galleryCaptions: Record<string, string> = {};
  if (galleryCaptionsJson) {
    try {
      galleryCaptions = JSON.parse(galleryCaptionsJson);
    } catch (e) {
      console.error("Failed to parse gallery captions:", e);
    }
  }

  // Build gallery images for dialog
  const galleryImages = galleryIds
    .map((idStr) => {
      const mediaId = parseInt(idStr, 10);
      const imageUrl = mediaMap[mediaId];
      return {
        id: mediaId,
        imageUrl: imageUrl || "",
        caption: galleryCaptions[idStr] || galleryCaptions[mediaId] || undefined,
        alt: `Gallery item`,
      };
    })
    .filter((img) => img.imageUrl);

  const cardContent = (
    <div className="relative group pt-8 pb-8 border-b border-gray-border">
      <div className="absolute -left-8 top-1 w-4 h-4 flex items-center justify-center">
        {isActive ? (
          <>
            <div className="absolute w-4 h-4 rounded-full bg-gray-8"></div>
            <div className="absolute w-2.5 h-2.5 rounded-full bg-white group-hover:w-2 group-hover:h-2"></div>
          </>
        ) : (
          <>
            <div className="absolute w-4 h-4 rounded-full border-[0.4375rem] border-white bg-gray-8 group-hover:border-gray-8 transition-colors"></div>
            <div className="absolute w-2.5 h-2.5 rounded-full bg-gray-8 group-hover:bg-gray-8"></div>
          </>
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
                <Flex
                  align="center"
                  gap="1"
                  className="text-cyan-9 cursor-pointer hover:text-cyan-10 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(companyUrl, "_blank");
                  }}
                >
                  <Text size="2" className="font-medium">
                    {company}
                  </Text>
                  <ExternalLinkIcon width="14" height="14" />
                </Flex>
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

        {galleryImages.length > 0 && (
          <Flex gap="2" wrap="wrap" align="center" className="mt-4">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(index);
                  setDialogOpen(true);
                }}
                className="flex items-center gap-2 p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
                aria-label={`Open gallery image ${index + 1}`}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.alt}
                  width={64}
                  height={64}
                  unoptimized
                  className="flex-shrink-0 rounded object-cover border border-gray-border"
                />
              </button>
            ))}
          </Flex>
        )}
      </Box>
    </div>
  );

  const href = companyUrl || `/experiences/${slug}`;
  const isExternalLink = companyUrl ? true : false;

  return (
    <>
      {isExternalLink ? (
        <div
          onClick={() => window.open(companyUrl, "_blank")}
          className="cursor-pointer"
        >
          {cardContent}
        </div>
      ) : (
        <NextLink href={href}>{cardContent}</NextLink>
      )}
      {galleryImages.length > 0 && (
        <GalleryImageDialog
          images={galleryImages}
          initialIndex={selectedImageIndex}
          isOpen={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </>
  );
};

export default ExperienceCard;
