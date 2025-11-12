module.exports = {
  // Use jsdom for React testing
  testEnvironment: 'jsdom',

  // Match both .test.js and .test.jsx files
  testMatch: [
    "**/tests/unit/**/*.test.jsx",
    "**/tests/integration/**/*.test.jsx",
    "**/tests/unit/**/*.test.js",
    "**/tests/integration/**/*.test.js"
  ],

  // Verbose output
  verbose: true,

  // Collect coverage
  collectCoverage: true,
  coverageDirectory: 'coverage',

  // Transform JSX and JS using babel-jest
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },

  // Make Jest transpile ESM packages like axios
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)"
  ],

  // Setup Testing Library matchers
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],

  moduleFileExtensions: ["js", "jsx", "json", "node"]
};
