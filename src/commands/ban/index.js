const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bane o membro do servidor")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)
    .addUserOption(option =>
      option
        .setName("membro")
        .setDescription("Membro a ser banido")
        .setRequired(true)
    )
    .addStringOption(option => (
      option
        .setName("motivo")
        .setDescription("Descreva o motivo do banimento")
        .setRequired(false)
    )),

  execute: (interaction) => {
    if (interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      interaction.guild.members.ban(interaction.options.getUser('membro').id, {
        reason: interaction.options.getUser('motivo'),
        deleteMessageSeconds: 3600
      })
      interaction.reply({ content: "Membro expulso com sucesso!", ephemeral: true })
    } else {
      return interaction.reply('Você não tem permissão para realizar essa ação')
    }
  }
}