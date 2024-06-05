/** @type {import('next').NextConfig} */

export default {
  headers: async () => [
    {
      source: "/api/:path*",
      headers: [
        {
          key: "Access-Control-Allow-Origin",
          value: process.env.ALLOWED_ORIGIN,
        },
        {
          key: "Access-Control-Allow-Methods",
          value: process.env.ALLOWED_METHODS,
        },
        {
          key: "Access-Control-Allow-Headers",
          value: process.env.ALLOWED_HEADERS,
        },
        {
          key: "Access-Control-Allow-Exposed-Headers",
          value: process.env.EXPOSED_HEADERS,
        },
        { key: "Access-Control-Allow-Max-Age>", value: process.env.MAX_AGE },
        {
          key: "Access-Control-Allow-Credentials",
          value: process.env.CREDENTIALS === "true" ? "true" : "false",
        },
      ],
    },
  ],
};
