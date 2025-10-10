import { Text } from "@radix-ui/themes";
import { ReactNode } from "react";

interface GitCommitProps {
  hash: string;
  branch?: string;
  title: string;
  company: string;
  period: string;
  description: ReactNode;
  stack?: string;
  isHead?: boolean;
  color?: string;
}

const GitCommit: React.FC<GitCommitProps> = ({
  hash,
  branch,
  title,
  company,
  period,
  description,
  stack,
  isHead = false,
  color = "text-radix-base-grass",
}) => {
  return (
    <div className="relative pl-8 pb-8">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-700"></div>

      <div className="absolute left-[-4px] top-1 w-2.5 h-2.5 rounded-full bg-radix-base-grass border-2 border-gray-900"></div>

      <div className="font-mono text-xs mb-2">
        <span className="text-radix-base-amber">*</span>
        <span className="text-radix-base-cyan ml-2">{hash}</span>
        {isHead && (
          <>
            <span className="text-white ml-2">(</span>
            <span className="text-radix-base-cyan">HEAD</span>
            <span className="text-white"> → </span>
            <span className="text-radix-base-grass">{branch || "main"}</span>
            <span className="text-white">)</span>
          </>
        )}
      </div>

      <Text as="p" size="4" weight="bold" className={`mb-1 ${color}`}>
        {title}
      </Text>
      <Text as="p" size="2" className="opacity-60 mb-3">
        {company} | {period}
      </Text>

      <div className="text-sm opacity-90 mb-3">{description}</div>

      {stack && (
        <div className="font-mono text-xs">
          <span className="text-radix-base-violet">Stack:</span>
          <span className="text-white ml-2">{stack}</span>
        </div>
      )}
    </div>
  );
};

interface GitCommitTimelineProps {
  commits: Omit<GitCommitProps, "isHead">[];
}

const GitCommitTimeline: React.FC<GitCommitTimelineProps> = ({ commits }) => {
  return (
    <div className="mt-6">
      {commits.map((commit, index) => (
        <GitCommit key={commit.hash} {...commit} isHead={index === 0} />
      ))}
    </div>
  );
};

export default GitCommitTimeline;
