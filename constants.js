/* eslint-disable max-len */
// GENSHIN CONSTANTS
const characters6Star = ['Cocogoat', 'Timmie', 'Wagner', 'Gordon-Ramsey', 'Stormterror', 'Signora', 'Paimon'];
const characters5Star = ['Diluc', 'Jean', 'Mona', 'Keqing', 'Qiqi', 'Klee', 'Venti'];
const characters4Star = ['Fischl', 'Amber', 'Bennett', 'Barbara', 'Lisa', 'Kaeya', 'Chongyun', 'Xiangling', 'Xingqiu', 'Beidou', 'Sucrose', 'Razor'];

const bows4star = ['Alley-Hunter', 'Blackcliff-Warbow', 'Compound-Bow', 'Favonius-Warbow', 'Prototype-Crescent', 'Royal-Bow', 'Rust', 'Sacrificial-Bow', 'The-Stringless', 'The-Viridescent-Hunt'];
const catalyst4star = ['Blackcliff-Amulet', 'Eye-of-Perception', 'Favonius-Codex', 'Mappa-Mare', 'Prototype-Malice', 'Royal-Grimoire', 'Scrificial-Fragments', 'Solar-Pearl', 'The-Widsith', 'Wine-and-Song'];
const claymore4star = ['Blackcliff-Slasher', 'Favonius-Greatsword', 'Lithic-Blade', 'Prototype-Aminus', 'Rainslasher', 'Royal-Greatsword', 'Sacrificial-Greatsword', 'Serpent-Spine', 'The-Bell', 'Whiteblind'];
const polearm4star = ['Crescent-Pike', 'Deathmatch', 'Dragon\'s-Bane', 'Favonius-Lance', 'Lithic-Spear', 'Prototype-Grudge'];
const sword4star = ['Blackcliff-Longsword', 'Favonius-Sword', 'Iron-Sting', 'Lion\'s-Roar', 'Prototype-Rancour', 'Royal-Longsword', 'Sacrificial-Sword', 'The-Alley-Flash', 'The-Black-Sword', 'The-Flute'];
const weapons5Star = ['Wolf\'s-Gravestone', 'Aquila-Favonia', 'Lost-Prayer-to-the-Sacred-Winds', 'Skyward-Blade', 'Skyward-Pride', 'Skyward-Harp', 'Primordial-Jade-Winged-Spear', 'Amos\'-Bow'];
const weapons4Star = [...bows4star, ...catalyst4star, ...claymore4star, ...polearm4star, ...sword4star];
const weapons3Star = ['Debate-Club', 'Cold-Steel', 'Sharpshooter\'s-Oath', 'Magic-Guide', 'Harbringer-of-Dawn', 'Raven-Bow', 'Ferrous-Shadow', 'Slingshot'];

const consumables = ['4-Star-Weapon', '5-Star-Weapon'];
const weapons = [...weapons3Star, ...weapons4Star, ...weapons5Star];
const characters = [...characters6Star, ...characters5Star, ...characters4Star];

const generalBanner6Star = ['Cocogoat', 'Timmie', 'Wagner', 'Gordon-Ramsey', 'Stormterror', 'Signora', 'Paimon'];
const generalBanner5Star = [...characters5Star, ...weapons5Star];
const generalBanner4Star = [...characters4Star, ...weapons4Star];
const generalBanner4StarCharacters = ['Fischl', 'Amber', 'Bennett', 'Barbara', 'Lisa', 'Kaeya', 'Chongyun', 'Xiangling', 'Xingqiu', 'Beidou', 'Sucrose', 'Razor'];
const generalBanner4StarWeapons = [...weapons4Star];

const kleeBanner5Star = ['Diluc', 'Jean', 'Mona', 'Keqing', 'Qiqi', 'Klee'];

const userInitialState = {
  messageSent: 0,
  primogems: 0,
  pityCounter4star: 1,
  pityCounter5star: 1,
  lastDaily: 0,
  lastWeekly: 0,
  lastMonthly: 0,
  level: 1,
  exp: 0,
  party: [],
  inventory: {
    characters: {},
    weapons: {},
    consumables: {},
  },
};

const characterInitialState = {
  rank: 1,
  level: 1,
  constellation_level: 0,
  current_exp: 0,
  current_health: 1,
  equipped_item: '',
};

const weaponInitialState = {
  rank: 1,
  level: 1,
  stored_exp: 0,
  isEquipped: '',
};

const leylineOutcropsBaseARExp = 100;
const leylineOutcropsBaseCharExp = 100;
const leylineOutcropsBaseMora = 5000;
const leylineOutcropsBaseAtk = 100;
const leylineOutcropsBaseHp = 200;

const charLevelUpBaseExp = 50;
const weaponLevelUpBaseExp = 50;
const ARLevelUpBaseExp = 500;

// OTHER CONSTANTS
const MUSIC_PAGINATION_COUNT = 10;

module.exports = {
  characters6Star,
  characters5Star,
  characters4Star,
  bows4star,
  catalyst4star,
  claymore4star,
  polearm4star,
  sword4star,
  weapons5Star,
  weapons4Star,
  weapons3Star,
  consumables,
  weapons,
  characters,
  generalBanner6Star,
  generalBanner5Star,
  generalBanner4Star,
  generalBanner4StarCharacters,
  generalBanner4StarWeapons,
  kleeBanner5Star,
  userInitialState,
  characterInitialState,
  weaponInitialState,
  leylineOutcropsBaseARExp,
  leylineOutcropsBaseCharExp,
  leylineOutcropsBaseMora,
  leylineOutcropsBaseAtk,
  leylineOutcropsBaseHp,
  charLevelUpBaseExp,
  weaponLevelUpBaseExp,
  ARLevelUpBaseExp,
  MUSIC_PAGINATION_COUNT,
};
