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
console.log("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!")
})
} else {
console.log("Please Write Your Bot Token Opposite The Token In The .env File In Your Project!")
}

//編集！
client.on("message", async message => {
 if (message.author.id == client.user.id || message.author.bot) return;
 if (message.mentions.has(client.user)) {
  let arr = ["今編集中だからメンションしないでくれる？", "ほ、ほう", "何言ってんだこいぅぅ⤴︎⤴︎⤴︎", "ソウダネ", "吹き飛ばすｿﾞ","なんか言った？","ﾔﾒﾃ!ｲｼﾞﾒﾅｲﾃﾞ!","バルス！"];
  var random = Math.floor(Math.random() * arr.length);
  var result = arr[random];
  message.reply(result);
}})

client.on("message", async message => {
 if (message.author.id == client.user.id || message.author.bot) return;
 if (message.content.match(/暇|ひま|ヒマ|ﾋﾏ|hima|ﾋ ﾏ|ひ ま|HIMA|Hima|HiMa|HimA|hIma|hIMa|:hima:/))  {
     message.channel.send("編集しよう！")
}})

client.on("message", async message => {
if (message.content === "!編集") {
  let arr = ["はよしろ", "あ☆き☆ら☆め☆ろ", "ちょっと反抗していいですか", "オウエンシテルヨ", "がんばれーがんばれー", "編集は有意義な時間の使い方","https://media.discordapp.net/attachments/844531307416780840/956448438378197032/SarunePetPet.gif"];
  var random = Math.floor(Math.random() * arr.length);
  var result = arr[random];
  message.reply(result);
}})

client.on("message", async message => {
    if (message.content.match(/m!p/)) {
    message.react('🥺')
    }
  })

//再接続(みかん)
const prefix = client.config.px;
client.on("message", async message => {
  if (message.content === '{prefix}reconnect') {
    if (message.member.voice.connection) {
            message.voice.channel.disconnect();
            message.channel.send('5秒後にボイスチャンネルへ再接続します。', {code: true});
            if (message.member.voice.channel) {
                setTimeout(() => {
                    if  (message.member.voice.channel) {
                        //textChannelHistory = message.channel.id;
                        console.log('ボイスチャンネルへ再接続しました。');
                        message.channel.send('ボイスチャンネルへ再接続しました。', {code: true});
                    }
                }, 5000);
            } else {
                message.reply('あなたがボイスチャンネルへ接続している必要があります。');
            }
      } else {
            message.reply('Botはボイスチャンネルに接続していないようです。');
        }
    }})


//スレッド
client.on("message", async message => {
 if (message.content.match(/!質問/)){
   const embed = new MessageEmbed();
    embed.setColor('BLACK');
    embed.setDescription(`${message.member}さんからの質問です`);
    message.channel.send({ embeds: [embed] });
    message.startThread({
    name: '質問です',
    autoArchiveDuration: 60,
    reason: '分からないことがあるため',
    })
}})

//!鯖
const Discord = require('discord.js');
require('dotenv').config({path: "\.env"});
const puppeteer = require('puppeteer');
client.once('ready', () => {
	console.log('鯖Ready!');
});
client.on("messageCreate", async message=>{
	if(message.content==="!鯖")
	{
		message.channel.send("いま頑張ってるからちょっと待って");
		const scrape = async () =>
		{
		console.log("a")
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
		console.log("b")
    const page = await browser.newPage();
		console.log("a1")
    await page.goto('https://aternos.org/go/');
    await page.type('#user', 'yukkuri_saba');
    console.log("a2")
		await page.type('#password', process.env.PASSWORD);
		await page.click("#login");
		await page.waitForNavigation();
		await page.click("body > div > main > section > div > div.servers.single > div"); 
		await page.waitForNavigation();
		await page.click("#start");
		await page.waitForSelector("#nope > main > div > div > div > header > span");
		await page.click("#nope > main > div > div > div > header > span");
		let statusHTML = await page.evaluate(()=>document.querySelector("#nope > main > section > div.page-content.page-server > div.server-status > div.status.queueing > div > span.statuslabel-label-container > span").innerHTML);
		console.log(statusHTML);
		if(statusHTML==="Waiting in queue")
		{
			console.log("Waiting in the queue")
			message.channel.send("Waiting in queue");
			while(true)
			{
				try{
					await page.click("#confirm");
					break;
				}
				catch(error)
				{

				}
			}
			message.channel.send("Server is starting up!");
		}
		if(statusHTML==="Preparing ..." || statusHTML==="Loading ...")
		{
			message.channel.send("Server is starting up!");
		}
		await page.waitForTimeout(300000);
		await browser.close();	
		}
		scrape();
		
	}
})
