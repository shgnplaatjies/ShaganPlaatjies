import { DotFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import IconList from "./SocialIcons";

type FooterProps = {
  className: string;
};

const Footer: React.FC<FooterProps> = ({ className = "" }: FooterProps) => {
  return (
    <footer className={className}>
      <div className="flex w-full place-items-center justify-between">
        <Link href="/contact">
          <DotFilledIcon color="green" width="1.25rem" height="1.25rem" />
        </Link>

        <IconList />
      </div>
    </footer>
  );
};
export default Footer;
