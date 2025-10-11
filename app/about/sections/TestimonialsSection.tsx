import { Grid, Section, Text } from "@radix-ui/themes";
import TerminalPrompt from "../../components/TerminalPrompt";
import ConsoleLogTestimonial from "../../components/ConsoleLogTestimonial";

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      author: "Technical Director",
      role: "Technical Director",
      company: "BSure Insurance Advisors",
      message: "Shagan's technical leadership transformed our finance division. His microservice architecture and automated deployment strategy significantly enhanced our capabilities and team confidence. A strategic thinker who delivers measurable business impact.",
      logLevel: "success" as const,
    },
    {
      author: "Product Manager",
      role: "Product Manager",
      company: "Vodacom Financial Services",
      message: "Working with Shagan on VodaPay products was exceptional. He redesigned Voucher Advance with remarkable attention to performance and user experience, all while maintaining legacy support. His technical depth and product thinking set him apart.",
      logLevel: "info" as const,
    },
    {
      author: "K. Ndebele",
      role: "Co-founder",
      company: "EMRL",
      message: "Pixelscape delivered exactly what we needed: responsive, professional, and compliant with all requirements. Shagan guided us through each step, translating our business needs into a profitable e-commerce platform. Highly recommended for serious businesses.",
      logLevel: "log" as const,
    },
  ];

  return (
    <Section className="py-8">
      <TerminalPrompt path="~/testimonials" command="node testimonials.js" />

      <Text as="p" size="4" className="mb-6 opacity-80 font-mono text-sm">
        # Professional recognition from clients and industry leaders
      </Text>

      <Grid columns={{ initial: "1" }} gap="4">
        {testimonials.map((testimonial, idx) => (
          <ConsoleLogTestimonial
            key={idx}
            testimonial={testimonial}
            index={idx}
          />
        ))}
      </Grid>
    </Section>
  );
};

export default TestimonialsSection;
