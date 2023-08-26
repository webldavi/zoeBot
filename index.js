const { Client, Events, GatewayIntentBits, EmbedBuilder } = require("discord.js")
const { REST, Routes } = require('discord.js')
const config = require('./src/config')

const commands = require('./src/commands')
const db = require("./src/database")
const getCommandsData = commands.map(command => {
  return command.data
})


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


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
})


client.on("guildMemberAdd", (member) => {
  db.get('SELECT * from tb_servers WHERE server_id = ?', [member.guild.id], (err, row) => {
    if (row && row.welcome_channel) {
      const embed = new EmbedBuilder()
        .setTitle(`bem vindo(a) á ${member.guild.name}`)
        .setThumbnail(member.avatarURL())
        .setDescription(`👋・Olá <@${member.id}>
      ✨・Seja bem vindo(a) á ${member.guild.name}!
      🧮・Você é o  ${member.guild.memberCount}° membro do servidor! `)
      
    }
  })
})


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