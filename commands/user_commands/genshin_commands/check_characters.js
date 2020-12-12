/* eslint-disable max-len */
const fs = require('fs');
const {
  printCharacters,
  calcStats,
  getWeaponDamage,
  getCharacterData,
} = require('../../../functions.js');

module.exports = {
  name: 'check_characters',
  description: 'Check your characters',
  usage: 'PREFIX + CHARACTERS',
  args: true,
  dmAllow: true,
  channels: [],
  execute(message, userData, msgArr) {
    const sender = message.author;
    if (msgArr[1]) {
      const characterConstants = JSON.parse(fs.readFileSync('constants/character.json', 'utf8'));
      const charName = msgArr[1];
      let charData = getCharacterData(userData, charName);

      if (!characterConstants[charName]) {
        message.channel.send(`<@${sender.id}> Character doesn't exist`);
        return;
      }

      if (!charData) {
        message.channel.send(`<@${sender.id}> Character doesn't exist`);
        return;
      }
      charData = userData.inventory.characters[characterConstants[charName].rarity_text][charName];
      const weaponDamage = getWeaponDamage(userData, charName);
      const [atk, hp] = calcStats(characterConstants[charName].baseAtk, characterConstants[charName].baseHp, charData.level, charData.constellation_level, weaponDamage);
      message.channel.send(`<@${sender.id}>\n\n\`\`\`${charName.toUpperCase()} \n\nLevel: ${charData.level}\nConstellation: ${charData.constellation_level}\nAtk: ${atk}\nHP: ${hp}\nEquipped Weapon: ${charData.equipped_item !== '' ? charData.equipped_item : 'None'}\nEXP: ${charData.current_exp}/100\`\`\``);
    } else { message.channel.send(`<@${sender.id}>\n\n${printCharacters(userData.inventory.characters)}`); }
  },
};
