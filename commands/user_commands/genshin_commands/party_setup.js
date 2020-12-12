/* eslint-disable max-len */
const fs = require('fs');
const { calcStats, getCharacterData, getWeaponDamage } = require('../../../functions.js');

module.exports = {
  name: 'party_setup',
  description: 'Setup your party',
  usage: 'PREFIX + PARTY',
  args: true,
  dmAllow: true,
  channels: [],
  execute(message, userData, msgArr, isBooster, isPatron, con) {
    const characterConstants = JSON.parse(fs.readFileSync('constants/character.json', 'utf8'));
    const tempUserData = userData;
    let partyList = [];
    let currentChar;
    let msg = '```yaml\nPARTY LIST\n';
    const sender = message.author;

    if (msgArr.length === 1) {
      if (!tempUserData.party) {
        message.channel.send(`<@${sender.id}> you need to setup your party first`);
        return;
      }
      if (tempUserData.party.length === 0) {
        message.channel.send(`<@${sender.id}> you need to setup your party first`);
        return;
      }
      let totalAtk = 0;
      let totalHp = 0;
      partyList = tempUserData.party;

      partyList.forEach((character) => {
        const charData = getCharacterData(tempUserData, character);
        const weaponDamage = getWeaponDamage(tempUserData, character);
        const [atk, hp] = calcStats(characterConstants[character].baseAtk, characterConstants[character].baseHp, charData.level, charData.constellation_level, weaponDamage);
        msg += `- ${character}\n   ATK: ${atk}\n   HP: ${hp}\n   LEVEL: ${charData.level}\n   CONSTELLATION: ${charData.constellation_level}\n   WEAPON: ${charData.equipped_item && charData.equipped_item !== '' ? charData.equipped_item : 'None'}\n`;
        totalAtk += atk;
        totalHp += hp;
      });
      msg += `\nPARTY STATS\n   ATK: ${totalAtk}\n   HP: ${totalHp}`;
      msg += '```';
      message.channel.send(`<@${sender.id}> your current party:\n${msg}`);
      return;
    }

    if (msgArr.length === 6 && !isPatron && !isBooster) {
      message.channel.send(`<@${sender.id}> you must be server booster/patron to have more characters in the party`);
      return;
    }
    if (msgArr.length === 7 && !isPatron) {
      message.channel.send(`<@${sender.id}> you must be patron to have 6 characters in the party`);
      return;
    }
    if (msgArr.length === 7 && !isPatron) {
      message.channel.send(`<@${sender.id}> you must be patron to have 6 characters in the party`);
      return;
    }
    if (msgArr.length > 7) {
      message.channel.send(`<@${sender.id}> you have too much characters in the party`);
      return;
    }

    for (let ctr = 1; ctr <= msgArr.length - 1; ctr += 1) {
      if (msgArr[ctr]) {
        currentChar = msgArr[ctr];
        if (!characterConstants[currentChar]) {
          message.channel.send(`<@${sender.id}> character #${ctr} doesn't exist`);
          return;
        }
        if (!tempUserData.inventory.characters[characterConstants[currentChar].rarity_text]) {
          message.channel.send(`<@${sender.id}> character #${ctr} doesn't exist`);
          return;
        }
        if (!tempUserData.inventory.characters[characterConstants[currentChar].rarity_text][currentChar]) {
          message.channel.send(`<@${sender.id}> character #${ctr} doesn't exist`);
          return;
        }
        if (partyList.includes(currentChar)) {
          message.channel.send(`<@${sender.id}> you can't include the same character more than once`);
          return;
        }
        partyList.push(msgArr[ctr]);
        msg += `- ${currentChar}\n`;
      }
    }
    msg += '```';
    tempUserData.party = partyList;
    con.query(`UPDATE USERDATA SET DATA='${tempUserData}' WHERE DISCORDID=${sender.id};`);
    message.channel.send(`<@${sender.id}> your new party is now set!\n${msg}`);
  },
};
