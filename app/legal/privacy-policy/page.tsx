import { DataList, Grid, Heading, Text } from "@radix-ui/themes";

export default async () => {
  const policies = [
    { title: "policy #1", content: "This is a formal policy." },
  ];

  return (
    <article>
      <Heading as="h1">Privacy Policy</Heading>
      <DataList.Root>
        {policies.map(({ content, title }) => (
          <DataList.Item key={title}>
            <DataList.Label>{title}</DataList.Label>
            <DataList.Value>
              <Grid columns={{ sm: "1", md: "2" }}>
                <Text as="p">{content}</Text>
              </Grid>
            </DataList.Value>
          </DataList.Item>
        ))}
      </DataList.Root>
    </article>
  );
};
