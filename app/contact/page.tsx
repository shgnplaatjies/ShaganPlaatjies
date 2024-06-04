import MainLayout from "@/app/components/layout/main/layout";
import { Heading, Text } from "@radix-ui/themes";
import React from "react";

export default function ContactPage(): React.ReactElement {
  return (
    <MainLayout>
      <section>
        <Heading as="h1">Contact Me</Heading>
        <Text as="p">CONTACT PAGE.</Text>
      </section>
    </MainLayout>
  );
}
