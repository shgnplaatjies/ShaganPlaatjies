import React from 'react';
import { Heading, Text, Badge, Box, Flex } from '@radix-ui/themes';

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
    <Box className="pb-10 border-b border-gray-5 hover:border-gray-7 transition-all duration-300 group">
      {/* Title Section */}
      <Heading as="h3" size="6" className="text-gray-12 mb-4 group-hover:text-gray-11 transition-colors leading-tight">
        {title}
      </Heading>

      {/* Description */}
      <Text as="p" size="2" className="text-gray-10 mb-6 leading-relaxed group-hover:text-gray-9 transition-colors">
        {stripHtml(description)}
      </Text>

      {/* Tech Stack Tags */}
      {tags.length > 0 && (
        <Flex wrap="wrap" gap="2">
          {tags.map(tag => (
            <Badge
              key={tag}
              className="text-xs bg-gray-4 text-gray-11"
            >
              {tag}
            </Badge>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default ExperienceCard;
