const { Client, Events, GatewayIntentBits } = require("discord.js")
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
const messageCreate = require('./src/Events/messageCreate')
const guildMemberRemove = require('./src/Events/guildMemberRemove')


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
//Events
client.on("guildMemberAdd", member => guildMemberAdd(member, client, db).welcomeMessage())
client.on("messageCreate", msg => messageCreate().levelSys(msg))
client.on("guildMemberRemove", member=> guildMemberRemove().levelSys(member))


client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

//Execute command by interaction
client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.channel) {
    const getCommand = commands.find(command => command.data.name == interaction.commandName)
    if (getCommand) {
      getCommand.execute(interaction, client)
    }
  } else {
    interaction.reply('💁‍♀️ Eu não sou compatível com mensagens privadas!')
  }
})

client.login(config.token)

module.exports = {
  client
}