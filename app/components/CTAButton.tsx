import { Button, Link } from "@radix-ui/themes";
import React from "react";

type CTAButtonProps = {
  href: string;
  text?: string;
  Icon?: React.ReactElement;
};

const CTAButton: React.FC<CTAButtonProps> = ({ href, text, Icon }) => {
  return (
    <Link href={href} asChild>
      <Button
        className="my-4 px-8 py-3 font-semibold rounded-md transition-all duration-200 ease-out hover:scale-105 hover:shadow-lg active:scale-95 bg-cyan-solid text-white hover:bg-cyan-solid-hover flex items-center gap-2"
        type="button"
      >
        {Icon && Icon}
        {text && text}
      </Button>
    </Link>
  );
};
export default CTAButton;
