"use client";
import MainLayout from "@/app/components/layout/Main/layout";
import { useUser } from "@clerk/nextjs";
import { Heading, Table, Text } from "@radix-ui/themes";

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
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>
                <Text as="label">Field</Text>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                <Text as="label">Value</Text>
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell>
                <Text as="label">Name:</Text>
              </Table.RowHeaderCell>
              <Table.Cell>
                <Text>{user ? user.fullName : "Loading..."}</Text>
              </Table.Cell>
            </Table.Row>
            {user?.primaryEmailAddress && (
              <Table.Row>
                <Table.RowHeaderCell>
                  <Text as="label">Email:</Text>
                </Table.RowHeaderCell>
                <Table.Cell>
                  <Text>{user.primaryEmailAddress.emailAddress}</Text>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </section>
    </MainLayout>
  );
};

export default BlogPage;
