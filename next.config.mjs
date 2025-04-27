/** @type {import('next').NextConfig} */

export default {
  headers: async () =>
    await [
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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.WP_DOMAIN}`,
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};
