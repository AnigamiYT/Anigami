const { token } = require('./token.js');
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const constants = require('./constants.js');

let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

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
    const prefix = '!!';
    const msg_arr_normal_case = message.content.split(" ");
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
            userData = bot.commands.get("claim_daily").execute(message, userData);
            break;
        }
    
        case prefix + 'WEEKLY': {
            userData = bot.commands.get("claim_weekly").execute(message, userData);
            break;
        }

        case prefix + 'MONTHLY': {
            userData = bot.commands.get("claim_monthly").execute(message, userData);
            break;
        }

        case prefix + 'RESTRUCT': {
            
            let oldData = require( "./Storage/oldData.json" )
            for ( const userID in oldData ) {

                let fixed = oldData[userID]

                let temp = {
                    characters: {},
                    weapons: {}
                }

                for ( const item in fixed.inventory ) {

                    const kappa = ( characters ) => {
                        for (let i=0; i < fixed.inventory[item]; i++) {
                            characters[item] = { 
                                rank: 1,
                                level: 1,
                                constellation_level: 0,
                                current_exp: 0,
                                current_health: 1, //! CHANGE THIS WITH VALUE FROM CHARACTER CONSTANTS
                                equipped_item: "", //! Make this a reference to the inventory value when changed with command
                            }
                        }
                    }

                    // Characters
                    if ( constants.characters4Star.includes( item ) ) {
                        if (!temp.characters.four_star) { temp.characters.four_star = {} }
                        kappa(temp.characters.four_star)

                    } else if ( constants.characters5Star.includes( item ) ) {
                        if (!temp.characters.five_star) { temp.characters.five_star = {} }
                        kappa(temp.characters.five_star)

                    } else if ( constants.characters6Star.includes( item ) ) {
                        if (!temp.characters.six_star) { temp.characters.six_star = {} }
                        kappa(temp.characters.six_star)
                    
                    
                        // Weapons
                    } else if ( constants.weapons3Star.includes( item ) ) {
                        if (!temp.weapons.three_star) { temp.weapons.three_star = {} }
                        let weapons = temp.weapons.three_star

                        if (!weapons[ item ]) { weapons[item] = [] }
                        for (let i=0; i < fixed.inventory[item]; i++) {
                            weapons[item].push({ 
                                rank: 1,
                                level: 1,
                                stored_exp: 0,
                                isEquipped: ""
                            })
                        }
                    } else if ( item === "4-Star-Weapon" ) {
                        temp.star4 = temp.star4 + 1 || 1

                    } else if ( item === "5-Star-Weapon" ) {
                        temp.star5 = temp.star5 + 1 || 1
                    }
                    
                }
                
                delete fixed.inventory
                fixed.inventory = temp
                
                fs.writeFile(`Storage/players/${userID}.json`, JSON.stringify(fixed, null, 4), (err) => {
                    if (err) console.error(err);
                });
            }
            return;
        }

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
    userData[sender.id].messageSent++;
    if (msg.length < 20)
        userData[sender.id].primogems += msg.length;
    else
        userData[sender.id].primogems += 20;
    fs.writeFile('Storage/userData.json', JSON.stringify(userData, null, 4), (err) => {
        if (err) console.error(err);
    });

});