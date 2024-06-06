/** @type {import('next').NextConfig} */

export default {
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Access-Control-Allow-Origin",
          value: `${process.env.ALLOWED_ORIGIN}`,
        },
      ],
    },
  ],
};
