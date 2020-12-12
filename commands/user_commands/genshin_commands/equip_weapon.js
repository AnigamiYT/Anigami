/* eslint-disable max-len */
const { getWeaponData, getCharacterData } = require('../../../functions.js');

module.exports = {
  name: 'equip_weapon',
  description: 'Equip your Weapon',
  usage: 'PREFIX + EQUIP',
  args: true,
  dmAllow: true,
  channels: [],
  execute(message, userData, msgArr) {
    const sender = message.author;
    const weapon = msgArr[1];
    const character = msgArr[2];

    if (msgArr.length === 3) {
      const weaponData = getWeaponData(userData, weapon);
      const charData = getCharacterData(userData, character);
      if (charData && weaponData) {
        if (charData.weapon) {
          const currentlyEquippedList = getWeaponData(userData, charData.weapon);
          if (currentlyEquippedList) {
            const currentlyEquipped = currentlyEquippedList.find((item) => item.isEquipped === character);
            if (currentlyEquipped) { currentlyEquipped.isEquipped = ''; }
          }
        }
        // eslint-disable-next-line prefer-spread
        const bestWeaponStats = Math.max.apply(Math, weaponData.map((item) => item.level + item.rank));
        const bestWeapon = weaponData.find((item) => item.level + item.rank === bestWeaponStats);
        if (bestWeapon) { bestWeapon.isEquipped = character; } else { message.channel.send(`<@${sender.id}> Weapon doesn't exist.`); }
        charData.equipped_item = weapon;
        message.channel.send(`<@${sender.id}> You have successfully equipped ${weapon} to ${character}`);
      }
    } else {
      message.channel.send(`<@${sender.id}> Invalid Syntax`);
    }
    return userData;
  },
};
