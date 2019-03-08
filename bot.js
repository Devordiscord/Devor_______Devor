const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const request = require('request');
const fs = require('fs');
const Canvas = require("canvas");
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
      if(top.length <= 0) return message.channel.send(`** لا يوجد أي عضو بالسيرفر لديه نقاط**`);
      let i = new RichEmbed();
      i.setAuthor(message.author.username, message.author.avatarURL);
      i.setColor("#36393e");
      i.addField(`- **قائمة المتصدرين :**`, `\n${top.slice(0, 10).map(r => `${zg} | **\`${o++}\`: <@${r.id}> ( \`النقاط : ${r.points}\` )**`).join('\n')}`);
 
      message.channel.send(i);
    } else if(mention) {
      if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`**\`Manage Server\` يجب ان يتوفر لديك صلاحية**`);
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
      if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`** \`Manage Server\` يجب ان يتوفر لديك صلاحية**`);
 
      gpoints[message.guild.id] = undefined;
      gpoints[message.guild.id] = {};
      message.channel.send(`** تم تصفير جميع النقاط**`);
    } else {
      err(message);
    }
  }
});
 
function err(message) {
  return message.channel.send(new RichEmbed()
.setTitle(` لقد قمت بكتابة شئ خاطئ`)
.setDescription(`** لأنقاص عدد من النقاط : \`${prefix}points @Lorans -1\`\n لزيادة عدد من النقاط : \`${prefix}points @Lorans +1\`\n لتصفير جميع نقاط اعضاء السيرفر : \`${prefix}points reset\`**`));
}

	      

client.login(process.env.BOT_TOKEN);
