import {
  ChatBubbleIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { HyperMediaIconProps } from "../IconsList";

export const getTechStackIcons = (): HyperMediaIconProps[] => [
  {
    href: "#",
    Icon: GitHubLogoIcon,
    label: "React",
  },
  {
    href: "#",
    Icon: LinkedInLogoIcon,
    label: "Next.js",
  },
  {
    href: "#",
    Icon: EnvelopeClosedIcon,
    label: "TypeScript",
  },
  {
    href: "#",
    Icon: ChatBubbleIcon,
    label: ".NET",
  },
];
