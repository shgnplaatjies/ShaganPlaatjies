import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

type CTAButtonProps =
  | { href: string; text?: string; Icon: React.ReactElement }
  | { href: string; text: string; Icon?: React.ReactElement };

const CTAButton: React.FC<CTAButtonProps> = ({ href, text, Icon }) => {
  return (
    <Link href={href}>
      <Button type="button">{Icon ? Icon && <>{Icon}</> : text}</Button>
    </Link>
  );
};
export default CTAButton;
