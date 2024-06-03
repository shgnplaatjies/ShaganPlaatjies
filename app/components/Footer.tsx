import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import React from "react";
import CTAButton from "./CTAButton";
import IconList from "./IconList";
type FooterProps = { href: string; text: string };

const Footer: React.FC<FooterProps> = ({ href, text }) => {
  const socialIcons = [
    {
      href: "https://github.com/shgnplaatjies",
      icon: <GitHubLogoIcon />,
      label: "GitHub",
    },
    {
      href: "https://linkedin.com/in/shaganplaatjies",
      icon: <LinkedInLogoIcon />,
      label: "LinkedIn",
    },
    {
      href: "mailto:hello@shaganplaatjies.co.za",
      icon: <EnvelopeClosedIcon />,
      label: "Email",
    },
  ];

  return (
    <footer>
      <ul>
        <li>
          <CTAButton href={href} text={text} />
        </li>
        <li>
          <IconList icons={socialIcons} />
        </li>
      </ul>
    </footer>
  );
};
export default Footer;
