const { token } = require('./token.js');
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const constants = require('./constants.js');
const { generalBanner, printObject } = require('./functions.js');

let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

// Cooldown Constants
const dailyCooldown = 8.64e+7;
const weeklyCooldown = 8.64e+7 * 7;
const monthlyCooldown = 8.64e+7 * 30;

// Importing Functions
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

// ======================================================= //

bot.once('ready', () => {
    console.log('Anigami is Here!');
})

bot.login(token);

bot.on('message', message => {

    const sender = message.author;
    const msg = message.content.toUpperCase();
    const prefix = '~!';
    const msg_arr = msg.split(" ");

    if (message.author.bot) {
        return; 
    }

    if (!userData[sender.id]) userData[sender.id] = {...constants.userInitialState, inventory: {}};
    
    // COMMANDS FOR ALL
    
    switch(msg_arr[0]) {
        case prefix + 'MESSAGES': {
            bot.commands.get("check_messages").execute(message, userData);
            break;
        }

        case prefix + 'PRIMOGEMS': {
            bot.commands.get("check_primogems").execute(message, userData);
            break;
        }
    
        case prefix + 'PULLS': {
            bot.commands.get("check_pulls").execute(message, userData);
            break;
        }
    
        case prefix + 'SINGLEPULL': {
            userData = bot.commands.get("single_pull").execute(message, userData);
            break;
        }
    
        case prefix + 'MULTIPULL': {
            userData = bot.commands.get("multi_pull").execute(message, userData);
            break;
        }
    
        case prefix + 'INVENTORY': {
            bot.commands.get("check_inventory").execute(message, userData);
            break;
        }
    
        case prefix + 'DAILY': {
            userData = bot.commands.get("claim_daily").execute(message, userData);
            break;
        }
    
        case prefix + 'WEEKLY': {
            userData = bot.commands.get("claim_weekly").execute(message, userData);
            break;
        }
        case prefix + 'GIVE': {
            userData = bot.commands.get("give_primogems").execute(message, userData, msg_arr);
            break;
        }
    }
        // COMMANDS FOR ADMIN
    

        // ALL EXECUTE
        userData[sender.id].messageSent++;
        if (msg.length < 20)
            userData[sender.id].primogems += msg.length;
        else
            userData[sender.id].primogems += 20;
        fs.writeFile('Storage/userData.json', JSON.stringify(userData, null, 4), (err) => {
            if (err) console.error(err);
        });

});