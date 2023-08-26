const createServerTable = require('./createServersTable')
const migrations = {
  createServerTable
}

migrations[process.argv[2]]()[process.argv[3]]()