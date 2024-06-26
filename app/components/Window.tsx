import { Card, Container, Flex, Inset, Text } from "@radix-ui/themes";
import React from "react";
import WindowControls from "./WindowControls";

const WindowLayout = ({
  LogoIcon,
  title,
  padded,
  children,
}: {
  LogoIcon?: React.JSX.Element;
  title?: string;
  padded?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Card>
      <Flex direction="column">
        <Inset>
          <Flex align="center" justify="between" px="2">
            {LogoIcon && <>{LogoIcon}</>}
            <Text as="p">{title}</Text>
            <WindowControls />
          </Flex>
        </Inset>
        <Inset>
          <Container
            className={`${padded ? "px-2 pb-1" : ""} border-t border-gray-700`}
            mt="5"
          >
            {children}
          </Container>
        </Inset>
      </Flex>
    </Card>
  );
};

export default WindowLayout;
