const db = require('../../database')
const { EmbedBuilder } = require('@discordjs/builders')
module.exports = (interaction)=>{
    const user_id = interaction.member.id
    const guild_id = interaction.guildId
    db.all("SELECT * FROM tb_users_money WHERE user_id = ? AND guild_id = ?", [user_id, guild_id], (err, rows)=>{
        if(err) return new Error(err)
        if(rows.length == 1){
            const userData = rows[0]
            const embed = new EmbedBuilder()
            .setTitle("💸 Sua Carteira 💸")
            .setColor([235, 52, 110])
            .setDescription("Aqui você pode ver o seu saldo no servidor **" + interaction.guild.name + "**")
            .addFields([
                {
                    name: "💰 - Saldo",
                    value: `:dollar: - ${userData.user_money} Moedas`
                }
            ])
            .setFooter({text: "Use [ /money send ] para enviar moedas a uma pessoa"})
            return interaction.reply({embeds: [embed], ephemeral: true})
        }
    })
}