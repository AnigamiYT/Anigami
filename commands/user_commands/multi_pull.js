module.exports = {
    name: 'multi_pull',
    description: 'Make a multi pull',
    usage: 'PREFIX + MULTIPULL',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData) {
        const sender = message.author;
        const { generalBanner, assignItem } = require('../../functions.js');
        const constants = require('../../constants.js');

        try {
            if (userData) {
                if (userData.primogems >= 1600) {
                    var reward = [];
                    let ctr;
                    var msg;
                    for (ctr = 0; ctr < 10; ctr++) {
                        const [tempReward, rarity] = generalBanner(userData.pityCounter4star, userData.pityCounter5star);
                        msg = `\``;
                        for (var i = 0; i < rarity; i++)
                            msg += '⭐';
                        msg += ` ${tempReward}\``;
                        reward.push(msg);

                        userData = assignItem(userData, tempReward);
                        if (constants.generalBanner4Star.includes(tempReward))
                            userData.pityCounter4star = 0;
                        if (constants.generalBanner5Star.includes(tempReward))
                        userData.pityCounter5star = 0;
                        userData.pityCounter4star++;
                        userData.pityCounter5star++;
                    }
                    userData.primogems -= 1600;
                    message.channel.send(`<@${sender.id}>\n\n${reward.sort().reverse().join("\n")}`);    
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