// jest.config.js
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.css$": ["jest-transform-css", { modules: true }]
  },
  testEnvironment: "jsdom",
};
