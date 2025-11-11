import { Box } from "@radix-ui/themes";

interface PostContentProps {
  html: string;
}

const TAG_STYLES = {
  h1: 'text-3xl font-bold mt-8 mb-4 font-semibold',
  h2: 'text-2xl font-bold mt-8 mb-4 font-semibold opacity-90',
  h3: 'text-lg font-semibold mt-6 mb-3 opacity-90',
  h4: 'text-base font-semibold mt-5 mb-2 opacity-90',
  h5: 'text-base font-semibold mt-4 mb-2 opacity-90',
  h6: 'text-sm font-semibold mt-4 mb-2 opacity-90',
  p: 'my-4 leading-relaxed text-sm opacity-80',
  strong: 'font-semibold opacity-95',
  b: 'font-semibold opacity-95',
  em: 'italic opacity-90',
  i: 'italic opacity-90',
  blockquote: 'border-l-4 border-cyan-500 pl-4 py-2 my-6 italic bg-cyan-50 dark:bg-cyan-950/20',
  ul: 'list-disc list-inside my-4 space-y-2',
  ol: 'list-decimal list-inside my-4 space-y-2',
  pre: 'bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-sm overflow-x-auto border border-gray-800 my-6',
  code: 'text-cyan-300 font-mono text-sm',
  figure: 'my-8 text-center',
  figcaption: 'text-sm text-gray-600 dark:text-gray-400 mt-3 italic',
  table: 'w-full border-collapse my-6',
  thead: 'bg-gray-100 dark:bg-gray-800',
  th: 'border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold',
  td: 'border border-gray-300 dark:border-gray-700 px-4 py-2',
  img: 'max-w-full h-auto rounded-sm shadow-sm border border-gray-200 dark:border-gray-800',
  a: 'text-cyan-600 dark:text-cyan-400 underline hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors',
  hr: 'my-8 border-t border-gray-300 dark:border-gray-700',
} as const;

const PostContent: React.FC<PostContentProps> = ({ html }) => {
  let processedHtml = html;

  processedHtml = processedHtml.replace(/<img\s+/g, '<img loading="lazy" decoding="async" ');

  processedHtml = processedHtml.replace(/<img([^>]*?)>/g, (match) => {
    if (match.includes('class="')) {
      return match.replace(/class="([^"]*)"/g, `class="${TAG_STYLES.img} $1"`);
    }
    return match.replace(/>$/, ` class="${TAG_STYLES.img}" />`);
  });

  Object.entries(TAG_STYLES).forEach(([tag, styles]) => {
    if (tag === 'img' || tag === 'figure' || tag === 'figcaption' || tag === 'a') return;

    if (['strong', 'b', 'em', 'i', 'code'].includes(tag)) {
      processedHtml = processedHtml.replace(
        new RegExp(`<${tag}>`, 'g'),
        `<${tag} class="${styles}">`
      );
    } else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
      processedHtml = processedHtml.replace(
        new RegExp(`<${tag}([^>]*)>`, 'g'),
        `<${tag}$1 class="${styles}">`
      );
    } else if (['table', 'thead', 'th', 'td'].includes(tag)) {
      processedHtml = processedHtml.replace(
        new RegExp(`<${tag}>`, 'g'),
        `<${tag} class="${styles}">`
      );
    } else if (tag === 'blockquote') {
      processedHtml = processedHtml.replace(
        new RegExp(`<${tag}>`, 'g'),
        `<${tag} class="${styles}">`
      );
    } else if (['ul', 'ol'].includes(tag)) {
      processedHtml = processedHtml.replace(
        new RegExp(`<${tag}>`, 'g'),
        `<${tag} class="${styles}">`
      );
    } else if (tag === 'pre') {
      processedHtml = processedHtml.replace(
        new RegExp(`<${tag}>`, 'g'),
        `<${tag} class="${styles}">`
      );
    } else if (tag === 'p') {
      processedHtml = processedHtml.replace(
        new RegExp(`<${tag}>`, 'g'),
        `<${tag} class="${styles}">`
      );
    } else if (tag === 'hr') {
      processedHtml = processedHtml.replace(
        new RegExp(`<${tag}\\s*\\/?>`,'g'),
        `<${tag} class="${styles}" />`
      );
    }
  });

  processedHtml = processedHtml.replace(
    /<figure>/g,
    `<figure class="${TAG_STYLES.figure}">`
  );

  processedHtml = processedHtml.replace(
    /<figcaption>/g,
    `<figcaption class="${TAG_STYLES.figcaption}">`
  );

  processedHtml = processedHtml.replace(
    /<a\s+href=(["\']?)([^"\'>\s]+)\1/g,
    `<a href=$1$2$1 class="${TAG_STYLES.a}"`
  );

  return (
    <Box className="max-w-none">
      <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
    </Box>
  );
};

export default PostContent;
