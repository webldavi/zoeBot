const { SlashCommandBuilder } = require("discord.js");
const status = require("./status");
const register = require("./register");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Lida com as informações do servidor")
    .addSubcommand(command => command
      .setName('status')
      .setDescription("Visualiza informações do servidor")
    )
    .addSubcommand(command => command
      .setName('register')
      .setDescription('Registra o servidor no banco de dados')
    )
  ,
  execute: (interaction) => {
    const command = interaction.options.getSubcommand()
    switch (command) {
      case 'status':
        status(interaction)
        break;
      case 'register':
        register(interaction)
        break;
    }
  }
}