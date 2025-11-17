import React from 'react';
import { Heading, Text, Box, Flex, Link } from '@radix-ui/themes';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { WordPressExperience } from '@/app/lib/wordpress-types';

interface ExperienceCardProps extends WordPressExperience {}

const formatDateRange = (
  startDate: string,
  endDate: string | undefined,
  dateFormat: string
): string => {
  if (endDate) {
    return `${startDate} - ${endDate}`;
  }
  return `${startDate} - Present`;
};

const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, '');
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  content,
  meta,
  featured_media,
}) => {
  const role = meta._portfolio_experience_role;
  const company = meta._portfolio_experience_company;
  const companyUrl = meta._portfolio_experience_company_url;
  const location = meta._portfolio_experience_location;
  const employmentType = meta._portfolio_experience_employment_type;
  const dateStart = meta._portfolio_experience_date_start;
  const dateEnd = meta._portfolio_experience_date_end;
  const dateFormat = meta._portfolio_experience_date_format || 'mm/yyyy';

  const dateRange = dateStart ? formatDateRange(dateStart, dateEnd, dateFormat) : '';
  const titleText = typeof title === 'string' ? title : title.rendered;

  return (
    <Box className="border-l-2 border-gray-solid pl-6 py-4 hover:border-gray-solid-hover transition-all duration-200">
      <Flex direction="column" gap="2" mb="3">
        <Heading as="h3" size="5" className="text-gray-text-contrast">
          {role || titleText}
        </Heading>

        {company && (
          <Flex align="center" gap="2">
            {companyUrl ? (
              <Link href={companyUrl} target="_blank" rel="noopener noreferrer" color="cyan">
                <Flex align="center" gap="1">
                  <Text size="2" className="font-medium">
                    {company}
                  </Text>
                  <ExternalLinkIcon width="14" height="14" />
                </Flex>
              </Link>
            ) : (
              <Text size="2" className="font-medium">
                {company}
              </Text>
            )}
          </Flex>
        )}

        <Flex align="center" gap="3" wrap="wrap" className="text-sm">
          {employmentType && (
            <Text size="1" className="text-gray-solid-hover capitalize">
              {employmentType.replace('-', ' ')}
            </Text>
          )}
          {location && (
            <Text size="1" className="text-gray-solid-hover">
              📍 {location}
            </Text>
          )}
          {dateRange && (
            <Text size="1" className="text-gray-solid-hover">
              📅 {dateRange}
            </Text>
          )}
        </Flex>
      </Flex>

      {content && (
        <Text as="p" size="2" className="text-gray-solid-hover mb-3">
          {stripHtml(content.rendered).substring(0, 300)}...
        </Text>
      )}
    </Box>
  );
};

export default ExperienceCard;
