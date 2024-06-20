import AccentedHeading from "@/app/components/AccentedHeading";
import { DataList, Grid, Text } from "@radix-ui/themes";

export default async () => {
  const terms = [{ title: "policy #1", content: "This is a formal policy." }];

  return (
    <article>
      <AccentedHeading
        textAs="h1"
        size="9"
        preText="Terms "
        accentedText="of "
        postText="Service."
      />
      <DataList.Root>
        {terms.map(({ content, title }) => (
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
