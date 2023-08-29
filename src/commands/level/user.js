const { EmbedBuilder } = require('@discordjs/builders')
const db = require('../../database')
module.exports = (interaction) => { 
  const query = "SELECT * FROM tb_users_level WHERE user_id = ? AND guild_id = ?"
  const user = interaction.options.getUser('membro')

  db.get(query, [user.id, interaction.guild.id], (err, row) => {
    if (err) return console.error(err)
    if (row != undefined) {
      db.all('SELECT * FROM tb_users_level WHERE guild_id = ? ORDER BY level DESC', [interaction.guild.id], (rankErr, rows) => {
        if (rankErr) return console.error(rankErr)
        const currentPosition = rows.findIndex(u=>u.id = user.id) + 1
        const embed = new EmbedBuilder()
          .setAuthor({
            name: interaction.guild.name,
            iconURL: interaction.guild.iconURL()
          })
          .setThumbnail(user.avatarURL())
         
          .setTitle(user.tag)
          .setColor([235, 52, 110])
          .setFields([
            {
              "id": 360187099,
              "name": "🏅 | Rank no servidor",
              "value": `${user.tag} está na ${currentPosition}° posição no rank do servidor`,
              "inline": false
            },
            {
              "id": 739003312,
              "name": "🧮 | XP",
              "value": `${user.tag} tem ${row.xp_qty}/${row.level * 10} de xp para o proximo level`,
              "inline": false
            },
            {
              "id": 262526230,
              "name": "🏆 | Level",
              "value":`${user.tag} está no level ${row.level}`,
              "inline": false
            }
          ])
          interaction.reply({embeds: [embed], ephemeral: true})
      })
    } else {
      interaction.reply({content: "😕 Este membro ainda não ganhou xp neste servidor!", ephemeral: true})
    }

  })
}