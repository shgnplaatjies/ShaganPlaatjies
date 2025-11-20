import React from "react";
import { Suspense } from "react";
import ExperienceCard from "../components/ExperienceCard";
import { fetchAllWpProjects } from "../lib/server-lib";
import { type WpProjectApiResponse } from "../lib/wordpress-types";
import { WORDPRESS_CATEGORIES } from "../lib/constants";
import { sortProjectsByDate } from "../lib/server-lib-utils";

const ExperienceSectionContent: React.FC<{
  experiences: WpProjectApiResponse[];
}> = ({ experiences }) => {
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

      <div className="space-y-8 sm:space-y-12">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} {...experience} />
        ))}
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

  return (
    <Suspense
      fallback={<div className="text-gray-border">Loading experience...</div>}
    >
      <ExperienceSectionContent experiences={sortedExperiences} />
    </Suspense>
  );
};

export default ExperienceSection;
