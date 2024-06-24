type LinuxWindowControlsIconProps = {
  type: "close" | "minimize" | "maximize";
};

const LinuxWindowControlsIcon: React.FC<LinuxWindowControlsIconProps> = ({
  type,
}) => {
  const getColor = () => {
    switch (type) {
      case "close":
        return "#E95420"; // Linux red
      case "minimize":
      case "maximize":
        return "#C0C0C0"; // Linux grey
    }
  };
  return (
    <svg>
      <circle cx="50%" cy="50%" r="5" fill={getColor()} />
    </svg>
  );
};

export default LinuxWindowControlsIcon;
