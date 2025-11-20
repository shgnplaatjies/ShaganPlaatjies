export const STANDARD_CACHE_TTL = 3600; // 1 hour, in seconds

export const DefaultFeaturedImage =
  "/images/default-project-featured-image.webp";

export const CONTACT_INFO = {
  email: "plaatjiesshagan@gmail.com",
  phone: "+27765527856",
  location: "Johannesburg, South Africa",
  website: "https://shaganplaatjies.co.za",
};

export const SOCIAL_LINKS = {
  github: "https://github.com/shgnplaatjies",
  linkedin: "https://linkedin.com/in/shaganplaatjies",
  email: `mailto:${CONTACT_INFO.email}`,
  phone: `tel:${CONTACT_INFO.phone}`,
  pixelscape: "https://pixelscape.co.za",
};

export const NAV_LINKS = {
  home: { href: "/", label: "Home" },
  about: { href: "/about", label: "About" },
  experience: { href: "/experience", label: "Experience" },
  projects: { href: "/projects", label: "Projects" },
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
  default: { path: "", color: "fill-radix-base-cyan", radixColor: "cyan" },
  home: { path: "/", color: "fill-radix-base-cyan", radixColor: "cyan" },
  about: {
    path: "/about",
    color: "fill-radix-base-tomato",
    radixColor: "tomato",
  },
  experience: {
    path: "/experience",
    color: "fill-radix-base-cyan",
    radixColor: "cyan",
  },
  projects: {
    path: "/projects",
    color: "fill-radix-base-cyan",
    radixColor: "cyan",
  },
  experiments: {
    path: "/experiments",
    color: "fill-radix-base-cyan",
    radixColor: "cyan",
  },
  blog: {
    path: "/posts",
    color: "fill-radix-base-violet",
    radixColor: "violet",
  },
  contact: {
    path: "/contact",
    color: "fill-radix-base-cyan",
    radixColor: "cyan",
  },
};

export const WORDPRESS_CATEGORIES = {
  BLOG_POST: { id: 37, name: 'Blog Post', slug: 'blog-post' },
  PROJECT: { id: 38, name: 'Project', slug: 'project' },
  WORK_EXPERIENCE: { id: 41, name: 'Work Experience', slug: 'work-experience' },
  UNCATEGORIZED: { id: 1, name: 'Uncategorized', slug: 'uncategorized' },
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

export type ThirdPartyStrudelSampleConfig = {
  configUrl: `${string}.json`;
  binaryUrl: string;
};

export const ThirdPartyStrudelSamples: ThirdPartyStrudelSampleConfig[] = [
  {
    configUrl: "https://strudel.tidalcycles.org/tidal-drum-machines.json",
    binaryUrl: "github:ritchse/tidal-drum-machines/main/machines/",
  },
];
