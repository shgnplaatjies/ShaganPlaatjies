"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { TopologyNode, formatYearRange } from "../lib/topology";

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

interface Size {
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

interface ActiveNode {
  node: TopologyNode;
  x: number;
  y: number;
}

const FALLBACK_SIZE: Size = { width: 1200, height: 700 };
const NODE_RADIUS = 34;
const LABEL_RESERVE_X = 130; // px reserved beyond a node's radius for its label text
const LABEL_RESERVE_Y = 34;
const STACK_ASPECT_THRESHOLD = 0.85; // below this width/height ratio, stack nodes vertically instead of on an ellipse
const PACKET_COLORS = ["var(--ops-accent)", "var(--amber-9)"];

// Real WordPress-backed company/role strings can be arbitrarily long, unlike
// the short static fallback nodes used for all manual verification of this
// component - ambient background labels must stay capped so they can't
// overflow the diagram's own layout margins (LABEL_RESERVE_X/Y). The hover/
// tap detail card is exempt: it renders the full, untruncated text.
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

// Full, untruncated node description shared by the on-demand detail card,
// the aria-live announcement, and the always-present sr-only node list, so
// keyboard/screen-reader users get the same information sighted mouse/touch
// users get from hovering or tapping.
function describeNode(node: TopologyNode): string {
  const detail = [formatYearRange(node), node.sub].filter(Boolean).join(", ");
  return detail ? `${node.label}, ${detail}` : node.label;
}

// Biased right of true center, away from the HUD text column (which is
// left-aligned, max-w-2xl) so the hub/ellipse has more clearance from the
// headline at narrower desktop widths, where the HUD column takes up a
// larger share of the available space.
const ELLIPSE_CENTER_X_FRACTION = 0.62;

function ellipseCenter(size: Size): Point {
  return { x: size.width * ELLIPSE_CENTER_X_FRACTION, y: size.height * 0.5 };
}

function stackCenter(size: Size): Point {
  return { x: size.width / 2, y: size.height * 0.14 };
}

// The diagram's viewBox always matches the wrapper's real measured size (see
// useMeasuredSize below), so `preserveAspectRatio="xMidYMid slice"` never
// actually has scale-mismatched geometry to crop - it only kicks in for the
// brief window before the first measurement. Node/label positions are then
// derived from that measured width/height with explicit pixel margins
// (LABEL_RESERVE_*), not fixed percentages, so the layout self-adjusts and
// stays clear of the edges at any real viewport's aspect ratio - the
// clipping risk this replaces used to come from a hardcoded viewBox size
// mismatched against whatever aspect ratio the browser actually rendered.
function layoutEllipse(nodes: TopologyNode[], size: Size, center: Point): LaidOutNode[] {
  const { x: cx, y: cy } = center;
  const maxRx = Math.min(cx, size.width - cx) - NODE_RADIUS - LABEL_RESERVE_X;
  const maxRy = Math.min(cy, size.height - cy) - NODE_RADIUS - LABEL_RESERVE_Y;
  const rx = Math.max(70, maxRx);
  const ry = Math.max(70, maxRy);
  const count = Math.max(nodes.length, 1);
  const startAngle = -90 - 180 / count;

  return nodes.map((node, i) => {
    const angle = ((startAngle + (360 / count) * i) * Math.PI) / 180;
    return {
      ...node,
      x: cx + rx * Math.cos(angle),
      y: cy + ry * Math.sin(angle),
      r: NODE_RADIUS,
    };
  });
}

function layoutStack(nodes: TopologyNode[], size: Size, center: Point): LaidOutNode[] {
  const { x: cx } = center;
  const nodeR = Math.min(NODE_RADIUS - 6, size.width * 0.09);
  const topY = size.height * 0.3;
  const bottomY = size.height - Math.max(LABEL_RESERVE_Y * 2, size.height * 0.12);
  const count = Math.max(nodes.length, 1);
  const step = count > 1 ? (bottomY - topY) / (count - 1) : 0;
  const swing = Math.min(size.width * 0.16, 60);

  return nodes.map((node, i) => ({
    ...node,
    x: cx + (i % 2 === 0 ? -swing : swing),
    y: topY + step * i,
    r: nodeR,
  }));
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

// Tracks `ref`'s real rendered box size via ResizeObserver so the SVG's
// viewBox can always match it exactly - see the layoutEllipse comment above
// for why this is what actually neutralizes the full-bleed "slice" cropping
// risk, rather than just picking a bigger static viewBox.
function useMeasuredSize(ref: React.RefObject<HTMLElement | null>): Size {
  const [size, setSize] = useState<Size>(FALLBACK_SIZE);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setSize({ width: rect.width, height: rect.height });
      }
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

const monoFont = { fontFamily: "var(--font-space-mono)" };

const TopologyDashboard: React.FC<TopologyDashboardProps> = ({
  nodes,
  centerLabel = "SHAGAN",
  centerSub = "Software Engineer",
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const isRootVisible = useIsRootVisible(rootRef);
  const size = useMeasuredSize(rootRef);

  const isStack = size.width / size.height < STACK_ASPECT_THRESHOLD;
  const center = useMemo(
    () => (isStack ? stackCenter(size) : ellipseCenter(size)),
    [size, isStack]
  );
  const centerRadius = isStack ? 32 : 44;

  const laidOutNodes = useMemo(
    () => (isStack ? layoutStack(nodes, size, center) : layoutEllipse(nodes, size, center)),
    [nodes, size, isStack, center]
  );

  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const packetRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    if (!isRootVisible) return;

    const packets = nodes.map(() => ({
      t: Math.random(),
      speed: 0.15 + Math.random() * 0.12,
      dir: Math.random() > 0.5 ? 1 : -1,
    }));

    const freezeAtMidpoint = () => {
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
      freezeAtMidpoint();
      return;
    }

    let animationFrameId: number;
    let last = performance.now();

    const animate = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;

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
  }, [nodes, prefersReducedMotion, isRootVisible, laidOutNodes.length]);

  // Ambient labels stay minimal (company name only) - full company/dates/role
  // text is only ever shown in this on-demand detail card, positioned at the
  // desktop cursor (hover) or the tapped node (touch), never baked onto the
  // faded background itself.
  const [activeNode, setActiveNode] = useState<ActiveNode | null>(null);

  // Clamped to the diagram's own box (not just offset from the pointer) so
  // the card never spills past the bottom/right edge of the HUD area - most
  // visibly for nodes laid out near the bottom of the ellipse/stack.
  const CARD_WIDTH = 240;
  const CARD_HEIGHT = 70;
  const positionFromEvent = (clientX: number, clientY: number): Point => {
    const rect = rootRef.current?.getBoundingClientRect();
    const rawX = (clientX ?? 0) - (rect?.left ?? 0) + 16;
    const rawY = (clientY ?? 0) - (rect?.top ?? 0) + 12;
    return {
      x: rect ? Math.min(rawX, rect.width - CARD_WIDTH - 8) : rawX,
      y: rect ? Math.min(rawY, rect.height - CARD_HEIGHT - 8) : rawY,
    };
  };

  const handlePointerEnter = (node: TopologyNode, e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    setActiveNode({ node, ...positionFromEvent(e.clientX, e.clientY) });
  };
  const handlePointerMove = (node: TopologyNode, e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    setActiveNode({ node, ...positionFromEvent(e.clientX, e.clientY) });
  };
  const handlePointerLeaveNode = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    setActiveNode(null);
  };
  const handlePointerUp = (node: TopologyNode, e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    setActiveNode((prev) =>
      prev?.node.id === node.id ? null : { node, ...positionFromEvent(e.clientX, e.clientY) }
    );
  };

