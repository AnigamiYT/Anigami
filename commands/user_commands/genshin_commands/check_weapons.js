/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import * as fs from 'fs';
import { printWeapons, calcStatsWeapon, getWeaponData } from '../../../functions.js';
import * as constants from '../../../constants.js';

const weaponConstants = JSON.parse(fs.readFileSync('constants/weapon.json', 'utf8'));

export default {
  name: 'check_weapons',
  description: 'Check your weapons',
  usage: 'PREFIX + WEAPONS',
  args: true,
  dmAllow: true,
  channels: [],
  execute(message, userData, msgArr) {
    const sender = message.author;
    try {
      if (msgArr[1]) {
        let msg = '';
        if (constants.weapons.includes(msgArr[1])) {
          let userWeapons = getWeaponData(userData, msgArr[1]);
          let upgradedCount = 0;
          if (userWeapons) {
            userWeapons = userWeapons.sort((a, b) => (((a.level + a.rank) > (b.level + b.rank)) ? 1 : (((a.level + a.rank) < (b.level + b.rank)) ? -1 : 0)));
            userWeapons.forEach((weapon, index) => {
              if (weapon.rank + weapon.level >= 3) {
                msg += `${msgArr[1]} #${index}: Atk: ${calcStatsWeapon(weaponConstants[msgArr[1]].atk, weapon.level, weapon.rank)} Level: ${weapon.level} Rank: ${weapon.rank} Exp: ${weapon.stored_exp}/${weapon.level * 50} ${weapon.isEquipped && weapon.isEquipped !== '' ? `User: ${weapon.isEquipped}` : ''}\n`;
                upgradedCount += 1;
              }
            });
            msg += `Base Weapon Count: ${userWeapons.length - upgradedCount}`;
            message.channel.send(`<@${sender.id}>\n\n${msg}`);
          }
        }
      } else { message.channel.send(`<@${sender.id}>\n\n${printWeapons(userData.inventory.weapons)}`); }
    } catch (err) { console.log(err); }
  },
};
