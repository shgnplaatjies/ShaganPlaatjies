"use client";

import {
  Box,
  Button,
  Flex,
  Select,
  TextArea,
  TextField,
  Text,
  Heading,
} from "@radix-ui/themes";
import { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
}

const ElegantContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    service: "consulting",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "consulting",
          message: "",
        });

        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Box className="py-12 text-center">
        <Heading as="h3" size="5" className="mb-2">
          Thank you for reaching out
        </Heading>
        <Text as="p" size="2" className="opacity-70">
          I&apos;ll get back to you within 24 hours. Looking forward to
          connecting!
        </Text>
      </Box>
    );
  }

  return (
    <Box className="max-w-2xl mx-auto py-8">
      {error && (
        <Box className="mb-6 p-4 rounded-md bg-red-500/10 border border-red-500/20">
          <Text as="p" size="2" className="text-red-600">
            {error}
          </Text>
        </Box>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <Box>
          <label className="block mb-2">
            <Text as="span" size="2" weight="medium">
              Name
            </Text>
            <Text as="span" size="2" className="text-accent-9 ml-1">
              *
            </Text>
          </label>
          <TextField.Root
            placeholder="Your name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full"
            disabled={isSubmitting}
          />
        </Box>

        {/* Email */}
        <Box>
          <label className="block mb-2">
            <Text as="span" size="2" weight="medium">
              Email
            </Text>
            <Text as="span" size="2" className="text-accent-9 ml-1">
              *
            </Text>
          </label>
          <TextField.Root
            placeholder="your@email.com"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full"
            disabled={isSubmitting}
          />
        </Box>

        {/* Company */}
        <Box>
          <label className="block mb-2">
            <Text as="span" size="2" weight="medium">
              Company or Organization
            </Text>
            <Text as="span" size="1" className="opacity-50 ml-1">
              (optional)
            </Text>
          </label>
          <TextField.Root
            placeholder="Your company"
            type="text"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className="w-full"
            disabled={isSubmitting}
          />
        </Box>

        {/* Service */}
        <Box>
          <label className="block mb-2">
            <Text as="span" size="2" weight="medium">
              What are you interested in?
            </Text>
            <Text as="span" size="2" className="text-accent-9 ml-1">
              *
            </Text>
          </label>
          <Select.Root
            value={formData.service}
            onValueChange={(value) =>
              setFormData({ ...formData, service: value })
            }
            disabled={isSubmitting}
          >
            <Select.Trigger className="w-full" />
            <Select.Content>
              <Select.Item value="consulting">Technical Consulting</Select.Item>
              <Select.Item value="architecture">
                System Architecture
              </Select.Item>
              <Select.Item value="leadership">Technical Leadership</Select.Item>
              <Select.Item value="fullstack">
                Full-Stack Development
              </Select.Item>
              <Select.Item value="modernization">
                System Modernization
              </Select.Item>
              <Select.Item value="fintech">Fintech Solutions</Select.Item>
              <Select.Item value="other">Something else</Select.Item>
            </Select.Content>
          </Select.Root>
        </Box>

        {/* Message */}
        <Box>
          <label className="block mb-2">
            <Text as="span" size="2" weight="medium">
              Tell me about your project or challenge
            </Text>
            <Text as="span" size="2" className="text-accent-9 ml-1">
              *
            </Text>
          </label>
          <TextArea
            placeholder="What's on your mind? Share any context, timeline, or specific goals..."
            required
            rows={6}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            disabled={isSubmitting}
            className="w-full"
          />
        </Box>

        {/* Submit Button */}
        <Flex justify="between" align="center" className="pt-4">
          <Text as="p" size="1" className="opacity-50">
            I&apos;ll respond within one business day
          </Text>
          <Button
            type="submit"
            size="3"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting ? "Sending..." : "Let's Connect"}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export { ElegantContactForm };
