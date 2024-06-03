import MainLayout from "@/app/components/layout/Main/layout";
import { Heading, Text } from "@radix-ui/themes";

const BlogPage: React.FC = () => {
  return (
    <MainLayout>
      <section>
        <Heading as="h1">About</Heading>
        <Text as="p">ABOUT PAGE.</Text>
      </section>
    </MainLayout>
  );
};

export default BlogPage;