  // Keyboard equivalent of hover: tabbing onto a node reveals the same detail
  // card a mouse hover would, positioned at the node's own screen location
  // (there's no pointer coordinate to reuse for a focus event); tabbing away
  // dismisses it, mirroring pointer-leave.
  const handleNodeFocus = (node: TopologyNode, e: React.FocusEvent<SVGGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setActiveNode({ node, ...positionFromEvent(rect.left + rect.width / 2, rect.top + rect.height / 2) });
  };
  const handleNodeBlur = () => setActiveNode(null);

  // Tap-to-dismiss: a touch tap outside any node clears a pinned detail card.
  useEffect(() => {
    if (!activeNode) return;
    const dismissIfOutside = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const target = e.target as Element | null;
      if (!target?.closest("[data-topology-node]")) setActiveNode(null);
    };
    document.addEventListener("pointerdown", dismissIfOutside);
    return () => document.removeEventListener("pointerdown", dismissIfOutside);
  }, [activeNode]);

  // positionFromEvent's clamp only has CARD_WIDTH/CARD_HEIGHT to go on before
  // the card has ever rendered - a reasonable first-paint estimate, but the
  // card's real height varies with real (untruncated) company/role text
  // length. Re-clamp against the card's actual measured box once it's in the
  // DOM so it can never render past the diagram's own edge for long text.
  const cardRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (!activeNode || !cardRef.current || !rootRef.current) return;
    const cardRect = cardRef.current.getBoundingClientRect();
    const rootRect = rootRef.current.getBoundingClientRect();
    const maxX = Math.max(0, rootRect.width - cardRect.width - 8);
    const maxY = Math.max(0, rootRect.height - cardRect.height - 8);
    const clampedX = Math.min(activeNode.x, maxX);
    const clampedY = Math.min(activeNode.y, maxY);
    if (clampedX !== activeNode.x || clampedY !== activeNode.y) {
      setActiveNode((prev) => (prev ? { ...prev, x: clampedX, y: clampedY } : prev));
    }
  }, [activeNode]);

  return (
    <div ref={rootRef} className="absolute inset-0 z-0">
      <svg
        viewBox={`0 0 ${size.width} ${size.height}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <g aria-hidden="true">
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
                style={{ stroke: "var(--ops-line-bright)" }}
                strokeWidth={1.2}
              />
            );
          })}
        </g>

        <g aria-hidden="true">
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

        <g aria-hidden="true">
          <circle
            cx={center.x}
            cy={center.y}
            r={centerRadius}
            fill="none"
            style={{ stroke: "var(--ops-accent)" }}
            strokeWidth={1.4}
          />
          <text
            x={center.x}
            y={center.y - 2}
            textAnchor="middle"
            style={{ fill: "var(--ops-fg-0)", fontWeight: 600, fontSize: 12.5, ...monoFont }}
          >
            {centerLabel}
          </text>
          <text
            x={center.x}
            y={center.y + 14}
            textAnchor="middle"
            style={{ fill: "var(--ops-fg-2)", fontSize: 9.5, ...monoFont }}
          >
            {centerSub}
          </text>
        </g>

        <g>
          {laidOutNodes.map((node) => {
            const active = activeNode?.node.id === node.id;
            const anchor = isStack
              ? "middle"
              : node.x < center.x - 1
              ? "end"
              : node.x > center.x + 1
              ? "start"
              : "middle";
            const tx = isStack
              ? node.x
              : node.x < center.x - 1
              ? node.x - node.r - 10
              : node.x > center.x + 1
              ? node.x + node.r + 10
              : node.x;
            const ty = isStack ? node.y + node.r + 18 : node.y < center.y ? node.y - node.r - 14 : node.y + node.r + 20;
            const labelMax = isStack ? 20 : 22;

            return (
              <g
                key={node.id}
                data-topology-node={node.id}
                role="button"
                tabIndex={0}
                aria-label={describeNode(node)}
                style={{ cursor: "pointer", pointerEvents: "all" }}
                onPointerEnter={(e) => handlePointerEnter(node, e)}
                onPointerMove={(e) => handlePointerMove(node, e)}
                onPointerLeave={handlePointerLeaveNode}
                onPointerUp={(e) => handlePointerUp(node, e)}
                onFocus={(e) => handleNodeFocus(node, e)}
                onBlur={handleNodeBlur}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill="none"
                  aria-hidden="true"
                  style={{ stroke: active ? "var(--ops-accent)" : "var(--ops-line-bright)" }}
                  strokeWidth={1.4}
                />
                <text
                  x={tx}
                  y={ty}
                  textAnchor={anchor}
                  aria-hidden="true"
                  style={{
                    fill: active ? "var(--ops-fg-0)" : "var(--ops-fg-2)",
                    fontSize: isStack ? 11.5 : 10.5,
                    letterSpacing: "0.04em",
                    ...monoFont,
                  }}
                >
                  {truncate(node.label.toUpperCase(), labelMax)}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {activeNode && (
        <div
          ref={cardRef}
          aria-hidden="true"
          className="pointer-events-none absolute z-10 max-w-[240px] rounded-md border px-3.5 py-2.5 text-[11.5px] shadow-lg"
          style={{
            left: activeNode.x,
            top: activeNode.y,
            borderColor: "var(--ops-line-bright)",
            backgroundColor: "var(--ops-bg)",
            color: "var(--ops-fg-1)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
            ...monoFont,
          }}
        >
          <div className="mb-1 text-[12.5px] font-semibold" style={{ color: "var(--ops-fg-0)" }}>
            {activeNode.node.label}
          </div>
          {[formatYearRange(activeNode.node), activeNode.node.sub].filter(Boolean).join(" · ")}
        </div>
      )}

      <div aria-live="polite" className="sr-only">
        {activeNode ? describeNode(activeNode.node) : ""}
      </div>

      <ul className="sr-only">
        {nodes.map((node) => (
          <li key={node.id}>{describeNode(node)}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopologyDashboard;
