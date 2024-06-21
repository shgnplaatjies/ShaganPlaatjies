import {
  BackpackIcon,
  EnvelopeClosedIcon,
  HomeIcon,
  PersonIcon,
  QuoteIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { NAV_LINKS } from "../../lib/constants";
import { SocialIconProps } from "../IconsList";

const { home, about, experience, experiments, posts, contact } = NAV_LINKS;

export const getNavIcons = (): SocialIconProps[] => [
  {
    href: home.href,
    Icon: HomeIcon,
    label: home.label,
  },
  {
    href: about.href,
    Icon: PersonIcon,
    label: about.label,
  },
  {
    href: experience.href,
    Icon: BackpackIcon,
    label: experience.label,
  },
  {
    href: experiments.href,
    Icon: RocketIcon,
    label: experiments.label,
  },
  {
    href: posts.href,
    Icon: QuoteIcon,
    label: posts.label,
  },
  {
    href: contact.href,
    Icon: EnvelopeClosedIcon,
    label: contact.label,
  },
];
