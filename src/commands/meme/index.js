const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Responde com um meme aleatorio'"),

  execute: (interaction)=>{
    fetch('https://meme-api.com/gimme/1').then(res=>res.json()).then(res=>{
      interaction.reply(res.memes[0].url)
    })
  }
}