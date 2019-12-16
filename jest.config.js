module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '/__tests__/.*\\.test.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFiles: ['<rootDir>/__tests__/setupTests.ts'],
    collectCoverage: false,
    collectCoverageFrom: []
};
