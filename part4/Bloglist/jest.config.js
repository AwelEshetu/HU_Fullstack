module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv:  [
      "<rootDir>/jest.setup.js"
    ]  // for overriding default async timeout ( 5000m)
}