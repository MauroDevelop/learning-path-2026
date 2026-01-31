/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm', // Usar preset para ESM
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // para que Jest entienda las extensiones .js
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true, // Activar modo ESM en ts-jest
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
};