const createServerTable = require('./createServersTable')
const createMemesTable = require('./createMemesTable')
const createUserLevelTable = require('./createUserLevelTable')
const insertMemesUrl = require('./insertMemesUrl')
const createUserMoneyTable = require('./createUserMoneyTable')
const migrations = [{
  createUserMoneyTable,
  insertMemesUrl,
  createServerTable,
  createMemesTable,
  createUserLevelTable
}]

migrations[0][process.argv[2]]()[process.argv[3]]()