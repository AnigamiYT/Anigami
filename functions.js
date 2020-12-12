/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */

const { readFileSync, writeFile } = require('fs');
const ytdl = require('ytdl-core');
const {
  characters4Star,
  characters5Star,
  characters6Star,
  weapons3Star,
  weapons4Star,
  weapons5Star,
  characterInitialState,
  weaponInitialState,
  consumables,
} = require('./constants.js');
const constants = require('./constants.js');

const weaponConstants = JSON.parse(readFileSync('constants/weapon.json', 'utf8'));
const characterConstants = JSON.parse(readFileSync('constants/character.json', 'utf8'));

const generalBanner = (pity4star, pity5star) => {
  if (pity5star >= 90) {
    return [constants.generalBanner5Star[Math.floor(Math.random() * constants.generalBanner5Star.length)], 5];
  }
  if (pity4star >= 10) {
    return Math.random() > 0.5
      ? [constants.generalBanner4StarCharacters[Math.floor(Math.random() * constants.generalBanner4StarCharacters.length)], 4]
      : [constants.generalBanner4StarWeapons[Math.floor(Math.random() * constants.generalBanner4StarWeapons.length)], 4];
  }
  const value = Math.random();
  if (value < 0.0006) {
    return [constants.generalBanner6Star[Math.floor(Math.random() * constants.generalBanner6Star.length)], 6];
  }
  if (value < 0.006) {
    return [constants.generalBanner5Star[Math.floor(Math.random() * constants.generalBanner5Star.length)], 5];
  }
  if (value < 0.057) {
    return Math.random() > 0.5
      ? [constants.generalBanner4StarCharacters[Math.floor(Math.random() * constants.generalBanner4StarCharacters.length)], 4]
      : [constants.generalBanner4StarWeapons[Math.floor(Math.random() * constants.generalBanner4StarWeapons.length)], 4];
  }
  return [constants.weapons3Star[Math.floor(Math.random() * constants.weapons3Star.length)], 3];
};

const assignItem = (userData, reward) => {
  if (characters4Star.includes(reward)) {
    if (!userData.inventory.characters.four_star) { userData.inventory.characters.four_star = {}; }
    if (!userData.inventory.characters.four_star[reward]) { userData.inventory.characters.four_star[reward] = { ...characterInitialState }; } else { userData.inventory.characters.four_star[reward].constellation_level++; }
  } else if (characters5Star.includes(reward)) {
    if (!userData.inventory.characters.five_star) { userData.inventory.characters.five_star = {}; }
    if (!userData.inventory.characters.five_star[reward]) { userData.inventory.characters.five_star[reward] = { ...characterInitialState }; } else { userData.inventory.characters.five_star[reward].constellation_level++; }
  } else if (characters6Star.includes(reward)) {
    if (!userData.inventory.characters.six_star) { userData.inventory.characters.six_star = {}; }
    if (!userData.inventory.characters.six_star[reward]) { userData.inventory.characters.six_star[reward] = { ...characterInitialState }; } else { userData.inventory.characters.six_star[reward].constellation_level++; }
  } else if (weapons3Star.includes(reward)) {
    if (!userData.inventory.weapons.three_star) { userData.inventory.weapons.three_star = {}; }
    if (!userData.inventory.weapons.three_star[reward]) { userData.inventory.weapons.three_star[reward] = [{ ...weaponInitialState }]; } else { userData.inventory.weapons.three_star[reward].push({ ...weaponInitialState }); }
  } else if (weapons4Star.includes(reward)) {
    if (!userData.inventory.weapons.four_star) { userData.inventory.weapons.four_star = {}; }
    if (!userData.inventory.weapons.four_star[reward]) { userData.inventory.weapons.four_star[reward] = [{ ...weaponInitialState }]; } else { userData.inventory.weapons.four_star[reward].push({ ...weaponInitialState }); }
  } else if (weapons5Star.includes(reward)) {
    if (!userData.inventory.weapons.five_star) { userData.inventory.weapons.five_star = {}; }
    if (!userData.inventory.weapons.five_star[reward]) { userData.inventory.weapons.five_star[reward] = [{ ...weaponInitialState }]; } else { userData.inventory.weapons.five_star[reward].push({ ...weaponInitialState }); }
  } else if (consumables.includes(reward)) {
    if (!userData.inventory.consumables) { userData.inventory.consumables = {}; }
    if (!userData.inventory.consumables[reward]) { userData.inventory.consumables[reward] = 1; } else { userData.inventory.consumables[reward]++; }
  }
  return userData;
};

const getEquivalentExp = (level, exp) => ((level * 50) / (2 * (level - 1))) + exp;

const printObject = (object) => {
  let output = '';
  for (const prop in object) {
    output += `${prop}: ${object[prop]}\n`;
  }
  return output;
};

