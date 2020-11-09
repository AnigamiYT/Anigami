const { token, database } = require('./credentials.js');
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const constants = require('./constants.js');
var mysql = require('mysql')

var con = mysql.createConnection(database);

// Importing Functions
bot.commands = new Discord.Collection();
var commandFiles = fs.readdirSync('./commands/admin_commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/admin_commands/${file}`);
    bot.commands.set(command.name, command);
}
commandFiles = fs.readdirSync('./commands/user_commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/user_commands/${file}`);
    bot.commands.set(command.name, command);
}

commandFiles = fs.readdirSync('./commands/utility_commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/utility_commands/${file}`);
    bot.commands.set(command.name, command);
}
// ======================================================= //

con.connect(function(err) {
    if (err) throw err;
        console.log("MySQL connected!");
});

bot.once('ready', () => {
    console.log('Anigami is Here!');
    var minute = 1000 * 60;
    setInterval(() => {
        con.query(`UPDATE USERDATA SET RESIN=RESIN + 1 WHERE RESIN < 120`);
    }, minute);
})

bot.login(token);

bot.on('message', async message => {
    if (!message.member)
            return;

    if (message.member.id !== '197673134885699585')
        return;

    const sender = message.author;
    const msg = message.content.toUpperCase();
    const prefix = '~!';
    const msg_arr = msg.split(" ");
    const msg_arr_normal_case = message.content.split(" ");
    const path = `./Storage/players/${sender.id}.json`;
    let multiplier = 1;
    let userData;
    var isBooster = 0;
    var isPatron = 0;

    const channelListPath = './config/channelList.json'
    const allowedChannels = JSON.parse(fs.readFileSync(channelListPath, 'utf8'));
    const flagsListPath = './flags.json'
    const flags = JSON.parse(fs.readFileSync(flagsListPath, 'utf8'));

    if (msg_arr[0] === prefix + 'SQLQUERY' && sender.id === '197673134885699585') {
        msg_arr.shift();
        con.query(msg_arr.join(' '), console.log);
        return;
    }

    // MAIN PROGRAM AFTER SQL QUERY
    con.query(`SELECT * FROM USERDATA WHERE DISCORDID=${sender.id}`, (err, result, fields) => {
        if (err)
            throw err;
        if (result.length === 0) {
            con.query(`INSERT INTO USERDATA (DISCORDID, DATA) VALUES (${sender.id}, '${JSON.stringify(constants.userInitialState)}');`);
            return;
        }
        userData = JSON.parse(result[0].DATA.toString());
        var resin = result[0].RESIN;
        var mora = result[0].MORA;

        if (message.member.hasPermission("ADMINISTRATOR") || allowedChannels[message.channel.id] === true) {
            if (message.member.roles.cache.has('769411892326039612')) {
                multiplier = 2;
                isBooster = 1;
            }
    
            if (message.member.roles.cache.has('769251426764455937')) {
                multiplier = 5;
                isPatron = 1;
            }
    
            if (message.author.bot) {
                return; 
            }
        
            
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
            
                case prefix + 'RESIN': {
                    bot.commands.get("check_resin").execute(message, resin);
                    break;
                }

                case prefix + 'RESIN_RESET': {
                    if (sender.id === '197673134885699585') {
                        con.query(`UPDATE USERDATA SET RESIN=120`);
                        message.channel.send('All Resin has been reset...', 'utf8');    
                    }
                    return;
                }

                case prefix + 'LEYLINE': {
                    [userData, resin, mora] = bot.commands.get("fight_leyline").execute(message, userData, msg_arr, resin, mora);
                    break;
                }
            
                case prefix + 'PROFILE': {
                    bot.commands.get("check_profile").execute(message, userData, mora);
                    return;
                }
    
                case prefix + 'FLIP': {
                    userData = bot.commands.get("flip_primogems").execute(message, userData, msg_arr);
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
            
                case prefix + 'WHALEPULL': {
                    userData = bot.commands.get("whale_pull").execute(message, userData);
                    break;
                }
            
                // NOT IN USE FOR NOW
                // case prefix + 'INVENTORY': {
                //     bot.commands.get("check_inventory").execute(message, userData);
                //     break;
                // }
            
                case prefix + 'WEAPONS': {
                    bot.commands.get("check_weapons").execute(message, userData, msg_arr_normal_case);
                    break;
                }
            
                case prefix + 'UPGRADE': {
                    userData = bot.commands.get("upgrade_weapon").execute(message, userData, msg_arr_normal_case);
                    break;
                }
            
                case prefix + 'CHARACTERS': {
                    bot.commands.get("check_characters").execute(message, userData, msg_arr_normal_case);
                    break;
                }
            
                case prefix + 'PARTY': {
                    bot.commands.get("party_setup").execute(message, userData, msg_arr_normal_case, isBooster, isPatron, con);
                    break;
                }
            
                case prefix + 'EQUIP': {
                    bot.commands.get("equip_weapon").execute(message, userData, msg_arr_normal_case);
                    break;
                }
            
                case prefix + 'DAILY': {
                    userData = bot.commands.get("claim_daily").execute(message, userData, multiplier);
                    break;
                }
            
                case prefix + 'WEEKLY': {
                    userData = bot.commands.get("claim_weekly").execute(message, userData, multiplier);
                    break;
                }
        
                case prefix + 'MONTHLY': {
                    userData = bot.commands.get("claim_monthly").execute(message, userData, multiplier);
                    break;
                }
    
                case prefix + 'WHITELIST': {
                    bot.commands.get("channel_whitelist").execute(message, allowedChannels);
                    return;
                }
        
                case prefix + 'BLACKLIST': {
                    bot.commands.get("channel_blacklist").execute(message, allowedChannels);
                    return;
                }
    
                case prefix + 'GENERATE_WEAPON_CONSTANTS': {
                    bot.commands.get("generate_weapon_constants").execute(message);
                    return;
                }
        
                case prefix + 'GENERATE_CHARACTER_CONSTANTS': {
                    bot.commands.get("generate_character_constants").execute(message);
                    return;
                }
    
                // case prefix + 'DELETE_FOLDER': {
                //     if (message.member.id === '197673134885699585') {
                //         message.channel.send(`Deleting...`);
                //         fs.rmdir(msg_arr_normal_case[1], { recursive: true }, (err) => {
                //             if (err) {
                //                 throw err;
                //             }                        
                //         });    
                //         message.channel.send(`${msg_arr[1]} is deleted!`);
                //     }
                //     return;
                // }
    
                case prefix + 'PRINT_FILE': {
                    if (message.author.id === '197673134885699585') {
                        userData = JSON.parse(fs.readFileSync(msg_arr_normal_case[1], 'utf8'));
                        console.log(userData);
                    }
                    return;
                }
        
                case prefix + 'DELETE_FILE': {
                    if (message.author.id === '197673134885699585') {
                        try {
                            fs.unlinkSync(msg_arr_normal_case[1]);
                        } catch (err) {
                            console.error(err);
                        }
                        message.channel.send('File successfully deleted...', 'utf8');
                    }
                    return;
                }
    
                // COMMANDS FOR ADMIN
                case prefix + 'GIVE': {
                    bot.commands.get("give_primogems").execute(message, msg_arr, con);
                    return;
                }
        
                // case prefix + 'GIVEALL': {
                //     bot.commands.get("give_all_primogems").execute(message, msg_arr, con);
                //     message.channel.send('im here');
                //     return;
                // }
        
                case prefix + 'ENABLE': {
                    if (message.author.id === '197673134885699585' && flags.isEnabled === false){
                        bot.commands.get("give_all_primogems").execute(message, msg_arr);
                        message.channel.send(`Chat has been enabled.`);
                    }
                    else
                        message.channel.send(`Chat is already enabled.`);
                    return;
                }

                // case prefix + 'GIVE_WEAPON': {
                //     if (msg_arr[1] !== undefined && msg_arr[2] !== undefined)
                //         userData = bot.commands.get("give_weapon").execute(message, msg_arr_normal_case);
                //     break;
                // }
        
                // case prefix + 'GIVE_CHARACTER': {
                //     if (msg_arr[1] !== undefined && msg_arr[2] !== undefined)
                //         userData = bot.commands.get("give_character").execute(message, msg_arr_normal_case);
                //     break;
                // }
            }    
        
            // ALL EXECUTE
            userData.messageSent++;
            if (msg.length < 20)
                userData.primogems += msg.length * multiplier;
            else
                userData.primogems += 20 * multiplier;
            userData = JSON.stringify(userData).replace(/'/g,"\\'");
            con.query(`UPDATE USERDATA SET DATA='${userData}', RESIN=${resin}, MORA=${mora} WHERE DISCORDID=${sender.id};`);
        }
        return;
    });
});