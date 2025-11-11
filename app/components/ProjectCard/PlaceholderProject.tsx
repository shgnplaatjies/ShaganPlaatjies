import { Flex, Heading, Text } from "@radix-ui/themes";

export const PlaceholderPost = ({
  text = "Loading blog posts..",
  title = "Loading...",
}: {
  text?: string;
  title?: string;
}) => (
  <Flex
    direction="column"
    gap="3"
    className="py-16 px-6 rounded-sm border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50/50 to-gray-50/30 dark:from-gray-900/20 dark:to-gray-900/10"
  >
    <Heading
      as="h2"
      size="6"
      className="text-gray-700 dark:text-gray-300 font-semibold"
    >
      {title}
    </Heading>
    <Text size="3" className="text-gray-600 dark:text-gray-400">
      {text}
    </Text>
  </Flex>
);
