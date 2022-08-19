const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: [],
    utilisation: '{prefix}ping',

    execute(client, message) {
      const embed = new MessageEmbed();
      embed.setColor('RANDOM');
      embed.setDescription(`**${client.ws.ping}ms** 🛰️`);
      message.channel.send({ embeds: [embed] });
    },
};
