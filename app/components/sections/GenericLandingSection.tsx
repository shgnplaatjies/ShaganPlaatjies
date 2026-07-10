import { fetchAllWpProjects } from "../../lib/server-lib";
import { buildTopologyNodes } from "../../lib/topology";
import SystemsHero from "../SystemsHero";

export interface GenericLandingSectionProps {
  description: string;
}

const GenericLandingSection: React.FC<GenericLandingSectionProps> = async ({
  description,
}) => {
  const experiences = await fetchAllWpProjects();
  const nodes = buildTopologyNodes(experiences);

  return <SystemsHero nodes={nodes} description={description} />;
};

export default GenericLandingSection;
