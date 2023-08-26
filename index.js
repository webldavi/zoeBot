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
  ]
})


//Events
client.on("guildMemberAdd", (member) => guildMemberAdd(member, client, db).welcomeMessage())






//Execute command by interaction
client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const getCommand = commands.find(command => command.data.name == interaction.commandName)
  if (getCommand) {
    getCommand.execute(interaction)
  }
})


client.once(Events.ClientReady, () => {
  console.log("Client is running! " + client.user.tag)
})
client.login(config.token)