const path = require("path");
import { BASIC_API_URL } from "./lib/utils/consts";
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BASIC_API_URL}/api/:path*`, // Proxy to Backend
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["jobs.github.com"],
  },
};
