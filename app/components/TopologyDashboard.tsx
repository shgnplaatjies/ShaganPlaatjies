"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import {
  TopologyNode,
  formatUptime,
  formatYearRange,
  getCurrentNode,
  getEarliestStartDate,
} from "../lib/topology";

export interface TopologyDashboardProps {
  nodes: TopologyNode[];
  centerLabel?: string;
  centerSub?: string;
}

interface LaidOutNode extends TopologyNode {
  x: number;
  y: number;
  r: number;
}

interface ViewBox {
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

const DESKTOP_VIEWBOX: ViewBox = { width: 1120, height: 420 };
const MOBILE_VIEWBOX: ViewBox = { width: 420, height: 820 };
const DESKTOP_CENTER: Point = { x: DESKTOP_VIEWBOX.width / 2, y: DESKTOP_VIEWBOX.height / 2 };
const MOBILE_CENTER: Point = { x: MOBILE_VIEWBOX.width / 2, y: 66 };
const DESKTOP_CENTER_RADIUS = 46;
const MOBILE_CENTER_RADIUS = 40;
const PACKET_COLORS = ["var(--cyan-9)", "var(--amber-9)"];

// Desktop spreads employers around the center node on an ellipse (mirrors
// the systems-dashboard prototype). Mobile viewports are too narrow for
// left/right label text at any employer-name length, so nodes stack in a
// vertical column instead, with labels centered below each node.
function layoutNodesDesktop(nodes: TopologyNode[]): LaidOutNode[] {
  const { x: cx, y: cy } = DESKTOP_CENTER;
  const rx = DESKTOP_VIEWBOX.width / 2 - 230;
  const ry = DESKTOP_VIEWBOX.height / 2 - 90;
  const count = Math.max(nodes.length, 1);
  const startAngle = -90 - 180 / count;

  return nodes.map((node, i) => {
    const angle = ((startAngle + (360 / count) * i) * Math.PI) / 180;
    return {
      ...node,
      x: cx + rx * Math.cos(angle),
      y: cy + ry * Math.sin(angle),
      r: 34,
    };
  });
}

function layoutNodesMobile(nodes: TopologyNode[]): LaidOutNode[] {
  const { x: cx } = MOBILE_CENTER;
  const topY = 190;
  const bottomY = MOBILE_VIEWBOX.height - 60;
  const count = Math.max(nodes.length, 1);
  const step = count > 1 ? (bottomY - topY) / (count - 1) : 0;

  return nodes.map((node, i) => ({
    ...node,
    x: cx + (i % 2 === 0 ? -50 : 50),
    y: topY + step * i,
    r: 28,
  }));
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

// Detects whether `ref`'s element is actually painted (not `display:none`
// behind a hidden Tailwind breakpoint wrapper, e.g. PortfolioPageContent's
// duplicated desktop/mobile nav wrappers). Used to fully stop this
// component's rAF/interval loops when its copy is the hidden one, rather
// than burning CPU on invisible DOM.
function useIsRootVisible(ref: React.RefObject<HTMLElement | null>): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const check = () => setVisible(ref.current?.offsetParent !== null);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [ref]);

  return visible;
}

const monoFont = { fontFamily: "var(--font-space-mono)" };

interface TopologySvgProps {
  className: string;
  viewBox: ViewBox;
  center: Point;
  centerRadius: number;
  centerLabel: string;
  centerSub: string;
  laidOutNodes: LaidOutNode[];
  isMobileLayout: boolean;
  pathRefs: React.MutableRefObject<(SVGPathElement | null)[]>;
  packetRefs: React.MutableRefObject<(SVGCircleElement | null)[]>;
}

