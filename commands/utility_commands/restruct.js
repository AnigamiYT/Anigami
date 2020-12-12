/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
module.exports = {
  name: 'restruct',
  description: 'Restructs the Data Structure',
  usage: 'PREFIX + RESTRUCT',
  args: true,
  dmAllow: true,
  channels: [],
  execute(message, channels) {
    if (message.member.id === '197673134885699585') {
      const fs = require('fs');
      try {
        const oldData = require('./Storage/userData.json');
        for (const userID in oldData) {
          const fixed = oldData[userID];

          const temp = {
            characters: {},
            weapons: {},
            consumables: {},
          };

          for (const item in fixed.inventory) {
            const restructCharacters = (characters) => {
              characters[item] = {
                ...constants.characterInitialState,
                constellation_level: fixed.inventory[item] - 1,
              };
            };

            // Characters
            if (constants.characters4Star.includes(item)) {
              if (!temp.characters.four_star) { temp.characters.four_star = {}; }
              restructCharacters(temp.characters.four_star);
            } else if (constants.characters5Star.includes(item)) {
              if (!temp.characters.five_star) { temp.characters.five_star = {}; }
              restructCharacters(temp.characters.five_star);
            } else if (constants.characters6Star.includes(item)) {
              if (!temp.characters.six_star) { temp.characters.six_star = {}; }
              restructCharacters(temp.characters.six_star);

              // Weapons
            } else if (constants.weapons3Star.includes(item)) {
              if (!temp.weapons.three_star) { temp.weapons.three_star = {}; }
              const weapons = temp.weapons.three_star;

              if (!weapons[item]) { weapons[item] = []; }
              for (let i = 0; i < fixed.inventory[item]; i++) {
                weapons[item].push({ ...constants.weaponInitialState });
              }
            } else if (item === '4-Star-Weapon') {
              temp.consumables.star4 = temp.consumables.star4 + 1 || 1;
            } else if (item === '5-Star-Weapon') {
              temp.consumables.star5 = temp.consumables.star5 + 1 || 1;
            }
          }

          delete fixed.inventory;
          fixed.inventory = temp;

          fs.writeFile(`Storage/players/${userID}.json`, JSON.stringify(fixed, null, 4), (err) => {
            if (err) console.error(err);
          });
        }
        return;
      } catch (err) { console.log(err); }
    }
  },
};
