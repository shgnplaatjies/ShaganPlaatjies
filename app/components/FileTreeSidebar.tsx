"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface FileNode {
  name: string;
  type: "file" | "folder";
  path?: string;
  children?: FileNode[];
}

interface FileTreeSidebarProps {
  className?: string;
}

const fileTree: FileNode[] = [
  {
    name: "portfolio",
    type: "folder",
    children: [
      {
        name: "app",
        type: "folder",
        children: [
          { name: "page.tsx", type: "file", path: "/" },
          {
            name: "about",
            type: "folder",
            children: [
              { name: "page.tsx", type: "file", path: "/about" },
              {
                name: "sections",
                type: "folder",
                children: [
                  { name: "AboutSection.tsx", type: "file", path: "/about#about" },
                  { name: "WorkSection.tsx", type: "file", path: "/about#work" },
                  { name: "TechStackSection.tsx", type: "file", path: "/about#tech" },
                  { name: "ImpactSection.tsx", type: "file", path: "/about#impact" },
                  { name: "TestimonialsSection.tsx", type: "file", path: "/about#testimonials" },
                ],
              },
            ],
          },
          {
            name: "experience",
            type: "folder",
            children: [
              { name: "page.tsx", type: "file", path: "/experience" },
              {
                name: "sections",
                type: "folder",
                children: [
                  { name: "ProjectsSection.tsx", type: "file", path: "/experience#projects" },
                ],
              },
            ],
          },
          {
            name: "experiments",
            type: "folder",
            children: [
              { name: "page.tsx", type: "file", path: "/experiments" },
              {
                name: "sections",
                type: "folder",
                children: [
                  { name: "MusicProjectsSection.tsx", type: "file", path: "/experiments#music" },
                ],
              },
            ],
          },
          {
            name: "posts",
            type: "folder",
            children: [
              { name: "page.tsx", type: "file", path: "/posts" },
            ],
          },
          {
            name: "contact",
            type: "folder",
            children: [
              { name: "page.tsx", type: "file", path: "/contact" },
            ],
          },
        ],
      },
    ],
  },
];

const TreeNode: React.FC<{
  node: FileNode;
  depth: number;
  activePath: string;
  onNavigate: (path: string) => void;
}> = ({ node, depth, activePath, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(depth < 2);

  const isActive = node.path === activePath || activePath.startsWith(node.path + "/");

  const handleClick = () => {
    if (node.type === "folder") {
      setIsOpen(!isOpen);
    } else if (node.path) {
      onNavigate(node.path);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={`flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-white hover:bg-opacity-5 transition-colors font-mono text-xs ${
          isActive && node.type === "file"
            ? "bg-radix-base-blue bg-opacity-20 text-radix-base-cyan"
            : "text-radix-base-gray-11"
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {node.type === "folder" && (
          <span className="text-radix-base-amber w-3">
            {isOpen ? "▼" : "▶"}
          </span>
        )}
        {node.type === "file" && (
          <span className="text-radix-base-grass w-3">├</span>
        )}
        <span className={node.type === "folder" ? "text-radix-base-blue" : ""}>
          {node.name}
        </span>
      </div>

      <AnimatePresence>
        {node.type === "folder" && isOpen && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            {node.children.map((child, idx) => (
              <TreeNode
                key={idx}
                node={child}
                depth={depth + 1}
                activePath={activePath}
                onNavigate={onNavigate}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FileTreeSidebar: React.FC<FileTreeSidebarProps> = ({ className = "" }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div
      className={`bg-black bg-opacity-40 border-r border-gray-700 border-opacity-50 h-full overflow-y-auto ${className}`}
    >
      <div className="sticky top-0 bg-black bg-opacity-60 border-b border-gray-700 border-opacity-50 px-4 py-2">
        <div className="font-mono text-[10px] text-radix-base-gray-10 uppercase tracking-wider">
          Explorer
        </div>
      </div>
      <div className="py-2">
        {fileTree.map((node, idx) => (
          <TreeNode
            key={idx}
            node={node}
            depth={0}
            activePath={pathname}
            onNavigate={handleNavigate}
          />
        ))}
      </div>
    </div>
  );
};

export default FileTreeSidebar;
