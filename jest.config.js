module.exports = {
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  globals: {
    "ts-jest": {
      useBabelrc: true,
    },
  },
  mapCoverage: true,
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.(j|t)s?(x)", "**/?(*.)(spec|test).(j|t)s?(x)"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFiles: ["jest-plugin-fs/setup"],
};
