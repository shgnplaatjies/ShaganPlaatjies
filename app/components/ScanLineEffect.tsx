"use client";

import React from "react";

interface ScanLineEffectProps {
  className?: string;
}

const ScanLineEffect: React.FC<ScanLineEffectProps> = ({ className = "" }) => {
  return (
    <>
      <style>{`
        @keyframes scanLinesVertical {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes scanLinesHorizontal {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes scanLinesDiagonal1 {
          0% {
            transform: translate(-100%, -100%);
          }
          100% {
            transform: translate(100%, 100%);
          }
        }

        @keyframes scanLinesDiagonal2 {
          0% {
            transform: translate(100%, -100%);
          }
          100% {
            transform: translate(-100%, 100%);
          }
        }

        .scan-lines-vertical {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            color-mix(in srgb, var(--cyan-9) 60%, transparent) 0px,
            color-mix(in srgb, var(--cyan-9) 80%, transparent) 4px,
            transparent 4px,
            transparent 8px
          );
          animation: scanLinesVertical 6s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .scan-lines-horizontal {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            90deg,
            color-mix(in srgb, var(--cyan-9) 40%, transparent) 0px,
            color-mix(in srgb, var(--cyan-9) 60%, transparent) 6px,
            transparent 6px,
            transparent 12px
          );
          animation: scanLinesHorizontal 8s linear infinite;
          pointer-events: none;
          z-index: 1;
          opacity: 0.6;
        }

        .scan-lines-diagonal1 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            45deg,
            color-mix(in srgb, var(--cyan-9) 50%, transparent) 0px,
            color-mix(in srgb, var(--cyan-9) 70%, transparent) 5px,
            transparent 5px,
            transparent 10px
          );
          animation: scanLinesDiagonal1 10s linear infinite;
          pointer-events: none;
          z-index: 1;
          opacity: 0.5;
        }

        .scan-lines-diagonal2 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            135deg,
            color-mix(in srgb, var(--cyan-9) 45%, transparent) 0px,
            color-mix(in srgb, var(--cyan-9) 65%, transparent) 7px,
            transparent 7px,
            transparent 14px
          );
          animation: scanLinesDiagonal2 11s linear infinite;
          pointer-events: none;
          z-index: 1;
          opacity: 0.45;
        }

        @media (prefers-color-scheme: light) {
          .scan-lines-vertical {
            background: repeating-linear-gradient(
              0deg,
              color-mix(in srgb, var(--cyan-8) 50%, transparent) 0px,
              color-mix(in srgb, var(--cyan-8) 70%, transparent) 4px,
              transparent 4px,
              transparent 8px
            );
          }

          .scan-lines-horizontal {
            background: repeating-linear-gradient(
              90deg,
              color-mix(in srgb, var(--cyan-8) 35%, transparent) 0px,
              color-mix(in srgb, var(--cyan-8) 55%, transparent) 6px,
              transparent 6px,
              transparent 12px
            );
          }

          .scan-lines-diagonal1 {
            background: repeating-linear-gradient(
              45deg,
              color-mix(in srgb, var(--cyan-8) 40%, transparent) 0px,
              color-mix(in srgb, var(--cyan-8) 60%, transparent) 5px,
              transparent 5px,
              transparent 10px
            );
          }

          .scan-lines-diagonal2 {
            background: repeating-linear-gradient(
              135deg,
              color-mix(in srgb, var(--cyan-8) 35%, transparent) 0px,
              color-mix(in srgb, var(--cyan-8) 55%, transparent) 7px,
              transparent 7px,
              transparent 14px
            );
          }
        }
      `}</style>

      <div className={`scan-lines-vertical ${className}`} />
      <div className={`scan-lines-horizontal ${className}`} />
      <div className={`scan-lines-diagonal1 ${className}`} />
      <div className={`scan-lines-diagonal2 ${className}`} />
    </>
  );
};

export default ScanLineEffect;
