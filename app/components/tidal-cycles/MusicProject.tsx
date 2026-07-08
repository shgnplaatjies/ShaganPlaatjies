"use client";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useStrudelCycles } from "@/app/lib/hooks/useStrudelCycles";

export interface MusicProjectProps {
  code: string;
}

const statusLabel: Record<string, string> = {
  idle: "Muted",
  loading: "Starting audio...",
  playing: "Playing",
  stopped: "Stopped",
  error: "Couldn't start audio",
};

const MusicProject: React.FC<MusicProjectProps> = ({ code }) => {
  const { status, error, start, stop } = useStrudelCycles(code);
  const isPlaying = status === "playing" || status === "loading";

  return (
    <Box className="py-4">
      <Flex direction="column" gap="3">
        <pre className="whitespace-pre-wrap rounded-md bg-gray-3 p-4 text-sm text-gray-12 font-mono">
          {code}
        </pre>

        <Flex align="center" gap="3">
          <Button
            type="button"
            data-testid="strudel-toggle-button"
            onClick={() => (isPlaying ? stop() : start())}
            disabled={status === "loading"}
          >
            {isPlaying ? "Stop" : "Play"}
          </Button>
          <Text as="p" size="2" className="opacity-70" data-testid="strudel-status">
            {statusLabel[status] ?? status}
          </Text>
        </Flex>

        {status === "error" && error && (
          <Text as="p" size="2" color="red" data-testid="strudel-error">
            {error}
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default MusicProject;
