import React from "react";

type PulsingCircleProps = {
  color?: string;
  className?: string;
  duration?: number;
};

const PulsingCircle: React.FC<PulsingCircleProps> = ({
  color = "#42984d",
  className = "",
  duration = 5000,
}: PulsingCircleProps) => {
  return (
    <svg
      id="pulsingCircle"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-100 -100 100 100"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      className={`${className}`}
    >
      <style>
        {`
          #pulsingCircle {
            animation: pulsingCircle__pulse ${duration} linear infinite normal forwards;
          }
          @keyframes pulsingCircle__pulse {
            0% {transform: scale(1)}
            50% {transform: scale(0.75)}
            100% {transform: scale(1)}
          }
        `}
      </style>
      <g id="pulsingCircle">
        <ellipse rx="100" ry="100" fill={`${color}`} strokeWidth="0" />
      </g>
    </svg>
  );
};

export default PulsingCircle;
