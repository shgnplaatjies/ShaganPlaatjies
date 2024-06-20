"use client";
import MainLayout from "@/app/components/layout/Main/layout";
import { useUser } from "@clerk/nextjs";
import { DataList, Text } from "@radix-ui/themes";
import AccentedHeading from "../components/AccentedHeading";

const BlogPage: React.FC = () => {
  const { user } = useUser();

  return (
    <MainLayout>
      <section>
        <AccentedHeading
          textAs="h1"
          size="9"
          preText={`${user ? "Hello" : "Your"} `}
          accentedText={`${user ? user.username : "Profile"}!`}
        />
        <DataList.Root>
          <DataList.Item>
            <DataList.Label>
              <Text as="label">Name:</Text>
            </DataList.Label>
            <DataList.Value>
              <Text>{user ? user.fullName : "Loading..."}</Text>
            </DataList.Value>
          </DataList.Item>
          {user?.primaryEmailAddress && (
            <DataList.Item>
              <DataList.Label>
                <Text as="label">Email:</Text>
              </DataList.Label>
              <DataList.Value>
                <Text>{user.primaryEmailAddress.emailAddress}</Text>
              </DataList.Value>
            </DataList.Item>
          )}
        </DataList.Root>
      </section>
    </MainLayout>
  );
};

export default BlogPage;
