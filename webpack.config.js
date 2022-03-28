// const createExpoWebpackConfigAsync = require('@expo/webpack-config');

// module.exports = async function (env, argv) {
//   const config = await createExpoWebpackConfigAsync(env, argv);
//   // Customize the config before returning it.
//   return config;
// };

const { createWebpackConfigAsync } = require("expo-yarn-workspaces/webpack");
const path = require("path");

module.exports = async function (env, argv) {
  const config = await createWebpackConfigAsync(env, argv);

  config.module.rules.forEach((r) => {
    if (r.oneOf) {
      r.oneOf.forEach((o) => {
        if (o.use && o.use.loader && o.use.loader.includes("babel-loader")) {
          o.include = [
            path.resolve("."),
            path.resolve("node_modules/@ui-kitten/components"),
          ];
        }
      });
    }
  });

  return config;

  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        // This would match ui-kitten
        {
          test: /@?(ui-kitten|eva-design).*\.(ts|js)x?$/,
          loader: "babel-loader"
        }
      ]
    },
    resolve: {
      ...config.resolve,
      extensions: [
        ...config.resolve.extensions,
        ".component.js",
        ".components.js"
      ]
    },
  };
};
