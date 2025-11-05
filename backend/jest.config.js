/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src/tests'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '!**/*.test.ts',
    '!**/index.ts'
  ],
  verbose: true,
};
