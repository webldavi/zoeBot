const ping = require('./ping')
const registerServer = require('./registerServer')
const serverStatus = require('./serverStatus')
const setwelcomechannel = require('./setWelcomeChannel')
const kick = require('./kick')
const ban = require('./ban')
const meme = require("./meme")
const music = require('./music')


module.exports = [
  ping,
  registerServer,
  serverStatus,
  setwelcomechannel,
  kick,
  ban,
  meme,
  music
]