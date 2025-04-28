"client-only";
import React from "react";

type PulsingCircleProps = {
  className?: string;
  color: string;
  duration?: number;
  blurAmount?: number;
};

const PulsingCircle: React.FC<PulsingCircleProps> = ({
  className = "",
  color,
  duration = 5000,
  blurAmount = 0,
}: PulsingCircleProps) => {
  const pulsingStyle = `
  .pulsing-circle {
    animation: pulsing-circle__pulse ${duration}ms linear infinite normal forwards;
  }
  @keyframes pulsing-circle__pulse {
    0% {transform: scale(1)}
    50% {transform: scale(0.75)}
    100% {transform: scale(1)}
  }`;

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
            filter: blur(${blurAmount}px);
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
          fill={`${color.startsWith("#") ? color : undefined}`}
          className={`${!color.startsWith("#") ? color : undefined}`}
          strokeWidth="0"
        />
      </g>
    </svg>
  );
};

export default PulsingCircle;
