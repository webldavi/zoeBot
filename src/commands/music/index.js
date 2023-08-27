const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("music")
    .setDescription("Toca uma playlist lofi no canal de voz em que você está")
    .addSubcommand(subCommand => {
      return subCommand.setName('play')
        .setDescription('Começa a tocar uma musica com base na sua pesquisa')
        .addStringOption(option => {
          return option
            .setName('search')
            .setDescription('Campo de pesquisa')
            .setRequired(true)
        })
    })
    .addSubcommand(subCommand => {
      return subCommand.setName('stop').setDescription('Pausa a musica que estiver tocando')
    })
    .addSubcommand(subCommand => {
      return subCommand.setName('unpause').setDescription('Despausa a musica que estava tocando')
    })
    .addSubcommand(subCommand => {
      return subCommand.setName('lofi').setDescription('Toca uma musica de lofi aleatória')
    }),

  async execute(interaction, client) {
    if (!interaction.member.voice.channel) {
      return interaction.reply('Você precisa está em um canal de voz para executar esse comando!')
    }

    const subCommand = interaction.options.getSubcommand()

    let player = client.manager.create({
      guild: interaction.guild.id,
      voiceChannel: interaction.member.voice.channel.id,
      textChannel: interaction.channel.id,
    })

    if (subCommand == 'stop' && !player) return interaction.reply('Não estou tocando nenhuma musica neste servidor!')
    else if (subCommand == 'stop' && !player.playing) return interaction.reply('A musica já está pausada!')
    else if (subCommand == 'stop' && player && player.playing) {
      player.pause(true)
      return interaction.reply('⏸ Musica pausada com sucesso!')
    }
    else if (subCommand == 'unpause' && !player) return interaction.reply('Não estou tocando nenhuma musica neste servidor')
    else if (subCommand == 'unpause' && player.playing) return interaction.reply('Nenhuma musica pausada neste servidor')
    else if (subCommand == 'unpause' && player && !player.playing) {
      player.pause(false)
      return interaction.reply("🎶 Musica despausada com sucesso")
    }


    


    let songs;
    let currentSong;
    if (subCommand === "play") {
      songs = await client.manager.search(interaction.options.getString('search'), interaction.author);
      currentSong = songs.tracks[0]
    } else if (subCommand == 'lofi') {
      songs = await client.manager.search('lofi', interaction.author);
      currentSong = songs.tracks[0]
    }



    player.queue.add(currentSong)
    const songDuration = new Date(currentSong.duration)
    const embed = new EmbedBuilder()
    player.connect()
    if (!player.playing && !player.paused && !player.queue.size) player.play()
    embed.setDescription(`▶ Tocando **[${currentSong.title}](${currentSong.uri})**`)
      .setFooter({
        text: `Duração: ${songDuration.getMinutes() >= 10 ? songDuration.getMinutes() : '0' + songDuration.getMinutes()}:${songDuration.getSeconds() >= 10 ? songDuration.getSeconds() : '0' + songDuration.getSeconds()}`
      })
      .setThumbnail(currentSong.thumbnail)
      .setColor("#eb346e")
    return interaction.reply({ embeds: [embed] })
  }
}