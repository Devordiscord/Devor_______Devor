const Discord = require('discord.js');
const client = new Discord.Client();


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

client.on("ready", () => {
    client.user.setPresence({
      status: 'dnd',
      game: { 
         type: 0,
         name: 'إعلمْ أنْك إنسآن فآشِلْ',
         details: `I'm : Lorans - Developer and Programmer`,
         url: 'http://twitch.tv/Streammingg',
         state: `إنْ لَمْ تَجِد لكْ حآقدْ إعلمْ أنْك إنسآن فآشِلْ`,
        application_id: '281376075802476544',
         assets: {
            small_image: ``,
            small_text: ' Take This ! ' ,
            large_image: `555905567936479233`,
            large_text: `iLove you` }
    
      }
        });
    });
	      

client.login(process.env.BOT_TOKEN);
