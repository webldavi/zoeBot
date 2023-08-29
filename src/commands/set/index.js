const { SlashCommandBuilder, ChannelType } = require("discord.js");
const welcome = require("./welcome");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set")
    .setDescription("Define configurações relacionadas ao servidor")
    .addSubcommand(command=>{
      return command
        .setName('welcome')
        .setDescription("Define o canal das mensagens de boas vindas")
        .addChannelOption(option=>{
          return option
            .setName("canal")
            .setDescription("Escolha o canal!")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        })
    })
  ,
  execute: (interaction)=>{
    const command = interaction.options.getSubcommand()
    switch(command){
      case 'welcome':
        welcome(interaction)
    }
  }
}