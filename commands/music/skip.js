module.exports = {
    name: 'skip',
    aliases: ['s'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
 
        if (!queue || !queue.playing) return message.channel.send(`${message.author}, 現在再生中の音楽はありません ❌`);

        const success = queue.skip();

        return message.channel.send(success ? `**${queue.current.title}**をスキップしました ✅` : `${message.author}, どこかで間違っています ❌`);
    },
};
