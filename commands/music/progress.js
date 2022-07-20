module.exports = {
    name: 'progress',
    aliases: ["time"],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}, 現在再生中の音楽はありません ❌`);

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') return message.channel.send(`This song is live streaming, no duration data to display. 🎧`);

        message.channel.send(`${progress} (**${timestamp.progress}**%)`);
    },
};
