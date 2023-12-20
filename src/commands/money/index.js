const { SlashCommandBuilder } = require("discord.js");

//===SUBCOMMANDS===
const view = require('./view.js')
const send = require("./send.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("money")
    .setDescription("Degine ou mostra alguma informação relacionada á moeda")
    .addSubcommand(command=>{
        return command
            .setName("view")
            .setDescription("Mostra a quantidade de dinheiro pertecente a sua conta")
    })
    .addSubcommand(command=>{
      return command
          .setName("send")
          .addUserOption(option => {
            return option
              .setName('membro')
              .setDescription('Membro que receberá as moedas')
              .setRequired(true)
          })
          .addNumberOption(option => {
            return option
              .setName('moedas')
              .setDescription('Defina a quantidade de moedas que deseja enviar')
              .setRequired(true)
          })
          .setDescription("Envia uma quantidade de moedas da sua carteira para outro membro")
    }),
  execute: (interaction)=>{
    const command = interaction.options.getSubcommand()
    switch(command){
      case 'view':
        view(interaction);
        break;
      case "send":
        send(interaction);
        break;
    }
  }
}