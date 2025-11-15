import React from "react";

const SummarySection: React.FC = () => {
  return (
    <div id="summary-section" className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-12 mb-6">
        About
      </h2>

      <div className="space-y-4 text-gray-10 leading-relaxed">
        <p>
          I'm a Software Engineer and Product Leader based in Johannesburg,
          South Africa, with over half a decade architecting mission-critical
          systems across fintech, insurance, telecommunications, and live
          entertainment.
        </p>

        <p>
          Currently at Broadway Media, I architect and deliver patented
          technology for global audiences. I merge deep technical expertise with
          product strategy, transforming complex challenges into elegant,
          scalable solutions. I've led teams through enterprise-scale
          transformations, migrating monolithic systems into high-performance
          microservices while maintaining zero downtime.
        </p>

        <p>
          My specialties span full-stack development, system architecture, team
          leadership, and enterprise modernization. I thrive at the intersection
          of scale, security, and innovation—building systems that handle
          millions of concurrent users while maintaining architectural elegance.
        </p>

        <p>
          When not architecting systems, I enjoy exploring emerging
          technologies, contributing to open-source projects, and mentoring
          engineers through complex technical challenges.
        </p>
      </div>
    </div>
  );
};

export default SummarySection;
