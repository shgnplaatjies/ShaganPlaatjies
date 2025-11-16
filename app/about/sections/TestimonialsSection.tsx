import { Box, Grid, Heading, Section, Text } from "@radix-ui/themes";
import React from "react";

interface Testimonial {
  author: string;
  role: string;
  company: string;
  message: string;
}

const TestimonialCard: React.FC<Testimonial> = ({
  author,
  role,
  company,
  message,
}) => (
  <Box className="group">
    <div className="relative p-6 rounded-lg border border-accent-6 border-opacity-20 transition-all duration-300 hover:border-opacity-40 hover:bg-accent-2 hover:bg-opacity-10">
      <div className="mb-4">
        <Text as="p" size="2" className="italic opacity-90 text-radix-base-cyan">
          {`"${message}"`}
        </Text>
      </div>

      <div className="pt-4 border-t border-accent-6 border-opacity-20">
        <Heading as="h4" size="3" className="mb-1">
          {author}
        </Heading>
        <Text as="p" size="1" className="opacity-70">
          {role} at {company}
        </Text>
      </div>
    </div>
  </Box>
);

const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      author: "Technical Director",
      role: "Technical Director",
      company: "BSure Insurance Advisors",
      message:
        "Shagan's technical leadership transformed our finance division. His microservice architecture and automated deployment strategy significantly enhanced our capabilities and team confidence. A strategic thinker who delivers measurable business impact.",
    },
    {
      author: "Product Manager",
      role: "Product Manager",
      company: "Vodacom Financial Services",
      message:
        "Working with Shagan on VodaPay products was exceptional. He redesigned Voucher Advance with remarkable attention to performance and user experience, all while maintaining legacy support. His technical depth and product thinking set him apart.",
    },
    {
      author: "K. Ndebele",
      role: "Co-founder",
      company: "EMRL",
      message:
        "Pixelscape delivered exactly what we needed: responsive, professional, and compliant with all requirements. Shagan guided us through each step, translating our business needs into a profitable e-commerce platform. Highly recommended for serious businesses.",
    },
  ];

  return (
    <Section className="py-12" id="testimonials">
      <Box className="mb-8">
        <Heading as="h2" size="7" className="mb-3">
          Professional Recognition
        </Heading>
        <Text as="p" size="2" className="opacity-70 max-w-2xl">
          Feedback from clients and colleagues across different organizations and
          industries.
        </Text>
      </Box>

      <Grid columns={{ initial: "1", md: "1", lg: "1" }} gap="4">
        {testimonials.map((testimonial, idx) => (
          <TestimonialCard key={idx} {...testimonial} />
        ))}
      </Grid>
    </Section>
  );
};

export default TestimonialsSection;
