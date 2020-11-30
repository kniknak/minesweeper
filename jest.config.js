process.env.TZ = "UTC";

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: ["<rootDir>/jest/setupTests.ts"],
  collectCoverageFrom: ["**/*.{ts,tsx}", "!**/*.d.{ts,tsx}"],
  moduleNameMapper: {
    "^.+\\.scss$": "identity-obj-proxy",
  },
};
