import { DotFilledIcon } from "@radix-ui/react-icons";
import { Box, Flex, Grid, Link } from "@radix-ui/themes";
import React from "react";
import IconList from "./IconsList";
import { getSocialIcons } from "./icons/SocialIcons";

type FootPanelProps = {
  className: string;
};

const FootPanel: React.FC<FootPanelProps> = ({
  className = "",
}: FootPanelProps) => {
  const socialIcons = getSocialIcons();
  return (
    <Box className={className}>
      <Grid width="100%" columns="3">
        <Flex justify="start">
          <Link href="/contact" className="flex justify-start" asChild>
            <DotFilledIcon color="green" width="1.25rem" height="1.25rem" />
          </Link>
        </Flex>

        <Flex justify="center">
          <IconList icons={socialIcons} />
        </Flex>

        <Flex justify="end">
          <IconList icons={socialIcons} />
        </Flex>
      </Grid>
    </Box>
  );
};
export default FootPanel;
