import { Box } from "@radix-ui/themes";

interface PostContentProps {
  html: string;
}

const PostContent: React.FC<PostContentProps> = ({ html }) => {
  return (
    <Box
      className="prose prose-sm dark:prose-invert max-w-none
        prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
        prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-0
        prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
        prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-cyan-600 dark:prose-a:text-cyan-400 prose-a:underline hover:prose-a:text-cyan-700 dark:hover:prose-a:text-cyan-300
        prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-semibold
        prose-em:text-gray-700 dark:prose-em:text-gray-300 prose-em:italic
        prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:text-red-600 dark:prose-code:text-red-400 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
        prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded prose-pre:overflow-x-auto
        prose-pre:border prose-pre:border-gray-800
        prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
        prose-blockquote:my-4 prose-blockquote:py-0 prose-blockquote:m-0
        prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
        prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:mb-2
        prose-img:rounded prose-img:my-6 prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-800
        prose-table:border-collapse prose-table:w-full prose-table:my-6
        prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold
        prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-700 prose-td:px-4 prose-td:py-2
        prose-hr:my-6 prose-hr:border-gray-200 dark:prose-hr:border-gray-800
      "
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Box>
  );
};

export default PostContent;
