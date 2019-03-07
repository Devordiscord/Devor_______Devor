const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const request = require('request');
const fs = require('fs');
const Canvas = require("canvas");
const { Client, RichEmbed } = require("discord.js");
const yt_api_key = "AIzaSyDFRGtM6WzFmqAXIgQcCB1_Q8L0NJj7a3M"
const ytdl = require("ytdl-core");
const devs = ["525434548939653151"]
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const simpleytapi = require('simple-youtube-api')
const youtube = new simpleytapi(yt_api_key);
var guilds = {};
const yt = "<:megYT:476798168684691457>"
var prefix = "t!";




client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});


const gpoints = {};
client.on('message',async message => {
  if(message.author.bot || message.channel.type === 'dm') return;
  let args = message.content.split(" ").slice(1);
  let cmd = message.content.split(" ")[0].substring(prefix.length);
 
  if(!gpoints[message.guild.id]) gpoints[message.guild.id] = {};
  let points = gpoints[message.guild.id];
  if(!message.content.startsWith(prefix)) return;
  if(cmd === 'points') {
    let mention = message.mentions.users.first();
    if(!args[0] && !mention) {
      let o = 1;
      let entries = Object.values(gpoints[message.guild.id]);
      let zg = client.guilds.get("525365808352985088").emojis.find(r => r.name === "Right");
      let top = require('array-sort')(entries, 'points', { reverse: true });
      if(top.length <= 0) return message.channel.send(`**${client.guilds.get("525365808352985088").emojis.find(r => r.name === "NOO")} | لا يوجد أي عضو بالسيرفر لديه نقاط**`);
      let i = new RichEmbed();
      i.setAuthor(message.author.username, message.author.avatarURL);
      i.setColor("#36393e");
      i.addField(`- **قائمة المتصدرين :**`, `\n${top.slice(0, 10).map(r => `${zg} | **\`${o++}\`: <@${r.id}> ( \`النقاط : ${r.points}\` )**`).join('\n')}`);
 
      message.channel.send(i);
    } else if(mention) {
      if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`**${client.guilds.get("525365808352985088").emojis.find(r => r.name === "NOO")} | \`Manage Server\` يجب ان يتوفر لديك صلاحية**`);
      let zg4 = client.guilds.get("525365808352985088").emojis.find(r => r.name === "tez");
      if(!args[1]) return err(message);
      if(!args[1].startsWith('+') && !args[1].startsWith('-')) return err(message);
      if(!message.guild.members.get( mention.id )) return err(message);
      if(!points[mention.id]) points[mention.id] = { id: `${mention.id}`, points: 0 };
      if(args[1].startsWith('+')) {
 
        let m = args[1].split("+");
        if(isNaN(m[1]) || !m[1] || m[1] === '') return err(message);
        if(m[1].startsWith('-')) return err(message);
        points[mention.id].points += (+Number(m[1]));
        message.channel.send(`**${zg4} | تم اضافة \`${m[1]}\` من النقاط الى ${mention}**`);
 
      } else if(args[1].startsWith('-')) {
        let m = args[1].split("-");
        if(isNaN(m[1]) || !m[1] || m[1] === '') return err(message);
        if(m[1].startsWith('+')) return err(message);
        points[mention.id].points += (-Number(m[1]));
        message.channel.send(`**${zg4} | تم ازالة \`${m[1]}\` من النقاط الى ${mention}**`);
      }
    } else if(args[0] && args[0] === 'reset') {
      if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`**${client.guilds.get("525365808352985088").emojis.find(r => r.name === "NOO")} | \`Manage Server\` يجب ان يتوفر لديك صلاحية**`);
 
      gpoints[message.guild.id] = undefined;
      gpoints[message.guild.id] = {};
      message.channel.send(`**${client.guilds.get("525365808352985088").emojis.find(r => r.name === "tez")} | تم تصفير جميع النقاط**`);
    } else {
      err(message);
    }
  }
});
 
