/** @type {import('next').NextConfig} */
module.exports = {
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
      // {
      //   source: "/api/test/:icon*/:lol",
      //   destination: "http://localhost:6590/:icon*?folder=:lol",
      // },
      // {
      //   source: "/api/icons/name/:icon*/:folder/:open",
      //   destination: "http://localhost:8080/icons/find/:icon*?folder=:folder&open=:open",
      // },
      {
        source: "/api/icons/folder/:icon*/:open",
        destination: "http://localhost:8080/icons/folder/:icon*?open=:open",
      },
      {
        source: "/api/icons/file/:name/:ext",
        destination: "http://localhost:8080/icons/file?name=:name&ext=:ext",
      }
    ];
  },
};
