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
        return [userData, resin, mora];
	},
}