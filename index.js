const { Player } = require("discord-player")

const { Client, Events, GatewayIntentBits, EmbedBuilder } = require("discord.js")
const { REST, Routes } = require('discord.js')
const config = require('./src/config')
const db = require("./src/database")

//Require Commands Functions
const commands = require('./src/commands')
const getCommandsData = commands.map(command => {
  return command.data
})

//Require Event Functions
const guildMemberAdd = require("./src/Events/guildMemberAdd")
const { Manager } = require("erela.js")

//Regiter of commands
const rest = new REST({ version: '10' }).setToken(config.token);
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(config.app_id), { body: getCommandsData });
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})()

//Set new client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ]
})

// Add the player on the client
client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25
  }
})

//Events
client.on("guildMemberAdd", (member) => guildMemberAdd(member, client, db).welcomeMessage())



//Client events end


//Music manager
const nodes = [{
  host: 'lavalink.lexnet.cc',
  password: "lexn3tl@val!nk",
  port: 443,
  secure: true
}]


client.manager = new Manager({
  // The nodes to connect to, optional if using default lavalink options
  nodes,
  // Method to send voice data to Discord
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    // NOTE: FOR ERIS YOU NEED JSON.stringify() THE PAYLOAD
    if (guild) guild.shard.send(payload);
  }
});

// Emitted whenever a node connects
client.manager.on("nodeConnect", node => {
  console.log(`Node "${node.options.identifier}" connected.`)
})

// Emitted whenever a node encountered an error
client.manager.on("nodeError", (node, error) => {
  console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`)
})

// Listen for when the client becomes ready
client.once("ready", () => {
  // Initiates the manager and connects to all the nodes
  client.manager.init(client.user.id);
  console.log(`Logged in as ${client.user.tag}`);
});

// THIS IS REQUIRED. Send raw events to Erela.js
client.on("raw", d => client.manager.updateVoiceState(d));


//Execute command by interaction
client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const getCommand = commands.find(command => command.data.name == interaction.commandName)
  if (getCommand) {
    getCommand.execute(interaction, client)
  }
})


client.login(config.token)

module.exports = {
  client
}