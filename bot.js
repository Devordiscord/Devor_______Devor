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


client.on('message', message => {
    if (message.content.startsWith(prefix + "em") || message.content.startsWith(prefix + "ايموجي")) {
      message.channel.stopTyping(false);
      const e = JSON.parse(fs.readFileSync('./jsonfile/emoji.json', 'utf8'));
      const w = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk", "ll", "mm", "nn", "oo", "pp", "qq", "rr", "ss", "tt", "uu", "vv", "ww", "xx", "yy", "zz"]
      var c = `${w[Math.floor(Math.random() * w.length)]}`

      //----
      const embed = new Discord.RichEmbed()
        .setColor('0bbaba')
        .setTitle(`** ابحث عن الايموجي القادم ! :mag_right:  **`)
        .setThumbnail(e[c].ques)
        .setFooter(`امامك 15 ثانية فقط !`)

      message.channel.sendEmbed(embed).then((mm12) => {
        setTimeout(() => {
          mm12.edit(new Discord.RichEmbed()
            .setColor('0bbaba')
            .setTitle(`** هل تذكره ؟؟ **`)
            .setThumbnail("https://cdn.discordapp.com/attachments/384692091256700928/447522745304219658/iReHvIZ.png")
            .setFooter(`امامك 15 ثانية فقط !`))
        }, 2555)
      })
      message.channel.stopTyping(true);

      var mm1 = setTimeout(() => {
        const embed = new Discord.RichEmbed()
          .setColor(0xff0000)
          .setDescription(" :stopwatch: | ` انتهى الوقت `")
        message.channel.sendEmbed(embed);

      }, gamesTime);

      const collector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, {
        max: 1,
        time: gamesTime,
        errors: ['time']
      });
      collector.on('collect', r => {
        if (r.content.startsWith(e[c].ans)) {
          const embed = new Discord.RichEmbed()
            .setDescription('✅ | **``صح عليك``** \n `+150 Credit` \n \n `لقد اتممت الاجابة في :' + `${moment(r.createdTimestamp - message.createdTimestamp).format(`ss`)}` + " ثانية`")
            .setColor('RANDOM')
          message.channel.send(embed).then(() => {
            clearTimeout(mm1)
          })

          sql.run(`UPDATE scores SET credit = ${row.credit + 150} WHERE userId = ${message.author.id}`);
          return;
        } else {
          const embed = new Discord.RichEmbed()
            .setDescription('❌ | **``الاجابة خاطئة``** ')
            .setColor('RANDOM')
          message.channel.send(embed).then(() => {
            clearTimeout(mm1)
          })
        }
      })
    }

    if (message.content.startsWith(prefix + "le") || message.content.startsWith(prefix + "فكك")) {
      x = ['القسطنطينية', 'فلسطين', 'يوتيوب', 'بوت', 'دسكورد', 'سيرفر', 'اسبوت', 'بروبوت', 'العربية', 'الأجانب', 'عبارات', 'فورتنايت', 'ببجي موبايل', 'نينتي ناين', 'الميااه', 'قدمين', 'السيرفرات', 'الدول', 'لبنان', 'سوريا', 'مصر', 'الجزائر', 'العباسيون', 'الحمدانيون', 'السيرفر روعة', 'افضل بوت اسبوت', 'كريديت اس بوت', 'الغرب و الشرق', 'العهد السلجوقي', 'الحاكم', 'انه مربى لذيذ و جيد', 'المحترفون العرب', 'اكو عرب بالطيارة', 'فككني انا', 'السيرفر قمد'];
      x2 = ['ا ل ق س ط ن ط ي ن ي ة', 'ف ل س ط ي ن', 'ي و ت ي و ب', 'ب و ت', 'د س ك و ر د', 'س ي ر ف ر', 'ا س ب و ت', 'ب ر و ب و ت', 'ا ل ع ر ب ي ة', 'ا ل أ ج ا ن ب', 'ع ب ا ر ا ت', 'ف و ر ت ن ا ي ت', 'ب ب ج ي م و ب ا ي ل', 'ن ي ن ت ي ن ا ي ن', 'ا ل م ي ا ا ه', 'ق د م ي ن', 'ا ل س ي ر ف ر ا ت', 'ا ل د و ل', 'ل ب ن ا ن', 'س و ر ي ا', 'م ص ر', 'ا ل ج ز ا ئ ر', 'ا ل ع ب ا س ي و ن', 'ا ل ح م د ا ن ي و ن', 'ا ل س ي ر ف ر ر و ع ة', 'ا ف ض ل ب و ت ا س ب و ت', 'ك ر ي د ي ت ا س ب و ت', 'ا ل غ ر ب و ا ل ش ر ق', 'ا ل ع ه د ا ل س ل ج و ق ي', 'ا ل ح ا ك م', 'ا ن ه م ر ب ى ل ذ ي ذ و ج ي د', 'ا ل م ح ت ر ف و ن ا ل ع ر ب', 'ا ك و ع ر ب ب ا ل ط ي ا ر ة', 'ف ك ك ن ي ا ن ا', 'ا ل س ي ر ف ر ق م د'];
      var x3 = Math.floor(Math.random() * x.length)

      var fkkemb = new Discord.RichEmbed()
        .setAuthor(`📋 SBot Games | فكك`, message.guild.iconURL)
        .setTitle(`**\`${x[x3]}\`**`)
        .setFooter(message.author.username, message.author.avatarURL)

      message.channel.send(fkkemb)
      message.channel.stopTyping();

      var mm1 = setTimeout(() => {
        const embed = new Discord.RichEmbed()
          .setColor(0xff0000)
          .setDescription(" :stopwatch: | ` انتهى الوقت `")
        message.channel.sendEmbed(embed);
        if (row.pointsFkk <= 0) return;
      }, gamesTime);

      const collector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, {
        max: 1,
        time: gamesTime,
        errors: ['time']
      });
      collector.on('collect', r => {
        if (r.content == x2[x3]) {
          const embed = new Discord.RichEmbed()
            .setDescription('✅ | **``صح عليك``** \n `+100 Credits` \n \n `لقد اتممت الاجابة في :' + `${moment(r.createdTimestamp - message.createdTimestamp).format(`ss`)}` + " ثانية`")
            .setColor('RANDOM')
          message.channel.send(embed).then(() => {
            clearTimeout(mm1)
          })

          sql.run(`UPDATE scores SET credit = ${row.credit + 100} WHERE userId = ${message.author.id}`);
          return;
        } else {
          const embed = new Discord.RichEmbed()
            .setDescription('❌ | **``الاجابة خاطئة``**')
            .setColor('RANDOM')
          message.channel.send(embed).then(() => {
            clearTimeout(mm1)
          })
        }
      })

    }
    if (message.content.startsWith(prefix + "fa") || message.content.startsWith(prefix + "سرعة")) {
      y = ['دًيسكًَورد', 'الله اكًبًر', 'سبًحاًن الله', 'بسًًًًًًًم الله', 'مًًًًًصر', 'السعًًًًًًًودُُُُُُية', 'الًَُبرمجة حًَُياتي', 'ذهب محًُمد الى الًُمدرسة', 'اًن الله يًُحب المؤمًُنين', 'اينًَُشتاين', 'بريطاًَنيا', 'ابو بًَكر الصديق', 'كريستًُيانو', 'مُيسي', 'نيُمار', 'ديبٍالا', 'فيسٍبوك موٍقع تواصل اجتًماعي', 'تويتر موقع تواصل اجتٍماعي', 'انًُستجرام يحًًُبه الجميع', 'السيزون السابع فوًُرتنايت', 'فورتًُنايت', 'مصطفى جًُيم اوفر', 'لاست مًُودد'];
      y2 = ['ديسكورد', 'الله اكبر', 'سبحان الله', 'بسم الله', 'مصر', 'السعودية', 'البرمجة حياتي', 'ذهب محمد الى المدرسة', 'ان الله يحب المؤمنين', 'اينشتاين', 'بريطانيا', 'ابو بكر الصديق', 'كريستيانو', 'ميسي', 'نيمار', 'ديبالا', 'فيسبوك موقع تواصل اجتماعي', 'تويتر موقع تواصل اجتماعي', 'انستجرام يحبه الجميع', 'السيزون السابع فورتنايت', 'فورتنايت', 'مصطفى جيم اوفر', 'لاست مودد'];
      var y3 = Math.floor(Math.random() * y.length)

      var fastem = new Discord.RichEmbed()
        .setAuthor(`📋 SBot Games | اسرع كتابة`, message.guild.iconURL)
        .setTitle(`**\`${y[y3]}\`**`)
        .setDescription(`اكتبها بلا حركات`)
        .setFooter(message.author.username, message.author.avatarURL)

      message.channel.send(fastem)
      message.channel.stopTyping();

      var mm1 = setTimeout(() => {
        const embed1 = new Discord.RichEmbed()
          .setColor(0xff0000)
          .setDescription(" :stopwatch: | ` انتهى الوقت `")
        message.channel.sendEmbed(embed1);
      }, gamesTime);

      const collector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, {
        max: 1,
        time: gamesTime,
        errors: ['time']
      });
      collector.on('collect', r => {
        if (r.content == y2[y3]) {
          const embed2 = new Discord.RichEmbed()
            .setDescription('✅ | **``صح عليك``** \n `+100 Credits` \n \n `لقد اتممت الاجابة في :' + `${moment(r.createdTimestamp - message.createdTimestamp).format(`ss`)}` + " ثانية`")
            .setColor('RANDOM')
          message.channel.send(embed2).then(() => {
            clearTimeout(mm1)
          })

          sql.run(`UPDATE scores SET credit = ${row.credit + 100} WHERE userId = ${message.author.id}`);
          return;
        } else {
          const embed3 = new Discord.RichEmbed()
            .setDescription('❌ | **``الاجابة خاطئة``** ')
            .setColor('RANDOM')
          message.channel.send(embed3).then(() => {
            clearTimeout(mm1)
          })
        }
      })

    }

    if (message.content == prefix + "ma" || message.content == prefix + "حساب") {
      m = ['13*10', '(50/10)*1', '25*3', '90/2', '9/9', '5-4+3-2+1', '15/5', '50*3', '(5*2)+(2*3)', '1111*1', '2*9*1', '((10+10)*0)+20', '11+9+1', '(5+5+5+5*1)+2', '(15*2)+1', '(39+1)*0', '(22+1+3)*2', '(5-4)-1', '(9*2)+1', '10-8', '100/10', '999+1.5', '5+1+9', '2*2'];
      m2 = ['130', '5', '75', '45', '1', '3', '3', '150', '16', '1111', '18', '20', '21', '22', '31', '0', '52', '0', '19', '2', '10', '1000.5', '15', '4'];
      var m3 = Math.floor(Math.random() * m.length)

      var mathem = new Discord.RichEmbed()
        .setAuthor(`📋 SBot Games | رياضيات`, message.guild.iconURL)
        .setTitle(`**\`${m[m3]}\`**`)
        .setFooter(message.author.username, message.author.avatarURL)

      message.channel.send(mathem)
      message.channel.stopTyping();

      var mm1 = setTimeout(() => {
        const embed5 = new Discord.RichEmbed()
          .setColor(0xff0000)
          .setDescription(" :stopwatch: | ` انتهى الوقت `")
        message.channel.sendEmbed(embed5);
        if (row.pointsFkk <= 0) return;
      }, gamesTime);

      const collector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, {
        max: 1,
        time: gamesTime,
        errors: ['time']
      });
      collector.on('collect', r => {
        if (r.content == m2[m3]) {
          const embed6 = new Discord.RichEmbed()
            .setDescription('✅ | **``صح عليك``** \n `+100 Credits` \n \n `لقد اتممت الاجابة في :' + `${moment(r.createdTimestamp - message.createdTimestamp).format(`ss`)}` + " ثانية`")
            .setColor('RANDOM')
          message.channel.send(embed6).then(() => {
            clearTimeout(mm1)
          })

          sql.run(`UPDATE scores SET credit = ${row.credit + 100} WHERE userId = ${message.author.id}`);
          return;
        } else {
          const embed7 = new Discord.RichEmbed()
            .setDescription('❌ | **``الاجابة خاطئة``** ')
            .setColor('RANDOM')
          message.channel.send(embed7).then(() => {
            clearTimeout(mm1)
          })
        }
      })

    }



    if (message.content.startsWith(prefix + "casino")) {
      if (row.credit < 999) return message.reply(`**:x: | ليس لديك المبلغ المطلوب للعب هذه اللعبة**`);

      let micas = ['-', '+', '-', '-', '-', '-', '-', '+', '-', '-']
      let micas1 = `${micas[Math.floor(Math.random() * micas.length)]}`
      let first = Math.floor(Math.random() * 9);
      let second = Math.floor(Math.random() * 9);
      let third = Math.floor(Math.random() * 9);
      let num = `${micas1}${first}${second}${third}`;

      var casino = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`** :moneybag: , Casino**`)
        .setDescription(`**كم بكتابه اي شيء عشوائي**`)
        .setFooter('**Sbot**')

      message.channel.send(casino).then(m => {

        message.channel.awaitMessages(r => r.author.id === message.author.id, {
          max: 1,
          time: 20000,
          errors: ['time']
        }).then(collected => {

          let c = collected.first();
          if (c.content === num) {

          } else {
            message.channel.send(`**لقد حصلــت على \`${num}\` كرديت**`)
            sql.run(`UPDATE scores SET credit = ${row.credit + num} WHERE userId = ${message.author.id}`);
          };
        });
      });
    };
  });
});
	      

client.login(process.env.BOT_TOKEN);
