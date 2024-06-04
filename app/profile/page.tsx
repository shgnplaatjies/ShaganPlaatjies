import MainLayout from "@/app/components/layout/main/layout";
import { useUser } from "@clerk/nextjs";
import { Heading, Text } from "@radix-ui/themes";

const BlogPage: React.FC = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <MainLayout>
      <section>
        <Heading as="h1">
          Hello <span className="text-blue-900">{user.firstName}</span>!
        </Heading>
        <Heading as="h2">Profile Page.</Heading>
        <table>
          <thead>
            <tr>
              <th>
                <Text as="label">Field</Text>
              </th>
              <th>
                <Text as="label">Value</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Text as="label">Name:</Text>
              </td>
              <td>
                <Text>{user.fullName}</Text>
              </td>
            </tr>
            {user.primaryEmailAddress && (
              <tr>
                <td>
                  <Text as="label">Email:</Text>
                </td>
                <td>
                  <Text>{user.primaryEmailAddress.emailAddress}</Text>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </MainLayout>
  );
};

export default BlogPage;
