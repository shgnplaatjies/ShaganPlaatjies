import React from "react";
import { Footer } from "../components/Footer";
import CodeGlitch from "../components/transitions/CodeGlitch";
import DataStream from "../components/transitions/DataStream";
import HexGrid from "../components/transitions/HexGrid";
import TerminalTransition from "../components/transitions/TerminalTransition";
import {
  AboutSection,
  ImpactSection,
  LandingSection,
  TechStackSectionRefined,
  TestimonialsSection,
  WorkSection,
} from "./sections";

const AboutPage: React.FC = () => (
  <>
    <LandingSection />

    <CodeGlitch code="// designing systems with care and precision" />

    <AboutSection />

    <HexGrid rows={2} cols={14} />

    <ImpactSection />

    <TerminalTransition
      messages={[
        "$ npm run scale enterprise solutions",
        "$ git commit -m 'shipping excellence'",
        "$ node build-impact.js",
      ]}
      speed={2000}
    />

    <TechStackSectionRefined />

    <DataStream
      items={["Architecture", "Leadership", "Innovation", "Scale", "Security"]}
      direction="down"
      speed={3}
    />

    <WorkSection />

    <CodeGlitch code="// continuous learning and growth" />

    <TestimonialsSection />

    <Footer />
  </>
);

export default AboutPage;
