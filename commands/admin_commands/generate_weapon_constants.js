module.exports = {
    name: 'generate_weapon_constants',
    description: 'Generate Constants for Weapons',
    usage: 'PREFIX + GENERATE_WEAPON_CONSTANTS',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message) {
        const { arrayToObject } = require('../../utils/index.js');
        const { weapons3Star, weapons4Star, weapons5Star } = require('../../constants.js');
        if (message.member.hasPermission("ADMINISTRATOR")) {    
            const fs = require('fs');
            const value3star = {
                atk: 2,
                materialExp: 100,
                rarity: 3,
                rarity_text: 'three_star',
            };
            const value4star = {
                atk: 10,
                materialExp: 500,
                rarity: 4,
                rarity_text: 'four_star',
            };
            const value5star = {
                atk: 20,
                materialExp: 2000,
                rarity: 5,
                rarity_text: 'five_star',
            };
            let empty = arrayToObject(weapons3Star, value3star);
            empty = {...empty, ...arrayToObject(weapons4Star, value4star)};
            empty = {...empty, ...arrayToObject(weapons5Star, value5star)};
            fs.writeFile(`constants/weapon.json`, JSON.stringify(empty, null, 4), (err) => {
                if (err) console.error(err);
            });
    }
	},
}