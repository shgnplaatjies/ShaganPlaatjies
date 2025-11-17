import React from 'react';
import { Suspense } from 'react';
import ExperienceCard from '../components/ExperienceCard';
import {
  fetchWpExperience,
} from '../lib/server-lib';
import { type WordPressExperience } from '../lib/wordpress-types';

const ExperienceSectionContent: React.FC<{
  experiences: WordPressExperience[];
}> = ({ experiences }) => {
  return (
    <div id="experience-section" className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-text-contrast mb-4 sm:mb-6">Experience</h2>
        <p className="text-sm sm:text-base text-gray-solid mb-6 sm:mb-8">Professional roles and key projects</p>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            {...experience}
          />
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-border">
        <a
          href="/resume"
          className="inline-flex items-center text-gray-solid-hover hover:text-gray-text-contrast transition-colors"
        >
          Download Resume →
        </a>
      </div>
    </div>
  );
};

const ExperienceSection: React.FC = async () => {
  const experiences = await fetchWpExperience();

  if (!experiences) {
    return (
      <div className="text-gray-border">
        Unable to load experience data. Please try again later.
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="text-gray-border">Loading experience...</div>}>
      <ExperienceSectionContent experiences={experiences} />
    </Suspense>
  );
};

export default ExperienceSection;
