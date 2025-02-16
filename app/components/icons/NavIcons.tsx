import {
  EnvelopeClosedIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { NAV_LINKS } from "../../lib/constants";
import { HyperMediaIconProps } from "../IconsList";

const { home, about, experience, experiments, posts, contact } = NAV_LINKS;

export const getNavIcons = (): HyperMediaIconProps[] => [
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
    href: contact.href,
    Icon: EnvelopeClosedIcon,
    label: contact.label,
  },
];
