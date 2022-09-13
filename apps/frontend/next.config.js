const path = require("path");
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.API_URL + "/api/:path*",
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
