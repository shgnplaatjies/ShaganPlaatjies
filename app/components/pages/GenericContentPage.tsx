import { ReactNode } from "react";
import GenericLandingSection from "../sections/GenericLandingSection";

export interface GenericContentPageProps {
  landingDescription: string;
  contentComponent: ReactNode;
}

const GenericContentPage: React.FC<GenericContentPageProps> = ({
  landingDescription,
  contentComponent,
}) => {
  return (
    <>
      <GenericLandingSection description={landingDescription} />
      {contentComponent}
    </>
  );
};

export default GenericContentPage;
