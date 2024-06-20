import { Text } from "@radix-ui/themes";
import React from "react";
import AccentedHeading from "../components/AccentedHeading";

export default function ContactPage(): React.ReactElement {
  return (
    <section>
      <AccentedHeading
        textAs="h1"
        size="9"
        preText="Get in "
        accentedText="Touch."
      />
      <Text as="p">CONTACT PAGE.</Text>
    </section>
  );
}
