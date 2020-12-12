/* eslint-disable max-len */
const { generalBanner, assignItem } = require('../../../functions.js');
const constants = require('../../../constants.js');

module.exports = {
  name: 'multi_pull',
  description: 'Make a multi pull',
  usage: 'PREFIX + MULTIPULL',
  args: true,
  dmAllow: true,
  channels: [],
  execute: (message, userData) => {
    const sender = message.author;
    let tempUserData = userData;

    try {
      if (tempUserData) {
        if (tempUserData.primogems >= 1600) {
          const reward = [];
          let ctr;
          let msg;
          for (ctr = 0; ctr < 10; ctr += 1) {
            const [tempReward, rarity] = generalBanner(tempUserData.pityCounter4star, tempUserData.pityCounter5star);
            msg = '`';
            for (let i = 0; i < rarity; i += 1) { msg += '⭐'; }
            msg += ` ${tempReward}\``;
            reward.push(msg);

            tempUserData = assignItem(tempUserData, tempReward);
            if (constants.generalBanner4Star.includes(tempReward)) { tempUserData.pityCounter4star = 0; }
            if (constants.generalBanner5Star.includes(tempReward)) { tempUserData.pityCounter5star = 0; }
            tempUserData.pityCounter4star += 1;
            tempUserData.pityCounter5star += 1;
          }
          tempUserData.primogems -= 1600;
          message.channel.send(`<@${sender.id}>\n\n${reward.sort().reverse().join('\n')}`);
        } else {
          message.channel.send(`<@${sender.id}> not enough Primogems`);
        }
      } else {
        message.channel.send(`<@${sender.id}> not enough Primogems`);
      }
      return tempUserData;
    } catch (err) { console.log(err); }
    return userData;
  },
};
