module.exports = {
    name: 'stop',
    aliases: ['st'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}, 現在再生中の音楽はありません ❌`);

        queue.destroy();

        message.channel.send(`このサーバーで再生されていた音楽は停止しました ✅`);
    },
};
