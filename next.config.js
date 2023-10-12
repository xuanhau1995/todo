/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "modules/variables.module.scss";`,
  },
};

module.exports = nextConfig;
