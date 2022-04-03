module.exports = {
    name: 'skip',
    aliases: ['s'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
 
        if (!queue || !queue.playing) return message.channel.send(`${message.author}, 音楽を再生していません！ ❌`);

        const success = queue.skip();

        return message.channel.send(success ? `**${queue.current.title}**をスキップしました ✅` : `${message.author}, Something went wrong ❌`);
    },
};