/** @type {import('next').NextConfig} */

import cnad from "@bitc/cnad";
import { config } from "dotenv";

config({
  path: () => {
    switch (process.env.NODE_ENV) {
      case "production":
        return ".env.production";
      case "staging":
        return ".env.staging";
      case "local":
        return ".env.local";
      default:
        throw new Error(
          "NODE_ENV must be set to 'staging', 'production', or 'local'"
        );
    }
  },
});

const nextConfig = {};

cnad.config(process.env.NODE_DIR);
cnad.watch([process.env.RESTART_FILE_PATH]);
cnad.start();

export default nextConfig;
