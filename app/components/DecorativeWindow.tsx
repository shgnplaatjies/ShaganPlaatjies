"use client";
import { Card, Container, Flex, Inset, Text } from "@radix-ui/themes";
import React from "react";

type WindowTheme = 'vscode' | 'terminal' | 'browser';

interface DecorativeWindowProps {
  LogoIcon?: React.JSX.Element;
  title?: string;
  showDots?: boolean;
  theme?: WindowTheme;
  padded?: boolean;
  children: React.ReactNode;
  className?: string;
}

const DecorativeDots: React.FC = () => (
  <Flex gap="2" className="opacity-40 pointer-events-none">
    <div className="w-3 h-3 rounded-full bg-red-9" aria-hidden="true" />
    <div className="w-3 h-3 rounded-full bg-amber-9" aria-hidden="true" />
    <div className="w-3 h-3 rounded-full bg-grass-9" aria-hidden="true" />
  </Flex>
);

const DecorativeWindow: React.FC<DecorativeWindowProps> = ({
  LogoIcon,
  title,
  showDots = true,
  theme = 'vscode',
  padded = true,
  children,
  className = "",
}) => {
  const themeStyles = {
    vscode: "bg-gray-2 border-gray-5",
    terminal: "bg-gray-2 border-grass-6",
    browser: "bg-gray-2 border-blue-6",
  };

  return (
    <Card className={`${themeStyles[theme]} ${className}`}>
      <Flex direction="column">
        <Inset>
          <Flex
            className="bg-accent-bg-2 bg-opacity-5"
            align="center"
            justify="between"
            px="2"
            py="2"
          >
            <Flex align="center" gap="2">
              {showDots && <DecorativeDots />}
              {LogoIcon && <>{LogoIcon}</>}
            </Flex>
            {title && (
              <Text as="p" size="2" className="font-mono opacity-70">
                {title}
              </Text>
            )}
            <div className="w-16" /> {/* Spacer for balance */}
          </Flex>
        </Inset>
        <Inset>
          <Container
            className={`bg-gray-1 ${
              padded ? "px-4 py-3" : ""
            } border-t border-gray-5`}
          >
            {children}
          </Container>
        </Inset>
      </Flex>
    </Card>
  );
};

export default DecorativeWindow;
