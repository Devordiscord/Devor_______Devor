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
      status: 'IdIe',
      game: { 
         type: 0,
         name: '̨̨  أعلمْ أنْك إنسآن فآشِل',
         details: `Programmer . ⌬`,
         url: 'https://youtu.be/COoYr5eW6-A',
         state: `ۛ ּإنْ لَمْ تَجِد لكْ حآقدْ إعلمْ أنْك إنسآن فآشِل`,
        application_id: '483055655800930315',
         assets: {
            large_image: `477187715658547201`,
            large_text: `Take This !` }
    
      }
        });
    });
	      

client.login(process.env.BOT_TOKEN);
