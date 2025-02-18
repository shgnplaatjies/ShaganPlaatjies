import { Card, Container, Flex, Inset, Text } from "@radix-ui/themes";
import React, { useState } from "react";
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
  const [isClosed, setIsClosed] = useState(false);

  return (
    <Card className={`bg-black bg-opacity-70 ${isClosed ? "hidden" : ""}`}>
      <Flex direction="column">
        <Inset>
          <Flex
            className="bg-accent-bg-2 bg-opacity-5"
            align="center"
            justify="between"
            px="2"
          >
            {LogoIcon && <>{LogoIcon}</>}
            <Text as="p">{title}</Text>
            <WindowControls
              onClose={() => {
                setIsClosed(!isClosed);
              }}
            />
          </Flex>
        </Inset>
        <Inset>
          <Container
            className={`bg-black bg-opacity-75 ${
              padded ? "px-2 pb-1" : ""
            } border-t border-gray-700`}
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
