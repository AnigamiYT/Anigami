const constants = require('./constants.js');

module.exports = {
    generalBanner: (pity4star, pity5star) => {
        if (pity5star >= 90) {
            return [constants.generalBanner5Star[Math.floor(Math.random() * constants.generalBanner5Star.length)], 5];
        }
        if (pity4star >= 10) {
            return [constants.generalBanner4Star[Math.floor(Math.random() * constants.generalBanner4Star.length)], 4];
        }
        const value = Math.random();
        if (value < 0.00006) {
            return [constants.generalBanner5Star[Math.floor(Math.random() * constants.generalBanner6Star.length)], 6];
        }
        if (value < 0.006) {
            return [constants.generalBanner5Star[Math.floor(Math.random() * constants.generalBanner5Star.length)], 5];
        }
        if (value < 0.057) {
            return [constants.generalBanner4Star[Math.floor(Math.random() * constants.generalBanner4Star.length)], 4];
        }
        return [constants.weapons3Star[Math.floor(Math.random() * constants.weapons3Star.length)], 3];
    },
    printObject: (object) => {
        var output = '';
        for(var prop in object) {
            output += `${prop}: ${object[prop]}\n`;
        }
        return output;
    },
    printWeapons: (object) => {
        var output = '';
        var curOutput = '';
        for(var prop in object) {
            if (prop === '5-Star-Weapon')
                curOutput += `- ${object[prop]}x ${prop}\n`;
        }
        if (curOutput !== '') {
            output += '\`⭐⭐⭐⭐⭐\`\n'
            output += '\`\`\`fix\n'
            output += curOutput;
            output += '\`\`\`\n';
        }
        curOutput = '';
        for(var prop in object) {
            if (prop === '4-Star-Weapon')
                curOutput += `- ${object[prop]}x ${prop}\n`;
        }
        if (curOutput !== '') {
            output += '\`⭐⭐⭐⭐\`\n'
            output += '\`\`\`diff\n'
            output += curOutput;
            output += '\`\`\`\n';
        }
        curOutput = '';
        for(var prop in object) {
            if (constants.weapons3Star.includes(prop))
                curOutput += `- ${object[prop]}x ${prop}\n`;
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
        for(var prop in object) {
            if (constants.characters6Star.includes(prop))
                curOutput += `- ${object[prop]}x ${prop}\n`;
        }
        if (curOutput !== '') {
            output += '\`⭐⭐⭐⭐⭐⭐\`\n'
            output += '\`\`\`yaml\n'
            output += curOutput;
            output += '\`\`\`\n';
        }
        curOutput = '';
        for(var prop in object) {
            if (constants.characters5Star.includes(prop))
                curOutput += `- ${object[prop]}x ${prop}\n`;
        }
        if (curOutput !== '') {
            output += '\`⭐⭐⭐⭐⭐\`\n'
            output += '\`\`\`fix\n'
            output += curOutput;
            output += '\`\`\`\n';
        }
        curOutput = '';
        for(var prop in object) {
            if (constants.characters4Star.includes(prop))
                curOutput += `- ${object[prop]}x ${prop}\n`;
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