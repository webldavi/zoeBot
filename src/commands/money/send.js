const db = require('../../database')
const { EmbedBuilder } = require('@discordjs/builders')
module.exports = (interaction)=>{
    db.all("SELECT * FROM tb_users_money WHERE user_id = ? AND guild_id = ?", [interaction.member.id, interaction.guild.id], (err, rows)=>{
        if(err) return new Error(err)
        if(rows.length <=0) return interaction.reply("Você não pode executar esse comando pois ainda não está no nosso sistema")
        const user = rows[0]
        const member = interaction.options.getUser('membro')
        const sendValue = interaction.options.getNumber("moedas")
        db.all('SELECT * FROM tb_users_money WHERE user_id = ? AND guild_id = ?', [member.id, interaction.guild.id], (err, lines)=>{
            if(err) return new Error(err)
            if(lines.length <=0) return interaction.reply("Membro não encontrado!")
            else{
                db.run("UPDATE tb_users_money SET user_money = ? WHERE user_id = ? AND guild_id = ?", [user.user_money - sendValue, user.user_id, interaction.guild.id], (updateErr)=>{
                    if(updateErr) return console.error(updateErr)
                    db.run("UPDATE tb_users_money  SET user_money = ? WHERE user_id = ? AND guild_id = ?", [lines[0].user_money + sendValue, member.id, interaction.guild.id], (sendError)=>{
                        if(sendError) return console.error(sendError)
                        interaction.reply('Dinheiro enviado com sucesso!')
                    })
                })
            }  
        })
    })
}