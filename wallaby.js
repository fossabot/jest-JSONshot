module.exports = function (wallaby) {
  return {
    files: [
      '!**/node_modules/**',
      '!build/**',
      '!**/*.test.ts',
      '!**/*.e2e.ts',
      { pattern: '**/templates/**', instrument: false },
      { pattern: '**/__fixtures__/**', instrument: false },
      { pattern: '**/__snapshots__/**', instrument: false },
      '**/__mocks__/**',
      'src/**/*.ts'
    ],
    tests: [
      '!**/node_modules/**',
      '!**/templates/**',
      'src/**/*.test.ts'
    ],
    filesWithNoCoverageCalculated: [
      '**/__mocks__/**',
      '**/__fixtures__/**'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    compilers: {
      '**/*.ts': wallaby.compilers.babel()
    }
  }
}
