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
    <div className="w-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
      <GenericLandingSection description={landingDescription} />
      {contentComponent}
    </div>
  );
};

export default GenericContentPage;
