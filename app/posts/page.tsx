import { DataList, Grid, Heading, Text } from "@radix-ui/themes";
import { Suspense } from "react";
import { WpPost, fetchWpPosts } from "../lib/server-lib";
import { cutOffText } from "../lib/utils";

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

export default async () => {
  const posts: WpPost[] | 1 = await fetchWpPosts();

  return (
    <article>
      <Heading as="h1">My Dev Blog</Heading>
      <DataList.Root>
        <Suspense fallback={<PlaceholderPost text="Fetching blog posts..." />}>
          {posts === 1 ? (
            <PlaceholderPost
              title="Error!"
              text="Error while fetching blog posts... Please try again later."
            />
          ) : (
            posts.map(({ id, excerpt, date, title }) => (
              <DataList.Item key={id}>
                <DataList.Label>{title.rendered}</DataList.Label>
                <DataList.Value>
                  <Grid columns={{ sm: "2", md: "3" }}>
                    <Text as="p">{id}</Text>
                    <Text as="p">{new Date(date).toLocaleDateString()}</Text>
                    <Text as="p">{cutOffText(excerpt.rendered, 100)}</Text>
                  </Grid>
                </DataList.Value>
              </DataList.Item>
            ))
          )}
        </Suspense>
      </DataList.Root>
    </article>
  );
};
