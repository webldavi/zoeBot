const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Expulsa um membro do servidor")
    .addUserOption(option=>
      option
        .setName("membro")
        .setDescription("Membro a ser expulso")
        .setRequired(true)
    )
    .addStringOption(option=>(
      option
        .setName("motivo")
        .setDescription("Descreva o motivo da expulsão")
        .setRequired(false)
    )),
    
  execute: (interaction)=>{
    if (interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      interaction.guild.members.kick(interaction.options.getUser('membro').id, interaction.options.getString('motivo'))
      interaction.reply("Membro expulso com sucesso!")
    }else{
      return interaction.reply('Você não tem permissão para realizar essa ação')
    }
  }
}