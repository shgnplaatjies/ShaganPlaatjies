"use client";
import { MusicProjectConfig } from "@/app/experiments/sections/MusicProjectsSection";
import { useStrudelCycles } from "@/app/lib/hooks/useStrudelCycles";
import { Box, Button, Text } from "@radix-ui/themes";
import "@strudel.cycles/react/dist/style.css";
import WindowLayout from "../WindowCard/Window";

const MusicProject = ({
  project: { title, description, tidalCyclesCode },
}: {
  project: MusicProjectConfig;
}) => {
  const { start, stop } = useStrudelCycles(tidalCyclesCode);
  return (
    <WindowLayout>
      <Box className="flex-col gap-3">
        <Text size="6" className="mb-12">
          {title}
        </Text>

        {description && <Text as="p">{description}</Text>}

        <Box>
          <Button onMouseDown={start}>Play</Button>
          <Button onMouseDown={stop}>Stop</Button>
        </Box>
      </Box>
    </WindowLayout>
  );
};
export default MusicProject;
