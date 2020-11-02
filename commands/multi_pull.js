module.exports = {
    name: 'multi_pull',
    description: 'Make a multi pull',
    usage: 'PREFIX + MULTIPULL',
    args: true,
    dmAllow: true,
    channels: [],
	execute(message, userData) {
        const sender = message.author;
        const { generalBanner } = require('../functions.js');
        const constants = require('../constants.js');

        try {
            if (userData[sender.id]) {
                if (userData[sender.id].primogems >= 1600) {
                    var reward = [];
                    var tempReward;
                    let ctr;
                    for (ctr = 0; ctr < 10; ctr++) {
                        tempReward = generalBanner(userData[sender.id].pityCounter4star, userData[sender.id].pityCounter5star);
                        reward.push(tempReward);
                        if (!userData[sender.id].inventory[tempReward])
                            userData[sender.id].inventory[tempReward] = 1;
                        else
                            userData[sender.id].inventory[tempReward]++;
                        if (constants.generalBanner4Star.includes(tempReward))
                            userData[sender.id].pityCounter4star = 0;
                        if (constants.generalBanner5Star.includes(tempReward))
                        userData[sender.id].pityCounter5star = 0;
                            userData[sender.id].pityCounter4star++;
                        userData[sender.id].pityCounter5star++;
                    }
                    userData[sender.id].primogems -= 1600
                    message.channel.send(`<@${sender.id}> you obtained the following:\n\n${reward.join("\n")}`);    
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