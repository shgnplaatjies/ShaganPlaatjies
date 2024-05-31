import { Grid, Heading, Link, Text } from "@radix-ui/themes";
import Image from "next/image";

export default function Home() {
  return (
    <Grid className="flex min-h-screen flex-col items-center justify-center gap-16 p-24">
      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />

      <Link
        href="#"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Heading as="h1" className="mb-3 text-2xl font-semibold">
          Deploy{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </Heading>
        <Text
          as="p"
          className="m-0 max-w-[30ch] text-balance text-sm opacity-50"
        >
          Instantly deploy your Next.js site to a shareable URL with Vercel.
        </Text>
      </Link>
    </Grid>
  );
}
