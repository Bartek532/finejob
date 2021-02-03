module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3080/api/:path*" // Proxy to Backend
      }
    ];
  }
};
