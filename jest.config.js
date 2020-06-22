module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: ["<rootDir>/lib/**/*.ts"],
  testMatch: ["<rootDir>/lib/**/*.spec.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
};
