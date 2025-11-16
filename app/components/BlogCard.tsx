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
      <Box className="group cursor-pointer pb-12 border-b border-gray-5 hover:border-gray-7 transition-all duration-300">
        {/* Metadata Section */}
        <Flex justify="between" align="center" className="mb-6 opacity-75">
          <Text size="1" className="text-gray-9 tracking-wide font-mono">
            {formatDate(date)}
          </Text>
        </Flex>

        {/* Title Section */}
        <Heading as="h3" size="6" className="text-gray-12 mb-6 group-hover:text-gray-11 transition-colors leading-tight">
          {title}
        </Heading>

        {/* Featured Image */}
        <Box className="mb-6 h-64 overflow-hidden rounded-lg group-hover:opacity-80 transition-opacity duration-300">
          <Image
            src={featuredImage}
            alt={title}
            width={600}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Box>

        {/* Excerpt */}
        <Text as="p" className="text-gray-10 mb-6 line-clamp-3 leading-relaxed">
          {stripHtml(excerpt)}
        </Text>

        {/* Tags */}
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
    </Link>
  );
};

export default BlogCard;
