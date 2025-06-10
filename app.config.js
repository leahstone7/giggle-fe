import "dotenv/config";

export default {
  expo: {
    name: "Giggle",
    slug: "Giggle",
    version: "1.0.0",
    extra: {
      API_KEY: process.env.API_KEY,
    },
    orientation: "portrait",
    icon: "./app/assets/images/giggle-logo.png",
    scheme: "giggle",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./app/assets/images/giggle-logo.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./app/assets/images/giggle-logo.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./app/assets/images/giggle-logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
