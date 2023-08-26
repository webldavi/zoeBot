const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const db = require('../../database')
module.exports = {
  data: new SlashCommandBuilder()
    .setName("setwelcomechannel")
    .setDescription("Defina qual canal aparecerá as mensagens de boas vindas"),

  execute: (interaction) => {
    if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      db.get(`SELECT * FROM tb_servers WHERE server_id = ?`, [interaction.guild.id], (err, row) => {
        db.run('UPDATE tb_servers SET welcome_channel = ? WHERE id = ?;', [interaction.channel.id, row.id ], ()=>{
          if(err) return console.log(err)
          interaction.reply("Canal de boas-vindas atualizado com sucesso")
        })
      })
    }else{
      interaction.reply('Você não tem permissão para executar esse comando')
    }
  }
}