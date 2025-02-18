import { Badge, Flex } from "@radix-ui/themes";
import React from "react";

export type TaxonomyProps = {
  taxonomies: string[];
  className?: string;
};

const TaxonomyList: React.FC<TaxonomyProps> = ({
  taxonomies,
  className = "",
}) => (
  <Flex wrap="wrap" gap="2" className={className}>
    {taxonomies?.map((item) => (
      <Flex key={item}>
        <Badge variant="surface" className="opacity-75">
          {item}
        </Badge>
      </Flex>
    ))}
  </Flex>
);

export default TaxonomyList;
