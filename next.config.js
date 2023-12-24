/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
  reactStrictMode: true,
  compiler: {
    relay: {
      // ...
      // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
      src: "./src/components",
      schema: "./schema.graphql",
      language: "javascript",
      excludes: [
        "**/node_modules/**",
        "**/__mocks__/**",
        "**/__generated__/**",
      ],
    },
  },
  async rewrites() {
    return [
      { source: "/api/:path*", destination: "http://localhost:9081/:path*" },
      { source: "/user/:path*", destination: "http://localhost:9081/:path*" },
      { source: "/provider/:path*", destination: "/:path*" },
    ];
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
