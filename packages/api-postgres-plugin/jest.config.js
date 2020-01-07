module.exports = {
  // All our tests and mocks are in the src dir
  // This prevents jest from finding manual mocks in the submodules
  // If there is a need for other dirs to be searched (e.g. a __mocks__
  // dir adjacent to node_modules for manually mocking modules) then
  // add it explicitly here.
  rootDir: '../..',
  roots: ['<rootDir>'],
  coverageReporters: ['json-summary', 'text', 'lcov', 'clover'],
  moduleFileExtensions: ['js'],
  testRegex: '(/.*(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  collectCoverageFrom: ['<rootDir>/packages/api-postgres-plugin/api/**/*.js'],
  reporters: ['default'],
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  globalSetup: '<rootDir>/node_modules/@databases/pg-test/jest/globalSetup.js',
  globalTeardown:
    '<rootDir>/node_modules/@databases/pg-test/jest/globalTeardown.js'
};
