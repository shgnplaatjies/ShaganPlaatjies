import {
  ChatBubbleIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { SOCIAL_LINKS } from "../../lib/constants";
import { HyperMediaIconProps } from "../IconsList";

export const getSocialIcons = (): HyperMediaIconProps[] => [
  {
    href: SOCIAL_LINKS.github,
    Icon: GitHubLogoIcon,
    label: "GitHub",
  },
  {
    href: SOCIAL_LINKS.linkedin,
    Icon: LinkedInLogoIcon,
    label: "LinkedIn",
  },
  {
    href: SOCIAL_LINKS.email,
    Icon: EnvelopeClosedIcon,
    label: "Email",
  },
  {
    href: SOCIAL_LINKS.phone,
    Icon: ChatBubbleIcon,
    label: "Phone",
  },
];
