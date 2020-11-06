module.exports = {
    name: 'check_weapons',
    description: 'Check your weapons',
    usage: 'PREFIX + WEAPONS',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, msg_arr) {
        const sender = message.author;
        const { printWeapons } = require('../functions.js');
        const constants = require('../constants.js');
        const weaponConstants = require('../constants/weapon.json');
        try {
            if (msg_arr[1]) {
                var msg = '';
                if (constants.weapons.includes(msg_arr[1])) {
                    if (!weaponConstants[msg_arr[1]])
                        return;
                    if (!userData.inventory.weapons[weaponConstants[msg_arr[1]].rarity_text])
                        return;
                    if (!userData.inventory.weapons[weaponConstants[msg_arr[1]].rarity_text][msg_arr[1]])
                        return;
                    let upgradedCount = 0;
                    let userWeapons = userData.inventory.weapons[weaponConstants[msg_arr[1]].rarity_text][msg_arr[1]];

                    userWeapons = userWeapons.sort((a, b) => ((a.level + a.rank) > (b.level + b.rank)) ? 1 : (((a.level + a.rank) < (b.level + b.rank)) ? -1 : 0))
                    userWeapons.forEach((weapon, index) => {
                        if (weapon.rank + weapon.level >= 3) {
                            msg += `${msg_arr[1]} #${index}: Level: ${weapon.level} Rank: ${weapon.rank} Exp: ${weapon.stored_exp}/${weapon.level * 50}\n`;
                            upgradedCount++;
                        }
                    });
                    msg += `Base Weapon Count: ${userWeapons.length - upgradedCount}`;
                    message.channel.send(`<@${sender.id}>\n\n${msg}`);
                }
            }
            else
                message.channel.send(`<@${sender.id}>\n\n${printWeapons(userData.inventory.weapons)}`);

            // ADD NEW COMMAND FOR !weapons <weapon_name> TO DISPLAY UPGRADED WEAPON CONDITION

        } catch (err) { console.log(err) }
	},
}