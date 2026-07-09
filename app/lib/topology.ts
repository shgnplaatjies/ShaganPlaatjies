import { WpProjectApiResponse } from "./wordpress-types";
import { WORDPRESS_CATEGORIES } from "./constants";
import { sortProjectsByDate } from "./server-lib-utils";

export interface TopologyNode {
  id: string;
  label: string;
  sub: string;
  startDate?: string;
  endDate?: string;
  href?: string;
}

/**
 * Real employers from Shagan's career history, used only as a seed when the
 * WordPress-backed experience API returns nothing (WP_DOMAIN unset, or WP
 * unreachable - the same failure mode ExperienceSection.tsx silently returns
 * null for). Dates are year-precision approximations of his real tenure at
 * each company; see AGENTS.md's "Hero topology data" note.
 */
export const FALLBACK_TOPOLOGY_NODES: TopologyNode[] = [
  {
    id: "aegle-digital",
    label: "Aegle Digital",
    sub: "E-commerce + AR",
    startDate: "2020-01-01",
    endDate: "2022-06-30",
  },
  {
    id: "newnow",
    label: "NewNow",
    sub: "Kafka anomaly detection",
    startDate: "2022-07-01",
    endDate: "2022-12-31",
  },
  {
    id: "vodacom-vodapay",
    label: "Vodacom / VodaPay",
    sub: "VodaPay lending",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  },
  {
    id: "bsure",
    label: "BSure",
    sub: "Monolith to microservices",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: "broadway-media",
    label: "Broadway Media",
    sub: "Global streaming platform",
    startDate: "2025-01-01",
  },
];

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim();

export function buildTopologyNodes(
  experiences: WpProjectApiResponse[] | false | null | undefined
): TopologyNode[] {
  if (!experiences || experiences.length === 0) {
    return FALLBACK_TOPOLOGY_NODES;
  }

  const workExperiences = experiences.filter(
    (project) =>
      project.categories &&
      project.categories.includes(WORDPRESS_CATEGORIES.WORK_EXPERIENCE.id)
  );

  if (workExperiences.length === 0) {
    return FALLBACK_TOPOLOGY_NODES;
  }

  const sorted = sortProjectsByDate(workExperiences);

  return sorted.map((project) => ({
    id: String(project.id),
    label: project.meta._project_company || stripHtml(project.title.rendered),
    sub: project.meta._project_role || stripHtml(project.title.rendered),
    startDate: project.meta._project_date_start,
    endDate: project.meta._project_date_end,
    href: project.meta._project_company_url,
  }));
}

export function getEarliestStartDate(nodes: TopologyNode[]): Date | null {
  const dates = nodes
    .map((node) => node.startDate)
    .filter((date): date is string => Boolean(date))
    .map((date) => new Date(date));

  if (dates.length === 0) return null;

  return new Date(Math.min(...dates.map((date) => date.getTime())));
}

export function getCurrentNode(nodes: TopologyNode[]): TopologyNode | null {
  if (nodes.length === 0) return null;

  const ongoing = nodes.find((node) => node.startDate && !node.endDate);
  if (ongoing) return ongoing;

  const withEnd = nodes.filter((node) => node.endDate);
  if (withEnd.length === 0) return nodes[0];

  return withEnd.reduce((latest, node) =>
    new Date(node.endDate as string) > new Date(latest.endDate as string)
      ? node
      : latest
  );
}

export function formatYearRange(
  node: Pick<TopologyNode, "startDate" | "endDate">
): string {
  if (!node.startDate) return "";

  const startYear = new Date(node.startDate).getUTCFullYear();
  if (!node.endDate) return `${startYear}–present`;

  const endYear = new Date(node.endDate).getUTCFullYear();
  return startYear === endYear
    ? `${startYear}`
    : `${startYear}–${endYear}`;
}

export function formatUptime(start: Date, now: Date): string {
  const totalSeconds = Math.max(
    0,
    Math.floor((now.getTime() - start.getTime()) / 1000)
  );
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${days.toLocaleString()}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
