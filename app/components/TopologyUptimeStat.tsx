"use client";

import { useEffect, useState } from "react";
import { formatUptime } from "../lib/topology";

export interface TopologyUptimeStatProps {
  startIso: string;
}

// The only genuinely live number in the hero ticker (see AGENTS.md's "no
// fabricated telemetry" note) - isolated into its own client component so
// the rest of SystemsHero/the footer ticker can stay a server component.
const TopologyUptimeStat: React.FC<TopologyUptimeStatProps> = ({ startIso }) => {
  const [uptime, setUptime] = useState<string | null>(null);

  useEffect(() => {
    const start = new Date(startIso);
    const tick = () => setUptime(formatUptime(start, new Date()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [startIso]);

  return <>{uptime ?? "computing…"}</>;
};

export default TopologyUptimeStat;
