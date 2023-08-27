const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Responde com um meme aleatorio'"),

  execute: (interaction)=>{
    fetch('https://raw.githubusercontent.com/LucianoDeveloper/memes-random/master/images.json').then(res=>res.json()).then(res=>{
      interaction.reply(res.images[Math.floor(Math.random()*res.images.length)])
    })
  }
}