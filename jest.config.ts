import { pathsToModuleNameMapper, type JestConfigWithTsJest } from 'ts-jest';

import tsconfig from './tsconfig.json';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  rootDir: 'src',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  modulePaths: [tsconfig.compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(
    tsconfig.compilerOptions.paths /*, { prefix: '<rootDir>/' } */,
  ),
};

export default config;
