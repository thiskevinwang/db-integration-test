export default {
  preset: "ts-jest",
  clearMocks: true,
  coverageProvider: "v8",
  modulePathIgnorePatterns: ["<rootDir>/dist/", "__fixtures__"],
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
