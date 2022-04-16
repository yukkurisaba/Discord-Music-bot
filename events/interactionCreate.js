module.exports = (client, int) => {
    if (!int.isButton()) return;

    const queue = client.player.getQueue(int.guildId);

    switch (int.customId) {
        case 'saveTrack': {
          if (!queue || !queue.playing) return int.reply({ content: `現在再生している音楽はありません ❌`, ephemeral: true, components: [] });

            int.member.send(`**Track Saved: \`${queue.current.title}\` | Posted by \`${queue.current.author}\`, Saved Server: \`${int.member.guild.name}\` ✅**`).then(() => {
                return int.reply({ content: `DMに音楽のタイトルを送りました。 ✅`, ephemeral: true, components: [] });
            }).catch(error => {
                return int.reply({ content: `DMに音楽のタイトルを送れませんでした。 ❌`, ephemeral: true, components: [] });
            });
        }
    }
};
