/* eslint-disable no-loop-func */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-spread */
/* eslint-disable max-len */
const fs = require('fs');
const { getWeaponData } = require('../../../functions.js');

const weaponConstants = JSON.parse(fs.readFileSync('constants/weapon.json', 'utf8'));

module.exports = {
  name: 'upgrade_weapon',
  description: 'Upgrades a Weapon',
  usage: 'PREFIX + UPGRADE',
  args: true,
  dmAllow: true,
  channels: [],
  execute: (message, userData, msgArr) => {
    const sender = message.author;

    // Declarations
    let material;
    let materials;
    let weapon;
    let weaponData;
    let materialCount;
    let newExp;
    const levelUpExpMultiplier = 50;
    let msg = '';

    try {
      if (msgArr.length === 6 && weaponConstants[msgArr[1]] !== undefined && weaponConstants[msgArr[4]] !== undefined) {
        weaponData = getWeaponData(userData, msgArr[1]);
        weapon = weaponData[msgArr[2]];

        materials = getWeaponData(userData, msgArr[4]);
        material = materials[msgArr[5]];

        // WHEN UPGRADING USING A SINGLE MATERIAL
        if (msgArr[3].toUpperCase() === 'SINGLE') {
          if (weapon && material) {
            if (msgArr[1] === msgArr[4] && msgArr[2] === msgArr[5]) {
              message.channel.send(`<@${sender.id}> You can't use the current weapon as material.`);
              return userData;
            }
            if (material.isEquipped && material.isEquipped !== '') {
              message.channel.send(`<@${sender.id}> You can't use equipped weapon as material.`);
              return userData;
            }

            const oldLevel = weapon.level;
            newExp = weapon.stored_exp + material.stored_exp + ((material.level * 50) / (2 * (material.level - 1))) + weaponConstants[msgArr[4]].materialExp;
            weapon.stored_exp = newExp;
            while (newExp >= weapon.level * levelUpExpMultiplier) {
              newExp -= weapon.level * levelUpExpMultiplier;
              weapon.stored_exp = newExp;
              weapon.level += 1;
            }
            if (weapon.level !== oldLevel) { msg += `\nNew weapon level: ${oldLevel} -> ${weapon.level}`; }
            msg += `\nNew weapon exp: ${weapon.stored_exp}/${weapon.level * levelUpExpMultiplier}`;
            materials.splice(msgArr[5], 1);
            message.channel.send(`<@${sender.id}> You have successfully enhanced ${msgArr[1]} using ${msgArr[4]}!${msg}`);
          }

        // WHEN UPGRADING USING MULTIPLE MATERIALS
        } else if (msgArr[3].toUpperCase() === 'MULTI') {
          materialCount = msgArr[5];
          let currentMaterial;
          if (weapon) {
            const oldLevel = weapon.level;
            newExp = weapon.stored_exp;
            for (let ctr = 0; ctr < materialCount; ctr += 1) {
              currentMaterial = materials.findIndex((mat) => mat.rank + mat.level === 2 && mat !== weapon && (!mat.isEquipped || mat.isEquipped === ''));
              if (currentMaterial >= 0) {
                newExp += weaponConstants[msgArr[4]].materialExp;
                materials.splice(currentMaterial, 1);
              } else { break; }
            }
            while (newExp >= weapon.level * levelUpExpMultiplier) {
              newExp -= weapon.level * levelUpExpMultiplier;
              weapon.level += 1;
            }
            if (newExp === weapon.stored_exp && oldLevel === weapon.level) {
              message.channel.send(`<@${sender.id}> You have zero ${msgArr[4]}. Use another material.`);
              return userData;
            }
            weapon.stored_exp = newExp;
            if (weapon.level !== oldLevel) { msg += `\nNew weapon level: ${oldLevel} -> ${weapon.level}`; }
            msg += `\nNew weapon exp: ${weapon.stored_exp}/${weapon.level * levelUpExpMultiplier}`;
            message.channel.send(`<@${sender.id}> You have successfully enhanced ${msgArr[1]} using ${msgArr[4]}!${msg}`);
          } else {
            message.channel.send(`<@${sender.id}> Weapon doesn't exist`);
          }
        } else {
          message.channel.send(`<@${sender.id}> Incorrect Arguments`);
        }
        return userData;
      }

      if (msgArr.length === 3 && weaponConstants[msgArr[1]] !== undefined && weaponConstants[msgArr[2]] !== undefined) {
        weaponData = getWeaponData(userData, msgArr[1]);
        if (!weaponData) {
          message.channel.send(`<@${sender.id}> Weapon doesn't exist`);
          return userData;
        }
        const weaponLevelExp = Math.max.apply(Math, weaponData.map((weap) => ((weap.level * 50) / (2 * (weap.level - 1))) + weap.stored_exp));
        const weaponIndex = weaponData.findIndex((weap) => ((weap.level * 50) / (2 * (weap.level - 1))) + weap.stored_exp === weaponLevelExp);
        weapon = weaponData[weaponIndex];

        materials = getWeaponData(userData, msgArr[2]);
        materialCount = 999;
        let currentMaterial;
        if (weapon && materials) {
          const oldLevel = weapon.level;
          newExp = weapon.stored_exp;
          for (let ctr = 0; ctr < materialCount; ctr += 1) {
            currentMaterial = materials.findIndex((mat) => mat.rank + mat.level === 2 && mat !== weapon && (!mat.isEquipped || mat.isEquipped === ''));
            if (currentMaterial >= 0) {
              newExp += weaponConstants[msgArr[2]].materialExp;
              materials.splice(currentMaterial, 1);
            } else { break; }
          }
          while (newExp >= weapon.level * levelUpExpMultiplier) {
            newExp -= weapon.level * levelUpExpMultiplier;
            weapon.level += 1;
          }
          if (newExp === weapon.stored_exp && oldLevel === weapon.level) {
            message.channel.send(`<@${sender.id}> You have zero ${msgArr[4]}. Use another material.`);
            return userData;
          }
          weapon.stored_exp = newExp;
          if (weapon.level !== oldLevel) { msg += `\nNew weapon level: ${oldLevel} -> ${weapon.level}`; }
          msg += `\nNew weapon exp: ${weapon.stored_exp}/${weapon.level * levelUpExpMultiplier}`;
          message.channel.send(`<@${sender.id}> You have successfully enhanced ${msgArr[1]} using ${msgArr[2]}!${msg}`);
          return userData;
        }

        message.channel.send(`<@${sender.id}> Weapon/Material doesn't exist`);
        return userData;
      }

      message.channel.send(`<@${sender.id}> incorrect syntax or weapon doesn't exist`);
      return userData;

      // ADD NEW COMMAND FOR !weapons <weapon_name> TO DISPLAY UPGRADED WEAPON CONDITION
    } catch (err) { console.log(message.content, message.author.id, err); }
    return userData;
  },
};
