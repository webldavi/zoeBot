const { SlashCommandBuilder } = require("discord.js");
const rank = require("./rank");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("level")
    .addSubcommand(command=>{
      return command
        .setName('rank')
        .setDescription('Mostra seu level e seu xp')
    })
    .setDescription("Ações relacionadas aos levels dos membros"),

  execute: (interaction)=>{
    const currentCommand = interaction.options.getSubcommand()
    switch(currentCommand){
      case 'rank':
        rank(interaction)
    }
  }
}