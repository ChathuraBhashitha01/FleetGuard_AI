/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/app.js',
    '!**/node_modules/**',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches:   60,
      functions:  80,
      lines:      80,
      statements: 80,
    },
    './src/middleware/auth.js': {
      lines: 100,
      functions: 100,
    },
  },
  testMatch: ['**/__tests__/**/*.test.js', '**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testTimeout: 30000,
  verbose: true,
};

