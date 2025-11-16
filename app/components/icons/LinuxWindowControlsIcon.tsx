import { Flex } from "@radix-ui/themes";

type LinuxWindowControlsIconProps = {
  type: "close" | "minimize" | "maximize";
};

const LinuxWindowControlsIcon: React.FC<LinuxWindowControlsIconProps> = ({
  type,
}) => {
  const getColor = () => {
    switch (type) {
      case "close":
        return "var(--red-9)";
      case "minimize":
      case "maximize":
        return "var(--gray-9)";
    }
  };
  return (
    <Flex>
      <svg width="1rem" height="1rem">
        <circle cx="50%" cy="50%" r="5" fill={getColor()} />
      </svg>
    </Flex>
  );
};

export default LinuxWindowControlsIcon;
