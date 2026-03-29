import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Load next.config.ts and .env files from project root
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',

  // Extend Jest with @testing-library/jest-dom matchers
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Resolve '@/*' aliases to match tsconfig.json paths
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  // Collect coverage from app source, not test files
  collectCoverageFrom: [
    'features/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/__tests__/**',
    '!**/node_modules/**',
  ],

  // Test file globs — unit + integration
  testMatch: [
    '<rootDir>/__tests__/**/*.test.{ts,tsx}',
  ],
};

// Must be exported this way — next/jest loads Next.js config asynchronously
export default createJestConfig(config);
