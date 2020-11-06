module.exports = {
    name: 'generate_character_constants',
    description: 'Generate Constants for Characters',
    usage: 'PREFIX + GENERATE_CHARACTER_CONSTANTS',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message) {
        const { arrayToObject } = require('../utils/index.js');
        const { characters4Star, characters5Star, characters6Star } = require('../constants.js');
        if (message.member.hasPermission("ADMINISTRATOR")) {    
            const fs = require('fs');
            const value4star = {
                baseAtk: 20,
                baseHp: 100,
                rarity: 4,
                rarity_text: 'four_star',
            };
            const value5star = {
                baseAtk: 30,
                baseHp: 150,
                rarity: 5,
                rarity_text: 'five_star',
            };
            const value6star = {
                baseAtk: 100,
                baseHp: 500,
                rarity: 6,
                rarity_text: 'six_star',
            };
            let empty = arrayToObject(characters4Star, value4star);
            empty = {...empty, ...arrayToObject(characters5Star, value5star)};
            empty = {...empty, ...arrayToObject(characters6Star, value6star)};
            fs.writeFile(`constants/character.json`, JSON.stringify(empty, null, 4), (err) => {
                if (err) console.error(err);
            });
    }
	},
}