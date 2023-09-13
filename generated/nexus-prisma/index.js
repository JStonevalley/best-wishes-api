const { getPrismaClientDmmf } = require('nexus-prisma/dist-cjs/helpers/prisma')
const { ModuleGenerators } = require('nexus-prisma/dist-cjs/generator/ModuleGenerators/index')
const RuntimeSettings = require('nexus-prisma/dist-cjs/generator/Settings/Runtime/index')

const gentimeSettingsData = {
  "output": {
    "directory": "C:\\Users\\Jonas\\Development\\best-wishes-api\\generated\\nexus-prisma",
    "name": "index"
  },
  "projectIdIntToGraphQL": "Int",
  "jsdocPropagationDefault": "guide",
  "docPropagation": {
    "GraphQLDocs": true,
    "JSDoc": true
  },
  "prismaClientImportId": "@prisma/client"
}
const runtimeSettingsManager = RuntimeSettings.settings

const dmmf = getPrismaClientDmmf({
  // JSON stringify the values to ensure proper escaping
  // Details: https://github.com/prisma/nexus-prisma/issues/143
  // TODO test that fails without this code
  require: () => require("@prisma/client"),
  importId: gentimeSettingsData.prismaClientImportId,
  importIdResolved: require.resolve("@prisma/client")
})

const nexusTypeDefConfigurations = ModuleGenerators.JS.createNexusTypeDefConfigurations(dmmf, {
  gentime: gentimeSettingsData,
  runtime: runtimeSettingsManager,
})

module.exports = {
  $settings: RuntimeSettings.changeSettings,
  ...nexusTypeDefConfigurations,
}