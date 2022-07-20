module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.channel.send(`${message.author}, 現在再生中の音楽はありません ❌`);

        const success = queue.setPaused(true);

        return message.channel.send(success ? `The currently playing music named **${queue.current.title}** をストップしました ✅` : `${message.author}, どこかで間違っています ❌`);
    },
};
