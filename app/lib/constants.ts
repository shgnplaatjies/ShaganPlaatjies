export const CONTACT_INFO = {
  email: "hello@shaganplaatjies.co.za",
  phone: "+27765527856",
};

export const SOCIAL_LINKS = {
  github: "https://github.com/shgnplaatjies",
  linkedin: "https://linkedin.com/in/shaganplaatjies",
  email: `mailto:${CONTACT_INFO.email}`,
  phone: `tel:${CONTACT_INFO.phone}`,
};

export const NAV_LINKS = {
  home: { href: "/", label: "Home" },
  about: { href: "/about", label: "About" },
  experience: { href: "/experience", label: "Experience" },
  experiments: { href: "/experiments", label: "Experiments" },
  posts: { href: "/posts", label: "Blog" },
  contact: { href: "/contact", label: "Contact" },
};

export type OrbColorOnPageType = {
  path: string;
  color: string;
  radixColor: RADIX_COLORS;
};

export type OrbColorOnPagesConfigType = {
  [key: string]: OrbColorOnPageType;
};

export const OrbColorOnPagesConfig: OrbColorOnPagesConfigType = {
  default: { path: "", color: "fill-slate-700", radixColor: "gray" },
  home: { path: "/", color: "fill-primary-border-3", radixColor: "grass" },
  about: { path: "/about", color: "fill-red-400", radixColor: "tomato" },
  projects: {
    path: "/experience",
    color: "fill-yellow-300",
    radixColor: "lime",
  },
  experiments: {
    path: "/experiments",
    color: "fill-blue-500",
    radixColor: "cyan",
  },
  blog: {
    path: "/posts",
    color: "fill-purple-500",
    radixColor: "violet",
  },
  contact: { path: "/contact", color: "fill-slate-500", radixColor: "sky" },
};

export const POLLING_INTERVAL = 1000; // 10 seconds, how often to update the time

export type RADIX_HEADING_TYPES = "h1" | "h2" | "h3" | "h4";
export type RADIX_HEADING_SIZES =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";
export type RADIX_COLORS =
  | "gray"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "lime"
  | "mint"
  | "sky";
