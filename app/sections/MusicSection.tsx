import fs from "fs";
import path from "path";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import MusicProject from "../components/tidal-cycles/MusicProject";

const MusicSection: React.FC = () => {
  const patternPath = path.join(process.cwd(), "app/lib/strudel/first-song.str");
  const code = fs.readFileSync(patternPath, "utf-8");

  return (
    <Box id="music-section" className="space-y-6 sm:space-y-8">
      <Flex direction="column" gap="3" className="sm:gap-4">
        <Heading as="h2" size="7" className="text-gray-12">Music</Heading>
        <Text as="p" size="2" className="text-gray-9">
          A live-coded pattern, played with Strudel. Off by default - press play for sound.
        </Text>
      </Flex>

      <MusicProject code={code} />
    </Box>
  );
};

export default MusicSection;
