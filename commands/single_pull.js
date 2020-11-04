module.exports = {
    name: 'single_pull',
    description: 'Make a single pull',
    usage: 'PREFIX + SINGLEPULL',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData) {
        const sender = message.author;
        const { generalBanner } = require('../functions.js');
        const constants = require('../constants.js');

        try {
            if (userData[sender.id]) {
                if (userData[sender.id].primogems >= 160) {
                    const [reward, rarity] = generalBanner(userData[sender.id].pityCounter4star, userData[sender.id].pityCounter5star);
                    var msg = `<@${sender.id}> \n\n\``;
                    for (var i = 0; i < rarity; i++)
                        msg += '⭐';
                    msg += ` ${reward}\``;
                    message.channel.send(msg);
                    if (!userData[sender.id].inventory[reward])
                        userData[sender.id].inventory[reward] = 1;
                    else
                        userData[sender.id].inventory[reward]++;
                    if (constants.generalBanner4Star.includes(reward))
                        userData[sender.id].pityCounter4star = 0;
                    if (constants.generalBanner5Star.includes(reward))
                        userData[sender.id].pityCounter5star = 0;
                    userData[sender.id].pityCounter4star++;
                    userData[sender.id].pityCounter5star++;
                    userData[sender.id].primogems -= 160;
                    }
                else {
                    message.channel.send(`<@${sender.id}> not enough Primogems`);
                }
            }
            else {
                message.channel.send(`<@${sender.id}> not enough Primogems`)
            }
        return userData;
    } catch (err) { console.log(err) }
	},
}