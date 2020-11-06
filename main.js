const { token } = require('./token.js');
const Discord = require('discord.js');
const Canvas = require('canvas');
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

bot.on('message', async message => {
    if (!message.member)
            return;

    // if (message.member.id !== '197673134885699585')
    //     return;

    const sender = message.author;
    const msg = message.content.toUpperCase();
    const prefix = '!';
    const msg_arr = msg.split(" ");
    const msg_arr_normal_case = message.content.split(" ");
    const path = `./Storage/players/${sender.id}.json`;
    const channelListPath = './config/channelList.json'
    let multiplier = 1;
    const allowedChannels = JSON.parse(fs.readFileSync(channelListPath, 'utf8'));
    let userData;

    roundRect = (ctx, x, y, height, width, radius, fill, stroke) => {
        if (typeof stroke === 'undefined') {
          stroke = true;
        }
        if (typeof radius === 'undefined') {
          radius = 5;
        }
        if (typeof radius === 'number') {
          radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } else {
          var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
          for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
          }
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) {
          ctx.fill();
        }
        if (stroke) {
          ctx.stroke();
        }
      }
    
    if (fs.existsSync(path)) {
        var read;
        try {
            read = fs.readFileSync(path, 'utf8');
        if (read.length > 0)
            userData = JSON.parse(read);
        else 
            userData = undefined;
        } catch {
            console.log('sender id', sender.id);
        }
    }
    else 
        userData = undefined;

    if (!userData) {
        fs.writeFile(`Storage/players/${sender.id}.json`, JSON.stringify(constants.userInitialState, null, 4), (err) => {
            if (err) console.error(`ERROR WRITING ${sender.id} ${err}`);
        });
        return;
    }

    if (message.member.hasPermission("ADMINISTRATOR") || allowedChannels[message.channel.id] === true) {
        if (message.member.roles.cache.has('769251426764455937'))
            multiplier = 5;

        else if (message.member.roles.cache.has('769411892326039612'))
            multiplier = 2;

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
        
            case prefix + 'PROFILE': {
                const canvas = Canvas.createCanvas(700, 250);
                const ctx = canvas.getContext('2d');
            
                const background = await Canvas.loadImage('img/playerinfo.jpg');
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            
                ctx.strokeStyle = '#74037b';
                ctx.strokeRect(0, 0, canvas.width, canvas.height);
            

                // Print name
                ctx.font = '32px sans-serif';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(message.member.displayName, 263, 60);
            
                // Print Primogems
                ctx.textAlign = "end"
                ctx.font = '24px sans-serif';
                ctx.fillText(userData.primogems, 390, 223);

                // Print Mora
                ctx.fillText('0', 613, 223);

                // Print World Rank
                ctx.textAlign = "start"
                ctx.font = '24px sans-serif';
                ctx.fillText(`Adventure Rank: 0`, 263, 140);
                ctx.fillText(`World Rank: 0`, 263, 170);
            
                // To change the color on the rectangle, just manipulate the context
                ctx.strokeStyle = "rgba(255, 0, 0, 0)";
                ctx.fillStyle = "rgba(210, 132, 199, 0.8)";
                roundRect(ctx, 256, 71.5, 38.66, 420.53 * (0.5), 22, true);
                
                ctx.beginPath();
                ctx.arc(127, 127, 100, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
            
                const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
                ctx.drawImage(avatar, 27, 27, 200, 200);
            
                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
            
                message.channel.send(`Here is your profile, ${message.member}!`, attachment);
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

            case prefix + 'DELETE_FOLDER': {
                if (message.member.id === '197673134885699585') {
                    message.channel.send(`Deleting...`);
                    fs.rmdir(msg_arr_normal_case[1], { recursive: true }, (err) => {
                        if (err) {
                            throw err;
                        }                        
                    });    
                    message.channel.send(`${msg_arr[1]} is deleted!`);
                }
                return;
            }

            case prefix + 'PRINT_FILE': {
                if (message.member.id === '197673134885699585') {
                    userData = JSON.parse(fs.readFileSync(msg_arr_normal_case[1], 'utf8'));
                    console.log(userData);
                }
                return;
            }
    
            case prefix + 'DELETE_FILE': {
                if (message.member.id === '197673134885699585') {
                    try {
                        fs.unlinkSync(msg_arr_normal_case[1]);
                    } catch (err) {
                        console.error(err);
                    }
                    message.channel.send('File successfully deleted...', 'utf8');
                }
                return;
            }

            // case prefix + 'RESTRUCT': {
                
            //     if (!message.member.id("197673134885699585"))
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
            case prefix + 'GIVE': {
                if (msg_arr[1] !== undefined && msg_arr[2] !== undefined && sender.id === '197673134885699585'){
                    userData = bot.commands.get("give_primogems").execute(message, msg_arr);
                    const targetUser = msg_arr[1].slice(3, 21);
                    fs.writeFile(`Storage/players/${targetUser}.json`, JSON.stringify(userData, null, 4), (err) => {
                    if (err) console.error(err);
                    });
                }
                return;
            }
    
            case prefix + 'GIVEALL': {
                if (msg_arr[1] !== undefined && sender.id === '197673134885699585')
                    userData = bot.commands.get("give_all_primogems").execute(message, msg_arr);
                break;
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
        fs.writeFile(`Storage/players/${sender.id}.json`, JSON.stringify(userData, null, 4), (err) => {
            if (err) console.error(err);
        });
    }
});