function err(message) {
  let zg = client.guilds.get("525365808352985088").emojis.find(r => r.name === "NOO");
  let zg2 = client.guilds.get("525365808352985088").emojis.find(r => r.name === "discordPartner");
  let zg3 = client.guilds.get("525365808352985088").emojis.find(r => r.name === "Bdan");
  let zg4 = client.guilds.get("525365808352985088").emojis.find(r => r.name === "tez");
  return message.channel.send(new RichEmbed()
.setTitle(`${zg} | لقد قمت بكتابة شئ خاطئ`)
.setDescription(`**${zg3} | لأنقاص عدد من النقاط : \`${prefix}points @Lorans -1\`\n${zg4} | لزيادة عدد من النقاط : \`${prefix}points @Lorans +1\`\n${zg2} | لتصفير جميع نقاط اعضاء السيرفر : \`${prefix}points reset\`**`));
}

	      
client.on('message', async function(message) {
    if(message.author.bot) return;
    if(!message.channel.guild) return;
    let args = message.content.split(' ').slice(1).join(" ");
    const novc = "**:x: | أنت لست في روم صوتي**"
     if (message.content.toLowerCase().startsWith(`$lyrics`)) {
const lyricistapi = require('lyricist');
const lyric = new lyricistapi("3u50HX1N0KeDBMCN_y3W126tTcJizSOz-yJtJE7TOmQepOGkAPuzQhuZiRLG9BDn");
try {
    if(!args) {
        args = guilds[message.guild.id].queueNames[0].replace(/\[[^\]]*\]/g, "").replace(/ *\([^)]*\) */g, "").replace(/[^\w\s]/gi, "");
    }
} catch (error) {
    return message.channel.send(`**:x: | لم أجد هذا**`)
}
const song = await lyric.search(args)
if(song[0]) {
const msg22 = await message.channel.send(`:bookmark_tabs: يتم البحث عن : **\`${song[0].full_title} Lyrics.\`**`);
const songlyrics = await lyric.song(song[0].id, {fetchLyrics: true, textFormat: "dom"})
let fixedsonglyrics;
if(songlyrics.lyrics.length > 2047) fixedsonglyrics = songlyrics.lyrics.slice(0, 2000 - songlyrics.url.length) + `......\n\n[**Continue Here**](${songlyrics.url})`
else fixedsonglyrics = songlyrics.lyrics
let youtube;
let spotify;
if(songlyrics.media.find(g => g.provider === 'youtube')) youtube = `[**YouTube**](${songlyrics.media.find(g => g.provider === 'youtube').url})`
else youtube = "N/A"
if(songlyrics.media.find(g => g.provider === 'spotify')) spotify = `[**Spotify**](${songlyrics.media.find(g => g.provider === 'spotify').url})`
else if(songlyrics.media.find(g => g.provider === 'apple_music')) spotify = `[**iTunes**](${songlyrics.media.find(g => g.provider === 'apple_music').url})`
else spotify = "N/A"
msg22.edit("", {embed: {
    description: `\n${fixedsonglyrics}`,
    color:  0x7ec0ee,
    title: songlyrics.full_title,
    url: songlyrics.url,
    thumbnail: {
        url: songlyrics.header_image_url,
    },
fields: [{
name: "Watch on",
value: youtube,
inline: true
}, {
name: "Listen on",
value: spotify,
inline: true
}]
}})
} else return message.channel.send(`:x: | لا يوجد نتائح لـ : **\`\`${args}\`\`**`)
     }
 
     function clear() {
        guilds[message.guild.id].queue = [];
        guilds[message.guild.id].queueNames = [];
        guilds[message.guild.id].isPlaying = false;
        guilds[message.guild.id].dispatcher = null
        guilds[message.guild.id].voiceChannel = null;
        guilds[message.guild.id].skipReq = 0;
        guilds[message.guild.id].skipReq = [];
        guilds[message.guild.id].loop = false;
        guilds[message.guild.id].volume = 1;
    }
   
    const mess = message.content.toLowerCase();
 
    if (!guilds[message.guild.id]) {
        guilds[message.guild.id] = {
            queue: [],
            queueNames: [],
            isPlaying: false,
            dispatcher: null,
            voiceChannel: null,
            volume: 1,
            skipReq: 0,
            skippers: [],
            loop: false
        };
    }
 
    if (mess.startsWith(prefix + "play") || mess.startsWith(prefix+"شغل")) {
        if (message.member.voiceChannel || guilds[message.guild.id].voiceChannel != null) {
        const voiceChannel = message.member.voiceChannel
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if (!permissions.has('CONNECT')) return message.channel.send({embed: {description: "** :x: | ليس لدي صلاحيات لدخول الروم**"}});
        if (!permissions.has('SPEAK')) return message.channel.send({embed: {description: "** :x: | ليس لدي صلاحيات للتكلم في الروم **"}});
         if (args.length == 0 || !args) return message.channel.send(`**:musical_note: | $play \`SONGLINK|NAME\`**`)
            if (guilds[message.guild.id].queue.length > 0 || guilds[message.guild.id].isPlaying) {
                if(guilds[message.guild.id].queue.length > 100) return message.channel.send(``, {embed: {
                    description: `**🔒 | عذرًا ، الحد الأقصى لطول قائمة الانتظار هو 100 ، افعل ** $clear  لمسح قائمة الانتظار بالكامل أو  $clear \`NUMBER\` لمسح عنصر واحد**`
                   
                }})
                if(args.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi) && !isYoutube(args)) {
                return message.channel.send(`**:x: | لبعض الأسباب ، لا يمكنك لعب أي عمل ستريم آخر إذا لم يكن رقم # 1 في قائمة الانتظار. افعل \`$clear\` وحاول مرة أخرى.**`)
                    }
                 if (args.match(/[?&]list=([^#\&\?]+)/)) {
                    const playlist = await youtube.getPlaylist(args);
                    if(!playlist) return message.channel.send(`**:x: | لم أستطيع الحصول على قائمة التشغيل هذه **`)
                   
                    const videos = await playlist.getVideos();
                    const queuesync = 100 - guilds[message.guild.id].queue.length
                    if(queuesync < 0 || queuesync == 0) return message.channel.send(`**:x: | لا يمكن إضافة قائمة التشغيل هذه ،  \`MAX_QUEUE = 100\`  امسح قائمة الانتظار الحالية وحاول مرة أخرى**`)
                    videos.filter(m => m.thumbnails !== undefined).slice(0, queuesync).forEach(video => {
                        guilds[message.guild.id].isPlaying = true;
                        guilds[message.guild.id].queueNames.push(video.title)
                        guilds[message.guild.id].queue.push(video.id)
                    })
                    return message.channel.send(`**:musical_score: \`${playlist.title}\` | \`${queuesync}\` تمت الاِضافة اِلي القائمة **`)                    ;
                }
                message.channel.send(`**:mag_right: | يتم البحث عن : \`\`${args}\`\`**`).then(()=> {
                getID(args, function(id) {
                if(!id) return message.channel.send(`**:x: | لم أتمكن من العثور على أي شيء بهذا العنوان \`${args}\`**`);
                   fetchVideoInfo(id, function(err, videoInfo) {
                        if (err) throw new Error(err);
                        if(videoInfo.duration > 1800) return message.channel.send(`**:x: | لا أستطيع تشغيل أغنيه مدتها فوق 30 دقيقة**`).then(message.react(nope));
                        else message.react("✔")
                        add_to_queue(id, message);
                        message.channel.send(new RichEmbed()
                        .setAuthor("Added to queue", message.author.avatarURL)
                        .setTitle(videoInfo.title)      
                        .setURL(videoInfo.url)
                        .addField("القناة : ", videoInfo.owner, true)
                        .addField("مدة الأغنية : ", convert.fromS(videoInfo.duration, 'mm:ss') , true)
                        .addField("نشرت في تاريخ : ", videoInfo.datePublished, true)
                        .addField("مكانها في القائمة : ", guilds[message.guild.id].queueNames.length, true)
                        .setColor("RED")
                        .setThumbnail(videoInfo.thumbnailUrl)
                        )
                        guilds[message.guild.id].queueNames.push(videoInfo.title);
                    });
                })
            })
            } else {
            if (args.match(/[?&]list=([^#\&\?]+)/)) {
                const playlist = await youtube.getPlaylist(args);
                if(!playlist) return message.channel.send(`**:x: | لم أستطيع الحصول على قائمة التشغيل هذه **`)
                const videos = await playlist.getVideos(100)
                playMusic(videos[0].id, message)
                guilds[message.guild.id].queueNames.push(videos[0].title)
                guilds[message.guild.id].queue.push(videos[0].id)
                videos.filter(m => m.thumbnails !== undefined).slice(1, 100).forEach(video => {
                    guilds[message.guild.id].isPlaying = true;
                    guilds[message.guild.id].queueNames.push(video.title)
                    guilds[message.guild.id].queue.push(video.id)
                })
                return message.channel.send(`**:musical_score: | \`${playlist.title}\` | \`${videos.filter(m => m.thumbnails !== undefined).slice(0, 100).length}\` تمت أضافتهم للقائمة \n :notes: | يعمل الأن : \`\`${videos[0].title}\`\`**`)                    ;
            } else {
                if(args.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi) && !isYoutube(args)) {
                    if(guilds[message.guild.id].queue[0]) return message.channel.send(`**:x: | لبعض الأسباب ، لا يمكنك لعب أي عمل ستريم آخر إذا لم يكن رقم # 1 في قائمة الانتظار. افعل \`$clear\` وحاول مرة أخرى.**`)
                 
                    playMusic(args, message).catch(err => message.channel.send(`**:x: | لا يمكن تشغيل هذا الشيء**`))
                    guilds
                    guilds[message.guild.id].isPlaying = true;
                    return message.channel.send(`**:arrow_forward: | يعمل الأن من : ${args}**`);
                    } else {
                message.channel.send(`** :mag_right: | يتم البحث عن :  \`\`${args}\`\` **`).then(() => {
                getID(args, function(id) {
                    if(!id) return message.channel.send(`**:x: | لا يمكن تشغيل هذا الشيء ${args}**`);
                    fetchVideoInfo(id, function(err, videoInfo) {
                        if (err) throw new Error(err);
                        if(videoInfo.duration > 1800) return message.channel.send(`**:x: | لا أستطيع تشغيل أغنيه مدتها فوق 30 دقيقة**`).then(message.react("❌"))
                        else message.react("✔")
                        playMusic(id, message);
                        guilds[message.guild.id].isPlaying = true;
                        guilds[message.guild.id].queue.push(id);
                        guilds[message.guild.id].queueNames.push(videoInfo.title);
                        message.channel.send(`**:notes: | يعمل الأن : \`\`${videoInfo.title}\`\`**`);
                    })
                })})}}
            }
        } else {
            message.channel.send(novc);
        }
 
    } else if (mess.startsWith(prefix + "skip") || mess.startsWith(prefix+"عدي")) {
        if(!message.member.voiceChannel) return message.channel.send(novc)
        if(message.member.hasPermission('MANAGE_CHANNELS')) {
        if (guilds[message.guild.id].queueNames[0]) {
            message.channel.send(`**:fast_forward: | تم التخطي ${guilds[message.guild.id].queueNames[0]}**`);
            return skip_song(message);
        } else return message.channel.send(`**:x: | لا شيء يعمل هنا**`);
        }
        else
        if (guilds[message.guild.id].skippers.indexOf(message.author.id) === -1) {
            guilds[message.guild.id].skippers.push(message.author.id);
            guilds[message.guild.id].skipReq++;
            if (guilds[message.guild.id].skipReq >= Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)) {
                if (guilds[message.guild.id].queueNames[0]) {
                message.channel.send(`**:fast_forward: | تم التخطي ${guilds[message.guild.id].queueNames[0]}**`);
                skip_song(message);
                } else return message.channel.send(`**:x: | لا شيء يعمل هنا**`);
            } else {
                message.channel.send(`**:point_up::skin-tone-1: | ${message.author.username} قام بالتصويت للتخطي | ${Math.floor(Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2) - guilds[message.guild.id].skipReq)} المزيد من التصويتات للتخطي **`);
            }
        } else {
            message.channel.send("**:x: | انت قمت بالتصويت بالفعل**");
        }
 
    } else if (mess.startsWith(prefix + "queue") || mess.startsWith(prefix+"قائمة")) {
        if(guilds[message.guild.id].queueNames.length < 1) return message.channel.send(`**:x: | لا شيء يعمل هنا**`);
        const numbaone = await youtube.getVideoByID(guilds[message.guild.id].queue[0])
        if(!guilds[message.guild.id].queueNames[1]) return message.channel.send('', {embed: {
        description: `** :notes: | يعمل الأن : \n[${guilds[message.guild.id].queueNames[0]}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[0]}) \`\`${convert.fromS(numbaone.durationSeconds)}\`\` ** `,
        author: {
        name: `${message.guild.name}'s Queue.`,
        icon_url: message.guild.iconURL
        },
        color: 3447003
        }});
        else {
            let x;
            if(args > 1) {
             x = Math.floor(args)*10+1
            } else {
              x = Math.floor(11)
            }
            let i;
            if(args > 1) {
                i = x-11
               } else {
                 i = 0
               }
 
            let queuelist = guilds[message.guild.id].queueNames.slice(x-10,x).map(song => `**\`\`${++i}.\`\`** [${song}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[i]})`).join('\n\n')
            if(!queuelist) return message.channel.send(`** :x: | هذة الصفحة غير موجودة **`)
            const embed = new RichEmbed()
            embed.setDescription(`** :notes: | يعمل الأن : \n[${guilds[message.guild.id].queueNames[0]}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[0]})\n\n:arrow_down: | التالي | :arrow_down:\n\n${queuelist}\n\nجميع الأغراض في القائمة : ${guilds[message.guild.id].queueNames.length}**`)
            embed.setThumbnail("https://upload.wikimedia.org/wikipedia/commons/7/73/YouTube_Music.png")
            embed.setAuthor(`${message.guild.name}'s Queue (${Math.floor(x/10)} / ${Math.floor((guilds[message.guild.id].queue.slice(1).length+10) /10)})`)
            embed.setColor(3447003);
            message.channel.send(embed).then(async msg => {
                if(Math.floor((guilds[message.guild.id].queue.slice(1).length+10) /10) > 1) {
                    await msg.react("⏪")
                    await msg.react("◀")
                    await msg.react("🔵")
                    await msg.react("▶")
                    await msg.react("⏩")
                    const pages = Math.floor((guilds[message.guild.id].queue.slice(1).length+10) /10)
                    let page = Math.floor(x/10)
                    const back = msg.createReactionCollector((reaction, user) => reaction.emoji.name === "◀" && user.id === message.author.id, {time: 60000})
                    const doubleback = msg.createReactionCollector((reaction, user) => reaction.emoji.name === "⏪" && user.id === message.author.id, {time: 60000})
                    const doubleforwad = msg.createReactionCollector((reaction, user) => reaction.emoji.name === "⏩" && user.id === message.author.id, {time: 60000})
                    const forwad = msg.createReactionCollector((reaction, user) => reaction.emoji.name === "▶" && user.id === message.author.id, {time: 60000})
                    back.on('collect', async r => {
                        if(page === 1) return;
                        await r.remove(message.author);
                        await page--
                        x = Math.floor(page)*10+1
                        i = x-11
                        queuelist = guilds[message.guild.id].queueNames.slice(x-10,x).map(song => `**\`\`${++i}.\`\`** [${song}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[i]})`).join('\n\n')
            embed.setDescription(`** :notes: | يعمل الأن : \n[${guilds[message.guild.id].queueNames[0]}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[0]})\n\n:arrow_down: | التالي | :arrow_down:\n\n${queuelist}\n\nجميع الأغراض في القائمة : ${guilds[message.guild.id].queueNames.length}**`)                      
            embed.setAuthor(`${message.guild.name}'s Queue (${page} / ${pages})`)
            msg.edit(embed)
                    })
                    forwad.on('collect', async r => {
                        if(page === pages) return;
                        await r.remove(message.author);
                        await page++
                        x = Math.floor(page)*10+1
                        i = x-11
                        queuelist = guilds[message.guild.id].queueNames.slice(x-10,x).map(song => `**\`\`${++i}.\`\`** [${song}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[i]})`).join('\n\n')
                       
                        embed.setDescription(`** :notes: | يعمل الأن : \n[${guilds[message.guild.id].queueNames[0]}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[0]})\n\n:arrow_down: | التالي | :arrow_down:\n\n${queuelist}\n\nجميع الأغراض في القائمة : ${guilds[message.guild.id].queueNames.length}**`)                      
                        embed.setAuthor(`${message.guild.name}'s Queue (${page} / ${pages})`)
                        msg.edit(embed)
                    })
                    doubleback.on('collect', async r => {
                        if(page === 1) return;
                        await r.remove(message.author);
                        page = 1
                        x = Math.floor(page)*10+1
                        i = x-11
                        queuelist = guilds[message.guild.id].queueNames.slice(x-10,x).map(song => `**\`\`${++i}.\`\`** [${song}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[i]})`).join('\n\n')
                        embed.setDescription(`** :notes: | يعمل الأن : \n[${guilds[message.guild.id].queueNames[0]}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[0]})\n\n:arrow_down: | التالي | :arrow_down:\n\n${queuelist}\n\nجميع الأغراض في القائمة : ${guilds[message.guild.id].queueNames.length}**`)                      
                        embed.setAuthor(`${message.guild.name}'s Queue (${page} / ${pages})`)
                        msg.edit(embed)
                    })
                    doubleforwad.on('collect', async r => {
                        if(page === pages) return;
                        await r.remove(message.author);
                        page = pages
                        x = Math.floor(page)*10+1
                        i = x-11
                        queuelist = guilds[message.guild.id].queueNames.slice(x-10,x).map(song => `**\`\`${++i}.\`\`** [${song}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[i]})`).join('\n\n')
                        embed.setDescription(`** :notes: | يعمل الأن : \n[${guilds[message.guild.id].queueNames[0]}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[0]})\n\n:arrow_down: | التالي | :arrow_down:\n\n${queuelist}\n\nجميع الأغراض في القائمة : ${guilds[message.guild.id].queueNames.length}**`)                        
                        embed.setAuthor(`${message.guild.name}'s Queue (${page} / ${pages})`)
                        msg.edit(embed)
                    })
                } else return;
            })
        }
    }
 
if(mess.startsWith(prefix+"np")) {
    const short = require('short-number');
    if(!guilds[message.guild.id].queue[0] || !guilds[message.guild.id].isPlaying) return message.channel.send(`**:x: Nothing playing in this server**`)
    await message.channel.startTyping()
    const embed = new RichEmbed()
    await fetchVideoInfo(guilds[message.guild.id].queue[0], function(err, videoInfo) {
                        if (err) {
                             embed.setAuthor("يعمل الأن :", client.user.avatarURL)
                             embed.setTitle(guilds[message.guild.id].queueNames[0])
                             embed.setURL(guilds[message.guild.id].queue[0])
                             throw new Error(err);
                        } else {
                            embed.setAuthor(`يعمل الأن : `, client.user.avatarURL)
                            embed.setTitle(videoInfo.title)      
                            embed.setURL(videoInfo.url)
                            embed.addField("القناة : ", `[**${videoInfo.owner}**](https://youtube.com/channel/${videoInfo.channelId})`, true)
                            embed.addField("مدة الأغنية : ", `${convert.fromS(videoInfo.duration, 'mm:ss')} — [**Download MP3**](https://www.flvto.biz/sa/downloads/mp3/yt_${videoInfo.videoId})`, true)
                            embed.addField("المشاهدات : ", short(videoInfo.views), true)
                            embed.addField("لايكات/دسلايكات", `👍 **${short(videoInfo.likeCount)}** / 👎 **${short(videoInfo.dislikeCount)}**`, true)
                            embed.setColor("RED")
                            embed.setImage(videoInfo.thumbnailUrl)
                        }
                        message.channel.stopTyping(true);
                        message.channel.send(embed)
    })
}
 
if(mess.startsWith(prefix+"stop") || mess.startsWith(prefix+"اطلع")) {
    if (!message.member.voiceChannel) return message.channel.send(novc);
    if(guilds[message.guild.id].isPlaying) guilds[message.guild.id].dispatcher.end();
    if (guilds[message.guild.id].voiceChannel)
    {
    await clear()
    message.guild.voiceConnection.disconnect();
    message.channel.send(`**:mailbox_with_no_mail: | تم الخروج من الروم**`)
    }
}
 
if(mess.startsWith(prefix+"stpsdksjdkshdkshdskhdjshsqwqwojqfu") || message.content.startsWith(`<@${client.user.id}> stfu`)) {
    if (!message.member.voiceChannel) return message.channel.send(novc);
    if(guilds[message.guild.id].isPlaying) guilds[message.guild.id].dispatcher.end();
    if (guilds[message.guild.id].voiceChannel)
    {
    await clear()
    message.guild.voiceConnection.disconnect();
    message.channel.send(`:cry: k sempai!`)
    }
}
 
if(message.content.startsWith(prefix+"search")) {
    let index = 0
    if(!args) return message.channel.send(`**:x: | أنت لم تدخل شيء للبحث عنة**`)
    const videos = await youtube.searchVideos(args, 5)
    message.channel.send(`** :e_mail: | نتائح البحث لـ : \`\`${args}\`\`**`,{embed: {
    description: `**:information_source: | أكتب رقم الأغنية التي تريد أو \`cancel\` للاِلغاء .\n\n${videos.map(song =>`${++index}. [${song.title}](${song.url})**`).join('\n')}`,
    footer: {
        text: `Requested by ${message.author.username} (${message.author.id})`,
        icon_url: message.author.avatarURL
    }
    }})
try {
var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11 || msg2.content === 'cancel' || msg2.content.startsWith("$search") && msg2.author.id === message.author.id, {
    maxMatches: 1,
    time: 30000,
    errors: ['time'],
});
} catch (error) {
return message.channel.send(`**:x: | أنتهي وقت الأختيار**`)
}
if(guilds[message.guild.id].queue.length > 100) return message.channel.send(``, {embed: {
    description: `🔒 | عذرًا ، الحد الأقصى لطول قائمة الانتظار هو 100 ، افعل ** $clear  لمسح قائمة الانتظار بالكامل أو  $clear \`NUMBER\` لمسح عنصر واحد**`
}})
if(!message.member.voiceChannel) return;
if(response.first().content === 'cancel') return message.channel.send(`**:thumbsup: | تم الاِلغاء**`)
if(response.first().content === '$search') return;
const videoIndex = parseInt(response.first().content)
const voiceChannel = message.member.voiceChannel
const permissions = voiceChannel.permissionsFor(message.client.user)
if (!permissions.has('CONNECT')) return message.channel.send({embed: {description: "** :x: | ليس لدي صلاحيات لدخول الروم**"}});
if (!permissions.has('SPEAK')) return message.channel.send({embed: {description: "** :x: | ليس لدي صلاحيات للتكلم في الروم**"}});    
const id = videos[videoIndex - 1].id;
message.delete();
if(!guilds[message.guild.id].queue[0] || !guilds[message.guild.id].isPlaying) {
fetchVideoInfo(id, function(err, videoInfo) {
if (err) throw new Error(err);
if(videoInfo.duration > 1800) return message.channel.send(`**:x: | لا أستطيع تشغيل أغنيه مدتها فوق 30 دقيقة**`).then(message.react(nope));
if(!message.member.voiceChannel) return message.channel.send(novc);
else message.react("✔")
playMusic(id, message);
guilds[message.guild.id].isPlaying = true;
guilds[message.guild.id].queue.push(id);
guilds[message.guild.id].queueNames.push(videos[videoIndex - 1].title);
message.channel.send(`** :notes: | يعمل الأن : \`\`${videos[videoIndex - 1].title}\`\`**`);
});
} else {
        fetchVideoInfo(`${id}`, function(err, videoInfo) {
            if (err) throw new Error(err);
            if(videoInfo.duration > 1800) return message.channel.send(`**:x: | لا أستطيع تشغيل أغنيه مدتها فوق 30 دقيقة**`).then(message.react(nope));
            else message.react("✔")
            add_to_queue(id, message);
            message.channel.send(new RichEmbed()
            .setAuthor("Added to queue", message.author.avatarURL)
            .setTitle(videoInfo.title)
            .setURL(videoInfo.url)
            .addField("القناة : ", videoInfo.owner, true)
            .addField("مدة الأغنية : ", convert.fromS(videoInfo.duration, 'mm:ss') , true)
            .addField("نشر في : ", videoInfo.datePublished, true)
            .addField("مكانها في القائمة : ", guilds[message.guild.id].queueNames.length, true)
            .setColor("RED")
            .setThumbnail(videoInfo.thumbnailUrl)
            )
            guilds[message.guild.id].queueNames.push(videoInfo.title);
        });
}
    }
 
else if (mess.startsWith(prefix + 'vol') || mess.startsWith(prefix + "volume")|| mess.startsWith(prefix+"صوت")) {
    if (!message.member.voiceChannel) return message.channel.send(novc);
    if (!guilds[message.guild.id].isPlaying) return message.channel.send("**:x: | لا شيء يعمل هنا**")
    if(!args) return message.channel.send(`**:loud_sound: | الصوت الحالي :** ${guilds[message.guild.id].dispatcher.volume*100}`)
    if(isNaN(args)) return message.channel.send(`**:x: | الصوت بالارقام فقط**`)
    if (args > 200) return message.channel.send('**:headphones: | لدواعي صحية | لا يجب أن يعلو الصوت عن 200 .**');
    if (args < 1) return message.channel.send("**:headphones: | الصوت بين 1 و 200 .**");
    guilds[message.guild.id].dispatcher.setVolume((0.01 * parseInt(args)))
    guilds[message.guild.id].volume = 0.01 * parseInt(args)
    message.channel.send(`**:loud_sound: | الصوت :** ${guilds[message.guild.id].dispatcher.volume*100}`);
}
 
 
else if (mess.startsWith(prefix + 'pause') || mess.startsWith(prefix+"وقف")) {
    if (!message.member.voiceChannel) return message.channel.send(novc);
    if(guilds[message.guild.id].isPlaying !== true || !guilds[message.guild.id].queue[0]) return message.channel.send(`**:x: | لا شيء يعمل هنا**`)
    if (guilds[message.guild.id].dispatcher.paused === true) return message.channel.send("*:hash: | متوقف بالفعل*")
    message.channel.send(':pause_button: **توقف**').then(() => {
        guilds[message.guild.id].dispatcher.pause(false);
    });
}
 
else if (mess.startsWith(prefix + 'resume') || mess.startsWith(prefix+"كمل")) {
    if (!message.member.voiceChannel) return message.channel.send(novc);
    if (guilds[message.guild.id].dispatcher.paused === false) return message.channel.send("*:hash: | لا يوجد شيء لتكملتة*")
    message.channel.send(':play_pause: **مكتمل**').then(() => {
        guilds[message.guild.id].dispatcher.resume();
    });
}
 
else if (mess.startsWith(prefix + 'loop') || mess.startsWith(prefix+"عيد")) {
    if (!message.member.voiceChannel) return message.channel.send(novc);
    if (!guilds[message.guild.id].isPlaying) return message.channel.send("**:x: | لا شيء يعمل هنا**")
    if(guilds[message.guild.id].loop === true) {
        message.channel.send(`:arrow_right_hook: | **التكرار متوقف**`)
        guilds[message.guild.id].loop = false;        
        return;
    } else if(guilds[message.guild.id].loop === false) {
    guilds[message.guild.id].loop = true;
    message.channel.send(':repeat_one: | **التكرار مفتوح**')
    return;
    }
   
}
 
else if (mess.startsWith(prefix + 'clear') || mess.startsWith(prefix+"نظف")) {
    if (!message.member.voiceChannel) return message.channel.send(novc);
    if(!guilds[message.guild.id].queueNames[0] || !guilds[message.guild.id].isPlaying) return message.channel.send(`**:x: | لا شيء يعمل هنا**`)
   if(guilds[message.guild.id].queueNames.length > 1) {
    if(!args || isNaN(args) && args != 0) {
    guilds[message.guild.id].queueNames.splice(1, guilds[message.guild.id].queueNames.length)
    guilds[message.guild.id].queue.splice(1, guilds[message.guild.id].queue.length)
    message.channel.send(`:asterisk: | تم مسح القائمة من : **${message.guild.name}**`)
    } else if(args > 0) {
        const removedsong = guilds[message.guild.id].queueNames[parseInt(args)]
        if(!removedsong) return message.channel.send(`:x: | **لا يوجد مثل هذا العنصر ، أو العنصر غير موجود **`)
       
        guilds[message.guild.id].queueNames.splice(parseInt(args), 1)
        guilds[message.guild.id].queue.splice(parseInt(args), 1)
        return message.channel.send(`:wastebasket: | تمت ازالة **${removedsong}** من القائمة.`);}
   } else if(guilds[message.guild.id].queueNames.length <= 1 ) {
       message.channel.send(`**:x: | يوجد عنصر واحد في القائمة , من الأفضل أن تستخدم أمر : \`$skip\`.**`)
   }
}
});
 
