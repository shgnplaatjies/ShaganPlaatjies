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
  const stringToHexDump = (text: string) => {
    const bytes: number[] = [];
    for (let i = 0; i < text.length; i++) {
      bytes.push(text.charCodeAt(i));
    }

    const lines: Array<{ offset: string; hex: string; ascii: string }> = [];
    let offset = 0;

    while (offset < bytes.length) {
      const chunk = bytes.slice(offset, offset + 16);
      const offsetHex = offset.toString(16).padStart(8, "0");

      const hexPart1 = chunk
        .slice(0, 8)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(" ");
      const hexPart2 = chunk
        .slice(8, 16)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(" ");
      const hexFull = hexPart1 + "  " + hexPart2;

      const asciiPart = chunk
        .map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : "."))
        .join("");

      lines.push({
        offset: offsetHex,
        hex: hexFull.padEnd(48, " "),
        ascii: asciiPart.padEnd(16, " "),
      });

      offset += 16;
    }

    return lines;
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {metrics.map((metric, idx) => {
        const fullText = `${metric.value} ${metric.label}`;
        const lines = stringToHexDump(fullText);
        const color = metric.color || "text-radix-base-cyan";

        return (
          <div
            key={idx}
            className="font-mono text-xs bg-black bg-opacity-30 rounded-md p-4 border border-gray-600 border-opacity-30 overflow-x-auto"
          >
            <div className="text-[10px] opacity-40 mb-2">
              // memory_dump_{idx.toString().padStart(2, "0")}.bin
            </div>
            {lines.map((line, lineIdx) => (
              <div key={lineIdx} className="flex gap-4 whitespace-nowrap">
                <span className="text-radix-base-amber opacity-60">
                  {line.offset}:
                </span>
                <span className="text-radix-base-blue opacity-80">
                  {line.hex}
                </span>
                <span className={`${color} font-semibold`}>{line.ascii}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default HexDumpMetrics;
