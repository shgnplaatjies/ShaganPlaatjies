import React from 'react';

interface ExperienceCardProps {
  title: string;
  description: string;
  tags: string[];
  featuredImage?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  description,
  tags,
  featuredImage,
}) => {
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  return (
    <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-6 py-4 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200">
      <h3 className="text-xl font-semibold text-black dark:text-white mb-2 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">{title}</h3>

      <p className="text-gray-700 dark:text-gray-400 text-sm mb-4 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors">
        {stripHtml(description).substring(0, 200)}...
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
