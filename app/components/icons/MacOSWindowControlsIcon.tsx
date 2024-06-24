import React from "react";

type MacOSWindowControlsIconProps = {
  type: "close" | "minimize" | "maximize";
};

const MacOSWindowControlsIcon: React.FC<MacOSWindowControlsIconProps> = ({
  type,
}) => {
  const getColor = () => {
    switch (type) {
      case "close":
        return "#ff5f56"; // MacOS red
      case "minimize":
        return "#ffbd2e"; // MacOS yellow
      case "maximize":
        return "#27c93f"; // MacOS green
    }
  };

  return (
    <svg>
      <circle cx="50%" cy="50%" r="5" fill={getColor()} />
    </svg>
  );
};

export default MacOSWindowControlsIcon;
