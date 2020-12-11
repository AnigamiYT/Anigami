/* eslint-disable max-len */
import * as fs from 'fs';
import { calcStats, getWeaponDamage } from '../../../functions.js';
import {
  leylineOutcropsBaseARExp,
  leylineOutcropsBaseAtk,
  leylineOutcropsBaseCharExp,
  leylineOutcropsBaseHp,
  leylineOutcropsBaseMora,
  charLevelUpBaseExp,
  ARLevelUpBaseExp,
} from '../../../constants.js';

const characterConstants = JSON.parse(fs.readFileSync('constants/character.json', 'utf8'));

export default {
  name: 'fight_leyline',
  description: 'Fight Leylines',
  usage: 'PREFIX + LEYLINE',
  args: true,
  dmAllow: true,
  channels: [],
  execute(message, userData, msgArr, resin, mora) {
    if (resin < 10) {
      message.channel.send(`<@${message.member.id}> Not enough resin. You only have ${resin} <:A_resin:769909897210888204>`);
      return [userData, resin, mora];
    }

    const sender = message.author;
    const tempUserData = userData;
    let tempMora = mora;

    if (msgArr[1] === 'OUTCROPS') {
      if (!/^\d+$/.test(msgArr[2])) {
        message.channel.send(`<@${sender.id}> Enter a Valid Number`);
        return [tempUserData, resin, tempMora];
      }
      const leylineAtk = leylineOutcropsBaseAtk * (1 + parseInt(msgArr[2], 10));
      const leylineHp = leylineOutcropsBaseHp * (1 + parseInt(msgArr[2], 10));

      let totalAtk = 0;
      let totalHp = 0;

      let msg = `<@${message.author.id}>\n`;

      const partyList = tempUserData.party;

      if (!partyList) { return [tempUserData, resin, tempMora]; }

      partyList.forEach((character) => {
        const charData = tempUserData.inventory.characters[characterConstants[character].rarity_text][character];
        const weaponDamage = getWeaponDamage(tempUserData, character);
        const [atk, hp] = calcStats(characterConstants[character].baseAtk, characterConstants[character].baseHp, charData.level, charData.constellation_level, weaponDamage);
        totalAtk += atk;
        totalHp += hp;
      });

      if (totalAtk > leylineAtk && totalHp > leylineHp) {
        if (tempUserData.exp === undefined) {
          tempUserData.exp = 0;
          tempUserData.level = 1;
        }
        const expGained = Math.floor(leylineOutcropsBaseARExp * (1 + 0.05 * parseInt(msgArr[2], 10)));
        const charExpGained = Math.floor(leylineOutcropsBaseCharExp * (1 + 0.05 * parseInt(msgArr[2], 10)));
        const tempMoraGained = Math.floor(leylineOutcropsBaseMora * (1 + 0.05 * parseInt(msgArr[2], 10)));

        // USER tempMora REWARDS
        tempMora += tempMoraGained;
        msg += `\nYou gained ${tempMoraGained}<:A_tempMora:769909934359838721>. You now have ${tempMora}<:A_tempMora:769909934359838721>`;

        // USER EXP REWARDS
        const oldARLevel = tempUserData.level;
        tempUserData.exp += expGained;
        msg += `\nYou gained ${expGained} AR Exp`;
        while (tempUserData.exp >= ARLevelUpBaseExp * tempUserData.level) {
          tempUserData.exp -= ARLevelUpBaseExp * tempUserData.level;
          tempUserData.level += 1;
        }

        if (oldARLevel !== tempUserData.level) {
          msg += ` and Leveled up from ${oldARLevel} -> ${tempUserData.level}`;
        }

        msg += '\n';

        // CHARACTER EXP REWARDS
        partyList.forEach((character) => {
          const charData = tempUserData.inventory.characters[characterConstants[character].rarity_text][character];
          const oldLevel = charData.level;
          charData.currentExp += charExpGained;
          while (charData.currentExp >= charLevelUpBaseExp * charData.level) {
            charData.currentExp -= charLevelUpBaseExp * charData.level;
            charData.level += 1;
          }
          msg += `\n${character} Gained ${charExpGained} EXP`;
          if (oldLevel !== charData.level) { msg += ` and Leveled up from ${oldLevel} -> ${charData.level}`; }
        });
        message.channel.send(msg);
        return [tempUserData, resin - 10, mora];
      }

      message.channel.send(`<@${sender.id}> Your party got butchered... Try upgrading weapons/leveling up your characters`);
      return [tempUserData, resin - 10, mora];
    }
    return [tempUserData, resin, mora];
  },
};
