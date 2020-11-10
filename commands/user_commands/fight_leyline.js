module.exports = {
    name: 'fight_leyline',
    description: 'Fight Leylines',
    usage: 'PREFIX + LEYLINE',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, msg_arr, resin, mora) {
        if (resin < 10) {
            message.channel.send(`<@${message.member.id}> Not enough resin. You only have ${resin} <:A_resin:769909897210888204>`);
            return [userData, resin, mora];
        }

        const sender = message.author;
        const fs = require('fs');
        const { calcStats, getWeaponDamage } = require('../../functions.js');
        const characterConstants = JSON.parse(fs.readFileSync('constants/character.json', 'utf8'));
        const { 
            leylineOutcropsBaseARExp, 
            leylineOutcropsBaseAtk, 
            leylineOutcropsBaseCharExp, 
            leylineOutcropsBaseHp, 
            leylineOutcropsBaseMora,
    //      leylineEventBaseARExp, 
    //      leylineEventBaseAtk, 
    //      leylineEventBaseCharExp,    // this register the var that we will use bellow.
    //      leylineEventBaseHp, 
    //      leylineEventBaseMora,
    //      leylineEventBaseGem, 
            charLevelUpBaseExp,
            ARLevelUpBaseExp,
        } = require('../../constants.js');

        if (msg_arr[1] === 'OUTCROPS') {
            if (!/^\d+$/.test(msg_arr[2])) {
                message.channel.send(`<@${sender.id}> Enter a Valid Number`);
                return [userData, resin, mora];
            }
            var leylineAtk = leylineOutcropsBaseAtk * (1 + parseInt(msg_arr[2]));
            var leylineHp = leylineOutcropsBaseHp * (1 + parseInt(msg_arr[2]));

            var totalAtk = 0;
            var totalHp = 0;

            var msg = `<@${message.author.id}>\n`;

            partyList = userData.party;

            if(!partyList)
                return [userData, resin, mora];

            if (partyList.length > 4) {
                partyList = partyList.slice(0, 4);
                userData.party = partyList;
            }

            partyList.forEach((character) => {
                var charData = userData.inventory.characters[characterConstants[character].rarity_text][character];
                const weaponDamage = getWeaponDamage(userData, character);
                var [atk, hp] = calcStats(characterConstants[character].baseAtk, characterConstants[character].baseHp, charData.level, charData.constellation_level, weaponDamage);
                totalAtk += atk;
                totalHp += hp;
            });

            if (totalAtk > leylineAtk && totalHp > leylineHp) {
                if (userData.exp === undefined) {
                    userData.exp = 0;
                    userData.level = 1;
                }
                var expGained = leylineOutcropsBaseARExp * (1 + 0.25 * parseInt(msg_arr[2]));
                var charExpGained = leylineOutcropsBaseCharExp * (1 + 0.25 * parseInt(msg_arr[2]));
                var moraGained = leylineOutcropsBaseMora * (1 + 0.25 * parseInt(msg_arr[2]));

                // USER MORA REWARDS
                mora += moraGained;
                msg += `\nYou gained ${moraGained}<:A_mora:769909934359838721>. You now have ${mora}<:A_mora:769909934359838721>`

                // USER EXP REWARDS
                var oldARLevel = userData.level;
                userData.exp += expGained;
                msg += `\nYou gained ${expGained} AR Exp`
                while (userData.exp >= ARLevelUpBaseExp * userData.level) {
                    userData.exp -= ARLevelUpBaseExp * userData.level;
                    userData.level++;
                }

                if (oldARLevel !== userData.level) {
                    msg += ` and Leveled up from ${oldARLevel} -> ${userData.level}`;
                }

                msg += '\n';

                // CHARACTER EXP REWARDS
                partyList.forEach((character) => {
                    var charData = userData.inventory.characters[characterConstants[character].rarity_text][character];
                    var oldLevel = charData.level;
                    charData.currentExp += charExpGained;
                    while (charData.currentExp >= charLevelUpBaseExp * charData.level) {
                        charData.currentExp -= charLevelUpBaseExp * charData.level;
                        charData.level++;
                    }
                    msg += `\n${character} Gained ${charExpGained} EXP`
                    if (oldLevel !== charData.level)
                        msg += ` and Leveled up from ${oldLevel} -> ${charData.level}`;
                })
                message.channel.send(msg);
                return [userData, resin - 10, mora];
            }
            else {
                message.channel.send(`<@${sender.id}> Your party got butchered... Try upgrading weapons/leveling up your characters`);
                return [userData, resin - 10, mora];
            }
        }

        /////////////////////////////////////        Create New LeyLine Template (Made by Toby Nguyen)      /////////////////////////////////////
        //
        //                          // First you need to copy and make a new  LEYLINE ''<name>'' CONSTANTS in constants.js
        //                                       // I made a copy of it and name Leyline Event Constants
        //                                       // Basically I change outcrops to Event then i got "leylineEventBaseAtk" etc
        //                                       // then replace all the var to the new one you just create.
        //                                       // You can use the old var leylineoutcrops if you dont want to adjust of this leyline stats
        //
        //
        // if (msg_arr[1] === 'EVENT') {         // Change 'EVENT' to name of the leyline you want
        //     if (!/^\d+$/.test(msg_arr[2])) {
        //         message.channel.send(`<@${sender.id}> Enter a Valid Number`);
        //         return [userData, resin, mora];
        //     }
        //     var leylineAtk = leylineEventBaseAtk * (1 + parseInt(msg_arr[2]));
        //     var leylineHp = leylineEventBaseHp * (1 + parseInt(msg_arr[2]));
        // 
        //     var totalAtk = 0;
        //     var totalHp = 0;
        // 
        //     var msg = `<@${message.author.id}>\n`;
        // 
        //     partyList = userData.party;
        //
        //     if(!partyList)
        //         return [userData, resin, mora];
        //
        //     if (partyList.length > 4) {
        //         partyList = partyList.slice(0, 4);
        //         userData.party = partyList;
        //     }
        //
        //     partyList.forEach((character) => {
        //         var charData = userData.inventory.characters[characterConstants[character].rarity_text][character];
        //         const weaponDamage = getWeaponDamage(userData, character);
        //         var [atk, hp] = calcStats(characterConstants[character].baseAtk, characterConstants[character].baseHp, charData.level, charData.constellation_level, weaponDamage);
        //         totalAtk += atk;
        //         totalHp += hp;
        //     });
        // 
        //     if (totalAtk > leylineAtk && totalHp > leylineHp) {
        //         if (userData.exp === undefined) {
        //             userData.exp = 0;
        //             userData.level = 1;
        //         }
        //         var expGained = leylineEventBaseARExp * (1 + 0.25 * parseInt(msg_arr[2]));
        //         var charExpGained = leylineEventBaseCharExp * (1 + 0.25 * parseInt(msg_arr[2]));
        //         var moraGained = leylineEventBaseMora * (1 + 0.25 * parseInt(msg_arr[2]));
        //         var gemGained = leylineEventBaseGem * (1 + 0.25 * parseInt(msg_arr[2]));   // I added give gems if u won this leyline
        //
        //        // USER MORA REWARDS
        //         mora += moraGained;
        //         userData.primogems += gemGained;  // Here is the line that give gems
        //         msg += `\nYou gained ${moraGained}<:A_mora:769909934359838721>. You now have ${mora}<:A_mora:769909934359838721>`
        //         msg += `\nYou gained **${gemGained} Primogems**. You now have ${userData.primogems} Primogems*`   //here is the message line of gems
        // 
        //         // USER EXP REWARDS
        //         var oldARLevel = userData.level;
        //         userData.exp += expGained;
        //         msg += `\nYou gained ${expGained} AR Exp`
        //         while (userData.exp >= ARLevelUpBaseExp * userData.level) {
        //             userData.exp -= ARLevelUpBaseExp * userData.level;
        //             userData.level++;
        //         }
        //
        //         if (oldARLevel !== userData.level) {
        //             msg += ` and Leveled up from ${oldARLevel} -> ${userData.level}`;
        //         }
        //
        //         msg += '\n';
        //
        //         // CHARACTER EXP REWARDS
        //         partyList.forEach((character) => {
        //             var charData = userData.inventory.characters[characterConstants[character].rarity_text][character];
        //             var oldLevel = charData.level;
        //             charData.currentExp += charExpGained;
        //             while (charData.currentExp >= charLevelUpBaseExp * charData.level) {
        //                 charData.currentExp -= charLevelUpBaseExp * charData.level;
        //                 charData.level++;
        //             }
        //             msg += `\n${character} Gained ${charExpGained} EXP`
        //             if (oldLevel !== charData.level)
        //                 msg += ` and Leveled up from ${oldLevel} -> ${charData.level}`;
        //         })
        //         message.channel.send(msg);
        //         return [userData, resin - 20, mora]; //i changed the cost from 10 to 20
        //     }
        //     else {
        //         message.channel.send(`<@${sender.id}> Your party got butchered... Try upgrading weapons/leveling up your characters`);
        //         return [userData, resin - 20, mora]; //i changed the cost from 10 to 20
        //     }
        // }
        //////////////////////////////////////////////////////////////////////////////////////////////////

        return [userData, resin, mora];
	},
}
