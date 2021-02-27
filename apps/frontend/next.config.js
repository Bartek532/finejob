const path = require("path");
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? "https://finejob-backend.herokuapp.com/api/:path*"
            : "http://localhost:3080/api/:path*", // Proxy to Backend
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
