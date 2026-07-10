"use client";

import React, { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

const PLACEHOLDER_CLOCK = "--:--:-- UTC";

const formatUtcClock = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(
    date.getUTCSeconds()
  )} UTC`;
};

const StatusBar: React.FC = () => {
  const [clock, setClock] = useState(PLACEHOLDER_CLOCK);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setClock(formatUtcClock(new Date()));
    const interval = setInterval(() => setClock(formatUtcClock(new Date())), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between border-b border-[var(--ops-line)] bg-[var(--ops-bg)] px-4 py-3 font-mono text-[11px] text-[var(--ops-fg-1)] sm:px-8 sm:text-xs">
      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--ops-line-bright)] px-3 py-1">
        <span
          className={`h-1.5 w-1.5 rounded-full ${prefersReducedMotion ? "" : "animate-pulse"}`}
          style={{ backgroundColor: "var(--ops-accent)", boxShadow: "0 0 6px var(--ops-accent)" }}
          aria-hidden="true"
        />
        ALL SYSTEMS OPERATIONAL
      </span>
      <span className="hidden text-[var(--ops-fg-2)] sm:inline">{clock}</span>
    </div>
  );
};

export default StatusBar;
