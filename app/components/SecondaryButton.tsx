import NextLink from "next/link";
import React from "react";

interface SecondaryButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  href,
  children,
  className = "",
  target,
  rel,
}) => {
  return (
    <NextLink
      href={href}
      target={target}
      rel={rel}
      className={`inline-flex items-center px-6 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ease-out hover:scale-105 border border-cyan-solid text-cyan-solid hover:bg-cyan-solid hover:text-white active:scale-95 ${className}`}
    >
      {children}
    </NextLink>
  );
};

export default SecondaryButton;
