import path from 'path'
const pasonPower = path.resolve(__dirname, '..', 'pason-power')
process.chdir(pasonPower)
import generate from 'babel-generator'
import genProgram from "./src/genProgram"

const PlannedSite = require(path.join(pasonPower, 'src', 'server', 'collections', 'PlannedSites')).PlannedSiteModel
const PlannedSiteConfig = require(path.join(pasonPower, 'src', 'server', 'collections', 'PlannedSiteConfigs')).PlannedSiteConfigModel

let ast
ast = genProgram(PlannedSite)
console.log(generate(ast).code)

ast = genProgram(PlannedSiteConfig)
console.log(generate(ast).code)
