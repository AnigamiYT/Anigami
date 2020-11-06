const constants = require('./constants.js');
const { characters4Star, characters5Star, characters6Star, weapons3Star, weapons4Star, weapons5Star, characterInitialState, weaponInitialState, consumables } = require('./constants.js');

module.exports = {
    generalBanner: (pity4star, pity5star) => {
        if (pity5star >= 90) {
            return [constants.generalBanner5Star[Math.floor(Math.random() * constants.generalBanner5Star.length)], 5];
        }
        if (pity4star >= 10) {
            return Math.random() > 0.5 
                ? [constants.generalBanner4StarCharacters[Math.floor(Math.random() * constants.generalBanner4StarCharacters.length)], 4]
                : [constants.generalBanner4StarWeapons[Math.floor(Math.random() * constants.generalBanner4StarWeapons.length)], 4];
        }
        const value = Math.random();
        if (value < 0.00006) {
            return [constants.generalBanner5Star[Math.floor(Math.random() * constants.generalBanner6Star.length)], 6];
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
    },
    assignItem: (userData, reward) => {
        if (characters4Star.includes(reward)) {
            if (!userData.inventory.characters.four_star)
                userData.inventory.characters.four_star = {};
            if (!userData.inventory.characters.four_star[reward])
                userData.inventory.characters.four_star[reward] = {...characterInitialState};
            else
                userData.inventory.characters.four_star[reward].constellation_level++;
        }

        else if (characters5Star.includes(reward)) {
            if (!userData.inventory.characters.five_star)
                userData.inventory.characters.five_star = {};
            if (!userData.inventory.characters.five_star[reward])
                userData.inventory.characters.five_star[reward] = {...characterInitialState};
            else
                userData.inventory.characters.five_star[reward].constellation_level++;
        }

        else if (characters6Star.includes(reward)) {
            if (!userData.inventory.characters.six_star)
                userData.inventory.characters.six_star = {};
            if (!userData.inventory.characters.six_star[reward])
                userData.inventory.characters.six_star[reward] = {...characterInitialState};
            else
                userData.inventory.characters.six_star[reward].constellation_level++;
        }

        else if (weapons3Star.includes(reward)) {
            if (!userData.inventory.weapons.three_star)
                userData.inventory.weapons.three_star = {};
            if (!userData.inventory.weapons.three_star[reward])
                userData.inventory.weapons.three_star[reward] = [{...weaponInitialState}];
            else
                userData.inventory.weapons.three_star[reward].push({...weaponInitialState});
        }

        else if (weapons4Star.includes(reward)) {
            if (!userData.inventory.weapons.four_star)
                userData.inventory.weapons.four_star = {};
            if (!userData.inventory.weapons.four_star[reward])
                userData.inventory.weapons.four_star[reward] = [{...weaponInitialState}];
            else
                userData.inventory.weapons.four_star[reward].push({...weaponInitialState});
        }

        else if (weapons5Star.includes(reward)) {
            if (!userData.inventory.weapons.five_star)
                userData.inventory.weapons.five_star = {};
            if (!userData.inventory.weapons.five_star[reward])
                userData.inventory.weapons.five_star[reward] = [{...weaponInitialState}];
            else
                userData.inventory.weapons.five_star[reward].push({...weaponInitialState});
        }

        else if (consumables.includes(reward)) {
            if (!userData.inventory.consumables)
                userData.inventory.consumables = {};
            if (!userData.inventory.consumables[reward])
                userData.inventory.consumables[reward] = 1;
            else
                userData.inventory.consumables[reward]++;
        }
        return userData;
    },
    getEquivalentExp: (level, exp) => {
        return (level * 50 / 2 * (level - 1)) + exp;
    },
    printObject: (object) => {
        var output = '';
        for(var prop in object) {
            output += `${prop}: ${object[prop]}\n`;
        }
        return output;
    },
    printWeapons: (object, page) => {
        var output = '';
        var curOutput = '';
        for(var prop in object.five_star) {
            if (object.five_star[prop].length > 0)
                curOutput += `- ${object.five_star[prop].length}x ${prop}\n`;
        }
        if (curOutput !== '') {
            output += '\`⭐⭐⭐⭐⭐\`\n'
            output += '\`\`\`fix\n'
            output += curOutput;
            output += '\`\`\`\n';
        }
        curOutput = '';
        for(var prop in object.four_star) {
            if (object.four_star[prop].length > 0)
                curOutput += `- ${object.four_star[prop].length}x ${prop}\n`;
        }
        if (curOutput !== '') {
            output += '\`⭐⭐⭐⭐\`\n'
            output += '\`\`\`diff\n'
            output += curOutput;
            output += '\`\`\`\n';
        }
        curOutput = '';
        for(var prop in object.three_star) {
            if (object.three_star[prop].length > 0)
                curOutput += `- ${object.three_star[prop].length}x ${prop}\n`;
        }
        if (curOutput !== '') {
            output += '\`⭐⭐⭐\`\n'
            output += '\`\`\`yaml\n'
            output += curOutput;
            output += '\`\`\`\n';
        }
        return output;
    },
    printCharacters: (object) => {
        var output = '';
        var curOutput = '';
        for(var prop in object.six_star) {
            curOutput += `- ${prop} ${object.six_star[prop].constellation_level > 0 ? `(Constellation ${object.six_star[prop].constellation_level})` : '' }\n`;
        }
        if (curOutput !== '') {
            output += '\`⭐⭐⭐⭐⭐⭐\`\n'
            output += '\`\`\`yaml\n'
            output += curOutput;
            output += '\`\`\`\n';
        }
        curOutput = '';
        for(var prop in object.five_star) {
            curOutput += `- ${prop} ${object.five_star[prop].constellation_level > 0 ? `(Constellation ${object.five_star[prop].constellation_level})` : '' }\n`;
        }
        if (curOutput !== '') {
            output += '\`⭐⭐⭐⭐⭐\`\n'
            output += '\`\`\`fix\n'
            output += curOutput;
            output += '\`\`\`\n';
        }
        curOutput = '';
        for(var prop in object.four_star) {
            curOutput += `- ${prop} ${object.four_star[prop].constellation_level > 0 ? `(Constellation ${object.four_star[prop].constellation_level})` : '' }\n`;
        }
        if (curOutput !== '') {
            output += '\`⭐⭐⭐⭐\`\n'
            output += '\`\`\`diff\n'
            output += curOutput;
            output += '\`\`\`\n';
        }
        return output;
    }
}