const TopologySvg: React.FC<TopologySvgProps> = ({
  className,
  viewBox,
  center,
  centerRadius,
  centerLabel,
  centerSub,
  laidOutNodes,
  isMobileLayout,
  pathRefs,
  packetRefs,
}) => (
  <svg
    viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
    className={className}
    role="img"
    aria-label={`Career topology diagram: ${centerLabel} connected to ${laidOutNodes
      .map((node) => node.label)
      .join(", ")}`}
  >
    <g>
      {laidOutNodes.map((node, i) => {
        const bend = i % 2 === 0 ? -40 : 40;
        const mx = (center.x + node.x) / 2 + bend;
        const my = (center.y + node.y) / 2;
        return (
          <path
            key={node.id}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            d={`M ${center.x} ${center.y} Q ${mx} ${my} ${node.x} ${node.y}`}
            fill="none"
            style={{ stroke: "var(--gray-6)" }}
            strokeWidth={1.5}
          />
        );
      })}
    </g>

    <g>
      {laidOutNodes.map((node, i) => (
        <circle
          key={node.id}
          ref={(el) => {
            packetRefs.current[i] = el;
          }}
          r={3.2}
          style={{ fill: PACKET_COLORS[i % PACKET_COLORS.length] }}
        />
      ))}
    </g>

    <g>
      <circle
        cx={center.x}
        cy={center.y}
        r={centerRadius}
        style={{ fill: "var(--gray-2)", stroke: "var(--cyan-9)" }}
        strokeWidth={1.5}
      />
      <circle
        cx={center.x}
        cy={center.y}
        r={centerRadius - 8}
        fill="none"
        style={{ stroke: "var(--cyan-9)" }}
        strokeWidth={1}
        opacity={0.35}
      />
      <text
        x={center.x}
        y={center.y - 2}
        textAnchor="middle"
        style={{ fill: "var(--gray-12)", fontWeight: 600, fontSize: 12.5, ...monoFont }}
      >
        {centerLabel}
      </text>
      <text
        x={center.x}
        y={center.y + 14}
        textAnchor="middle"
        style={{ fill: "var(--gray-9)", fontSize: 9.5, ...monoFont }}
      >
        {centerSub}
      </text>
    </g>

    <g>
      {laidOutNodes.map((node) => {
        const anchor = isMobileLayout
          ? "middle"
          : node.x < center.x - 1
          ? "end"
          : node.x > center.x + 1
          ? "start"
          : "middle";
        const tx = isMobileLayout
          ? node.x
          : node.x < center.x - 1
          ? node.x - node.r - 10
          : node.x > center.x + 1
          ? node.x + node.r + 10
          : node.x;
        const ty = isMobileLayout
          ? node.y + node.r + 18
          : node.y < center.y
          ? node.y - node.r - 20
          : node.y + node.r + 22;
        const labelMax = isMobileLayout ? 20 : 22;
        const subMax = isMobileLayout ? 24 : 26;
        const labelFontSize = isMobileLayout ? 12.5 : 11;
        const subFontSize = isMobileLayout ? 10.5 : 9.5;
        const subText = truncate(
          [formatYearRange(node), node.sub].filter(Boolean).join(" · "),
          subMax
        );

        return (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              style={{ fill: "var(--gray-1)", stroke: "var(--gray-7)" }}
              strokeWidth={1.5}
            />
            <text
              x={tx}
              y={ty}
              textAnchor={anchor}
              style={{ fill: "var(--gray-11)", fontSize: labelFontSize, ...monoFont }}
            >
              {truncate(node.label.toUpperCase(), labelMax)}
            </text>
            <text
              x={tx}
              y={ty + 13}
              textAnchor={anchor}
              style={{ fill: "var(--gray-9)", fontSize: subFontSize, ...monoFont }}
            >
              {subText}
            </text>
          </g>
        );
      })}
    </g>
  </svg>
);

