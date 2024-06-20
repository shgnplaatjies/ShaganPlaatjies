import { Flex, IconProps, Link } from "@radix-ui/themes";
import NextLink from "next/link";
import React from "react";

type SocialIconProps = {
  href: string;
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
};

type IconsListProps = { icons: SocialIconProps[] };

const IconsList: React.FC<IconsListProps> = ({ icons }) => {
  return (
    <Flex gap="2">
      {icons.map(({ Icon, label, href }) => (
        <Link key={label} content="center" asChild>
          <NextLink href={href}>
            <Icon width="1.25rem" height="1.25rem" />
          </NextLink>
        </Link>
      ))}
    </Flex>
  );
};

export default IconsList;
