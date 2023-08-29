const { PermissionsBitField } = require("discord.js");
const db = require('../../database')
module.exports = (interaction) => {
  if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    db.get(`SELECT * FROM tb_servers WHERE server_id = ?`, [interaction.guild.id], (err, row) => {
      if (row) return interaction.reply('Este servidor já está registrado! digite `/serverstatus` para ver as informações do seu servidor')
      db.run('INSERT INTO tb_servers(server_id, name) VALUES(?, ?) ', [interaction.guild.id, interaction.guild.name], (err) => {
        if (!err) return interaction.reply("Servidor registrado com sucesso!")
        interaction.reply('Error interno!')
        console.log(err)
      })
    })
  } else {
    interaction.reply('Você não tem permissão para executar esse comando')
  }
}