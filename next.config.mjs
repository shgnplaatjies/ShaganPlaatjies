/** @type {import('next').NextConfig} */

import cnad from "@bitc/cnad";

const nextConfig = {};

cnad.config(process.env.NODE_PATH_PROD);
cnad.watch([process.env.RESTART_FILE_PATH]);
cnad.start();

export default nextConfig;
