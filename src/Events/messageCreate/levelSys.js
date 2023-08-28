const db = require("../../database")

module.exports = ( message) => {
  if (!message.author.bot) {
    const user = message.member
    db.all('SELECT * FROM tb_users_level WHERE user_id = ?', [user.id], (err, rows) => {
      const currentGuild = rows.filter(u => u.guild_id == message.guild.id)
      if (currentGuild.length >= 1) {
        if (currentGuild[0].xp_qty >= currentGuild[0].level * 10) {
          const query = `UPDATE tb_users_level
          SET level = ?,
            xp_qty = 0
          WHERE user_id = ?
              AND guild_id = ?`
          db.run(query, [currentGuild[0].level + 1, currentGuild[0].user_id, currentGuild[0].guild_id], (updateErr) => {
           if(updateErr) return updateErr
           return message.reply('🎉 Você subiu de level')
          })
        } else {
          const query = 'UPDATE tb_users_level SET xp_qty = ? WHERE user_id = ? AND guild_id = ?'
          db.run(query, [currentGuild[0].xp_qty + 1, currentGuild[0].user_id, currentGuild[0].guild_id])
        }
      } else {
        const query = 'INSERT INTO tb_users_level (user_id, guild_id, xp_qty, level) values(?,?,?,?)'
        db.run(query, [user.id, message.guild.id, 1, 1])
      }
    })
  }
}