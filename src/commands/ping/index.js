const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde com 'pong'"),

  execute: (interaction)=>{
    interaction.reply("pong!")
  }
}