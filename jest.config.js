module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/lib/**/*.spec.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
};
