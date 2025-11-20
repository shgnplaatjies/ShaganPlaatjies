import {
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { NAV_LINKS } from "../../lib/constants";
import { HyperMediaIconProps } from "../IconsList";

const { home, experience, projects } = NAV_LINKS;

export const getNavIcons = (): HyperMediaIconProps[] => [
  {
    href: home.href,
    Icon: HomeIcon,
    label: home.label,
  },
  {
    href: experience.href,
    Icon: PersonIcon,
    label: experience.label,
  },
  {
    href: projects.href,
    Icon: PersonIcon,
    label: projects.label,
  },
];
