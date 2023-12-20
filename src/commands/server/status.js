const { EmbedBuilder } = require("discord.js")
const db = require("../../database")

module.exports = (interaction) => {
  db.get(`SELECT * FROM tb_servers WHERE server_id = ?`, [interaction.guild.id], async (err, row) => {
    if (row == undefined) return interaction.reply('Este servidor ainda não foi registrado, use `/register server` para registrar')

    const createdAt = new Date(interaction.guild.createdTimestamp)

    const embed = new EmbedBuilder()
      .setTitle(interaction.guild.name)
      .setAuthor({
        iconURL: interaction.user.avatarURL(),
        name: interaction.user.tag
      })
      .setThumbnail(interaction.guild.iconURL())
      .setColor("#eb346e")
      .setFields([
        {
          "name": "📊 | Quantidade de membros",
          "value": `⥤ | ${interaction.guild.memberCount}`,
          "inline": false
        },
        {
          "name": "👑 | Proprietário",
          "value": `⥤ | <@${interaction.guild.ownerId}>`,
          "inline": false
        },
        {
          "name": "📅 | Data de criação",
          "value": `⥤ | ${createdAt.getDay()}/${createdAt.getMonth()}/${createdAt.getFullYear()}`,
          "inline": false
        },
        {
          "name": "😴 | Canal AFK",
          "value": (interaction.guild.afkChannel != null) ? `⥤ | <#${interaction.guild.afkChannel.id}>` : '⥤ | Sem canal',
          "inline": false
        },
        {
          "name": "📜 | Canal de regras",
          "value": (interaction.guild.rulesChannel != null) ? `⥤ | <#${interaction.guild.rulesChannel.id}>` : '⥤ | Sem canal',
          "inline": false
        },
        {
          "name": "🎫 | Link de convite",
          "value": `⥤ | ${await interaction.guild.invites.create(interaction.channel.id)}`,
          "inline": true
        }
      ])
    interaction.reply({ embeds: [embed], ephemeral: true})
  })
}