const { pathsToModuleNameMapper } = require("ts-jest");

module.exports = {
  roots: ["<rootDir>/src"],
  testEnviroment :' node',
  transform: {
    '.+\\.ts$' : 'ts-jest'
  },
  pathsToModuleNameMapper: {
    '@/{.*}': '<rootDir>/src/$1'
  }
}