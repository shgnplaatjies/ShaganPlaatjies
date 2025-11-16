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
    <div className="border-l-2 border-gray-6 pl-6 py-4 hover:border-gray-7 transition-all duration-200">
      <h3 className="text-xl font-semibold text-gray-12 mb-2 hover:text-gray-11 transition-colors">{title}</h3>

      <p className="text-gray-10 text-sm mb-4 hover:text-gray-11 transition-colors">
        {stripHtml(description).substring(0, 200)}...
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-4 text-gray-11 rounded"
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