const TopologyDashboard: React.FC<TopologyDashboardProps> = ({
  nodes,
  centerLabel = "SHAGAN",
  centerSub = "Software Engineer",
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const desktopWrapperRef = useRef<HTMLDivElement | null>(null);
  const isRootVisible = useIsRootVisible(rootRef);

  const laidOutNodesDesktop = useMemo(() => layoutNodesDesktop(nodes), [nodes]);
  const laidOutNodesMobile = useMemo(() => layoutNodesMobile(nodes), [nodes]);

  const pathRefsDesktop = useRef<(SVGPathElement | null)[]>([]);
  const packetRefsDesktop = useRef<(SVGCircleElement | null)[]>([]);
  const pathRefsMobile = useRef<(SVGPathElement | null)[]>([]);
  const packetRefsMobile = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    if (!isRootVisible) return;

    const packets = nodes.map(() => ({
      t: Math.random(),
      speed: 0.15 + Math.random() * 0.12,
      dir: Math.random() > 0.5 ? 1 : -1,
    }));

    const freezeAt = (
      pathRefs: React.MutableRefObject<(SVGPathElement | null)[]>,
      packetRefs: React.MutableRefObject<(SVGCircleElement | null)[]>
    ) => {
      packets.forEach((_, i) => {
        const path = pathRefs.current[i];
        const el = packetRefs.current[i];
        if (path && el) {
          const point = path.getPointAtLength(path.getTotalLength() * 0.5);
          el.setAttribute("cx", String(point.x));
          el.setAttribute("cy", String(point.y));
        }
      });
    };

    if (prefersReducedMotion) {
      // Freeze each packet at its edge's midpoint instead of running the
      // continuous requestAnimationFrame loop, mirroring MatrixRain's
      // reduced-motion handling (app/components/MatrixRain.tsx).
      freezeAt(pathRefsDesktop, packetRefsDesktop);
      freezeAt(pathRefsMobile, packetRefsMobile);
      return;
    }

    let animationFrameId: number;
    let last = performance.now();

    const animate = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;

      const isDesktopVisible = desktopWrapperRef.current?.offsetParent !== null;
      const pathRefs = isDesktopVisible ? pathRefsDesktop : pathRefsMobile;
      const packetRefs = isDesktopVisible ? packetRefsDesktop : packetRefsMobile;

      packets.forEach((packet, i) => {
        const path = pathRefs.current[i];
        const el = packetRefs.current[i];
        if (!path || !el) return;

        packet.t += packet.speed * dt * packet.dir;
        if (packet.t > 1) packet.t = 0;
        if (packet.t < 0) packet.t = 1;

        const length = path.getTotalLength();
        const point = path.getPointAtLength(packet.t * length);
        el.setAttribute("cx", String(point.x));
        el.setAttribute("cy", String(point.y));
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [nodes, prefersReducedMotion, isRootVisible]);

  const [utcClock, setUtcClock] = useState<string | null>(null);
  useEffect(() => {
    if (!isRootVisible) return;

    const tick = () => {
      const now = new Date();
      const hh = String(now.getUTCHours()).padStart(2, "0");
      const mm = String(now.getUTCMinutes()).padStart(2, "0");
      const ss = String(now.getUTCSeconds()).padStart(2, "0");
      setUtcClock(`${hh}:${mm}:${ss} UTC`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isRootVisible]);

  const earliestStart = useMemo(() => getEarliestStartDate(nodes), [nodes]);
  const [uptime, setUptime] = useState<string | null>(null);
  useEffect(() => {
    if (!isRootVisible || !earliestStart) return;
    const tick = () => setUptime(formatUptime(earliestStart, new Date()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [earliestStart, isRootVisible]);

  const currentNode = useMemo(() => getCurrentNode(nodes), [nodes]);
  const activeSinceYear = earliestStart ? earliestStart.getUTCFullYear() : null;

  const stats: { label: string; value: string; tone?: "accent" | "warn" }[] = [
    { label: "Career uptime", value: uptime ?? "computing…", tone: "accent" },
    { label: "Employers", value: String(nodes.length) },
    { label: "Active since", value: activeSinceYear ? String(activeSinceYear) : "–" },
    { label: "Currently", value: currentNode?.label ?? "–", tone: "warn" },
  ];

  return (
    <div
      ref={rootRef}
      className="relative rounded-xl border overflow-hidden"
      style={{ borderColor: "var(--gray-6)", backgroundColor: "var(--gray-1)" }}
    >
      <div
        className="flex items-center gap-2 px-4 sm:px-5 pt-4 pb-2 text-[11px] uppercase tracking-wider"
        style={{ color: "var(--gray-9)", ...monoFont }}
      >
        <span
          className={`inline-block w-[7px] h-[7px] rounded-full flex-shrink-0 ${
            prefersReducedMotion ? "" : "animate-pulse"
          }`}
          style={{ backgroundColor: "var(--red-9)" }}
          aria-hidden="true"
        />
        Live — career topology, {activeSinceYear ?? "2020"}–present
      </div>

      <div ref={desktopWrapperRef} className="hidden sm:block">
        <TopologySvg
          className="w-full h-auto"
          viewBox={DESKTOP_VIEWBOX}
          center={DESKTOP_CENTER}
          centerRadius={DESKTOP_CENTER_RADIUS}
          centerLabel={centerLabel}
          centerSub={centerSub}
          laidOutNodes={laidOutNodesDesktop}
          isMobileLayout={false}
          pathRefs={pathRefsDesktop}
          packetRefs={packetRefsDesktop}
        />
      </div>
      <div className="block sm:hidden">
        <TopologySvg
          className="w-full h-auto"
          viewBox={MOBILE_VIEWBOX}
          center={MOBILE_CENTER}
          centerRadius={MOBILE_CENTER_RADIUS}
          centerLabel={centerLabel}
          centerSub={centerSub}
          laidOutNodes={laidOutNodesMobile}
          isMobileLayout={true}
          pathRefs={pathRefsMobile}
          packetRefs={packetRefsMobile}
        />
      </div>

      <div
        className="grid grid-cols-2 sm:grid-cols-4 border-t"
        style={{ borderColor: "var(--gray-6)" }}
      >
        {stats.map((stat, i) => {
          const mobileRight = i === 0 || i === 2;
          const desktopRight = i !== 3;
          return (
            <div
              key={stat.label}
              className={`px-4 sm:px-5 py-4 ${mobileRight ? "border-r" : ""} ${
                desktopRight ? "sm:border-r" : "sm:border-r-0"
              } ${i >= 2 ? "border-t sm:border-t-0" : ""}`}
              style={{ borderColor: "var(--gray-6)", ...monoFont }}
            >
              <div
                className="text-[10px] uppercase tracking-wider mb-2"
                style={{ color: "var(--gray-9)" }}
              >
                {stat.label}
              </div>
              <div
                className="text-base sm:text-lg font-semibold truncate"
                style={{
                  color:
                    stat.tone === "accent"
                      ? "var(--cyan-11)"
                      : stat.tone === "warn"
                      ? "var(--amber-11)"
                      : "var(--gray-12)",
                }}
              >
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="px-4 sm:px-5 py-2 text-right text-[11px]"
        style={{ color: "var(--gray-8)", ...monoFont }}
      >
        {utcClock ?? "--:--:-- UTC"}
      </div>
    </div>
  );
};

export default TopologyDashboard;
