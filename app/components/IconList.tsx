import Link from "next/link";
import React from "react";

type IconProps = { icon: React.ReactElement; href: string; label: string };

type IconListProps = { icons: IconProps[] };

const IconList: React.FC<IconListProps> = ({ icons }) => {
  return (
    <ul>
      {icons.map(({ icon, label, href }) => (
        <li key={href}>
          <Link href={href}>
            {React.cloneElement(icon, { "aria-label": label })}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default IconList;
