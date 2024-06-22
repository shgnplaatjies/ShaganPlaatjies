import React from "react";

type PulsingCircleProps = {
  className?: string;
  color?: string;
  duration?: number;
};

const PulsingCircle: React.FC<PulsingCircleProps> = ({
  className = "",
  color = "#42984d",
  duration = 5000,
}: PulsingCircleProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-50 -50 100 100"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <style>
        {`
          .pulsing-circle {
            animation: pulsing-circle__pulse ${duration}ms linear infinite normal forwards;
          }
          @keyframes pulsing-circle__pulse {
            0% {transform: scale(1)}
            50% {transform: scale(0.75)}
            100% {transform: scale(1)}
          }
          `}
      </style>
      <g className="pulsing-circle">
        <ellipse
          rx="50"
          ry="50"
          fill={`${color.startsWith("#") ? color : ""}`}
          className={`${!color.startsWith("#") ? color : ""}`}
          strokeWidth="0"
        />
      </g>
    </svg>
  );
};

export default PulsingCircle;
