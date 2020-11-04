const { weaponInitialState } = require('../constants.js');

module.exports = {
    name: 'single_pull',
    description: 'Make a single pull',
    usage: 'PREFIX + SINGLEPULL',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData) {
        const sender = message.author;
        const { generalBanner, assignItem } = require('../functions.js');
        const { generalBanner4Star, generalBanner5Star } = require('../constants.js');

        try {
            if (userData.primogems >= 160) {
                const [reward, rarity] = generalBanner(userData.pityCounter4star, userData.pityCounter5star);
                var msg = `<@${sender.id}> \n\n\``;
                for (var i = 0; i < rarity; i++)
                    msg += '⭐';
                msg += ` ${reward}\``;
                message.channel.send(msg);

                userData = assignItem(userData, reward);
                if (generalBanner4Star.includes(reward))
                    userData.pityCounter4star = 0;
                if (generalBanner5Star.includes(reward))
                    userData.pityCounter5star = 0;
                userData.pityCounter4star++;
                userData.pityCounter5star++;
                userData.primogems -= 160;
            }
            else {
                message.channel.send(`<@${sender.id}> not enough Primogems`);
            }
        return userData;
    } catch (err) { console.log(err) }
	},
}