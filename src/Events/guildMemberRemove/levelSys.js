const db = require('../../database')
module.exports = (member) => {
  
  const query = 'DELETE FROM tb_users_level WHERE user_id = ? AND guild_id = ?'
  db.run(query, [member.id, member.guild.id], (err) => {
    if (err) return console.error(err)
  })
}