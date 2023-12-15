/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  roots: ['./src/__tests__/'],
  verbose: true,
  testEnvironment: 'node',
  testMatch: ["<rootDir>/src/__tests__/**/*.test.ts"],
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  setupFiles: ['<rootDir>/src/__tests__/set-env-vars.ts'],
};