import React from "react";
import { Suspense } from "react";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import { fetchWpProjects, fetchWpMediaById } from "../lib/server-lib";
import { type WpProjectApiResponse } from "../lib/server-lib";

const ProjectsSectionContent: React.FC<{
  projects: WpProjectApiResponse[];
  mediaMap: Record<number, string>;
}> = ({ projects, mediaMap }) => {
  return (
    <div id="projects-section" className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-12 mb-4 sm:mb-6">
          Projects
        </h2>
        <p className="text-sm sm:text-base text-gray-9 mb-6 sm:mb-8">
          Portfolio of work and technical solutions
        </p>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {projects.map((project, index) => {
          const featuredImageUrl = project.featured_media
            ? mediaMap[project.featured_media]
            : undefined;

          return (
            <ProjectCard
              key={project.id}
              post={{
                id: index + 1,
                dateGmt: project.date_gmt,
                modifiedGmt: project.modified_gmt,
                slug: project.slug,
                status: project.status,
                link: project.link,
                titleRendered: project.title.rendered,
                featuredMedia: featuredImageUrl,
                categories: [],
                tags: [],
                meta: project.meta,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = async () => {
  const projects = await fetchWpProjects();

  if (!projects || projects.length === 0) {
    return null;
  }

  const sortedProjects = projects.sort((a, b) => {
    const aStart = a.meta._project_date_start || "";
    const aEnd = a.meta._project_date_end;
    const bStart = b.meta._project_date_start || "";
    const bEnd = b.meta._project_date_end;

    if (!aEnd && bEnd) return -1;
    if (aEnd && !bEnd) return 1;

    if (!aEnd && !bEnd) {
      return aStart.localeCompare(bStart);
    }

    return (aEnd || "").localeCompare(bEnd || "");
  });

  const mediaIds = new Set<number>();
  sortedProjects.forEach((project) => {
    if (project.featured_media) {
      mediaIds.add(project.featured_media);
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
      fallback={<div className="text-gray-400">Loading projects...</div>}
    >
      <ProjectsSectionContent projects={sortedProjects} mediaMap={mediaMap} />
    </Suspense>
  );
};

export default ProjectsSection;
