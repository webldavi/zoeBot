const { PermissionsBitField } = require("discord.js");
const db = require('../../database')
module.exports = (interaction) => {
  if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    db.get(`SELECT * FROM tb_servers WHERE server_id = ?`, [interaction.guild.id], (err, row) => {
      const channel = interaction.options.getChannel("canal")
      db.run('UPDATE tb_servers SET welcome_channel = ? WHERE id = ?;', [channel.id, row.id], () => {
        if (err) return console.log(err)
        interaction.reply({ content: "Canal de boas-vindas atualizado com sucesso", ephemeral: true })
      })
    })
  } else {
    interaction.reply({ content: 'Você não tem permissão para executar esse comando', ephemeral: true })
  }
}
