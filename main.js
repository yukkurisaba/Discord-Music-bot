const { Player } = require('discord-player');
const { Client, GatewayIntentBits, Collection, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
const { readdirSync } = require('fs');

//音楽🎶
global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
   disableMentions: 'everyone',
});

client.config = require('./config');
global.player = new Player(client, client.config.opt.discordPlayer);
client.commands = new Collection();
CommandsArray = [];

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

client.on('ready', (client) => {
 if (client.config.app.global) client.application.commands.set(CommandsArray)
  else client.guilds.cache.get(client.config.app.guild).commands.set(CommandsArray)
})

player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
  if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
   const embed = new EmbedBuilder()
    .setAuthor({name: `Started playing ${track.title} in ${queue.connection.channel.name} 🎧`, iconURL: track.requestedBy.avatarURL()})
    .setColor('#13f857')

    const back = new ButtonBuilder()
    .setLabel('Back')
    .setCustomId(JSON.stringify({ffb: 'back'}))
    .setStyle('Primary')

    const skip = new ButtonBuilder()
    .setLabel('Skip')
    .setCustomId(JSON.stringify({ffb: 'skip'}))
    .setStyle('Primary')

    const resumepause = new ButtonBuilder()
    .setLabel('Resume & Pause')
    .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
    .setStyle('Danger')

    const loop = new ButtonBuilder()
    .setLabel('Loop')
    .setCustomId(JSON.stringify({ffb: 'loop'}))
    .setStyle('Secondary')
    
    const queuebutton = new ButtonBuilder()
    .setLabel('Queue')
    .setCustomId(JSON.stringify({ffb: 'queue'}))
    .setStyle('Secondary')

    const row1 = new ActionRowBuilder().addComponents(back, loop, resumepause, queuebutton, skip)
    queue.metadata.send({ embeds: [embed], components: [row1] })
});

player.on('trackAdd', (queue, track) => {
const embed2 = new EmbedBuilder();
    .setColor('GREEN');
    .setAuthor({name: `Started playing ${track.title} in ${queue.connection.channel.name} 🎧`, iconURL: track.requestedBy.avatarURL()})
    queue.metadata.send({ embeds: [embed2] });
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

player.on('tracksAdd', (queue, tracks) => {
    queue.metadata.send(`プレイリストにあるすべての曲を再生リストに追加しました ✅`);
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
