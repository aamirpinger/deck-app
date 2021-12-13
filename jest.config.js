module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  testTimeout: 20000,
  globalTeardown: '<rootDir>/tests/globalTeardown.ts',
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
};
