import { Card, Container, Flex, Inset, ScrollArea } from "@radix-ui/themes";
import React from "react";
import Footer from "../../Footer";
import Header from "../../Header";

const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Flex direction="column" flexGrow="1" m="2">
      <Card>
        <header>
          <Container align="center">
            <Header />
          </Container>
        </header>
        <main>
          <Flex height="90vh" direction="column">
            <ScrollArea>{children}</ScrollArea>
          </Flex>
        </main>
        <Inset>
          <footer>
            <Container align="center" height="5vh">
              <Footer />
            </Container>
          </footer>
        </Inset>
      </Card>
    </Flex>
  );
};

export default MainLayout;
