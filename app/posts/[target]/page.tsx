import { fetchWpPost } from "@/app/lib/server-lib";
import { Heading, Text } from "@radix-ui/themes";

interface WpPostParams {
  target: string | number;
}

export default async ({ params }: { params: WpPostParams }) => {
  const { target } = params;

  const post = await fetchWpPost(target);

  if (!post) return <Text as="p">Post not found.</Text>;

  if (post === 1)
    return (
      <Text as="p">An unexpected error occurred. Please try again later.</Text>
    );

  const { title, content, date } = post;

  return (
    <article>
      <Heading as="h1">{title.rendered}</Heading>
      <Text as="p">{new Date(date).toLocaleDateString("en-US")}</Text>
      <Text as="p">{content.rendered}</Text>
    </article>
  );
};
