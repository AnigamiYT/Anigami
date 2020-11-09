module.exports = {
    name: 'party_setup',
    description: 'Setup your party',
    usage: 'PREFIX + PARTY',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, msg_arr, isBooster, isPatron, con) {
        const { calcStats, getCharacterData, getWeaponDamage } = require('../../functions.js');
        const fs = require('fs');
        const characterConstants = JSON.parse(fs.readFileSync('constants/character.json', 'utf8'));
        var partyList = [];
        var currentChar;
        var msg = '\`\`\`yaml\nPARTY LIST\n';
        const sender = message.author;

        if (msg_arr.length === 1) {
            if (!userData.party) {
                message.channel.send(`<@${sender.id}> you need to setup your party first`);
                return;
            }
            if (userData.party.length === 0) {
                message.channel.send(`<@${sender.id}> you need to setup your party first`);
                return;
            }
            var totalAtk = 0;
            var totalHp = 0;
            partyList = userData.party;

            partyList.forEach((character) => {
                var charData = getCharacterData(userData, character);
                var weaponDamage = getWeaponDamage(userData, character);
                var [atk, hp] = calcStats(characterConstants[character].baseAtk, characterConstants[character].baseHp, charData.level, charData.constellation_level, weaponDamage);
                msg += `- ${character}\n   ATK: ${atk}\n   HP: ${hp}\n   LEVEL: ${charData.level}\n   CONSTELLATION: ${charData.constellation_level}\n   WEAPON: ${charData.equipped_item && charData.equipped_item !== '' ? charData.equipped_item : 'None'}\n`;
                totalAtk += atk;
                totalHp += hp;
            });
            msg += `\nPARTY STATS\n   ATK: ${totalAtk}\n   HP: ${totalHp}`;
            msg += '\`\`\`';
            message.channel.send(`<@${sender.id}> your current party:\n${msg}`);
            return;
        }

        if (msg_arr.length === 6 && !isPatron && !isBooster) {
            message.channel.send(`<@${sender.id}> you must be server booster/patron to have more characters in the party`);
            return;
        }
        else if (msg_arr.length === 7 && !isPatron) {
            message.channel.send(`<@${sender.id}> you must be patron to have 6 characters in the party`);
            return;
        }
        else if (msg_arr.length === 7 && !isPatron) {
            message.channel.send(`<@${sender.id}> you must be patron to have 6 characters in the party`);
            return;
        }
        else if (msg_arr.length > 7) {
            message.channel.send(`<@${sender.id}> you have too much characters in the party`);
            return;
        }

        for (var ctr = 1; ctr <= msg_arr.length - 1; ctr++) {
            if (msg_arr[ctr]) {
                currentChar = msg_arr[ctr];
                if (!characterConstants[currentChar]) {
                    message.channel.send(`<@${sender.id}> character #${ctr} doesn't exist`);
                    return;
                }
                if (!userData.inventory.characters[characterConstants[currentChar].rarity_text]) {
                    message.channel.send(`<@${sender.id}> character #${ctr} doesn't exist`);
                    return;
                }
                if (!userData.inventory.characters[characterConstants[currentChar].rarity_text][currentChar]) {
                    message.channel.send(`<@${sender.id}> character #${ctr} doesn't exist`);
                    return;
                }
                if (partyList.includes(currentChar)) {
                    message.channel.send(`<@${sender.id}> you can't include the same character more than once`);
                    return;
                }
                partyList.push(msg_arr[ctr]);
                msg += `- ${currentChar}\n`
            }
        }
        msg += '\`\`\`';
        userData.party = partyList;
        con.query(`UPDATE USERDATA SET DATA='${userData}' WHERE DISCORDID=${sender.id};`);
        message.channel.send(`<@${sender.id}> your new party is now set!\n${msg}`);
        return;
	},
}