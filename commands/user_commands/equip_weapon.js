module.exports = {
    name: 'equip_weapon',
    description: 'Equip your Weapon',
    usage: 'PREFIX + EQUIP',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData, msg_arr) {
        const { getWeaponData, getCharacterData } = require('../../functions.js');
        const sender = message.author;
        var weapon = msg_arr[1];
        var character = msg_arr[2];

        if (msg_arr.length === 3) {
            var weaponData = getWeaponData(userData, weapon);
            var charData = getCharacterData(userData, character);
            if (charData && weaponData) {
                if (charData.weapon) {
                    var currentlyEquippedList = getWeaponData(userData, charData.weapon);
                    if (currentlyEquippedList) {
                        var currentlyEquipped = currentlyEquippedList.find((item) => item.isEquipped === character);
                        if (currentlyEquipped)
                            currentlyEquipped.isEquipped = "";
                    }
                }
                var bestWeaponStats = Math.max.apply(Math, weaponData.map((item) => item.level + item.rank))
                var bestWeapon = weaponData.find((item) => item.level + item.rank === bestWeaponStats);
                bestWeapon.isEquipped = character;
                charData.equipped_item = weapon;
                message.channel.send(`<@${sender.id}> You have successfully equipped ${weapon} to ${character}`);
            }
        }
        else {
            message.channel.send(`<@${sender.id}> Invalid Syntax`);
        }
	},
}