import Link from "next/link";
import React from "react";

type CTAButtonProps =
  | { href: string; text?: string; Icon: React.ReactElement }
  | { href: string; text: string; Icon?: React.ReactElement };

const CTAButton: React.FC<CTAButtonProps> = ({ href, text, Icon }) => {
  return (
    <Link href={href}>
      <button type="button">{Icon ? Icon && <>{Icon}</> : text}</button>
    </Link>
  );
};
export default CTAButton;
