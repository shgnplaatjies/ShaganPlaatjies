"use client";

import { Button, Flex, Select, TextArea, TextField, Text } from "@radix-ui/themes";
import { Section } from "@radix-ui/themes";
import TerminalPrompt from "./TerminalPrompt";
import CodeBlock from "./CodeBlock";
import { useState } from "react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "enterprise-architecture",
    website: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Section className="py-8">
      <TerminalPrompt path="~/contact" command="curl -X POST /api/contact/new-inquiry" />

      <Text as="p" size="2" className="mb-6 opacity-70 font-mono text-xs">
        # Submit a new contact inquiry - Required fields marked with *
      </Text>

      <CodeBlock language="typescript" className="mb-6">
        {`// POST /api/contact/new-inquiry

interface ContactInquiry {
  from: {
    name: string;      // Your full name*
    email: string;     // Contact email*
    company?: string;  // Company/Organization
  };
  regarding: ServiceType;  // Service of interest
  message: string;         // Your inquiry*
  metadata?: {
    website?: string;
    phone?: string;
  };
}

// Example Request Body:`}
      </CodeBlock>

      <form onSubmit={handleSubmit}>
        <div className="bg-gray-2 rounded-md border border-gray-5 p-6">
          <div className="font-mono text-xs mb-4 opacity-60">
            // Request Body
          </div>

          <Flex direction="column" gap="4">
            <div>
              <div className="font-mono text-xs text-radix-base-purple mb-2">
                from: {"{"}
              </div>
              <div className="pl-6 space-y-3">
                <label className="block">
                  <span className="font-mono text-xs text-radix-base-cyan">name</span>
                  <span className="text-gray-12">: </span>
                  <span className="text-radix-base-tomato">string</span>
                  <span className="text-radix-base-red">*</span>
                  <TextField.Root
                    placeholder='"John Doe"'
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 font-mono"
                  />
                </label>

                <label className="block">
                  <span className="font-mono text-xs text-radix-base-cyan">email</span>
                  <span className="text-gray-12">: </span>
                  <span className="text-radix-base-tomato">string</span>
                  <span className="text-radix-base-red">*</span>
                  <TextField.Root
                    placeholder='"john@company.com"'
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 font-mono"
                  />
                </label>

                <label className="block">
                  <span className="font-mono text-xs text-radix-base-cyan">company</span>
                  <span className="text-gray-12">?: </span>
                  <span className="text-radix-base-tomato">string</span>
                  <TextField.Root
                    placeholder='"Acme Corp"'
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="mt-1 font-mono"
                  />
                </label>
              </div>
              <div className="font-mono text-xs text-radix-base-purple mt-2">
                {"}"},
              </div>
            </div>

            <div>
              <label className="block">
                <span className="font-mono text-xs text-radix-base-cyan">regarding</span>
                <span className="text-gray-12">: </span>
                <span className="text-radix-base-tomato">ServiceType</span>
                <span className="text-radix-base-red">*</span>
                <Select.Root
                  value={formData.service}
                  onValueChange={(value) => setFormData({ ...formData, service: value })}
                >
                  <Select.Trigger className="mt-1 w-full font-mono" />
                  <Select.Content>
                    <Select.Item value="enterprise-architecture">Enterprise Architecture</Select.Item>
                    <Select.Item value="technical-leadership">Technical Leadership</Select.Item>
                    <Select.Item value="fullstack-development">Full-Stack Development</Select.Item>
                    <Select.Item value="system-modernization">System Modernization</Select.Item>
                    <Select.Item value="fintech-solutions">Fintech Solutions</Select.Item>
                    <Select.Item value="consulting">Technical Consulting</Select.Item>
                  </Select.Content>
                </Select.Root>
              </label>
            </div>

            <div>
              <label className="block">
                <span className="font-mono text-xs text-radix-base-cyan">message</span>
                <span className="text-gray-12">: </span>
                <span className="text-radix-base-tomato">string</span>
                <span className="text-radix-base-red">*</span>
                <TextArea
                  placeholder='"I would like to discuss..."'
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 font-mono"
                />
              </label>
            </div>

            <div>
              <div className="font-mono text-xs text-radix-base-purple mb-2">
                metadata?: {"{"}
              </div>
              <div className="pl-6 space-y-3">
                <label className="block">
                  <span className="font-mono text-xs text-radix-base-cyan">website</span>
                  <span className="text-gray-12">?: </span>
                  <span className="text-radix-base-tomato">string</span>
                  <TextField.Root
                    placeholder='"https://company.com"'
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="mt-1 font-mono"
                  />
                </label>

                <label className="block">
                  <span className="font-mono text-xs text-radix-base-cyan">phone</span>
                  <span className="text-gray-12">?: </span>
                  <span className="text-radix-base-tomato">string</span>
                  <TextField.Root
                    placeholder='"+27 12 345 6789"'
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 font-mono"
                  />
                </label>
              </div>
              <div className="font-mono text-xs text-radix-base-purple mt-2">
                {"}"}
              </div>
            </div>
          </Flex>

          <div className="mt-6 pt-6 border-t border-gray-5">
            <Button
              type="submit"
              className="cursor-pointer font-mono"
              size="3"
            >
              // POST Request → Submit Inquiry
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-4 font-mono text-[10px] opacity-50">
        <span className="text-radix-base-purple">// Response:</span> <span className="text-radix-base-green">200 OK</span> - Your inquiry will be processed within 24 hours
      </div>
    </Section>
  );
};

export { ContactForm };
