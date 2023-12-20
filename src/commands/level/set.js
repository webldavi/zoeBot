const { PermissionsBitField } = require("discord.js")
const db = require("../../database")
module.exports = (interaction) => {
  if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    const newXp = interaction.options.getNumber('xp')
    const newLevel = interaction.options.getNumber('level')
    const member = interaction.options.getUser('membro')
    const query = 'SELECT * FROM tb_users_level WHERE user_id = ? AND guild_id = ?'
    db.get(query, [member.id, interaction.guild.id], (err, row) => {
      if (err) return new Error(err)
      if (row != undefined) {
        const updateQuery = `UPDATE tb_users_level SET level = ?, xp_qty = ? WHERE user_id = ? AND guild_id = ?`
        db.run(updateQuery, [newLevel, newXp, member.id, interaction.guild.id], (updateErr) => {
          if (updateErr) return new Error(updateErr)
          interaction.reply({ content: '🎲 Dados alterados com sucesso!', ephemeral: true })
        })
      } else {
        const insertQuery = 'INSERT INTO tb_users_level (user_id, guild_id, xp_qty, level) values(?,?,?,?)'
        db.run(insertQuery, [member.id, interaction.guild.id, newXp, newLevel], (inserErr) => {
          if (inserErr) return new Error(inserErr)
          interaction.reply({ content: '🎲 Dados alterados com sucesso!', ephemeral: true })
        })
      }
    })
  } else {
    interaction.reply('🧐 Você não tem permissão para executar este comando!')
  }
}