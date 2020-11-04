const characters6Star = ['Cocogoat', 'Timmie', 'Wagner', 'Gordon-Ramsey', 'Stormterror', 'Signora', 'Paimon'];
const characters5Star = ['Diluc', 'Jean', 'Mona', 'Keqing', 'Qiqi', 'Klee', 'Venti'];
const characters4Star = ['Fischl', 'Amber', 'Bennett', 'Barbara', 'Lisa', 'Kaeya', 'Chongyun', 'Xiangling', 'Xingqiu', 'Beidou', 'Sucrose', 'Razor'];
const generalBanner6Star = ['Cocogoat', 'Timmie', 'Wagner', 'Gordon-Ramsey', 'Stormterror', 'Signora', 'Paimon'];
const generalBanner5Star = ['Diluc', 'Jean', 'Mona', 'Keqing', 'Qiqi', '5-Star-Weapon'];
const generalBanner4Star = ['Fischl', 'Amber', 'Bennett', 'Barbara', 'Lisa', 'Kaeya', 'Chongyun', 'Xiangling', 'Xingqiu', 'Beidou', 'Sucrose', 'Razor', '4-Star-Weapon'];
const kleeBanner5Star = ['Diluc', 'Jean', 'Mona', 'Keqing', 'Qiqi', 'Klee'];
const weapon5Star = [''];
const weapons4Star = [''];
const weapons3Star = ['Debate-Club', 'Cold-Steel', 'Sharpshooter\'s-Oath', 'Magic-Guide', 'Harbringer-of-Dawn', 'Raven-Bow', 'Ferrous-Shadow', 'Slingshot'];
const allWeapons = [...weapons3Star, '4-STAR-WEAPON', '5-STAR-WEAPON'];
const allCharacters = [...characters6Star, ...characters5Star, ...characters4Star];

module.exports = {
    userInitialState: {
        messageSent: 0,
        primogems: 0,
        pityCounter4star: 1,
        pityCounter5star: 1,
        inventory: {},
        lastDaily: 0,
        lastWeekly: 0,
        lastMonthly: 0,
    },
    characters6Star: characters6Star,
    characters5Star: characters5Star,
    characters4Star: characters4Star,
    generalBanner6Star: generalBanner6Star,
    generalBanner5Star: generalBanner5Star,
    generalBanner4Star: generalBanner4Star,
    kleeBanner5Star: kleeBanner5Star,
    weapons3Star: weapons3Star,
    weapons: allWeapons,
    characters: allCharacters,
}