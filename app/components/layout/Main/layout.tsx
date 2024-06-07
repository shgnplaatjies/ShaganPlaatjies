import { Box, Card, Flex, ScrollArea } from "@radix-ui/themes";
import React from "react";
import Footer from "../../Footer";
import Header from "../../Header";

const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Flex direction="column" overflow="hidden" m="2">
      <Card>
        <ScrollArea>
          <header className="sticky top-0">
            <Box>
              <Card variant="surface">
                <Header />
              </Card>
            </Box>
          </header>
          <main>
            <Flex direction="column" overflow="hidden">
              {children}
            </Flex>
          </main>
          <footer className="sticky bottom-0">
            <Box>
              <Footer />
            </Box>
          </footer>
        </ScrollArea>
      </Card>
    </Flex>
  );
};

export default MainLayout;
