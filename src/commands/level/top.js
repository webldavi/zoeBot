const { EmbedBuilder } = require("discord.js")
const db = require("../../database")

module.exports = (interaction) => {
  const query = 'SELECT * FROM tb_users_level WHERE guild_id = ? ORDER BY level DESC'
  db.all(query, [interaction.guild.id], (err, rows) => {
    if(err) return console.error(err)
    const rank = rows.filter((u, index) => index <= 9)
    const fields = rank.map((u, index) => {
      return {
        "id": index,
        "name": `╔${index + 1 == 1 ? '🥇' : index + 1 == 2 ? '🥈' : index + 1 == 3 ? '🥉' : '🎖'} | ${index + 1}°`,
        "value": `╚ » <@${u.user_id}> » **${u.xp_qty}xp** » **level: ${u.level}**`,
        "inline": false
      }
    })
    const embed = new EmbedBuilder()
      .setThumbnail(interaction.guild.iconURL())
      .setAuthor({
        name: `🧮 Top 10 pessoas com rank mais alto no servidor`
      })
      .setColor([235, 52, 110])
      .setFields(fields)
    interaction.reply({ embeds: [embed] })
  })
}