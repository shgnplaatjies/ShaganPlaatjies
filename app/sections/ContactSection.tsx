import React from "react";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { ElegantContactForm } from "../components/ElegantContactForm";

const ContactSection: React.FC = () => {
  return (
    <Box id="contact-section" className="space-y-6 sm:space-y-8">
      <Flex direction="column" gap="4">
        <Heading as="h2" size="6" className="text-gray-text-contrast">
          Get In Touch
        </Heading>
        <Text as="p" size="2" className="text-gray-9">
          Have a project in mind or want to collaborate? Let&apos;s talk.
        </Text>
      </Flex>

      <ElegantContactForm />
    </Box>
  );
};

export default ContactSection;
