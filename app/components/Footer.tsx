import { DotFilledIcon } from "@radix-ui/react-icons";
import { Flex, Link } from "@radix-ui/themes";
import React from "react";
import IconList from "./SocialIcons";

const Footer: React.FC = () => {
  return (
    <Flex justify="between" className="sticky bottom-0">
      <Link my="2" content="center" href="/contact">
        <DotFilledIcon width="1.25rem" height="1.25rem" />
      </Link>
      <IconList />
    </Flex>
  );
};
export default Footer;
