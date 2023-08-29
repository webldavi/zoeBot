const { SlashCommandBuilder } = require("discord.js");
const rank = require("./rank");
const top = require("./top");
const set = require("./set");
const user = require("./user");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("level")
    .addSubcommand(command => {
      return command
        .setName('rank')
        .setDescription('Mostra seu level e seu xp')
    })
    .addSubcommand(command => {
      return command
        .setName('top')
        .setDescription('Mostra as top 10 pessoas com rank mais alto no servidor')
    })
    .addSubcommand(command => {
      return command
        .setName('set')
        .setDescription('Define o xp e o level de um membro')
        .addUserOption(option => {
          return option
            .setName('membro')
            .setDescription('Membro que será afetado pelo comando')
            .setRequired(true)
        })
        .addNumberOption(option => {
          return option
            .setName('xp')
            .setDescription('Defina o xp!')
            .setRequired(true)
        })
        .addNumberOption(option => {
          return option
            .setName('level')
            .setDescription('Defina o level!')
            .setRequired(true)
        })
    })
    .addSubcommand(command=>{
      return command
        .setName('user')
        .setDescription("Mostra as indormações de level do membro escolhido!")
        .addUserOption(option=>{
          return option
            .setName('membro')
            .setDescription('Membro que você deseja ver as informações')
            .setRequired(true)
        })
    })

    .setDescription("Ações relacionadas aos levels dos membros"),
  execute: (interaction) => {
    const currentCommand = interaction.options.getSubcommand()
    switch (currentCommand) {
      case 'rank':
        rank(interaction)
        break;
      case 'top':
        top(interaction)
        break;
      case 'set':
        set(interaction)
        break;
      case 'user':
        user(interaction)
        break;
    }
  }
}