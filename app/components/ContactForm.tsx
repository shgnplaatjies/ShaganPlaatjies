import {
  BackpackIcon,
  EnvelopeOpenIcon,
  GlobeIcon,
  IconJarLogoIcon,
} from "@radix-ui/react-icons";
import { Button, Select, TextArea, TextField } from "@radix-ui/themes";

const ServiceSelector: React.FC = () => {
  return (
    <Select.Root>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Development</Select.Label>
          <Select.Item value="web-dev">Web Development</Select.Item>
          <Select.Item value="mobile-dev">Mobile Development</Select.Item>
          <Select.Item value="desktop-dev">Desktop Development</Select.Item>
          <Select.Item value="cross-platform-dev">
            Cross-Platform Development
          </Select.Item>
        </Select.Group>
        <Select.Group>
          <Select.Label>Consulting</Select.Label>
          <Select.Item value="architecture-consulting">
            Solutions Architecture Consulting
          </Select.Item>
          <Select.Item value="security-consulting">
            Cyber Security Consulting
          </Select.Item>
          <Select.Item value="cloud-consulting">
            Cloud Infrastructure Consulting
          </Select.Item>
          <Select.Item value="devops">DevOps Consulting</Select.Item>
          <Select.Item value="project-management">
            Project Management Consulting
          </Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

const ContactForm: React.FC = () => {
  return (
    <form>
      <label>
        name*:{" "}
        <TextField.Root placeholder="Enter your full name..." type="text">
          <TextField.Slot>
            <IconJarLogoIcon />
          </TextField.Slot>
        </TextField.Root>
      </label>
      <label>
        service: <ServiceSelector />
      </label>
      <label>
        company:{" "}
        <TextField.Root placeholder="Enter your company name..." type="text">
          <TextField.Slot>
            <BackpackIcon />
          </TextField.Slot>
        </TextField.Root>
      </label>
      <label>
        website:{" "}
        <TextField.Root
          placeholder="Enter your company website's url..."
          type="url"
        >
          <TextField.Slot>
            <GlobeIcon />
          </TextField.Slot>
        </TextField.Root>
      </label>
      <label>
        email*:{" "}
        <TextField.Root placeholder="Enter your email address..." type="email">
          <TextField.Slot>
            <EnvelopeOpenIcon />
          </TextField.Slot>
        </TextField.Root>
      </label>
      <label>
        phone-number:{" "}
        <TextField.Root placeholder="Enter your email address..." type="tel">
          <TextField.Slot>
            <EnvelopeOpenIcon />
          </TextField.Slot>
        </TextField.Root>
      </label>
      <label>
        message:{" "}
        <TextArea size="2" placeholder="Enter your message..."></TextArea>
      </label>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ContactForm;
