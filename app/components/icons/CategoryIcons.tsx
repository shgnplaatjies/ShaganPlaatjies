import {
  CodeIcon,
  FileTextIcon,
  GearIcon,
  IdCardIcon,
  LightningBoltIcon,
  MixerHorizontalIcon,
  PersonIcon,
  RocketIcon,
  StackIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import React from "react";

export type CategoryType =
  | "about"
  | "career"
  | "skills"
  | "contact"
  | "projects"
  | "code"
  | "config"
  | "timeline"
  | "profile"
  | "tech";

interface CategoryIconProps {
  category: CategoryType;
  size?: number;
  className?: string;
}

const iconMap: Record<CategoryType, React.ElementType> = {
  about: PersonIcon,
  career: TimerIcon,
  skills: StackIcon,
  contact: IdCardIcon,
  projects: RocketIcon,
  code: CodeIcon,
  config: GearIcon,
  timeline: TimerIcon,
  profile: FileTextIcon,
  tech: MixerHorizontalIcon,
};

const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  size = 18,
  className = "",
}) => {
  const Icon = iconMap[category] || FileTextIcon;

  return <Icon width={size} height={size} className={className} />;
};

export default CategoryIcon;

// Export individual icons for direct use
export const AboutIcon = PersonIcon;
export const CareerIcon = TimerIcon;
export const SkillsIcon = StackIcon;
export const ContactIcon = IdCardIcon;
export const ProjectsIcon = RocketIcon;
export const CodeIconComponent = CodeIcon;
export const ConfigIcon = GearIcon;
export const TimelineIcon = TimerIcon;
export const ProfileIcon = FileTextIcon;
export const TechIcon = MixerHorizontalIcon;
export const LightningIcon = LightningBoltIcon;
