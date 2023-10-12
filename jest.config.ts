import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>', '<rootDir>/src/', '<rootDir>/libs/'],
  moduleNameMapper: {
    '^@app/bcrypt-config(|/.*)$': '<rootDir>/libs/bcrypt-config/src/$1',
  },
  modulePaths: ['<rootDir>'],
};

export default config;
