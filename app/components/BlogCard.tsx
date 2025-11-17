import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heading, Text, Badge, Box, Flex } from '@radix-ui/themes';
import { DefaultFeaturedImage } from '@/app/lib/constants';

interface BlogCardProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  tags: string[];
  featuredImage?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  date,
  excerpt,
  slug,
  tags,
  featuredImage = DefaultFeaturedImage,
}) => {
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/posts/${slug}`}>
      <Box className="group cursor-pointer pb-8 border-b border-gray-border hover:border-gray-border-hover transition-all duration-200">
        <Flex justify="between" align="start" gap="4" className="mb-4">
          <Box className="flex-1">
            <Heading as="h3" size="5" className="text-gray-text-contrast group-hover:text-gray-text transition-colors">
              {title}
            </Heading>
            <Text size="1" className="text-gray-solid">
              {formatDate(date)}
            </Text>
          </Box>

          <Box className="flex-shrink-0 w-24 h-24 overflow-hidden rounded group-hover:opacity-75 transition-all duration-200">
            <Image
              src={featuredImage}
              alt={title}
              width={96}
              height={96}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200"
            />
          </Box>
        </Flex>

        <Text as="p" className="text-gray-solid-hover text-sm mb-4 line-clamp-2">
          {stripHtml(excerpt)}
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
    </Link>
  );
};

export default BlogCard;
