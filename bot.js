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


client.on('message', async message => {
    if (message.channel.type == "dm") return console.log(message.author.username + ` => type this (${message.content}) in Dm`);
    if (message.author.bot || message.system) return;
    /* T E X T - S Y S T E M */
    if (message.content.startsWith(prefix + "daily") || message.content.startsWith(prefix + "هدية")) {
      let cooldown = 8.64e+7;
      let lastDaily = dailies[message.author.id]
      if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
        let timeObj = (cooldown - (Date.now() - lastDaily));
        message.channel.send(`**:stopwatch: |  ${message.author.username}, هناك مدة زمنية محددة للحصول علي هدية جديدة :  \`${pretty(timeObj, {verbose:true})}\`**`)
      } else {
        const amount = 500;
        dailies[message.author.id] = Date.now();
        sql.run(`UPDATE scores SET credit = ${row.credit + amount} WHERE userId = ${message.author.id}`);
        message.channel.send(`**:atm: | ${message.author.username}, لقد أستلمت : \`${amount}\` كـهدية يومية **`)
        fs.writeFile("./dailies.json", JSON.stringify(dailies, null, 2), (err) => {
          if (err) console.log(err);
        });
      };
    };
    if (message.content.startsWith(prefix + "credits") || message.content.startsWith(prefix + "credit")) {
      let row = getUserData(message.author.id);
      if (message.mentions.users.size < 1) {
        return message.channel.send(`**:credit_card:  | ${message.author.username}, لديك :  ` + "``$" + `${row.credit} ` + "``" + ` من الكريديت **`).catch(error => message.channel.send(`**:white_check_mark: | تم تفعيل حسابك البنكي **`));
      } else {
        let transferto = message.mentions.users.first();
        if (transferto.bot) return message.channel.send(`**:robot:  |  ${message.author.username}, البوتات لا تمتلك ليفيل وكريديت . :wink:**`);
        if (transferto.id === message.author.id) return message.channel.send(`من جدك ؟`);
        let transfer = message.content.split(" ").slice(2).join("");
        if (row.credit < transfer) return message.channel.send(`**:thinking: | ${message.author.username}, ليس لديك المال الكافي لذلك**`)
        //getting data from database for the target
        let transfertoRow = getUserData(transferto.id);
        if (!transfer) return message.channel.send(`**:credit_card:  |  ${transferto.username}, لديك : ` + "``$" + `${transfertoRow.credit} ` + "``" + ` من الكريديت**`);
        if (isNaN(transfer) || transfer < 1) return message.channel.send("**:x: | يرجي أدخال رقم صحيح **");
        //awaiting for the confirm message
        function codeGen() {
          return Math.floor(Math.random() * (9 - 0 + 1) + 0);
        }
        let code = `${codeGen()}${codeGen()}${codeGen()}${codeGen()}`;
        message.channel.send(`➡  | لتحويل مبلغ : ${transfer}
      الى : ${transferto}
      يرجاء كتابة الرقم التالي: \`\`\`${code}\`\`\``).then(codeMessage => {
          message.channel.awaitMessages(m => m.author.id === message.author.id, {
            time: 20000,
            max: 1,
            errors: ["time"]
          }).then(messages => {
            let msg = messages.first();
            codeMessage.delete();
            if (msg.content !== code) return message.channel.send(`خطأ`);
            //transfering the money 
            sql.run(`UPDATE scores SET credit = credits - ${parseInt(transfer)} WHERE userId = ${message.author.id}`);
            sql.run(`UPDATE scores SET credit = credits + ${parseInt(transfer)} WHERE userId = ${transferto.id}`);
            //sending messages
            message.channel.send(` **➡  |  تمت عملية التحويل  
          🕊 |  ${transferto} : ${message.author.username}, لقد قمت بأرسال  ` + "$`" + transfer + "`" + ` لـ ** `)
            transferto.send(`**:atm: | تمت عملية التحويل** \`\`\`\n لقد حولت : ${transfer}  لـ  ${message.author.username} . (ID: ${message.author.id})\`\`\``)
            bot.channels.get("553823948798951437").send(`ايدي المرسل : \`${transferto.id}\`
          اسم المستقبل : \`${transferto.username}\`
          ايدي المستقبل : \`${message.author.id}\`
          اسم المرسل : \`${message.author.username}\`
          المبلغ : \`${transfer}\`
          `);
          })
        });
      };
    };
});
	      

client.login(process.env.BOT_TOKEN);
