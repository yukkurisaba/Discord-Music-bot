module.exports = {
    name: 'back',
    aliases: [],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}, 現在再生中の音楽はありません ❌`);

        if (!queue.previousTracks[1]) return message.channel.send(`${message.author}, 以前再生していた音楽はありません ❌`);

        await queue.back();

        message.channel.send(`ひとつ前の音楽を再生します... ✅`);
    },
};