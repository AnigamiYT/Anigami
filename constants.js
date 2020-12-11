/* eslint-disable max-len */
// GENSHIN CONSTANTS
export const characters6Star = ['Cocogoat', 'Timmie', 'Wagner', 'Gordon-Ramsey', 'Stormterror', 'Signora', 'Paimon'];
export const characters5Star = ['Diluc', 'Jean', 'Mona', 'Keqing', 'Qiqi', 'Klee', 'Venti'];
export const characters4Star = ['Fischl', 'Amber', 'Bennett', 'Barbara', 'Lisa', 'Kaeya', 'Chongyun', 'Xiangling', 'Xingqiu', 'Beidou', 'Sucrose', 'Razor'];

export const bows4star = ['Alley-Hunter', 'Blackcliff-Warbow', 'Compound-Bow', 'Favonius-Warbow', 'Prototype-Crescent', 'Royal-Bow', 'Rust', 'Sacrificial-Bow', 'The-Stringless', 'The-Viridescent-Hunt'];
export const catalyst4star = ['Blackcliff-Amulet', 'Eye-of-Perception', 'Favonius-Codex', 'Mappa-Mare', 'Prototype-Malice', 'Royal-Grimoire', 'Scrificial-Fragments', 'Solar-Pearl', 'The-Widsith', 'Wine-and-Song'];
export const claymore4star = ['Blackcliff-Slasher', 'Favonius-Greatsword', 'Lithic-Blade', 'Prototype-Aminus', 'Rainslasher', 'Royal-Greatsword', 'Sacrificial-Greatsword', 'Serpent-Spine', 'The-Bell', 'Whiteblind'];
export const polearm4star = ['Crescent-Pike', 'Deathmatch', 'Dragon\'s-Bane', 'Favonius-Lance', 'Lithic-Spear', 'Prototype-Grudge'];
export const sword4star = ['Blackcliff-Longsword', 'Favonius-Sword', 'Iron-Sting', 'Lion\'s-Roar', 'Prototype-Rancour', 'Royal-Longsword', 'Sacrificial-Sword', 'The-Alley-Flash', 'The-Black-Sword', 'The-Flute'];
export const weapons5Star = ['Wolf\'s-Gravestone', 'Aquila-Favonia', 'Lost-Prayer-to-the-Sacred-Winds', 'Skyward-Blade', 'Skyward-Pride', 'Skyward-Harp', 'Primordial-Jade-Winged-Spear', 'Amos\'-Bow'];
export const weapons4Star = [...bows4star, ...catalyst4star, ...claymore4star, ...polearm4star, ...sword4star];
export const weapons3Star = ['Debate-Club', 'Cold-Steel', 'Sharpshooter\'s-Oath', 'Magic-Guide', 'Harbringer-of-Dawn', 'Raven-Bow', 'Ferrous-Shadow', 'Slingshot'];

export const consumables = ['4-Star-Weapon', '5-Star-Weapon'];
export const weapons = [...weapons3Star, ...weapons4Star, ...weapons5Star];
export const characters = [...characters6Star, ...characters5Star, ...characters4Star];

export const generalBanner6Star = ['Cocogoat', 'Timmie', 'Wagner', 'Gordon-Ramsey', 'Stormterror', 'Signora', 'Paimon'];
export const generalBanner5Star = [...characters5Star, ...weapons5Star];
export const generalBanner4Star = [...characters4Star, ...weapons4Star];
export const generalBanner4StarCharacters = ['Fischl', 'Amber', 'Bennett', 'Barbara', 'Lisa', 'Kaeya', 'Chongyun', 'Xiangling', 'Xingqiu', 'Beidou', 'Sucrose', 'Razor'];
export const generalBanner4StarWeapons = [...weapons4Star];

export const kleeBanner5Star = ['Diluc', 'Jean', 'Mona', 'Keqing', 'Qiqi', 'Klee'];

export const userInitialState = {
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

export const characterInitialState = {
  rank: 1,
  level: 1,
  constellation_level: 0,
  current_exp: 0,
  current_health: 1,
  equipped_item: '',
};

export const weaponInitialState = {
  rank: 1,
  level: 1,
  stored_exp: 0,
  isEquipped: '',
};

export const leylineOutcropsBaseARExp = 100;
export const leylineOutcropsBaseCharExp = 100;
export const leylineOutcropsBaseMora = 5000;
export const leylineOutcropsBaseAtk = 100;
export const leylineOutcropsBaseHp = 200;

export const charLevelUpBaseExp = 50;
export const weaponLevelUpBaseExp = 50;
export const ARLevelUpBaseExp = 500;

// OTHER CONSTANTS
export const MUSIC_PAGINATION_COUNT = 10;
