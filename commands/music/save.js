module.exports = {
    name: 'save',
    aliases: [],
    utilisation: '{prefix}save',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

  if (!queue || !queue.playing) return message.channel.send(`${message.author}, 現在再生中の音楽はありません ❌`);

        message.author.send(`登録曲: **${queue.current.title}** | ${queue.current.author}, __Saved server: **${message.guild.name}**__ ✅`) .then(() => {
            message.channel.send(`プライベートメッセージに音楽名を送りました ✅`);
        }).catch(error => {
            message.channel.send(`${message.author}, プライベートメッセージを送信できませんでした ❌`);
        });
    },
};
