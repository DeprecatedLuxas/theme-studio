/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@theme-studio/ui", "@theme-studio/core"]);

module.exports = withPlugins([withTM], {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.tstudio$/,
      loader: "json-loader",
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/icon/:icon*",
        destination: "http://104.248.169.204:8080/icon/:icon*",
      },
      {
        source: "/api/icons/folder/:icon*/:open",
        destination:
          "http://104.248.169.204:8080/icons/folder/:icon*?open=:open",
      },
      {
        source: "/api/icons/file/:name/:ext",
        destination:
          "http://104.248.169.204:8080/icons/file?name=:name&ext=:ext",
      },
    ];
  },
});
