import Link from "next/link";
import TopologyDashboard from "./TopologyDashboard";
import TopologyUptimeStat from "./TopologyUptimeStat";
import {
  TopologyNode,
  formatYearRange,
  getCurrentNode,
  getEarliestStartDate,
} from "../lib/topology";
import { CONTACT_INFO } from "../lib/constants";

export interface SystemsHeroProps {
  nodes: TopologyNode[];
  description: string;
}

const monoFont = { fontFamily: "var(--font-space-mono)" };

const SystemsHero: React.FC<SystemsHeroProps> = ({ nodes, description }) => {
  const earliestStart = getEarliestStartDate(nodes);
  const currentNode = getCurrentNode(nodes);

  return (
    <section
      className="relative flex w-full min-w-0 min-h-[640px] flex-col overflow-hidden sm:min-h-[75vh]"
      style={{ backgroundColor: "var(--ops-bg)" }}
    >
      {/*
        The ambient diagram and its fade are absolutely positioned against
        *this* wrapper, not the whole section - it stops at flex-1's own
        bottom edge, which sits above the footer ticker below rather than
        underneath it. That's a real layout boundary (not a guessed pixel
        reserve), so node labels near the bottom of the ellipse/stack layout
        can never end up hidden behind the ticker's opaque bar.
      */}
      <div className="relative min-h-0 flex-1">
        <TopologyDashboard nodes={nodes} />

        {/* Fade so the ambient diagram stays legible under the HUD text
            without being boxed - tokens (not literal colors) so it adapts
            with the light/dark toggle like the rest of the ops chrome. */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(900px 560px at 32% 32%, color-mix(in srgb, var(--ops-bg) 12%, transparent), color-mix(in srgb, var(--ops-bg) 80%, transparent) 60%, color-mix(in srgb, var(--ops-bg) 97%, transparent) 100%)",
          }}
        />

        <div className="relative z-[2] flex h-full max-w-2xl flex-col justify-center gap-4 px-5 py-14 sm:px-10 sm:py-16 lg:px-14">
          <p
            className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.14em]"
            style={{ color: "var(--ops-accent)", ...monoFont }}
          >
            <span aria-hidden="true" className="h-px w-5" style={{ backgroundColor: "var(--ops-accent)" }} />
            Software Engineer &amp; Product Lead · {CONTACT_INFO.location}
          </p>

          <h1
            className="text-[34px] font-extrabold leading-[1.05] tracking-tight sm:text-[46px] lg:text-[58px]"
            style={{ color: "var(--ops-fg-0)" }}
          >
            <span style={{ color: "var(--ops-accent)" }}>Shagan</span> designs systems that don&apos;t
            go down.
          </h1>

          <p
            className="max-w-xl text-[15px] leading-relaxed sm:text-base"
            style={{ color: "var(--ops-fg-1)" }}
          >
            {description}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-3">
            <Link
              href="/#summary"
              className="rounded-md px-6 py-3 text-[13.5px] font-semibold transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: "var(--ops-accent)", color: "var(--ops-bg)", ...monoFont }}
            >
              About me →
            </Link>
            <a
              href="/downloads/shagan-plaatjies-resume.pdf"
              download
              className="rounded-md border px-6 py-3 text-[13.5px] font-semibold backdrop-blur-sm transition-colors hover:border-[var(--ops-accent)]"
              style={{ borderColor: "var(--ops-line-bright)", color: "var(--ops-fg-0)", ...monoFont }}
            >
              View résumé
            </a>
          </div>
        </div>
      </div>

      <div
        className="relative z-[2] flex flex-col border-t backdrop-blur-md sm:flex-row sm:items-stretch"
        style={{
          borderColor: "var(--ops-line)",
          backgroundColor: "color-mix(in srgb, var(--ops-bg) 55%, transparent)",
        }}
      >
        <div
          className="flex-shrink-0 border-b px-5 py-3.5 sm:border-b-0 sm:border-r"
          style={{ borderColor: "var(--ops-line)" }}
        >
          <div
            className="mb-1.5 text-[9.5px] uppercase tracking-[0.1em]"
            style={{ color: "var(--ops-fg-2)", ...monoFont }}
          >
            Career uptime
          </div>
          <div className="text-[15px] font-semibold sm:text-base" style={{ color: "var(--ops-accent)", ...monoFont }}>
            {earliestStart ? <TopologyUptimeStat startIso={earliestStart.toISOString()} /> : "–"}
          </div>
        </div>

        <div className="flex flex-1 items-stretch overflow-x-auto">
          {nodes.map((node) => {
            const isCurrent = currentNode?.id === node.id;
            return (
              <div
                key={node.id}
                className="flex flex-shrink-0 flex-col justify-center whitespace-nowrap border-r px-4 py-3.5"
                style={{ borderColor: "var(--ops-line)" }}
              >
                <div className="mb-0.5 text-[9.5px]" style={{ color: "var(--ops-fg-2)", ...monoFont }}>
                  {formatYearRange(node)}
                </div>
                <div
                  className="text-[12px] font-bold"
                  style={{ color: isCurrent ? "var(--ops-accent)" : "var(--ops-fg-0)", ...monoFont }}
                >
                  {node.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex-shrink-0 border-t px-5 py-3.5 sm:border-l sm:border-t-0" style={{ borderColor: "var(--ops-line)" }}>
          <div
            className="mb-1.5 text-[9.5px] uppercase tracking-[0.1em]"
            style={{ color: "var(--ops-fg-2)", ...monoFont }}
          >
            Currently
          </div>
          <div className="text-[15px] font-semibold sm:text-base" style={{ color: "var(--amber-11)", ...monoFont }}>
            {currentNode?.label ?? "–"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemsHero;
