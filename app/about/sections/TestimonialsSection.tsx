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
        preText="Professional "
        accentedText="Recognition"
      />

      <Text as="p" size="4" className="mb-8 opacity-80">
        Testimonials from clients, stakeholders, and industry professionals reflecting
        the quality and impact of collaborative work.
      </Text>

      <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="6">
        <Testimonial
          quote="Shagan's technical leadership transformed our finance division. His microservice architecture and automated deployment strategy significantly enhanced our capabilities and team confidence. A strategic thinker who delivers measurable business impact."
          author="Technical Director"
          position="BSure Insurance Advisors"
        />
        <Testimonial
          quote="Working with Shagan on VodaPay products was exceptional. He redesigned Voucher Advance with remarkable attention to performance and user experience, all while maintaining legacy support. His technical depth and product thinking set him apart."
          author="Product Manager"
          position="Vodacom Financial Services"
        />
        <Testimonial
          quote="Pixelscape delivered exactly what we needed: responsive, professional, and compliant with all requirements. Shagan guided us through each step, translating our business needs into a profitable e-commerce platform. Highly recommended for serious businesses."
          author="K. Ndebele"
          position="Co-founder, EMRL"
        />
      </Grid>
    </Section>
  );
};

export default TestimonialsSection;
