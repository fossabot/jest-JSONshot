const {modulePathIgnorePatterns, testMatch} = require('./jest.common')
const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  testMatch,
  modulePathIgnorePatterns,
  reporters: ['default', 'jest-junit'],
  collectCoverage: true
}