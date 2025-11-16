import { Box } from "@radix-ui/themes";

interface PostContentProps {
  html: string;
}

const PostContent: React.FC<PostContentProps> = ({ html }) => {
  const htmlStyles = {
    h1: {
      open: '<h1 class="text-3xl font-bold mt-8 mb-4 font-semibold">',
      close: "</h1>",
    },
    h2: {
      open: '<h2 class="text-2xl font-bold mt-8 mb-4 font-semibold opacity-90">',
      close: "</h2>",
    },
    h3: {
      open: '<h3 class="text-lg font-semibold mt-6 mb-3 opacity-90">',
      close: "</h3>",
    },
    h4: {
      open: '<h4 class="text-base font-semibold mt-5 mb-2 opacity-90">',
      close: "</h4>",
    },
    h5: {
      open: '<h5 class="text-base font-semibold mt-4 mb-2 opacity-90">',
      close: "</h5>",
    },
    h6: {
      open: '<h6 class="text-sm font-semibold mt-4 mb-2 opacity-90">',
      close: "</h6>",
    },
    p: {
      open: '<p class="my-4 leading-relaxed text-sm opacity-80">',
      close: "</p>",
    },
    strong: {
      open: '<strong class="font-semibold opacity-95">',
      close: "</strong>",
    },
    em: { open: '<em class="italic opacity-90">', close: "</em>" },
    blockquote: {
      open: '<blockquote class="border-l-4 border-cyan-solid pl-4 py-2 my-6 italic bg-cyan-bg dark:bg-cyan-text-contrast/20">',
      close: "</blockquote>",
    },
    ul: {
      open: '<ul class="list-disc list-inside my-4 space-y-2">',
      close: "</ul>",
    },
    ol: {
      open: '<ol class="list-decimal list-inside my-4 space-y-2">',
      close: "</ol>",
    },
    pre: {
      open: '<pre class="bg-gray-text dark:bg-gray-text-contrast text-gray-bg p-4 rounded-sm overflow-x-auto border border-gray-border-active my-6">',
      close: "</pre>",
    },
    code: {
      open: '<code class="text-cyan-solid font-mono text-sm">',
      close: "</code>",
    },
    figure: { open: '<figure class="my-8 text-center">', close: "</figure>" },
    figcaption: {
      open: '<figcaption class="text-sm text-gray-solid dark:text-gray-border-hover mt-3 italic">',
      close: "</figcaption>",
    },
    table: {
      open: '<table class="w-full border-collapse my-6">',
      close: "</table>",
    },
    thead: {
      open: '<thead class="bg-gray-bg-secondary dark:bg-gray-solid-hover">',
      close: "</thead>",
    },
    th: {
      open: '<th class="border border-gray-border dark:border-gray-border-active px-4 py-2 text-left font-semibold">',
      close: "</th>",
    },
    td: {
      open: '<td class="border border-gray-border dark:border-gray-border-active px-4 py-2">',
      close: "</td>",
    },
    img: {
      class:
        "max-w-full h-auto rounded-sm shadow-sm border border-gray-border-subtle dark:border-gray-solid-hover",
    },
    a: {
      class:
        "text-cyan-text dark:text-cyan-solid underline hover:text-cyan-text-contrast dark:hover:text-cyan-solid-hover transition-colors",
    },
    hr: {
      self: '<hr class="my-8 border-t border-gray-border dark:border-gray-border-active" />',
    },
  };

  type SimpleHtmlTags = "img" | "a" | "hr";

  const htmlRegex = {
    img: /<img([^>]*?)>/g,
    h: /<(h[1-6])([^>]*)>/g,
    p: /<p>/g,
    strong: /<(strong|b)>/g,
    em: /<(em|i)>/g,
    blockquote: /<blockquote>/g,
    list: /<(ul|ol)>/g,
    pre: /<pre>/g,
    code: /<code>/g,
    figure: /<figure>/g,
    figcaption: /<figcaption>/g,
    table: /<table>/g,
    thead: /<thead>/g,
    th: /<th>/g,
    td: /<td>/g,
    link: /<a\s+href=(["\']?)([^"\'>\s]+)\1/g,
    hr: /<hr\s*\/?>/g,
  };

  const processedHtml = html
    .replace(/<img\s+/g, '<img loading="lazy" decoding="async" ')
    .replace(htmlRegex.img, (match) => {
      if (match.includes('class="')) {
        return match.replace(
          /class="([^"]*)"/g,
          `class="${htmlStyles.img.class} $1"`
        );
      }
      return match.replace(/>$/, ` class="${htmlStyles.img.class}" />`);
    })
    .replace(
      htmlRegex.h,
      (_, tag) =>
        htmlStyles[tag as Exclude<keyof typeof htmlStyles, SimpleHtmlTags>].open
    )
    .replace(htmlRegex.p, htmlStyles.p.open)
    .replace(htmlRegex.strong, htmlStyles.strong.open)
    .replace(htmlRegex.em, htmlStyles.em.open)
    .replace(htmlRegex.blockquote, htmlStyles.blockquote.open)
    .replace(
      htmlRegex.list,
      (_, tag) =>
        htmlStyles[tag as Exclude<keyof typeof htmlStyles, SimpleHtmlTags>].open
    )
    .replace(htmlRegex.pre, htmlStyles.pre.open)
    .replace(htmlRegex.code, htmlStyles.code.open)
    .replace(htmlRegex.figure, htmlStyles.figure.open)
    .replace(htmlRegex.figcaption, htmlStyles.figcaption.open)
    .replace(htmlRegex.table, htmlStyles.table.open)
    .replace(htmlRegex.thead, htmlStyles.thead.open)
    .replace(htmlRegex.th, htmlStyles.th.open)
    .replace(htmlRegex.td, htmlStyles.td.open)
    .replace(htmlRegex.link, (match) =>
      match.replace(">", ` class="${htmlStyles.a.class}">"`)
    )
    .replace(htmlRegex.hr, htmlStyles.hr.self);

  return (
    <Box className="max-w-none">
      <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
    </Box>
  );
};

export default PostContent;
