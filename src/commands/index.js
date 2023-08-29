const ping = require('./ping')
const kick = require('./kick')
const ban = require('./ban')
const meme = require("./meme")
const level = require('./level')
const set = require('./set')
const server = require('./server')


module.exports = [
  ping,
  kick,
  ban,
  meme,
  level,
  set,
  server
]