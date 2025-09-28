import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Grid, Section, Text } from "@radix-ui/themes";
import AccentedHeading from "../../components/AccentedHeading";

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  position,
}) => (
  <Card size="3" className="p-6">
    <Flex direction="column" gap="3">
      <Box>
        <ChatBubbleIcon className="mb-2" width={24} height={24} />
        <Text as="p" size="3" style={{ fontStyle: "italic" }} className="mb-6">
          "{quote}"
        </Text>
      </Box>
      <Box>
        <Text as="p" size="3" weight="bold">
          {author}
        </Text>
        <Text as="p" size="2" color="gray">
          {position}
        </Text>
      </Box>
    </Flex>
  </Card>
);

const TestimonialsSection: React.FC = () => {
  return (
    <Section className="py-16">
      <AccentedHeading
        textAs="h2"
        size="8"
        preText="What People "
        accentedText="Say"
      />

      <Text as="p" size="4" className="mb-8">
        Feedback from clients and colleagues I've worked with.
      </Text>

      <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="6">
        <Testimonial
          quote="They were very responsive throughout the process and made changes to our site quickly. The final product was exactly what we were looking for and at a reasonable price point. I would highly recommend them!"
          author="K. Ndebele"
          position="Co-founder, EMRL"
        />
        <Testimonial
          quote="Pixelscape has done a great job on Dexter Tuition. They guides us along each step of the way and have been very helpful."
          author="T. Nembanzheni"
          position="Founder, Dexter Tuition"
        />
        <Testimonial
          quote="I've collaborated with Shagan on several projects and his commitment to creating beautiful, user-friendly interfaces is unmatched. He has a great eye for design and the technical skills to bring it to life."
          author="Lisa Ndlovu"
          position="UI/UX Designer"
        />
      </Grid>
    </Section>
  );
};

export default TestimonialsSection;
