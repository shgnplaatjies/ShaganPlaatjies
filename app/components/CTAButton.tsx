import { Button, Link } from "@radix-ui/themes";
import React from "react";

type CTAButtonProps =
  | { href: string; text?: string; Icon: React.ReactElement }
  | { href: string; text: string; Icon?: React.ReactElement };

const CTAButton: React.FC<CTAButtonProps> = ({ href, text, Icon }) => {
  return (
    <Link href={href} asChild>
      <Button className="m-2" type="button">
        {Icon ? Icon && <>{Icon}</> : text}
      </Button>
    </Link>
  );
};
export default CTAButton;
