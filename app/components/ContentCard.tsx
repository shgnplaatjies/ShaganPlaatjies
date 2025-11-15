import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";

type ContentCardVariant = 'timeline' | 'skills' | 'contact' | 'default';
type DecorativeStyle = 'dots' | 'accent-bar' | 'none';

interface ContentCardProps {
  variant?: ContentCardVariant;
  icon?: React.ReactNode;
  title?: string;
  decorative?: DecorativeStyle;
  accentColor?: string;
  children: React.ReactNode;
  className?: string;
}

const DecorativeDots: React.FC = () => (
  <Flex gap="2" className="mb-4 opacity-50">
    <div className="w-3 h-3 rounded-full bg-red-9" />
    <div className="w-3 h-3 rounded-full bg-amber-9" />
    <div className="w-3 h-3 rounded-full bg-grass-9" />
  </Flex>
);

const AccentBar: React.FC<{ color: string }> = ({ color }) => (
  <div className={`absolute left-0 top-0 bottom-0 w-1 ${color} rounded-l`} />
);

const ContentCard: React.FC<ContentCardProps> = ({
  variant = 'default',
  icon,
  title,
  decorative = 'none',
  accentColor = "bg-accent-9",
  children,
  className = "",
}) => {
  const variantStyles = {
    timeline: "border-l-2 border-accent-9 pl-6",
    skills: "bg-gray-2 border border-gray-5",
    contact: "bg-gray-2 border border-gray-5",
    default: "border border-gray-5",
  };

  const cardContent = (
    <Box className={`relative ${className}`}>
      {decorative === 'accent-bar' && <AccentBar color={accentColor} />}

      <Card className={variantStyles[variant]}>
        <Flex direction="column" gap="3">
          {decorative === 'dots' && <DecorativeDots />}

          {(icon || title) && (
            <Flex align="center" gap="2" className="mb-2">
              {icon && (
                <div className="opacity-70 flex items-center">
                  {icon}
                </div>
              )}
              {title && (
                <Heading as="h3" size="4" className="font-mono">
                  {title}
                </Heading>
              )}
            </Flex>
          )}

          <Box>
            {children}
          </Box>
        </Flex>
      </Card>
    </Box>
  );

  return cardContent;
};

export default ContentCard;
