"use client";

import React, { ReactNode, useState } from "react";

interface FileMetadata {
  path: string;
  modified?: string;
  size?: string;
  type?: string;
  permissions?: string;
}

interface FileMetadataTooltipProps {
  metadata: FileMetadata;
  children: ReactNode;
  className?: string;
}

const FileMetadataTooltip: React.FC<FileMetadataTooltipProps> = ({
  metadata,
  children,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-50 bottom-full left-0 mb-2 w-64 bg-gray-2 border border-gray-5 rounded-md p-3 font-mono text-xs pointer-events-none">
          <div className="text-radix-base-cyan mb-2 font-semibold">
            $ stat {metadata.path}
          </div>
          <div className="space-y-1 text-radix-base-gray-11">
            <div>
              <span className="text-radix-base-amber">File:</span> {metadata.path}
            </div>
            {metadata.size && (
              <div>
                <span className="text-radix-base-amber">Size:</span> {metadata.size}
              </div>
            )}
            {metadata.type && (
              <div>
                <span className="text-radix-base-amber">Type:</span> {metadata.type}
              </div>
            )}
            {metadata.modified && (
              <div>
                <span className="text-radix-base-amber">Modified:</span> {metadata.modified}
              </div>
            )}
            {metadata.permissions && (
              <div>
                <span className="text-radix-base-amber">Access:</span> {metadata.permissions}
              </div>
            )}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-5 text-[10px] text-gray-9">
            Hover to view file metadata
          </div>
        </div>
      )}
    </div>
  );
};

export default FileMetadataTooltip;
