const ping = require('./ping')
const registerServer = require('./registerServer')
const serverStatus = require('./serverStatus')
const setwelcomechannel = require('./setWelcomeChannel')
const kick = require('./kick')




module.exports = [
  ping,
  registerServer,
  serverStatus,
  setwelcomechannel,
  kick
]