const printWeapons = (object) => {
  let output = '';
  let curOutput = '';
  for (const prop in object.five_star) {
    if (object.five_star[prop].length > 0) { curOutput += `- ${object.five_star[prop].length}x ${prop}\n`; }
  }
  if (curOutput !== '') {
    output += '`⭐⭐⭐⭐⭐`\n';
    output += '```fix\n';
    output += curOutput;
    output += '```\n';
  }
  curOutput = '';
  for (const prop in object.four_star) {
    if (object.four_star[prop].length > 0) { curOutput += `- ${object.four_star[prop].length}x ${prop}\n`; }
  }
  if (curOutput !== '') {
    output += '`⭐⭐⭐⭐`\n';
    output += '```diff\n';
    output += curOutput;
    output += '```\n';
  }
  curOutput = '';
  for (const prop in object.three_star) {
    if (object.three_star[prop].length > 0) { curOutput += `- ${object.three_star[prop].length}x ${prop}\n`; }
  }
  if (curOutput !== '') {
    output += '`⭐⭐⭐`\n';
    output += '```yaml\n';
    output += curOutput;
    output += '```\n';
  }
  return output;
};

const printCharacters = (object) => {
  let output = '';
  let curOutput = '';
  for (const prop in object.six_star) {
    curOutput += `- Lvl ${object.six_star[prop].level} ${prop} ${object.six_star[prop].constellation_level > 0 ? `(Constellation ${object.six_star[prop].constellation_level})` : ''}\n`;
  }
  if (curOutput !== '') {
    output += '`⭐⭐⭐⭐⭐⭐`\n';
    output += '```yaml\n';
    output += curOutput;
    output += '```\n';
  }
  curOutput = '';
  for (const prop in object.five_star) {
    curOutput += `- Lvl ${object.five_star[prop].level} ${prop} ${object.five_star[prop].constellation_level > 0 ? `(Constellation ${object.five_star[prop].constellation_level})` : ''}\n`;
  }
  if (curOutput !== '') {
    output += '`⭐⭐⭐⭐⭐`\n';
    output += '```fix\n';
    output += curOutput;
    output += '```\n';
  }
  curOutput = '';
  for (const prop in object.four_star) {
    curOutput += `- Lvl ${object.four_star[prop].level} ${prop} ${object.four_star[prop].constellation_level > 0 ? `(Constellation ${object.four_star[prop].constellation_level})` : ''}\n`;
  }
  if (curOutput !== '') {
    output += '`⭐⭐⭐⭐`\n';
    output += '```diff\n';
    output += curOutput;
    output += '```\n';
  }
  return output;
};

const calcStats = (baseAtk, baseHp, level, constellation, weaponDamage) => {
  const atk = Math.floor(baseAtk * (1 + (level - 1) / 10) * (constellation * 0.2 + 1) + weaponDamage);
  const hp = Math.floor(baseHp * (1 + (level - 1) / 10) * (constellation * 0.2 + 1));
  return [atk, hp];
};

const calcStatsWeapon = (baseAtk, level, rank) => {
  const atk = baseAtk * (1 + (rank - 1) / 10) * (level + 1);
  return atk;
};

const getWeaponData = (userData, weapon) => {
  if (weaponConstants[weapon]) {
    if (userData.inventory.weapons[weaponConstants[weapon].rarity_text]) {
      const weaponData = userData.inventory.weapons[weaponConstants[weapon].rarity_text][weapon];
      return weaponData;
    }
  }
  return undefined;
};

const getCharacterData = (userData, character) => {
  if (characterConstants[character]) {
    if (userData.inventory.characters[characterConstants[character].rarity_text]) {
      const characterData = userData.inventory.characters[characterConstants[character].rarity_text][character];
      return characterData;
    }
  }
  return undefined;
};

const getWeaponDamage = (userData, character) => {
  const charData = getCharacterData(userData, character);
  let weaponData;
  if (charData.equipped_item && charData.equipped_item !== '') {
    weaponData = getWeaponData(userData, charData.equipped_item);
    const targetWeapon = weaponData.find((item) => item.isEquipped === character);
    if (targetWeapon) return calcStatsWeapon(weaponConstants[charData.equipped_item].atk, targetWeapon.level, targetWeapon.rank);
    return 0;
  }
  return 0;
};

const roundRect = (ctx, x, y, height, width, radius, fill, stroke) => {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {
      tl: radius, tr: radius, br: radius, bl: radius,
    };
  } else {
    const defaultRadius = {
      tl: 0, tr: 0, br: 0, bl: 0,
    };
    for (const side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
};

const play = (connection, number, message) => {
  const musicData = JSON.parse(readFileSync('./data/music.json', 'utf8'));
  const { musicList } = musicData;
  let next = number;
  if (number >= musicList.length) {
    number = 0;
    next = 0;
    message.channel.send(`Now Playing: ${musicData.musicList[number].name}`);
  } else {
    next++;
    message.channel.send(`Now Playing: ${musicData.musicList[number].name}`);
  }
  writeFile('data/music.json', JSON.stringify(musicData, null, 4), (err) => {
    if (err) console.error(err);
  });
  connection
    .play(ytdl(musicList[number].link))
    .on('finish', () => {
      play(connection, next, message);
    })
    .on('error', (error) => console.error(error));
};

module.exports = {
  generalBanner,
  assignItem,
  getEquivalentExp,
  printObject,
  printWeapons,
  printCharacters,
  calcStats,
  calcStatsWeapon,
  getWeaponData,
  getWeaponDamage,
  getCharacterData,
  roundRect,
  play,
};
