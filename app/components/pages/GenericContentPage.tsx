import { ReactNode } from "react";
import PortfolioNav from "../PortfolioNav";
import GenericLandingSection from "../sections/GenericLandingSection";
import { PORTFOLIO_NAV_SECTIONS } from "@/app/lib/constants";

export interface GenericContentPageProps {
  landingDescription: string;
  contentComponent: ReactNode;
}

const GenericContentPage: React.FC<GenericContentPageProps> = ({
  landingDescription,
  contentComponent,
}) => {
  return (
    <div className="flex w-full min-w-0 flex-1 flex-col overflow-hidden sm:flex-row">
      <PortfolioNav sections={PORTFOLIO_NAV_SECTIONS} />
      <div className="w-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
        <GenericLandingSection description={landingDescription} />
        {contentComponent}
      </div>
    </div>
  );
};

export default GenericContentPage;
