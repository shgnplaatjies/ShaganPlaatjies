"use client";
import { Box, Grid, Section } from "@radix-ui/themes";
import BorderAccent from "../../components/BorderAccent";
import CodeBlock from "../../components/CodeBlock";
import TerminalPrompt from "../../components/TerminalPrompt";

const TechStackSection: React.FC = () => {
  return (
    <Section className="py-8">
      <TerminalPrompt path="~/tech-stack" command="cat stack.ts" />

      <Box className="mb-8">
        <CodeBlock language="typescript">
          {`interface TechStack {
  backend: string[];
  frontend: string[];
  cloud: string[];
  devops: string[];
  practices: string[];
  specialized: string[];
}

const stack: TechStack = {
  backend: [
    'C# & ASP.NET',
    'Django & Python',
    'Node.js',
    'Serverless & Lambda',
    'RESTful & GraphQL APIs'
  ],
  frontend: [
    'React, Vue & AngularJS',
    'Next.js',
    'TypeScript',
    'TailwindCSS',
    'Responsive & Accessible Design'
  ],
  cloud: [
    'AWS (S3, Kafka, Lambda)',
    'SQL & MSSQL',
    'Vercel',
    'CI/CD Automation',
    'Microservices Architecture'
  ],
  devops: [
    'Git & GitHub',
    'Sentry',
    'Tealium',
    'Jira & ClickUp',
    'Automated Deployment Pipelines'
  ],
  practices: [
    'S.O.L.I.D Principles',
    'Clean Code Architecture',
    'Test-Driven Development',
    'Code Reviews & Mentorship',
    'Agile Methodologies'
  ],
  specialized: [
    'Fintech & Payment Integration',
    'POPIA & GDPR Compliance',
    'E-commerce Platforms',
    'Real-time Data Systems',
    'Enterprise Security'
  ]
};

export default stack;`}
        </CodeBlock>
      </Box>

      <Grid columns={{ initial: "1", md: "2" }} gap="6">
        <BorderAccent color="border-radix-base-green" filePath="~/docs/backend.md">
          <div className="font-mono text-xs mb-3 opacity-60"># Backend & APIs</div>
          <div className="space-y-1 text-sm opacity-90">
            <div>→ C# & ASP.NET for enterprise systems</div>
            <div>→ Django & Python for data-driven apps</div>
            <div>→ Node.js for JavaScript backends</div>
            <div>→ Serverless architecture & Lambda</div>
            <div>→ RESTful & GraphQL APIs</div>
          </div>
        </BorderAccent>

        <BorderAccent color="border-radix-base-blue" filePath="~/docs/frontend.md">
          <div className="font-mono text-xs mb-3 opacity-60"># Frontend & UI</div>
          <div className="space-y-1 text-sm opacity-90">
            <div>→ React, Vue & AngularJS</div>
            <div>→ Next.js for production apps</div>
            <div>→ TypeScript for type safety</div>
            <div>→ TailwindCSS & modern CSS</div>
            <div>→ Responsive & accessible design</div>
          </div>
        </BorderAccent>

        <BorderAccent color="border-radix-base-violet" filePath="~/docs/cloud.md">
          <div className="font-mono text-xs mb-3 opacity-60"># Data & Cloud</div>
          <div className="space-y-1 text-sm opacity-90">
            <div>→ AWS (S3, Kafka, Lambda)</div>
            <div>→ SQL & MSSQL databases</div>
            <div>→ Vercel for deployment</div>
            <div>→ CI/CD automation</div>
            <div>→ Microservices architecture</div>
          </div>
        </BorderAccent>

        <BorderAccent color="border-radix-base-amber" filePath="~/docs/devops.md">
          <div className="font-mono text-xs mb-3 opacity-60"># DevOps & Monitoring</div>
          <div className="space-y-1 text-sm opacity-90">
            <div>→ Git & GitHub workflows</div>
            <div>→ Sentry for error tracking</div>
            <div>→ Tealium for analytics</div>
            <div>→ Jira & ClickUp for project mgmt</div>
            <div>→ Automated deployment pipelines</div>
          </div>
        </BorderAccent>

        <BorderAccent color="border-radix-base-tomato" filePath="~/docs/practices.md">
          <div className="font-mono text-xs mb-3 opacity-60"># Practices & Patterns</div>
          <div className="space-y-1 text-sm opacity-90">
            <div>→ S.O.L.I.D principles</div>
            <div>→ Clean code architecture</div>
            <div>→ Test-driven development</div>
            <div>→ Code reviews & mentorship</div>
            <div>→ Agile methodologies</div>
          </div>
        </BorderAccent>

        <BorderAccent color="border-radix-base-cyan" filePath="~/docs/specialized.md">
          <div className="font-mono text-xs mb-3 opacity-60"># Specialized Skills</div>
          <div className="space-y-1 text-sm opacity-90">
            <div>→ Fintech & payment integration</div>
            <div>→ POPIA & GDPR compliance</div>
            <div>→ E-commerce platforms</div>
            <div>→ Real-time data systems</div>
            <div>→ Enterprise security</div>
          </div>
        </BorderAccent>
      </Grid>
    </Section>
  );
};

export default TechStackSection;
