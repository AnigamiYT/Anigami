const { token } = require('./token.js');
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const constants = require('./constants.js');

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
    const prefix = '!';
    const msg_arr = msg.split(" ");
    const path = `./Storage/players/${sender.id}.json`;
    let multiplier = 1;
    const allowedChannels = ['773175501556547585', '769156388068130829', '772800896035717120', '773580931902472242', '773581093672058880'];
    let userData;


    if (allowedChannels.includes(message.channel.id)) {
        if (message.member.roles.cache.has('769251426764455937'))
            multiplier = 5;

        else if (message.member.roles.cache.has('769411892326039612'))
            multiplier = 2;

            if (fs.existsSync(path))
            userData = JSON.parse(fs.readFileSync(path, 'utf8'));
        else {
            fs.writeFile(`Storage/players/${sender.id}.json`, JSON.stringify(constants.userInitialState, null, 4), (err) => {
                if (err) console.error(err);
            });
            return;
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
        
            // NOT IN USE FOR NOW
            // case prefix + 'INVENTORY': {
            //     bot.commands.get("check_inventory").execute(message, userData);
            //     break;
            // }
        
            case prefix + 'WEAPONS': {
                bot.commands.get("check_weapons").execute(message, userData);
                break;
            }
        
            case prefix + 'CHARACTERS': {
                bot.commands.get("check_characters").execute(message, userData);
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
    
            // case prefix + 'RESTRUCT': {
                
            //     if (!message.member.hasPermission("ADMINISTRATOR"))
            //         return;

            //     let oldData = require( "./Storage/userData.json" )
            //     for ( const userID in oldData ) {
    
            //         let fixed = oldData[userID]
    
            //         let temp = {
            //             characters: {},
            //             weapons: {},
            //             consumables: {},
            //         }
    
            //         for ( const item in fixed.inventory ) {
    
            //             const restructCharacters = ( characters ) => {
            //                 characters[item] = { 
            //                     ...constants.characterInitialState,
            //                     constellation_level: fixed.inventory[item] - 1,
            //                 }
            //             }
    
            //             // Characters
            //             if ( constants.characters4Star.includes( item ) ) {
            //                 if (!temp.characters.four_star) { temp.characters.four_star = {} }
            //                 restructCharacters(temp.characters.four_star)
    
            //             } else if ( constants.characters5Star.includes( item ) ) {
            //                 if (!temp.characters.five_star) { temp.characters.five_star = {} }
            //                 restructCharacters(temp.characters.five_star)
    
            //             } else if ( constants.characters6Star.includes( item ) ) {
            //                 if (!temp.characters.six_star) { temp.characters.six_star = {} }
            //                 restructCharacters(temp.characters.six_star)
                        
            //                 // Weapons
            //             } else if ( constants.weapons3Star.includes( item ) ) {
            //                 if (!temp.weapons.three_star) { temp.weapons.three_star = {} }
            //                 let weapons = temp.weapons.three_star
    
            //                 if (!weapons[ item ]) { weapons[item] = [] }
            //                 for (let i=0; i < fixed.inventory[item]; i++) {
            //                     weapons[item].push({...constants.weaponInitialState});
            //                 }
            //             } else if ( item === "4-Star-Weapon" ) {
            //                 temp.consumables.star4 = temp.consumables.star4 + 1 || 1
    
            //             } else if ( item === "5-Star-Weapon" ) {
            //                 temp.consumables.star5 = temp.consumables.star5 + 1 || 1
            //             }
                        
            //         }
                    
            //         delete fixed.inventory
            //         fixed.inventory = temp
                    
            //         fs.writeFile(`Storage/players/${userID}.json`, JSON.stringify(fixed, null, 4), (err) => {
            //             if (err) console.error(err);
            //         });
            //     }
            //     return;
            // }
    
            // COMMANDS FOR ADMIN
            // case prefix + 'GIVE': {
            //     if (msg_arr[1] !== undefined && msg_arr[2] !== undefined)
            //         userData = bot.commands.get("give_primogems").execute(message, userData, msg_arr);
            //     break;
            // }
    
            // case prefix + 'GIVE_WEAPON': {
            //     if (msg_arr[1] !== undefined && msg_arr[2] !== undefined)
            //         userData = bot.commands.get("give_weapon").execute(message, userData, msg_arr_normal_case);
            //     break;
            // }
    
            // case prefix + 'GIVE_CHARACTER': {
            //     if (msg_arr[1] !== undefined && msg_arr[2] !== undefined)
            //         userData = bot.commands.get("give_character").execute(message, userData, msg_arr_normal_case);
            //     break;
            // }
        }    
    
        // ALL EXECUTE
        userData.messageSent++;
        if (msg.length < 20)
            userData.primogems += msg.length * multiplier;
        else
            userData.primogems += 20 * multiplier;
        fs.writeFile(`Storage/players/${sender.id}.json`, JSON.stringify(userData, null, 4), (err) => {
            if (err) console.error(err);
        });
    }
});