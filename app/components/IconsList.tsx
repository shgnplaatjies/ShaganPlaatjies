"use client";
import { Flex, IconProps, Link } from "@radix-ui/themes";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export type SocialIconProps = {
  href: string;
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
};

export type IconsListProps = { icons: SocialIconProps[] };

const IconsList: React.FC<IconsListProps> = ({ icons }) => {
  const pathName = usePathname();
  return (
    <Flex gap="4" align="center">
      {icons.map(({ Icon, label, href }) => (
        <Link
          key={label}
          content="center"
          color={pathName !== href ? "gray" : undefined}
          asChild
        >
          <NextLink href={href}>
            <Icon width="1rem" height="1rem" />
          </NextLink>
        </Link>
      ))}
    </Flex>
  );
};

export default IconsList;
