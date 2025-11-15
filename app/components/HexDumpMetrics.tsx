import React from "react";

interface MetricData {
  label: string;
  value: string;
  color?: string;
}

interface HexDumpMetricsProps {
  metrics: MetricData[];
  className?: string;
}

const HexDumpMetrics: React.FC<HexDumpMetricsProps> = ({
  metrics,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {metrics.map((metric, idx) => {
        const color = metric.color || "text-radix-base-cyan";

        return (
          <div
            key={idx}
            className="font-mono text-sm bg-gray-2 rounded-md p-4 border border-gray-5"
          >
            <div className="text-[10px] opacity-40 mb-2">
              // metric_{idx.toString().padStart(2, "0")}
            </div>
            <div className="flex items-baseline gap-3">
              <span className={`text-3xl font-bold ${color}`}>
                {metric.value}
              </span>
              <span className="text-sm text-radix-base-gray-11 opacity-90">
                {metric.label}
              </span>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-5">
              <span className="text-[10px] text-radix-base-purple opacity-60">
                const
              </span>{" "}
              <span className="text-[10px] text-radix-base-cyan opacity-80">
                value
              </span>
              <span className="text-[10px] opacity-60"> = </span>
              <span className={`text-[10px] ${color}`}>
                "{metric.value}"
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HexDumpMetrics;
