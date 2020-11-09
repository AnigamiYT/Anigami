module.exports = {
    name: 'check_weapons',
    description: 'Check your weapons',
    usage: 'PREFIX + WEAPONS',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, msg_arr) {
        const sender = message.author;
        const { printWeapons, calcStatsWeapon, getWeaponData } = require('../../functions.js');
        const constants = require('../../constants.js');
        const weaponConstants = require('../../constants/weapon.json');
        try {
            if (msg_arr[1]) {
                var msg = '';
                if (constants.weapons.includes(msg_arr[1])) {
                    let userWeapons = getWeaponData(userData, msg_arr[1]);
                    var upgradedCount = 0;
                    userWeapons = userWeapons.sort((a, b) => ((a.level + a.rank) > (b.level + b.rank)) ? 1 : (((a.level + a.rank) < (b.level + b.rank)) ? -1 : 0))
                    userWeapons.forEach((weapon, index) => {
                        if (weapon.rank + weapon.level >= 3) {
                            msg += `${msg_arr[1]} #${index}: Atk: ${calcStatsWeapon(weaponConstants[msg_arr[1]].atk, weapon.level, weapon.rank)} Level: ${weapon.level} Rank: ${weapon.rank} Exp: ${weapon.stored_exp}/${weapon.level * 50} ${weapon.isEquipped && weapon.isEquipped !== "" ? `User: ${weapon.isEquipped}` : ''}\n`;
                            upgradedCount++;
                        }
                    });
                    msg += `Base Weapon Count: ${userWeapons.length - upgradedCount}`;
                    message.channel.send(`<@${sender.id}>\n\n${msg}`);
                }
            }
            else
                message.channel.send(`<@${sender.id}>\n\n${printWeapons(userData.inventory.weapons)}`);
        } catch (err) { console.log(err) }
	},
}