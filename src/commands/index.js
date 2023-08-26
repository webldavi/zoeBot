const ping = require('./ping')
const registerServer = require('./registerServer')
const serverStatus = require('./serverStatus')
const setwelcomechannel = require('./setWelcomeChannel')





module.exports = [
  ping,
  registerServer,
  serverStatus,
  setwelcomechannel
]