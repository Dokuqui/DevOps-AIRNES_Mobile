module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-redux|react-native-gesture-handler|@react-native-async-storage/async-storage)",
  ],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  moduleNameMapper: {
    "@react-native-async-storage/async-storage":
      "<rootDir>/__mocks__/mock-async-storage.js",
  },
};
