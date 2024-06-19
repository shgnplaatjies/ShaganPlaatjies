import {
  ChatBubbleIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { Link } from "@radix-ui/themes";
import React from "react";
import { SOCIAL_LINKS } from "../lib/constants";

const getSocialIcons = () => [
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

const SocialIcons: React.FC = () => {
  const icons = getSocialIcons();
  return (
    <div className="flex gap-2">
      {icons.map(({ Icon, label, href }) => (
        <Link key={label} content="center" href={href}>
          <Icon width="1.25rem" height="1.25rem" />
        </Link>
      ))}
    </div>
  );
};

export default SocialIcons;
