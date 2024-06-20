import { Text } from "@radix-ui/themes";
import AccentedHeading from "../components/AccentedHeading";

const BlogPage: React.FC = () => {
  return (
    <section>
      <AccentedHeading
        textAs="h1"
        size="9"
        preText="More "
        accentedText="About Me."
      />
      <Text as="p">ABOUT PAGE.</Text>
    </section>
  );
};

export default BlogPage;
