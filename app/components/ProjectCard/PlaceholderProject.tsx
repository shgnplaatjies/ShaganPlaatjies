import { Flex } from "@radix-ui/themes";

export const PlaceholderPost = ({
  text = "Loading blog posts..",
  title = "Loading...",
}: {
  text?: string;
  title?: string;
}) => (
  <Flex>
    <h1>{title}</h1>
    <p>{text}</p>
  </Flex>
);
