import { fetchAllWpProjects } from "../lib/server-lib";
import { buildTopologyNodes } from "../lib/topology";
import SystemsHero from "../components/SystemsHero";

const LandingSection: React.FC = async () => {
  const experiences = await fetchAllWpProjects();
  const nodes = buildTopologyNodes(experiences);

  return (
    <SystemsHero
      nodes={nodes}
      description="I build software for global entertainment platforms, leading technical delivery from architecture through production."
    />
  );
};

export { LandingSection };
