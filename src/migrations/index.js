const createServerTable = require('./createServersTable')
const createMemesTable = require('./createMemesTable')
const createUserLevelTable = require('./createUserLevelTable')

const migrations = [{
  createServerTable,
  createMemesTable,
  createUserLevelTable
}]

migrations[0][process.argv[2]]()[process.argv[3]]()