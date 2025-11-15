"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface TestimonialData {
  author: string;
  role: string;
  company: string;
  message: string;
  timestamp?: string;
  logLevel?: "log" | "info" | "success";
}

interface ConsoleLogTestimonialProps {
  testimonial: TestimonialData;
  index?: number;
  className?: string;
}

const ConsoleLogTestimonial: React.FC<ConsoleLogTestimonialProps> = ({
  testimonial,
  index = 0,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getLogIcon = (level: string) => {
    switch (level) {
      case "info":
        return "ℹ";
      case "success":
        return "✓";
      default:
        return "›";
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case "info":
        return "text-radix-base-blue";
      case "success":
        return "text-radix-base-green";
      default:
        return "text-radix-base-gray-11";
    }
  };

  const timestamp =
    testimonial.timestamp ||
    `${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}.${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;

  const logLevel = testimonial.logLevel || "log";

  return (
    <div
      className={`font-mono text-sm bg-gray-2 rounded-md border border-gray-5 overflow-hidden ${className}`}
    >
      <div className="bg-gray-3 px-4 py-1 border-b border-gray-5 flex items-center gap-3">
        <span className="text-[10px] text-radix-base-gray-10">Console</span>
        <span className="text-[10px] text-radix-base-amber">
          testimonials.js:line {42 + index}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          <span className={`${getLogColor(logLevel)} mt-0.5`}>
            {getLogIcon(logLevel)}
          </span>
          <div className="flex-1">
            <div className="text-[11px] text-radix-base-gray-10 mb-2">
              {timestamp}
            </div>

            <div className="mb-3">
              <span className="text-radix-base-purple">console</span>
              <span className="text-radix-base-gray-11">.</span>
              <span className="text-radix-base-amber">{logLevel}</span>
              <span className="text-radix-base-gray-11">(</span>
            </div>

            <div className="pl-4 border-l-2 border-radix-base-cyan border-opacity-30 mb-3">
              <div
                className="cursor-pointer hover:bg-gray-4 transition-colors p-2 -ml-2 rounded"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span className="text-radix-base-blue">▶ </span>
                <span className="text-radix-base-cyan">Object</span>
                <span className="text-radix-base-gray-11"> {`{`}</span>
                {!isExpanded && (
                  <span className="text-radix-base-gray-10 ml-2">
                    {`{ author: "${testimonial.author}", ... }`}
                  </span>
                )}
              </div>

              <motion.div
                initial={false}
                animate={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                style={{ overflow: "hidden" }}
              >
                <div className="pl-6 space-y-1 py-2">
                  <div>
                    <span className="text-radix-base-purple">author</span>
                    <span className="text-radix-base-gray-11">: </span>
                    <span className="text-radix-base-green">
                      "{testimonial.author}"
                    </span>
                  </div>
                  <div>
                    <span className="text-radix-base-purple">role</span>
                    <span className="text-radix-base-gray-11">: </span>
                    <span className="text-radix-base-green">
                      "{testimonial.role}"
                    </span>
                  </div>
                  <div>
                    <span className="text-radix-base-purple">company</span>
                    <span className="text-radix-base-gray-11">: </span>
                    <span className="text-radix-base-green">
                      "{testimonial.company}"
                    </span>
                  </div>
                  <div>
                    <span className="text-radix-base-purple">message</span>
                    <span className="text-radix-base-gray-11">: </span>
                    <span className="text-radix-base-green">
                      "{testimonial.message}"
                    </span>
                  </div>
                </div>
                <div className="pl-4 text-radix-base-gray-11">{`}`}</div>
              </motion.div>

              {!isExpanded && (
                <div className="pl-4 text-radix-base-gray-11">{`}`}</div>
              )}
            </div>

            <div className="text-radix-base-gray-11">)</div>

            <div className="mt-3 pt-3 border-t border-gray-700 border-opacity-30">
              <div className="text-xs text-radix-base-gray-10 italic">
                "{testimonial.message}"
              </div>
              <div className="text-[11px] text-radix-base-gray-10 mt-2">
                — {testimonial.author}, {testimonial.role} at{" "}
                {testimonial.company}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsoleLogTestimonial;
