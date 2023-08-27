const createServerTable = require('./createServersTable')
const createMemesTable = require('./createMemesTable')

const migrations = [{
  createServerTable,
  createMemesTable
}]

migrations[0][process.argv[2]]()[process.argv[3]]()