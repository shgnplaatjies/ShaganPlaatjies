import { Flex, Text } from "@radix-ui/themes";
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
      <Flex
        key={item}
        className="bg-gray-bg-2 bg-opacity-40 backdrop-blur-xl border rounded-full py-1 px-2 border-gray-border-1"
      >
        <Text className="opacity-60" size="1">
          {item}
        </Text>
      </Flex>
    ))}
  </Flex>
);

export default TaxonomyList;
