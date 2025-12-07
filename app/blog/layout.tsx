import BlogHeader from '@/app/components/blog/BlogHeader';
import BlogFooter from '@/app/components/blog/BlogFooter';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <BlogHeader />
      <div className="flex-grow">
        {children}
      </div>
      <BlogFooter />
    </div>
  );
}
