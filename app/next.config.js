const { join } = require("path");

const isDev = process.env.NODE_ENV === "dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: isDev ? undefined : join(process.cwd(), "out"),
};

module.exports = nextConfig;
