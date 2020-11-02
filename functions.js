const constants = require('./constants.js');

module.exports = {
    generalBanner: (pity4star, pity5star) => {
        if (pity5star >= 90) {
            return constants.generalBanner5Star[Math.floor(Math.random() * constants.generalBanner5Star.length)];
        }
        if (pity4star >= 10) {
            return constants.generalBanner4Star[Math.floor(Math.random() * constants.generalBanner4Star.length)];
        }
        const value = Math.random();
        if (value < 0.006) {
            return constants.generalBanner5Star[Math.floor(Math.random() * constants.generalBanner5Star.length)];
        }
        if (value < 0.057) {
            return constants.generalBanner4Star[Math.floor(Math.random() * constants.generalBanner4Star.length)];
        }
        return 'Debate-Club';
        // else if (value < 0.057) {
        //     return constants.generalBanner5Star[Math.floor(Math.random() * constants.generalBanner.length)];
        // }
    },
    printObject: (object) => {
        var output = '';
        for(var prop in object) {
            output += `${prop}: ${object[prop]}\n`;
        }
        return output;
    },
}