const { Player } = require('discord-player');
const { Client, Intents, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { setTimeout } = require('timers/promises');

//音楽🎶
let client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    disableMentions: 'everyone',
});

client.config = require('./config');
client.player = new Player(client, client.config.opt.discordPlayer);
client.commands = new Collection();
const player = client.player

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of events) {
    const event = require(`./events/${file}`);
    console.log(`-> Loaded event ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
};
console.log(`-> Loaded commands...`);
readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`${command.name.toLowerCase()} Load Command!`);
        client.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
    };
});

const { MessageEmbed } = require('discord.js');

player.on('error', (queue, error) => {
    console.log(`There was a problem with the song queue => ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`I'm having trouble connecting => ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    const embed = new MessageEmbed();
    embed.setColor('RANDOM');
    embed.setDescription(`**${track.title}**を__**${queue.connection.channel.name}**__で再生します🎧`);
    queue.metadata.send({ embeds: [embed] });
});

player.on('trackAdd', (queue, track) => {
const embed = new MessageEmbed();
    embed.setColor('GREEN');
    embed.setDescription(`**${track.title}** プレイリストに追加しました ✅`);
    queue.metadata.send({ embeds: [embed] });
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('誰かにボイスチャンネルから追い出されたため、プレイリストがすべて消去されました ❌');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('誰も居なくなったためボイスチャンネルから抜けました ❌')
});

player.on('queueEnd', (queue)=> {
    queue.metadata.send('すべてのプレイリストを再生しました ✅');
});

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 60000);

if(process.env.TOKEN){
client.login(process.env.TOKEN).catch(e => {
console.log("BotTokenが正しくないか、BotのIntentsがオフです!")
})
} else {
console.log(".envにBotTokenを書いてください!")
}
