const { SlashCommandBuilder } = require("discord.js");
const db = require("../../database");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Responde com um meme aleatorio'"),

  execute: (interaction)=>{
   db.all("SELECT * FROM tb_memes", [], (err, rows)=>{
    if(err) return interaction.reply("Erro interno!")
    return interaction.reply(rows[Math.floor(Math.random() * rows.length)].url)
   })
  }
}