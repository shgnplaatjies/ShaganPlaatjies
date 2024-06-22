import { Box, DataList, Grid, Section, Text } from "@radix-ui/themes";
import { Suspense } from "react";
import AccentedHeading from "../../components/AccentedHeading";
import { WpPost, fetchWpPosts } from "../../lib/server-lib";
import { cutOffText } from "../../lib/utils";

export const revalidate = 3600; // 1 hour

const PlaceholderPost = ({
  text = "Loading blog posts..",
  title = "Loading...",
}: {
  text?: string;
  title?: string;
}) => (
  <DataList.Item>
    <DataList.Label>{title}</DataList.Label>
    <DataList.Value>
      <Text as="p">{text}</Text>
    </DataList.Value>
  </DataList.Item>
);

const PostsSection: React.FC = async () => {
  const posts: WpPost[] | false = await fetchWpPosts();

  return (
    <Section>
      <AccentedHeading
        textAs="h1"
        size="9"
        preText="View my "
        accentedText="Blog Posts"
      />
      <Box>
        <Suspense fallback={<PlaceholderPost text="Fetching blog posts..." />}>
          {!posts ? (
            <PlaceholderPost
              title="Error!"
              text="Error while fetching blog posts... Please try again later."
            />
          ) : (
            posts.map(({ id, excerpt, date, title }) => (
              <Grid columns="4" key={id}>
                <Text as="p" wrap="balance">
                  {id}
                </Text>
                <Text wrap="balance">{title.rendered}</Text>

                <Text as="p" wrap="balance">
                  {cutOffText(excerpt.rendered, 100)}
                </Text>
                <Text as="p" wrap="balance">
                  {new Date(date).toLocaleDateString()}
                </Text>
              </Grid>
            ))
          )}
        </Suspense>
      </Box>
    </Section>
  );
};

export default PostsSection;
