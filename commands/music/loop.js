const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    aliases: ['lp'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

 
if (!queue || !queue.playing) return message.channel.send(`${message.author}, 現在再生中の音楽はありません ❌`);

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.channel.send(`${message.author}, 既存のループを無効にする必要があります。 **(${client.config.px}loop)** ❌`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Loop Mode: **${queue.repeatMode === 0 ? '無効' : '有効'}**,再生中の音楽を繰り返します 🔁` : `${message.author}, どこかで間違っています ❌`);
        } else {
            if (queue.repeatMode === 2) return message.channel.send(`${message.author}, 既存のループを無効にする必要があります。 **(${client.config.px}loop queue)** ❌`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Loop Mode: **${queue.repeatMode === 0 ? '無効' : '有効'}** (**${client.config.px}loop queue**で再生リストにあるすべての音楽を繰り返すことができます) 🔂` : `${message.author}, どこかで間違っています ❌`);
};
    },
};
