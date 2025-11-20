"use client";

import {
  Box,
  Button,
  Flex,
  Select,
  TextArea,
  TextField,
  Text,
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
      <Box className="text-center py-12">
        <Text as="p" size="5" weight="bold" className="mb-2 text-gray-text-contrast">
          Thank you for reaching out
        </Text>
        <Text as="p" size="2" className="text-gray-9">
          I&apos;ll get back to you within 24 hours. Looking forward to
          connecting!
        </Text>
      </Box>
    );
  }

  return (
    <Box className="max-w-2xl">
      {error && (
        <Box className="mb-6 p-4 rounded-sm border border-gray-border-active bg-gray-bg-secondary">
          <Text as="p" size="2" className="text-gray-solid">
            {error}
          </Text>
        </Box>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <Flex direction="column" gap="2">
          <label className="flex gap-1">
            <Text as="span" size="2" weight="medium">
              Name
            </Text>
            <Text as="span" size="2" className="text-cyan-solid">
              *
            </Text>
          </label>
          <TextField.Root
            placeholder="Your name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isSubmitting}
          />
        </Flex>

        {/* Email */}
        <Flex direction="column" gap="2">
          <label className="flex gap-1">
            <Text as="span" size="2" weight="medium">
              Email
            </Text>
            <Text as="span" size="2" className="text-cyan-solid">
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
            disabled={isSubmitting}
          />
        </Flex>

        {/* Company */}
        <Flex direction="column" gap="2">
          <label className="flex gap-1">
            <Text as="span" size="2" weight="medium">
              Company or Organization
            </Text>
            <Text as="span" size="1" className="text-gray-9">
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
            disabled={isSubmitting}
          />
        </Flex>

        {/* Service */}
        <Flex direction="column" gap="2">
          <label className="flex gap-1">
            <Text as="span" size="2" weight="medium">
              What are you interested in?
            </Text>
            <Text as="span" size="2" className="text-cyan-solid">
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
            <Select.Trigger />
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
        </Flex>

        {/* Message */}
        <Flex direction="column" gap="2">
          <label className="flex gap-1">
            <Text as="span" size="2" weight="medium">
              Tell me about your project or challenge
            </Text>
            <Text as="span" size="2" className="text-cyan-solid">
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
          />
        </Flex>

        {/* Submit Button */}
        <Flex justify="between" align="center" gap="4" className="pt-4">
          <Text as="p" size="1" className="text-gray-9">
            I&apos;ll respond within one business day
          </Text>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-6 font-semibold transition-all duration-200 ease-out hover:scale-105 active:scale-95"
            style={{
              backgroundColor: isSubmitting ? 'var(--cyan-10)' : 'var(--cyan-9)',
              color: '#ffffff',
            }}
          >
            {isSubmitting ? "Sending..." : "Let's Connect"}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export { ElegantContactForm };
