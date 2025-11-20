import React from "react";
import { Suspense } from "react";
import ExperienceCard from "../components/ExperienceCard";
import { fetchAllWpProjects, fetchWpMediaById } from "../lib/server-lib";
import { type WpProjectApiResponse } from "../lib/wordpress-types";
import { WORDPRESS_CATEGORIES } from "../lib/constants";
import { sortProjectsByDate } from "../lib/server-lib-utils";

const ExperienceSectionContent: React.FC<{
  experiences: WpProjectApiResponse[];
  mediaMap: Record<number, string>;
}> = ({ experiences, mediaMap }) => {
  return (
    <div id="experience-section" className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-text-contrast mb-4 sm:mb-6">
          Experience
        </h2>
        <p className="text-sm sm:text-base text-gray-solid mb-6 sm:mb-8">
          Professional roles and key projects
        </p>
      </div>

      <div className="relative pl-16">
        <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-7"></div>

        <div className="space-y-8 sm:space-y-12">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              {...experience}
              mediaMap={mediaMap}
              isActive={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ExperienceSection: React.FC = async () => {
  const allProjects = await fetchAllWpProjects();

  if (!allProjects) {
    return null;
  }

  const experiences = allProjects.filter(
    (project) =>
      project.categories &&
      project.categories.includes(WORDPRESS_CATEGORIES.WORK_EXPERIENCE.id)
  );

  if (!experiences || experiences.length === 0) {
    return null;
  }

  const sortedExperiences = sortProjectsByDate(experiences);

  const mediaIds = new Set<number>();
  sortedExperiences.forEach((experience) => {
    const gallery = experience.meta._project_gallery;
    if (gallery) {
      gallery.split(",").forEach((id) => {
        const trimmedId = parseInt(id.trim(), 10);
        if (!isNaN(trimmedId)) {
          mediaIds.add(trimmedId);
        }
      });
    }
  });

  const mediaMap: Record<number, string> = {};
  for (const mediaId of mediaIds) {
    try {
      const media = await fetchWpMediaById(mediaId);
      if (
        media &&
        typeof media === "object" &&
        "source_url" in media &&
        media.source_url
      ) {
        mediaMap[mediaId] = media.source_url;
      }
    } catch (error) {
      console.error(`Failed to fetch media ${mediaId}:`, error);
    }
  }

  return (
    <Suspense
      fallback={<div className="text-gray-border">Loading experience...</div>}
    >
      <ExperienceSectionContent experiences={sortedExperiences} mediaMap={mediaMap} />
    </Suspense>
  );
};

export default ExperienceSection;
