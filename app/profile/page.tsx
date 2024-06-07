"use client";
import MainLayout from "@/app/components/layout/Main/layout";
import { useUser } from "@clerk/nextjs";
import { DataList, Heading, Text } from "@radix-ui/themes";

const BlogPage: React.FC = () => {
  const { user } = useUser();

  return (
    <MainLayout>
      <section>
        <Heading as="h1">
          {user ? (
            <>
              Hello <span className="text-blue-900">{user.username}</span>!
            </>
          ) : (
            <>
              Loading <span className="text-blue-900">your profile</span>.
            </>
          )}
        </Heading>
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
