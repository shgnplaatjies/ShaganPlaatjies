/** @type {import('next').NextConfig} */

import cnad from "@bitc/cnad";
import { config } from "dotenv";

config({
  path: () => {
    switch (process.env.NODE_ENV) {
      case "prod":
        return ".env.prod";
      case "stg":
        return ".env.stg";
      case "local":
        return ".env.local";
      default:
        throw new Error("NODE_ENV must be set to 'dev', 'prod', or 'local'");
    }
  },
});

const nextConfig = {};

cnad.config(process.env.APP_ROOT_DIR);
cnad.watch([process.env.RESTART_FILE_PATH]);
cnad.start();

export default nextConfig;
