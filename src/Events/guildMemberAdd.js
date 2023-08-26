const { EmbedBuilder } = require("discord.js")

module.exports = (member, client, db) => {
  return {
    welcomeMessage() {
      db.get(`SELECT * from tb_servers WHERE server_id = ?`, [member.guild.id], (err, row) => {
        if (Object.keys(row) && row.welcome_channel != null) {
          const embed = new EmbedBuilder()
            .setTitle(`bem vindo(a) á ${member.guild.name}`)
            .setThumbnail(member.displayAvatarURL())
            .setColor("#eb346e")
            .setDescription(`👋・Olá <@${member.id}>
          ✨・Seja bem vindo(a) á ${member.guild.name}!
          🧮・Você é o  ${member.guild.memberCount}° membro do servidor! `)
          client.channels.fetch(row.welcome_channel).then(c => c.send({ embeds: [embed] }))
        }
      })
    }
  }
}