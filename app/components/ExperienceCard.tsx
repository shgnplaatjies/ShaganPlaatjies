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
    <Box className="border-l-2 border-gray-solid pl-6 py-4 hover:border-gray-solid-hover transition-all duration-200">
      <Heading as="h3" size="5" className="text-gray-12 mb-2 hover:text-gray-11 transition-colors">{title}</Heading>

      <Text as="p" size="2" className="text-gray-10 mb-4 hover:text-gray-11 transition-colors">
        {stripHtml(description).substring(0, 200)}...
      </Text>

      {tags.length > 0 && (
        <Flex wrap="wrap" gap="2">
          {tags.map(tag => (
            <Badge
              key={tag}
              className="text-xs"
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