async function skip_song(message) {
  await guilds[message.guild.id].dispatcher.end();
}
 
async function playMusic(id, message) {
    guilds[message.guild.id].voiceChannel = message.member.voiceChannel;
    guilds[message.guild.id].voiceChannel.join().then(function(connection) {
        if(!isYoutube(id) && id.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi)) {
            stream = id
        } else {
        stream = ytdl("https://www.youtube.com/watch?v=" + id, {
            filter: 'audioonly',
            quality: 'highestaudio',
            audioEncoding: "opus"
        })};
        guilds[message.guild.id].skipReq = 0;
        guilds[message.guild.id].skippers = [];
        guilds[message.guild.id].dispatcher = connection.playStream(stream, {bitrate: "auto", volume: guilds[message.guild.id].volume})
        guilds[message.guild.id].dispatcher.on('end', async function() {
            guilds[message.guild.id].skipReq = 0;
            guilds[message.guild.id].skippers = [];
           if(guilds[message.guild.id].loop === true) return playMusic(guilds[message.guild.id].queue[0], message)
           else                      
           await guilds[message.guild.id].queue.shift();
           await guilds[message.guild.id].queueNames.shift();
            if (guilds[message.guild.id].queue.length === 0) {
                guilds[message.guild.id].queue = [];          
                guilds[message.guild.id].queueNames = [];
                guilds[message.guild.id].isPlaying = false;
                setTimeout(function() {
                if(guilds[message.guild.id].voiceChannel !== null) return message.channel.send(`**:stop_button: | أنتهت الأغنية.** `)
            }, 1000)
            } else {
                setTimeout(async function() {
                    if(!guilds[message.guild.id].queueNames || guilds[message.guild.id].queueNames[0] == undefined) return;
                    await playMusic(guilds[message.guild.id].queue[0], message);
                   message.channel.send(`**:notes: | يعمل الأن : \`\`${guilds[message.guild.id].queueNames[0]}\`\`**`)
                }, 500);
            }
        });
        guilds[message.guild.id].dispatcher.on('error', function(error) {
          return message.channel.send(`:x: | خطأ \`\`\`${error}\`\`\``)
        });
    });
}
 
async function getID(str, cb) {
    if (isYoutube(str)) {
         const video = await youtube.getVideo(str)
         cb(video.raw.id);
    } else {
        const video = await youtube.searchVideos(str, 1)
        if(!video) return cb(null);
        cb(video.map(m => m.id).toString());
    }
}
 
function add_to_queue(strID, message) {
    if (isYoutube(strID)) {
        guilds[message.guild.id].queue.push(getYouTubeID(strID));
    } else {
        guilds[message.guild.id].queue.push(strID);
    }
}
 
function isYoutube(str) {
    return str.toLowerCase().indexOf("youtube.com") > -1 || str.toLowerCase().indexOf("youtu.be") > -1;
}

client.login(process.env.BOT_TOKEN);
